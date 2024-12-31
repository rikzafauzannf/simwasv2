import { create } from 'zustand';

interface User {
  id_user: number;
  nip: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (data: { token: string; user: User }) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // Initial state membaca dari localStorage
  token: JSON.parse(localStorage.getItem('user') || '{}')?.token || null,
  user: JSON.parse(localStorage.getItem('user') || '{}')?.user || null,
  
  // Fungsi untuk mengatur data auth
  setAuth: (data: { token: string; user: User }) => {
    localStorage.setItem('user', JSON.stringify(data));
    set({ token: data.token, user: data.user });
  },

  // Fungsi untuk menghapus data auth
  clearAuth: () => {
    localStorage.removeItem('user');
    set({ token: null, user: null });
  },
}));
