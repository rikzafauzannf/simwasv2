import { create } from 'zustand';

interface TeamMember {
  id: string;
  name: string;
}

interface TeamStore {
  teamMembers: TeamMember[];
  addTeamMember: (name: string) => void;
  removeTeamMember: (id: string) => void;
  clearTeamMembers: () => void;
}

export const useTeamStore = create<TeamStore>((set) => ({
  teamMembers: [],
  addTeamMember: (name: string) =>
    set((state) => ({
      teamMembers: [...state.teamMembers, { id: crypto.randomUUID(), name }],
    })),
  removeTeamMember: (id: string) =>
    set((state) => ({
      teamMembers: state.teamMembers.filter((member) => member.id !== id),
    })),
  clearTeamMembers: () => set({ teamMembers: [] }),
}));
