import { apiClient } from "./axiosConfig";
import { Train } from "../types";

export const searchTrains = async (source: string, destination: string): Promise<Train[]> => {
    const response = await apiClient.get<Train[]>('trains/search', {
        params: {source, destination},
    });
    return response.data;
}