package ticket.booking.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ticket.booking.entities.Train;

@Repository
public interface TrainRepository extends JpaRepository<Train, String> {
}