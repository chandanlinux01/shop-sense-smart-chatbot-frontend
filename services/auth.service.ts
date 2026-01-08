import axiosInstance from '@/lib/axios';
import { LoginRequest, LoginResponse, ApiResponse } from '@/types/auth';
import { handleApiError } from '@/lib/handle-error';

class AuthService {
    // Handles Login API call
    async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
        try {
            const response = await axiosInstance.post<LoginResponse>('/auth/login', credentials);
            return {
                success: true,
                message: 'Login successful',
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
