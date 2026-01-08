import axios from 'axios';
import { cookies } from 'next/headers';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Helper to determine if we are on the server
const isServer = typeof window === 'undefined';

/**
 * Request Interceptor
 * Industry Level Strategy:
 * - On Client: Use a 'Proxy' Server Action to avoid exposing tokens/cookies to JS.
 * - On Server: Directly read cookies using next/headers and attach to the request.
 */
axiosInstance.interceptors.request.use(
    async (config) => {
        // Skip adding token for login and register routes
        const isAuthRoute = config.url?.includes('/auth/login') || config.url?.includes('/auth/register');

        if (isServer && !isAuthRoute) {
            // Server-side: Get token from Secure HttpOnly cookies
            try {
                const cookieStore = await cookies();
                const token = cookieStore.get('access_token')?.value;
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            } catch (error) {
                console.error('Axios Server Interceptor Error:', error);
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
