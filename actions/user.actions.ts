'use server';

import userService from '@/services/user.service';

// Server Action for Get Current User Profile
export async function getMeAction() {
    return await userService.getMe();
}




