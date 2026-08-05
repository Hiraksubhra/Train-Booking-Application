import { apiClient } from "./axiosConfig";
import {ScheduleResponse, Train} from "../types";

export const searchTrains = async (source: string, destination: string): Promise<Train[]> => {
    const response = await apiClient.get<Train[]>('trains/search', {
        params: {source, destination},
    });
    return response.data;
}

export const fetchSchedule = async (trainId: string, date: string): Promise<ScheduleResponse>=>{
    const response = await apiClient.get<ScheduleResponse>(`trains/${trainId}/schedule`, {
        params : { date },
    });

    return response.data;
}

export const fetchStations = async (): Promise<string[]>=>{
    const response = await apiClient.get<string[]>('trains/stations');
    return response.data;
}