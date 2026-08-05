package ticket.booking.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;
import ticket.booking.dto.ScheduleResponse;
import ticket.booking.entities.Train;
import ticket.booking.entities.TrainSchedule;
import ticket.booking.services.TrainScheduleService;
import ticket.booking.services.TrainService;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/trains")
public class TrainController {

    private final TrainService trainService;
    private final TrainScheduleService trainScheduleService;

    public TrainController(TrainService trainService, TrainScheduleService trainScheduleService) {
        this.trainService = trainService;
        this.trainScheduleService = trainScheduleService;
    }

    @GetMapping("/search")
    public ResponseEntity<List<Train>> searchTrains(
            @RequestParam String source,
            @RequestParam String destination) {
        List<Train> trains = trainService.searchTrains(source, destination);
        return ResponseEntity.ok(trains);
    }

    @GetMapping("/{trainId}/schedule")
    public ResponseEntity<?> getSchedule(@PathVariable String trainId,
                                         @RequestParam String date){
        Optional<TrainSchedule> schedule = trainScheduleService.findSchedule(trainId, date);

        if(schedule.isPresent()){
            return ResponseEntity.ok(ScheduleResponse.fromEntity(schedule.get()));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No schedule found for this train on the given date");
    }

    @GetMapping("/stations")
    public ResponseEntity<List<String>> getAllStations(){
        return ResponseEntity.ok(trainService.getAllStations());
    }
}