package ticket.booking.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "tickets")
public class Ticket {

    @Id
    @Column(name = "ticket_id")
    private String ticketId;
    private String source;
    private String destination;

    @Column(name = "date_of_travel")
    private String dateOfTravel;

    @Column(name="seat_count")
    private int seatCount;

    @Column(name = "seat_row")
    private int seatRow;

    @Column(name = "seat_start")
    private int seatStart;

    @Column(name = "seat_end")
    private int seatEnd;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "train_id")
    private Train train;

    public Ticket(String ticketId, User user, String source, String destination, String dateOfTravel,
                  Train train, int seatCount, int seatRow, int seatStart, int seatEnd){
        this.ticketId = ticketId;
        this.user = user;
        this.source = source;
        this.destination = destination;
        this.dateOfTravel = dateOfTravel;
        this.train = train;
        this.seatCount = seatCount;
        this.seatRow = seatRow;
        this.seatStart = seatStart;
        this.seatEnd = seatEnd;
    }

    public Ticket() {}

    public String getTicketId() { return ticketId; }
    public void setTicketId(String ticketId) { this.ticketId = ticketId; }
    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }
    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }
    public String getDateOfTravel() { return dateOfTravel; }
    public void setDateOfTravel(String dateOfTravel) { this.dateOfTravel = dateOfTravel; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Train getTrain() { return train; }
    public void setTrain(Train train) { this.train = train; }
    public int getSeatCount() { return seatCount; }
    public void setSeatCount(int seatCount) { this.seatCount = seatCount; }
    public int getSeatRow() { return seatRow; }
    public int getSeatStart() { return seatStart; }
    public int getSeatEnd() { return seatEnd; }
}