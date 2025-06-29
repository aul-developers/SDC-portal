//TODO: going to use the useReducer hook for fetching the data

//Keshi coded useFetch hook ---***** 2025
import { AxiosError, CanceledError, type AxiosRequestConfig } from "axios";
import { useEffect, useReducer } from "react";
import { DataApiClient } from "@/service/apiClient";

type fetchStateReducer<T> = {
    data: T|null;
    isError: string;
    isLoading: boolean;
};

type ACTION_TYPES = "FETCH_START" | "FETCH_SUCCESS" | "FETCH_ERROR";

type ActionPayloadTypes<T> = {
    type: ACTION_TYPES;
    payload: fetchStateReducer<T>;
};

//if configured
// type FetchResponse<T> = {
//     results: T[];
//
// };

function fetchReducer<T>(
    state: fetchStateReducer<T>,
    { type, payload }: ActionPayloadTypes<T>
): fetchStateReducer<T> {
    switch (type) {
        case "FETCH_START":
            return {
                data: null,
                isLoading: true,
                isError: "",
            };
        case "FETCH_SUCCESS":
            return {
                data: payload.data,
                isLoading: false,
                isError: "",
            };
        case "FETCH_ERROR":
            return {
                data: null,
                isLoading: false,
                isError: payload.isError,
            };

        default:
            return state;
    }
}

export const useFetch = <T>(
    endpoint: string,
    requestConfig?: AxiosRequestConfig
): fetchStateReducer<T> => {
    const initialState = {
        data: null,
        isError: "",
        isLoading: true,
    };
    const [state, dispatch] = useReducer(fetchReducer<T>, initialState);

    useEffect(() => {
        if (!endpoint) return;
        const controller = new AbortController();
        const fetchData = async () => {
            dispatch({
                type: "FETCH_START",
                payload: {
                    data: null,
                    isLoading: true,
                    isError: "",
                },
            });
            try {
                const fetchResponse = await DataApiClient.get(endpoint, {
                    signal: controller.signal,
                    ...requestConfig,
                });

                dispatch({
                    type: "FETCH_SUCCESS",
                    payload: {
                        data: fetchResponse.data,
                        isLoading: false,
                        isError: "",
                    },
                });
            } catch (error) {
                if (error instanceof CanceledError) return;

                const axiosError = error as AxiosError;
                dispatch({
                    type: "FETCH_ERROR",
                    payload: {
                        data: null,
                        isLoading: false,
                        isError: axiosError.message as string,
                    },
                });
            }
        };

        fetchData();
    }, [endpoint]);

    return {
        data: state.data,
        isLoading: state.isLoading,
        isError: state.isError,
    };
};
