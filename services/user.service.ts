import axiosInstance from '@/lib/axios';
import { UserResponse } from '@/types/auth';
import { handleApiError } from '@/lib/handle-error';
import { ApiResponse } from '@/types/common';

class UserService {
    async getMe(): Promise<ApiResponse<UserResponse>> {
        try {
            // Interceptor automatically adds the Authorization header
            const response = await axiosInstance.get<UserResponse>('/auth/user-details');
            console.log("response", response)
            return {
                success: true,
                message: response.data.message || 'Profile fetched successfully',
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
const userService = new UserService();
export default userService;
