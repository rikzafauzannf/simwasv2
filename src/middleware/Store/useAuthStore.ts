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
  refreshAuth: () => Promise<boolean>;
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
    
    refreshAuth: async () => {
      try {
        // Check if we're on client-side
        if (typeof window === 'undefined') {
          return false;
        }
        
        // Get stored data from localStorage
        const storedData = JSON.parse(localStorage.getItem('user') || '{}');
        const storedToken = storedData?.token || null;
        const storedUser = storedData?.user || null;
        
        // Update state with localStorage data if available
        if (storedToken && storedUser) {
          set({ token: storedToken, user: storedUser });
          return true; // Successfully refreshed auth
        }
        
        return false; // No stored auth data found
      } catch (error) {
        console.error("Failed to refresh auth state:", error);
        return false;
      }
    }
  };
});