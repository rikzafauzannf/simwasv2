import { create } from 'zustand';

interface AuthToggleState {
  isLogin: boolean;
  toggleAuth: () => void;
}

const useAuthToggleStore = create<AuthToggleState>((set) => ({
  isLogin: true,
  toggleAuth: () => set((state) => ({ isLogin: !state.isLogin })),
}));

export default useAuthToggleStore;
