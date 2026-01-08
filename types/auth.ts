export interface LoginResponse {
    access_token: string;
    token_type: string;
    user: {
        id: string;
        email: string;
        full_name: string;
    };
}

export interface LoginRequest {
    email: string;
    password?: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
