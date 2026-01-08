'use server';

import userService from '@/services/user.service';
import { ApiResponse } from '@/types/auth';

// Example Server Action to fetch user profile
// This can be called from BOTH Server and Client components.
// Logic:
// 1. Client calls this function (Proxy).
// 2. It runs on the server.
// 3. Axios Interceptor (Server) picks up the HttpOnly cookie.
// 4. Request is sent to the backend with the token.
export async function getUserProfileAction(): Promise<ApiResponse<any>> {
    try {
        // Now using the Service Layer
        const result = await userService.getProfile();
        return result;
    } catch (error: any) {
        return {
            success: false,
            message: error.message || 'Failed to fetch profile',
            data: null,
        };
    }
}
