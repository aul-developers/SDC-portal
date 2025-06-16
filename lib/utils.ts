import { DataApiClient } from "@/service/apiClient";
import { CanceledError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { AxiosResponse } from "axios";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface PostResponse {
    message: string;
    status: number;
}

export const postRequest = async <T>(
    endpoint: string,
    receivedData?: T
): Promise<PostResponse | null> => {
    try {
        const request = await DataApiClient.post<PostResponse>(
            endpoint,
            receivedData
        );

        return request.data;
    } catch (error) {
        if (error instanceof CanceledError) return null;

        throw error;
    }
};
