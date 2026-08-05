package ticket.booking.dto;

import ticket.booking.entities.Ticket;

public class TicketResponse {
    private String ticketId;
    private String source;
    private String destination;
    private String dateOfTravel;
    private String trainId;
    private String trainNo;
    private String userId;
    private Double totalFare;

    public TicketResponse(String ticketId, String source, String destination,
                          String dateOfTravel, String trainId, String trainNo, String userId, Double totalFare) {
        this.ticketId = ticketId;
        this.source = source;
        this.destination = destination;
        this.dateOfTravel = dateOfTravel;
        this.trainId = trainId;
        this.trainNo = trainNo;
        this.userId = userId;
        this.totalFare = totalFare;
    }

    public String getTicketId() { return ticketId; }
    public String getSource() { return source; }
    public String getDestination() { return destination; }
    public String getDateOfTravel() { return dateOfTravel; }
    public String getTrainId() { return trainId; }
    public String getTrainNo() { return trainNo; }
    public String getUserId() { return userId; }
    public Double getTotalFare() { return totalFare; }

    public static TicketResponse fromEntity(Ticket ticket){
        double totalFare = ticket.getTrain().getPrice() != null ? ticket.getTrain().getPrice() * ticket.getSeatCount() : 0.0;
        return new TicketResponse(
                ticket.getTicketId(),
                ticket.getSource(),
                ticket.getDestination(),
                ticket.getDateOfTravel(),
                ticket.getTrain().getTrainId(),
                ticket.getTrain().getTrainNo(),
                ticket.getUser().getUserId(),
                totalFare
        );
    }
}