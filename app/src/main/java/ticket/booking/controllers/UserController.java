package ticket.booking.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ticket.booking.entities.Ticket;
import ticket.booking.entities.User;
import ticket.booking.services.UserBookingService;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserBookingService userBookingService;

    public UserController(UserBookingService userBookingService) {
        this.userBookingService = userBookingService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody User user) {
        boolean isSuccessful = userBookingService.signUp(user);
        if (isSuccessful) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Sign Up Successful");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Sign Up Failed: User may already exist.");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(
            @RequestParam String username,
            @RequestParam String password) {
        boolean isAuthenticated = userBookingService.loginUser(username, password);
        if (isAuthenticated) {
            return ResponseEntity.ok("Login Successful");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @GetMapping("/{userId}/bookings")
    public ResponseEntity<List<Ticket>> fetchBookings(@PathVariable String userId) {
        List<Ticket> tickets = userBookingService.fetchBookings(userId);
        return ResponseEntity.ok(tickets);
    }

    @DeleteMapping("/bookings/{ticketId}")
    public ResponseEntity<String> cancelBooking(@PathVariable String ticketId) {
        boolean isCancelled = userBookingService.cancelBooking(ticketId);
        if (isCancelled) {
            return ResponseEntity.ok("Booking cancelled successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ticket not found");
    }
}