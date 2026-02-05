import { UserDetails } from "./user";
import { BaseResponse, DynamicResponse } from "./common";

export interface LoginResponse extends BaseResponse {
    access_token: string;
    token_type: string;
    user_details: UserDetails;
}

export type UserResponse = BaseResponse & UserDetails;

export interface LoginRequest {
    email: string;
    password?: string;
}

export interface ChangePasswordRequest {
    new_password: string;
    confirm_password?: string;
    token: string;
}

export type ChangePasswordResponse = BaseResponse

export type ForgotPasswordResponse = BaseResponse

export type ForgotPasswordRequest = DynamicResponse<"email", string>

