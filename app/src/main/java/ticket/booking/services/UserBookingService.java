package ticket.booking.services;

import jakarta.transaction.Transactional;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.stereotype.Service;
import ticket.booking.dto.BookingRequest;
import ticket.booking.dto.LoginResponse;
import ticket.booking.entities.Ticket;
import ticket.booking.entities.Train;
import ticket.booking.entities.TrainSchedule;
import ticket.booking.entities.User;
import ticket.booking.repositories.TicketRepository;
import ticket.booking.repositories.TrainRepository;
import ticket.booking.repositories.UserRepository;
import ticket.booking.util.JwtUtil;
import ticket.booking.util.UserServiceUtil;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserBookingService {
    private final TrainRepository trainRepository;
    private final TrainService trainService;
    private final TrainScheduleService scheduleService;
    private final UserRepository userRepository;
    private final TicketRepository ticketRepository;
    private final JwtUtil jwtUtil;

    public UserBookingService(UserRepository userRepository, TicketRepository ticketRepository,
                              TrainRepository trainRepository, TrainService trainService,
                              JwtUtil jwtUtil, TrainScheduleService scheduleService) {
        this.trainRepository = trainRepository;
        this.trainService = trainService;
        this.userRepository = userRepository;
        this.ticketRepository = ticketRepository;
        this.jwtUtil = jwtUtil;
        this.scheduleService = scheduleService;
    }

    @Transactional
    public Ticket bookTicket(String userId, BookingRequest request){
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new IllegalArgumentException("User not found"));

        Train train = trainRepository.findById(request.getTrainId())
                .orElseThrow(()-> new IllegalArgumentException("Train not found"));

        if(!trainService.isValidRoute(train, request.getSource(), request.getDestination())){
            throw new IllegalArgumentException("This train does not run between those stations");
        }
        TrainSchedule schedule = scheduleService.findSchedule(train.getTrainId(), request.getDateOfTravel())
                .orElseThrow(() -> new IllegalArgumentException("This train has no departure on the requested date"));

        List<Integer> reservedWindow;

        try{
            reservedWindow = scheduleService.reserveContiguousSeats(schedule, request.getSeatCount());
        }catch (ObjectOptimisticLockingFailureException e){
            throw new IllegalStateException("Seats were just booked by someone else, please try again");
        }

        if(reservedWindow == null){
            throw new IllegalStateException("Not enough contiguous seats available");
        }

        int seatRow = reservedWindow.get(0);
        int seatStart = reservedWindow.get(1);
        int seatEnd = reservedWindow.get(2);

        Ticket ticket =  new Ticket(
                UUID.randomUUID().toString(),
                user,
                request.getSource(),
                request.getDestination(),
                request.getDateOfTravel(),
                train,
                request.getSeatCount(),
                seatRow,
                seatStart,
                seatEnd
        );
        return ticketRepository.save(ticket);
    }

    public Optional<LoginResponse> loginUser(String username, String rawPassword) {
        Optional<User> foundUser = userRepository.findByName(username);
        if (foundUser.isPresent()) {
            User user = foundUser.get();
             if(UserServiceUtil.checkPassword(rawPassword, user.getHashedPassword())){
                 String token = jwtUtil.generateToken(user.getUserId(), user.getName());
                 return Optional.of(new LoginResponse(user.getUserId(), user.getName(), token));
             }
        }
        return Optional.empty();
    }

    public boolean signUp(User user) {
        if (userRepository.findByName(user.getName()).isPresent()) {
            return false;
        }
        try {
            user.setUserId(UUID.randomUUID().toString());
            user.setHashedPassword(UserServiceUtil.hashPassword(user.getPassword()));
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public List<Ticket> fetchBookings(String userId) {
        return ticketRepository.findByUser_UserId(userId);
    }

    @Transactional
    public boolean cancelBooking(String ticketId,String requestingUserId) {
        if (ticketId == null || ticketId.isEmpty()) {
            return false;
        }
        Optional<Ticket> foundTicket = ticketRepository.findById(ticketId);
        if (foundTicket.isEmpty()) {
            return false;
        }
        Ticket ticket = foundTicket.get();
        if(!ticket.getUser().getUserId().equals(requestingUserId)){
            throw new SecurityException("You do not own this booking");
        }

        scheduleService.findSchedule(ticket.getTrain().getTrainId(), ticket.getDateOfTravel())
                        .ifPresent(schedule -> scheduleService.releaseSeats(
                                schedule, ticket.getSeatRow(), ticket.getSeatStart(), ticket.getSeatEnd()));
        ticketRepository.delete(ticket);
        return true;
    }
}