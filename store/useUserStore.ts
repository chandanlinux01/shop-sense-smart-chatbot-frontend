// store/useUserStore.ts
import { create } from 'zustand';
import { UserDetails } from '@/types/user';

interface UserState {
    user: UserDetails | null;
    setUser: (user: UserDetails) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));