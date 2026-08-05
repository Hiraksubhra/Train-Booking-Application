package ticket.booking.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.util.*;

@Entity
@Table(name = "trains")
public class Train {

    @Id
    @Column(name = "train_id")
    private String trainId;

    @Column(name = "train_no")
    private String trainNo;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "json")
    private Map<String, String> stationTimes;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "json")
    private List<String> stations;

    @ColumnDefault("0")
    @Column(name = "price")
    private Double price;

    public Train(String trainId, String trainNo, Map<String, String> stationTimes, List<String> stations){
        this.trainId = trainId;
        this.trainNo = trainNo;
        this.stationTimes = stationTimes;
        this.stations = stations;
    }

    public Train(){}

    public String getTrainId() { return trainId; }
    public void setTrainId(String trainId) { this.trainId = trainId; }
    public String getTrainNo() { return trainNo; }
    public void setTrainNo(String trainNo) { this.trainNo = trainNo; }
    public Map<String, String> getStationTimes() { return stationTimes; }
    public void setStationTimes(Map<String, String> stationTimes) { this.stationTimes = stationTimes; }
    public List<String> getStations() { return stations; }
    public void setStations(List<String> stations) { this.stations = stations; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
}