import { apiClient } from "./axiosConfig";
import { User, Ticket } from "../types";

export const signUp = async (user : User): Promise<string>=>{
    const response = await apiClient.post('/user/signup', user);
    return response.data;
};

export const login = async (username: string, password: string): Promise<string> =>{
    const response = await apiClient.post<string>('/users/login', null, {
        params: {username, password}
    });
    return response.data;
}

export const fetchBookings = async (userId : string): Promise<Ticket[]>=>{
    const response = await apiClient.get<Ticket[]>(`/users/${userId}/bookings/`);
    return response.data;
}

export const cancelBooking = async (ticketId : string): Promise<string>=>{
    const response = await apiClient.delete<string>(`users/bookings/${ticketId}`);
    return response.data;
}

