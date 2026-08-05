package ticket.booking.services;

import org.springframework.stereotype.Service;
import ticket.booking.entities.TrainSchedule;
import ticket.booking.repositories.TrainScheduleRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TrainScheduleService {
    private final TrainScheduleRepository scheduleRepository;

    public TrainScheduleService(TrainScheduleRepository scheduleRepository){
        this.scheduleRepository = scheduleRepository;
    }

    public Optional<TrainSchedule> findSchedule(String trainId, String dateOfTravel){
        return scheduleRepository.findByTrain_TrainIdAndDateOfTravel(trainId, dateOfTravel);
    }

    public List<Integer> reserveContiguousSeats(TrainSchedule schedule, int requestedSeats) {
        List<List<Integer>> seats = schedule.getSeats();
        for (int rowIndex = 0; rowIndex < seats.size(); rowIndex++) {
            List<Integer> row = seats.get(rowIndex);
            int available = 0;
            for (int col = 0; col < row.size(); col++) {
                if (row.get(col) == 0) {
                    available++;
                    if (available == requestedSeats) {
                        int windowStart = col - requestedSeats + 1;
                        for (int i = windowStart; i <= col; i++) {
                            row.set(i, 1);
                        }
                        scheduleRepository.save(schedule);
                        return List.of(rowIndex, windowStart, col);
                    }
                } else {
                    available = 0;
                }
            }
        }
        return null;
    }
    public void releaseSeats(TrainSchedule schedule, int rowIndex, int seatStart, int seatEnd) {
        List<Integer> row = schedule.getSeats().get(rowIndex);
        for (int i = seatStart; i <= seatEnd; i++) {
            row.set(i, 0);
        }
        scheduleRepository.save(schedule);
    }
}
