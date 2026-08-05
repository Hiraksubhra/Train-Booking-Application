package ticket.booking.services;

import org.junit.jupiter.api.Test;
import ticket.booking.entities.TrainSchedule;
import ticket.booking.repositories.TrainScheduleRepository;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TrainScheduleServiceTest {

    private final TrainScheduleRepository scheduleRepository = mock(TrainScheduleRepository.class);
    private final TrainScheduleService scheduleService = new TrainScheduleService(scheduleRepository);

    private TrainSchedule buildSchedule(List<List<Integer>> seats) {
        TrainSchedule schedule = new TrainSchedule();
        schedule.setSeats(seats);
        return schedule;
    }

    @Test
    void reserveContiguousSeats_findsWindowAndReturnsRowIndex() {
        // row 0: no room; row 1: [0,0,0,1,0] -> 3 free at index 0-2
        TrainSchedule schedule = buildSchedule(List.of(
                new ArrayList<>(List.of(1, 1, 1, 1, 1)),
                new ArrayList<>(List.of(0, 0, 0, 1, 0))
        ));

        List<Integer> result = scheduleService.reserveContiguousSeats(schedule, 3);

        assertNotNull(result);
        assertEquals(List.of(1, 0, 2), result); // rowIndex=1, start=0, end=2
        assertEquals(List.of(1, 1, 1, 1, 0), schedule.getSeats().get(1)); // marked booked
        verify(scheduleRepository).save(schedule);
    }

    @Test
    void reserveContiguousSeats_returnsNullWhenNoWindowBigEnough() {
        TrainSchedule schedule = buildSchedule(List.of(new ArrayList<>(List.of(0, 1, 0, 1, 0))));

        List<Integer> result = scheduleService.reserveContiguousSeats(schedule, 2);

        assertNull(result);
        verify(scheduleRepository, never()).save(any());
    }

    @Test
    void releaseSeats_marksSeatsBackToFree() {
        TrainSchedule schedule = buildSchedule(List.of(new ArrayList<>(List.of(1, 1, 1, 1, 0))));

        scheduleService.releaseSeats(schedule, 0, 0, 2);

        assertEquals(List.of(0, 0, 0, 1, 0), schedule.getSeats().get(0));
        verify(scheduleRepository).save(schedule);
    }
}