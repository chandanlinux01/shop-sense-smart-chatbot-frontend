'use server';

import authService from '@/services/auth.service';
import { cookies } from 'next/headers';
import { LoginRequest, LoginResponse, ForgotPasswordRequest, ChangePasswordRequest, ForgotPasswordResponse, ChangePasswordResponse } from '@/types/auth';
import { handleApiError } from '@/lib/handle-error';
import { ApiResponse } from '@/types/common';

// Server Action for Login: Uses AuthService for API logic and manages secure cookies.
export async function loginAction(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    try {
        // 1. Calling the API via AuthService
        const result = await authService.login(credentials);

        // 2. Save token in HttpOnly cookie 
        if (result.success && result.data.access_token) {
            const cookieStore = await cookies();

            cookieStore.set('access_token', result.data.access_token, {
                httpOnly: true, // JS cannot access this cookie
                secure: process.env.NODE_ENV === 'production', // Only send over HTTPS
                sameSite: 'lax', // Prevent CSRF attacks
                path: '/', // only accessible on path that starts with /
                maxAge: 60 * 60 * 24 * 7, // 1 week
            });
        }

        return result;
    } catch (error: any) {
        return {
            success: false,
            message: handleApiError(error),
            data: null as any,
        };
    }
}

// Server Action for Forgot Password
export async function forgotPasswordAction(data: ForgotPasswordRequest): Promise<ApiResponse<ForgotPasswordResponse>> {
    try {
        const result = await authService.forgotPassword(data);
        return result;
    } catch (error: any) {
        return {
            success: false,
            message: handleApiError(error),
            data: null as any,
        };
    }
}

// Server Action for Change Password
export async function changePasswordAction(data: ChangePasswordRequest): Promise<ApiResponse<ChangePasswordResponse>> {
    try {
        const result = await authService.changePassword(data);
        return result;
    } catch (error: any) {
        return {
            success: false,
            message: handleApiError(error),
            data: null as any,
        };
    }
}

// Server Action for Logout: Clears the secure cookie.
export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete('access_token');
    return { success: true };
}


