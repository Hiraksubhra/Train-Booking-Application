package ticket.booking.dto;

import ticket.booking.entities.TrainSchedule;

import java.util.List;

public class ScheduleResponse {
    private String scheduleId;
    private String trainId;
    private String trainNo;
    private String dateOfTravel;
    private List<List<Integer>> seats;
    private Double price;

    public ScheduleResponse(String scheduleId, String trainId, String trainNo,
                            String dateOfTravel, List<List<Integer>> seats, Double price) {
        this.scheduleId = scheduleId;
        this.trainId = trainId;
        this.trainNo = trainNo;
        this.dateOfTravel = dateOfTravel;
        this.seats = seats;
        this.price = price;
    }

    public String getScheduleId() { return scheduleId; }
    public String getTrainId() { return trainId; }
    public String getTrainNo() { return trainNo; }
    public String getDateOfTravel() { return dateOfTravel; }
    public List<List<Integer>> getSeats() { return seats; }
    public Double getPrice() { return price; }

    public static ScheduleResponse fromEntity(TrainSchedule schedule){
        return new ScheduleResponse(
                schedule.getScheduleId(),
                schedule.getTrain().getTrainId(),
                schedule.getTrain().getTrainNo(),
                schedule.getDateOfTravel(),
                schedule.getSeats(),
                schedule.getTrain().getPrice()
        );
    }
}
