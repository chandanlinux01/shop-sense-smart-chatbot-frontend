export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export type DynamicResponse<K extends string, V> = {
    [key in K]: V;
}

export interface BaseResponse {
    message: string;
}

