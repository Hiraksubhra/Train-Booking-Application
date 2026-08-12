package ticket.booking.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import ticket.booking.entities.Train;
import ticket.booking.entities.TrainSchedule;
import ticket.booking.repositories.TrainRepository;
import ticket.booking.repositories.TrainScheduleRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Component
public class DataInitializer implements CommandLineRunner {

    private final TrainRepository trainRepository;
    private final TrainScheduleRepository scheduleRepository;

    public DataInitializer(TrainRepository trainRepository, TrainScheduleRepository scheduleRepository) {
        this.trainRepository = trainRepository;
        this.scheduleRepository = scheduleRepository;
    }

    @Override
    public void run(String... args) {
        if (trainRepository.count() == 0) {
            Train train1 = new Train(
                    "train-101",
                    "12951",
                    Map.of("delhi", "08:00", "agra", "10:30", "mumbai", "18:00"),
                    List.of("delhi", "agra", "mumbai")
            );
            train1.setPrice(799.00);

            Train train2 = new Train(
                    "train-102",
                    "12952",
                    Map.of("delhi", "09:00", "agra", "11:15"),
                    List.of("delhi", "agra")
            );
            train2.setPrice(549.00);

            Train train3 = new Train(
                    "train-103",
                    "12004",
                    Map.of("delhi", "06:00", "kanpur", "11:20", "lucknow", "12:40"),
                    List.of("delhi", "kanpur", "lucknow")
            );
            train3.setPrice(850.00);

            trainRepository.saveAll(List.of(train1, train2, train3));

            // Seed schedules for the next 30 days
            LocalDate today = LocalDate.now();
            List<List<Integer>> defaultSeats = List.of(
                    List.of(0, 0, 0, 0, 0, 0),
                    List.of(0, 0, 0, 0, 0, 0),
                    List.of(0, 0, 0, 0, 0, 0),
                    List.of(0, 0, 0, 0, 0, 0)
            );

            for (int i = 0; i < 30; i++) {
                String dateStr = today.plusDays(i).toString();
                scheduleRepository.save(new TrainSchedule(UUID.randomUUID().toString(), train1, dateStr, defaultSeats));
                scheduleRepository.save(new TrainSchedule(UUID.randomUUID().toString(), train2, dateStr, defaultSeats));
                scheduleRepository.save(new TrainSchedule(UUID.randomUUID().toString(), train3, dateStr, defaultSeats));
            }
        }
    }
}
