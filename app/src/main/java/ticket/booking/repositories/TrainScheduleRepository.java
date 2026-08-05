package ticket.booking.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ticket.booking.entities.TrainSchedule;

import java.util.Optional;

@Repository
public interface TrainScheduleRepository extends JpaRepository<TrainSchedule, String> {
    Optional<TrainSchedule> findByTrain_TrainIdAndDateOfTravel(String trainId, String dateOfTravel);
}
