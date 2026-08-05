import { apiClient } from "./axiosConfig";
import {User, LoginResponse, BookingRequest, TicketResponse} from "../types";

export const signUp = async (user : User): Promise<string>=>{
    const response = await apiClient.post('/users/signup', user);
    return response.data;
};


export const login = async (username: string, password: string): Promise<LoginResponse> =>{
    const response = await apiClient.post<LoginResponse>('/users/login', null, {
        params: {username, password}
    });
    return response.data;
}

export const fetchBookings = async (userId : string): Promise<TicketResponse[]>=>{
    const response = await apiClient.get<TicketResponse[]>(`/users/${userId}/bookings`);
    return response.data;
}

export const cancelBooking = async (ticketId : string): Promise<string>=>{
    const response = await apiClient.delete<string>(`users/bookings/${ticketId}`);
    return response.data;
}

export const bookTicket = async (userId: string, request: BookingRequest): Promise<TicketResponse>=>{
    const response = await apiClient.post<TicketResponse>(`/users/${userId}/bookings`, request);
    return response.data;
}