package ticket.booking.services;

import org.springframework.stereotype.Service;
import ticket.booking.entities.Ticket;
import ticket.booking.entities.User;
import ticket.booking.repositories.TicketRepository;
import ticket.booking.repositories.UserRepository;
import ticket.booking.util.UserServiceUtil;
import java.util.List;
import java.util.Optional;

@Service
public class UserBookingService {

    private final UserRepository userRepository;
    private final TicketRepository ticketRepository;

    public UserBookingService(UserRepository userRepository, TicketRepository ticketRepository) {
        this.userRepository = userRepository;
        this.ticketRepository = ticketRepository;
    }

    public boolean loginUser(String username, String rawPassword) {
        Optional<User> foundUser = userRepository.findByName(username);
        if (foundUser.isPresent()) {
            User user = foundUser.get();
            return UserServiceUtil.checkPassword(rawPassword, user.getHashedPassword());
        }
        return false;
    }

    public boolean signUp(User user) {
        try {
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

    public boolean cancelBooking(String ticketId) {
        if (ticketId == null || ticketId.isEmpty()) {
            return false;
        }
        Optional<Ticket> foundTicket = ticketRepository.findById(ticketId);
        if (foundTicket.isPresent()) {
            ticketRepository.delete(foundTicket.get());
            return true;
        }
        return false;
    }
}