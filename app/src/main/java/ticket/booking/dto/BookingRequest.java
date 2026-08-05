package ticket.booking.dto;

public class BookingRequest {
    private String trainId;
    private String source;
    private String destination;
    private String dateOfTravel;
    private int seatCount;

    public BookingRequest() {}

    public String getTrainId() { return trainId; }
    public void setTrainId(String trainId) { this.trainId = trainId; }
    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }
    public String getDateOfTravel() { return dateOfTravel; }
    public void setDateOfTravel(String dateOfTravel) { this.dateOfTravel = dateOfTravel; }
    public int getSeatCount() { return seatCount; }
    public void setSeatCount(int seatCount) { this.seatCount = seatCount; }
}
