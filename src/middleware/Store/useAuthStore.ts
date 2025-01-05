import { create } from 'zustand';

interface User {
  id_user: number;
  nip: string;
  role: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (data: { token: string; user: User }) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  let initialToken = null;
  let initialUser = null;

  if (typeof window !== 'undefined') {
    const storedData = JSON.parse(localStorage.getItem('user') || '{}');
    initialToken = storedData?.token || null;
    initialUser = storedData?.user || null;
  }

  return {
    token: initialToken,
    user: initialUser,
    setAuth: (data: { token: string; user: User }) => {
      localStorage.setItem('user', JSON.stringify(data));
      set({ token: data.token, user: data.user });
    },
    clearAuth: () => {
      localStorage.removeItem('user');
      set({ token: null, user: null });
    },
  };
});
