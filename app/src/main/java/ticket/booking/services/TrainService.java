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

    public boolean isValidRoute(Train train, String source, String destination) {
        return validTrain(train, source, destination);
    }

    public List<String> getAllStations(){
        return trainRepository.findAll().stream()
                .flatMap(train -> train.getStations().stream())
                .distinct()
                .map(this::capitalize)
                .sorted()
                .collect(Collectors.toList());
    }

    private String capitalize(String station){
        if(station == null || station.isEmpty()){
            return station;
        }
        return station.substring(0, 1).toUpperCase() + station.substring(1);
    }
}