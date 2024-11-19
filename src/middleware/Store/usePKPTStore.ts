import { create } from 'zustand';
import { DataPKPT } from '@/middleware/interface/perencanaanPKPT';
import { FirestoreService } from '@/services/firestore.service';

interface PKPTStore {
  pkptData: DataPKPT[];
  fetchPKPTData: () => Promise<void>;
}

export const usePKPTStore = create<PKPTStore>((set) => ({
  pkptData: [],
  fetchPKPTData: async () => {
    const firestoreService = new FirestoreService();
    const response = await firestoreService.getAllData('pkpt');
    
    if (response.success) {
      set({ pkptData: response.data as DataPKPT[] });
    } else {
      console.error('Error fetching data:', response.error);      
    }
  },
}));