import { DataApiClient } from "@/service/apiClient";
import { AxiosError, CanceledError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { AxiosResponse } from "axios";
import { twMerge } from "tailwind-merge";

import { APIResponse } from "@/app/_types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// interface Response {
//   message: string;
//   status: number;
// }

export const postRequest = async <T>(
  endpoint: string,
  receivedData?: T,
): Promise<APIResponse<any> | null> => {
  try {
    const request = await DataApiClient.post<APIResponse<any>>(endpoint, receivedData, {
      withCredentials: true,
    });

    return request.data;
  } catch (error) {
    if (error instanceof CanceledError) return null;

    throw error;
  }
};

export const patchRequest = async <T>(
  endpoint: string,
  editiedData: T,
): Promise<APIResponse<any>> => {
  try {
    const editRequest = await DataApiClient.patch<APIResponse<any>>(
      endpoint,
      editiedData,
    );

    return editRequest.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRequest = async <T>(
  endpoint: string,
  OffenceTobeDeleted: T,
) => {
  try {
    const deleteRequest = await DataApiClient.delete<APIResponse<any>>(endpoint, {
      data: OffenceTobeDeleted,
    });

    return deleteRequest.data;
  } catch (error) {
    return error;
  }
};

export function generateErrorMessage(error: unknown) {
  let errorMessage = "";
  if (error instanceof AxiosError) {
    if (error.response) {
      if (error.response) {
        errorMessage =
          error.response.data.message ||
          error.response.data.error.map((error: unknown) => error);
      }
    } else {
      errorMessage = error.message;
      if (errorMessage === "Network Error") {
        errorMessage = "Unable to connect to server. Please check your internet connection or try again later.";
      }
    }
  } else {
    errorMessage = "an unexpected error occured!";
  }

  return errorMessage;
}

export const getDashboardMetrics = async (endpoint: string) => {
  try {
    const response = await DataApiClient.get(endpoint);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const checkUser = async (endpoint: string) => {
  try {
    const response = await DataApiClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
