export interface Train{
    trainId: string;
    trainNo: string;
    seats: number[][];
    stationTimes: Record<string, string>;
    stations: string[];
}

export interface User{
    userId?: string;
    name: string;
    password: string;
}

export interface Ticket{
    ticketId: string;
    source: string;
    destination: string;
    dateOfTravel: string;
    train: Train;
    user?: User;
}

export interface ScheduleResponse{
    scheduleId : string;
    trainId: string;
    trainNo: string;
    dateOfTravel: string;
    seats: number[][];
    price: number;
}

export interface LoginResponse{
    userId: string;
    username: string;
    token : string;
}

export interface TicketResponse {
    ticketId: string;
    source: string;
    destination: string;
    dateOfTravel: string;
    trainId: string;
    trainNo: string;
    userId: string;
    totalFare: number;
}

export interface BookingRequest{
    trainId: string;
    source: string;
    destination: string;
    dateOfTravel: string;
    seatCount: number;
}