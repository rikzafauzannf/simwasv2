import { create } from 'zustand';

interface TeamMember {
  id: string;
  name: string;
}

interface TeamStore {
  teamMembers: TeamMember[];
  addTeamMember: (name: string) => void;
  removeTeamMember: (id: string) => void;
  resetTeamMembers: () => void;
}

export const useTeamStore = create<TeamStore>((set) => ({
  teamMembers: [],
  addTeamMember: (name) =>
    set((state) => ({
      teamMembers: [...state.teamMembers, { id: Date.now().toString(), name }],
    })),
  removeTeamMember: (id) =>
    set((state) => ({
      teamMembers: state.teamMembers.filter((member) => member.id !== id),
    })),
  resetTeamMembers: () => set({ teamMembers: [] }),
}));
