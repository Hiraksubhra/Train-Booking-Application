package ticket.booking.services;

import org.springframework.stereotype.Service;
import ticket.booking.entities.Train;
import ticket.booking.repositories.TrainRepository;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrainService {

    private final TrainRepository trainRepository;

    public TrainService(TrainRepository trainRepository) {
        this.trainRepository = trainRepository;
    }

    public List<Train> searchTrains(String source, String destination) {
        List<Train> allTrains = trainRepository.findAll();
        return allTrains.stream()
                .filter(train -> validTrain(train, source, destination))
                .collect(Collectors.toList());
    }

    private boolean validTrain(Train train, String source, String destination) {
        List<String> stationOrder = train.getStations();
        int sourceIndex = stationOrder.indexOf(source.toLowerCase());
        int destinationIndex = stationOrder.indexOf(destination.toLowerCase());
        return sourceIndex != -1 && destinationIndex != -1 && sourceIndex < destinationIndex;
    }

    public boolean findContiguousSeats(Train train, int requestedSeats) {
        List<List<Integer>> seats = train.getSeats();
        for (List<Integer> row : seats) {
            int availableInWindow = 0;
            for (int windowEnd = 0; windowEnd < row.size(); windowEnd++) {
                if (row.get(windowEnd) == 0) {
                    availableInWindow++;
                    if (availableInWindow == requestedSeats) {
                        return true;
                    }
                } else {
                    availableInWindow = 0;
                }
            }
        }
        return false;
    }
}