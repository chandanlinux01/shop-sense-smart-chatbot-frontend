// store/useUserStore.ts
import { create } from 'zustand';
import { userDetails } from '@/types/user';

interface UserState {
    user: userDetails | null;
    setUser: (user: userDetails) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));