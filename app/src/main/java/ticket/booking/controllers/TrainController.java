package ticket.booking.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ticket.booking.entities.Train;
import ticket.booking.services.TrainService;
import java.util.List;

@RestController
@RequestMapping("/api/trains")
@CrossOrigin(origins = "http://localhost:5173")
public class TrainController {

    private final TrainService trainService;

    public TrainController(TrainService trainService) {
        this.trainService = trainService;
    }

    @GetMapping("/search")
    public ResponseEntity<List<Train>> searchTrains(
            @RequestParam String source,
            @RequestParam String destination) {
        List<Train> trains = trainService.searchTrains(source, destination);
        return ResponseEntity.ok(trains);
    }
}