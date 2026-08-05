package ticket.booking.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;

@Entity
@Table(name = "train_schedules")
public class TrainSchedule {
    @Id
    @Column(name = "schedule_id")
    private String scheduleId;

    @ManyToOne(fetch =FetchType.LAZY)
    @JoinColumn(name = "train_id")
    private Train train;

    @Column(name = "date_of_travel")
    private String dateOfTravel;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "json")
    private List<List<Integer>> seats;

    @Version
    @Column(name = "version")
    private Long version;

    public TrainSchedule(String scheduleId, Train train, String dateOfTravel, List<List<Integer>> seats) {
        this.scheduleId = scheduleId;
        this.train = train;
        this.dateOfTravel = dateOfTravel;
        this.seats = seats;
    }

    public TrainSchedule() {}

    public String getScheduleId() { return scheduleId; }
    public void setScheduleId(String scheduleId) { this.scheduleId = scheduleId; }
    public Train getTrain() { return train; }
    public void setTrain(Train train) { this.train = train; }
    public String getDateOfTravel() { return dateOfTravel; }
    public void setDateOfTravel(String dateOfTravel) { this.dateOfTravel = dateOfTravel; }
    public List<List<Integer>> getSeats() { return seats; }
    public void setSeats(List<List<Integer>> seats) { this.seats = seats; }
    public Long getVersion() { return version; }
}
