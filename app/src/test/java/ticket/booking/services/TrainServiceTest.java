package ticket.booking.services;

import org.junit.jupiter.api.Test;
import ticket.booking.entities.Train;
import ticket.booking.repositories.TrainRepository;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TrainServiceTest {

    private final TrainRepository trainRepository = mock(TrainRepository.class);
    private final TrainService trainService = new TrainService(trainRepository);

    @Test
    void isValidRoute_trueWhenSourceBeforeDestination() {
        Train train = new Train();
        train.setStations(List.of("delhi", "agra", "mumbai"));

        assertTrue(trainService.isValidRoute(train, "Delhi", "Mumbai"));
    }

    @Test
    void isValidRoute_falseWhenDestinationBeforeSource() {
        Train train = new Train();
        train.setStations(List.of("delhi", "agra", "mumbai"));

        assertFalse(trainService.isValidRoute(train, "Mumbai", "Delhi"));
    }

    @Test
    void isValidRoute_falseWhenStationNotOnRoute() {
        Train train = new Train();
        train.setStations(List.of("delhi", "agra", "mumbai"));

        assertFalse(trainService.isValidRoute(train, "Delhi", "Chennai"));
    }
}