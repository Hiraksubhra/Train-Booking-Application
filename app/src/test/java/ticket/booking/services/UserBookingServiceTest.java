package ticket.booking.services;

import org.junit.jupiter.api.Test;
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

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserBookingServiceTest {

    private final UserRepository userRepository = mock(UserRepository.class);
    private final TicketRepository ticketRepository = mock(TicketRepository.class);
    private final TrainRepository trainRepository = mock(TrainRepository.class);
    private final TrainService trainService = mock(TrainService.class);
    private final JwtUtil jwtUtil = mock(JwtUtil.class);
    private final TrainScheduleService scheduleService = mock(TrainScheduleService.class);

    private final UserBookingService bookingService =
            new UserBookingService(userRepository, ticketRepository, trainRepository, trainService, jwtUtil, scheduleService);

    private BookingRequest sampleRequest() {
        BookingRequest req = new BookingRequest();
        req.setTrainId("train1");
        req.setSource("Delhi");
        req.setDestination("Agra");
        req.setDateOfTravel("2026-08-10");
        req.setSeatCount(2);
        return req;
    }

    private Train sampleTrain() {
        return new Train("train1", "12345", Map.of(), List.of("delhi", "agra"));
    }

    @Test
    void bookTicket_success() {
        User user = new User("Alice", "pw", "hashed", List.of(), "user1");
        Train train = sampleTrain();
        TrainSchedule schedule = new TrainSchedule("sched1", train, "2026-08-10", List.of());

        when(userRepository.findById("user1")).thenReturn(Optional.of(user));
        when(trainRepository.findById("train1")).thenReturn(Optional.of(train));
        when(trainService.isValidRoute(train, "Delhi", "Agra")).thenReturn(true);
        when(scheduleService.findSchedule("train1", "2026-08-10")).thenReturn(Optional.of(schedule));
        when(scheduleService.reserveContiguousSeats(schedule, 2)).thenReturn(List.of(0, 0, 1));
        when(ticketRepository.save(any(Ticket.class))).thenAnswer(inv -> inv.getArgument(0));

        Ticket result = bookingService.bookTicket("user1", sampleRequest());

        assertNotNull(result);
        assertEquals("Delhi", result.getSource());
        assertEquals(0, result.getSeatRow());
        assertEquals(0, result.getSeatStart());
        assertEquals(1, result.getSeatEnd());
        verify(ticketRepository).save(any(Ticket.class));
    }

    @Test
    void bookTicket_throwsWhenUserNotFound() {
        when(userRepository.findById("user1")).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class,
                () -> bookingService.bookTicket("user1", sampleRequest()));
    }

    @Test
    void bookTicket_throwsWhenRouteInvalid() {
        User user = new User("Alice", "pw", "hashed", List.of(), "user1");
        Train train = sampleTrain();

        when(userRepository.findById("user1")).thenReturn(Optional.of(user));
        when(trainRepository.findById("train1")).thenReturn(Optional.of(train));
        when(trainService.isValidRoute(train, "Delhi", "Agra")).thenReturn(false);

        assertThrows(IllegalArgumentException.class,
                () -> bookingService.bookTicket("user1", sampleRequest()));
    }

    @Test
    void bookTicket_throwsWhenNoScheduleForDate() {
        User user = new User("Alice", "pw", "hashed", List.of(), "user1");
        Train train = sampleTrain();

        when(userRepository.findById("user1")).thenReturn(Optional.of(user));
        when(trainRepository.findById("train1")).thenReturn(Optional.of(train));
        when(trainService.isValidRoute(train, "Delhi", "Agra")).thenReturn(true);
        when(scheduleService.findSchedule("train1", "2026-08-10")).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class,
                () -> bookingService.bookTicket("user1", sampleRequest()));
    }

    @Test
    void bookTicket_throwsWhenNoSeatsAvailable() {
        User user = new User("Alice", "pw", "hashed", List.of(), "user1");
        Train train = sampleTrain();
        TrainSchedule schedule = new TrainSchedule("sched1", train, "2026-08-10", List.of());

        when(userRepository.findById("user1")).thenReturn(Optional.of(user));
        when(trainRepository.findById("train1")).thenReturn(Optional.of(train));
        when(trainService.isValidRoute(train, "Delhi", "Agra")).thenReturn(true);
        when(scheduleService.findSchedule("train1", "2026-08-10")).thenReturn(Optional.of(schedule));
        when(scheduleService.reserveContiguousSeats(schedule, 2)).thenReturn(null);

        assertThrows(IllegalStateException.class,
                () -> bookingService.bookTicket("user1", sampleRequest()));
    }

    @Test
    void cancelBooking_releasesSeatsAndDeletesTicket() {
        User user = new User("Alice", "pw", "hashed", List.of(), "user1");
        Train train = sampleTrain();
        TrainSchedule schedule = new TrainSchedule("sched1", train, "2026-08-10", List.of());
        Ticket ticket = new Ticket("ticket1", user, "delhi", "agra", "2026-08-10", train, 2, 0, 0, 1);

        when(ticketRepository.findById("ticket1")).thenReturn(Optional.of(ticket));
        when(scheduleService.findSchedule("train1", "2026-08-10")).thenReturn(Optional.of(schedule));

        boolean result = bookingService.cancelBooking("ticket1", "user1");

        assertTrue(result);
        verify(scheduleService).releaseSeats(schedule, 0, 0, 1);
        verify(ticketRepository).delete(ticket);
    }

    @Test
    void cancelBooking_throwsWhenNotOwner() {
        User user = new User("Alice", "pw", "hashed", List.of(), "user1");
        Train train = sampleTrain();
        Ticket ticket = new Ticket("ticket1", user, "delhi", "agra", "2026-08-10", train, 2, 0, 0, 1);

        when(ticketRepository.findById("ticket1")).thenReturn(Optional.of(ticket));

        assertThrows(SecurityException.class,
                () -> bookingService.cancelBooking("ticket1", "someone-else"));
    }

    @Test
    void loginUser_returnsEmptyWhenUserNotFound() {
        when(userRepository.findByName("alice")).thenReturn(Optional.empty());

        Optional<LoginResponse> result = bookingService.loginUser("alice", "raw");

        assertTrue(result.isEmpty());
    }
}