import { create } from 'zustand';

interface Scope {
  id: number; // Store the ID
  name: string; // Store the name
}

interface ScopeStore {
  scopes: Scope[]; // Store an array of Scope objects
  addScope: (scope: Scope) => void; // Accept a Scope object
  removeScope: (index: number) => void;
  resetScopes: () => void;
  setScopes: (scopes: Scope[]) => void; // Add this line
}

export const useScopeStore = create<ScopeStore>((set) => ({
  scopes: [],
  addScope: (scope) =>
    set((state) => ({
      scopes: [...state.scopes, scope], // Add the scope object
    })),
  removeScope: (index) =>
    set((state) => ({
      scopes: state.scopes.filter((_, i) => i !== index),
    })),
  resetScopes: () => set({ scopes: [] }),
  setScopes: (scopes) => set({ scopes }), // Implement setScopes
}));