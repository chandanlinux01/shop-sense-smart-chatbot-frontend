import axiosInstance from '@/lib/axios';
import { ApiResponse } from '@/types/auth';

class UserService {
    /**
     * Fetches the current user's profile
     */
    async getProfile(): Promise<ApiResponse<any>> {
        try {
            const response = await axiosInstance.get('/auth/profile');
            return {
                success: true,
                message: 'Profile fetched successfully',
                data: response.data,
            };
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to fetch profile',
                data: null,
            };
        }
    }
}

const userService = new UserService();
export default userService;
