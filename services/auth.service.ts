import axiosInstance from '@/lib/axios';
import { LoginRequest, LoginResponse, ForgotPasswordRequest, ChangePasswordRequest, ForgotPasswordResponse, ChangePasswordResponse } from '@/types/auth';
import { handleApiError } from '@/lib/handle-error';
import { ApiResponse } from '@/types/common';

class AuthService {
    // Handles Login API call
    async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
        try {
            const response = await axiosInstance.post<LoginResponse>('/auth/login', credentials);
            console.log("response.data", response.data);
            return {
                success: true,
                message: response.data.message || 'Login successful',
                data: response.data,
            };
        } catch (error: any) {
            return {
                success: false,
                message: handleApiError(error),
                data: null as any,
            };
        }
    }

    // Handles Forgot Password API call
    async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse<ForgotPasswordResponse>> {
        try {
            const response = await axiosInstance.post<ForgotPasswordResponse>('/auth/forgot-password', data);
            return {
                success: true,
                message: response.data.message || 'Password reset link sent to your email',
                data: response.data,
            };
        } catch (error: any) {
            return {
                success: false,
                message: handleApiError(error),
                data: null as any,
            };
        }
    }

    // Handles both: Token Verify Reset Token API call & Change Password
    async changePassword(data: ChangePasswordRequest): Promise<ApiResponse<ChangePasswordResponse>> {
        try {
            const response = await axiosInstance.post<ChangePasswordResponse>('/auth/reset-password', data);
            return {
                success: true,
                message: response.data.message || 'Password changed successfully',
                data: response.data,
            };
        } catch (error: any) {
            return {
                success: false,
                message: handleApiError(error),
                data: null as any,
            };
        }
    }
}

const authService = new AuthService();
export default authService;
