import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  user: { email: string } | null;
  login: (userData: { email: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (userData) => set({ isAuthenticated: true, user: userData }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));
