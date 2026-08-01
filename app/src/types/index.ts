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
