package ticket.booking.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ticket.booking.dto.BookingRequest;
import ticket.booking.dto.LoginResponse;
import ticket.booking.dto.TicketResponse;
import ticket.booking.entities.Ticket;
import ticket.booking.entities.User;
import ticket.booking.services.UserBookingService;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
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

    // UserController.java
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestParam String username,
            @RequestParam String password) {
        Optional<LoginResponse> result = userBookingService.loginUser(username, password);
        if (result.isPresent()) {
            return ResponseEntity.ok(result.get());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @PostMapping("/{userId}/bookings")
    public ResponseEntity<?> bookTicket(@PathVariable String userId, @RequestBody BookingRequest request, jakarta.servlet.http.HttpServletRequest httpRequest){
        String authenticatedUserId = (String) httpRequest.getAttribute("authenticatedUserId");

        System.out.println("Path userId: " + userId);
        System.out.println("Authenticated userId: " + authenticatedUserId);
        if(!userId.equals(authenticatedUserId)){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can only book on your own account");
        }
        try{
            Ticket ticket = userBookingService.bookTicket(userId, request);
            return ResponseEntity.status(HttpStatus.CREATED).body(TicketResponse.fromEntity(ticket));
        }catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }catch (IllegalStateException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @GetMapping("/{userId}/bookings")
    public ResponseEntity<?> fetchBookings(@PathVariable String userId, jakarta.servlet.http.HttpServletRequest httpRequest) {
        String authenticatedUserId = (String) httpRequest.getAttribute("authenticatedUserId");
        if (!userId.equals(authenticatedUserId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can only view your own bookings");
        }

        List<TicketResponse> tickets = userBookingService.fetchBookings(userId)
                .stream()
                .map(TicketResponse::fromEntity)
                .toList();
        return ResponseEntity.ok(tickets);
    }

    @DeleteMapping("/bookings/{ticketId}")
    public ResponseEntity<String> cancelBooking(@PathVariable String ticketId, jakarta.servlet.http.HttpServletRequest httpRequest) {
        String authenticatedUserId = (String) httpRequest.getAttribute("authenticatedUserId");
        try{
            boolean isCancelled = userBookingService.cancelBooking(ticketId, authenticatedUserId);
            if (isCancelled) {
                return ResponseEntity.ok("Booking cancelled successfully");
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ticket not found");
        }catch (SecurityException e){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }
}