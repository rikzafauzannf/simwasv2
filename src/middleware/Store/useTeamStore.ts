import { create } from 'zustand';

interface TeamMember {
  id: number;
  name: string;
}

interface TeamStore {
  teamMembers: TeamMember[];
  addTeamMember: (member: TeamMember) => void;
  removeTeamMember: (index: number) => void;
  resetTeamMembers: () => void;
}

export const useTeamStore = create<TeamStore>((set) => ({
  teamMembers: [],
  addTeamMember: (member) =>
    set((state) => ({
      teamMembers: [...state.teamMembers, member],
    })),
  removeTeamMember: (index) =>
    set((state) => ({
      teamMembers: state.teamMembers.filter((_, i) => i !== index),
    })),
  resetTeamMembers: () => set({ teamMembers: [] }),
}));
