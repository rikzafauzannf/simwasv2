import { db } from '@/middleware/db/firestore';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  WhereFilterOp,
} from 'firebase/firestore';

export class FirestoreService {
  // Menambah data ke collection
  async addData(collectionName: string, data: any) {
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      return {
        success: true,
        id: docRef.id,
        message: 'Data berhasil ditambahkan',
      };
    } catch (error) {
      return {
        success: false,
        error: error,
        message: 'Gagal menambahkan data',
      };
    }
  }

  // Mengambil semua data dari collection
  async getAllData(collectionName: string) {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return {
        success: true,
        data: data,
        message: 'Data berhasil diambil'
      };
    } catch (error) {
      return {
        success: false,
        error: error,
        message: 'Gagal mengambil data',
      };
    }
  }

  // Update data
  async updateData(collectionName: string, docId: string, data: any) {
    try {
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, data);
      return {
        success: true,
        message: 'Data berhasil diupdate',
      };
    } catch (error) {
      return {
        success: false,
        error: error,
        message: 'Gagal mengupdate data',
      };
    }
  }

  // Hapus data
  async deleteData(collectionName: string, docId: string) {
    try {
      await deleteDoc(doc(db, collectionName, docId));
      return {
        success: true,
        message: 'Data berhasil dihapus',
      };
    } catch (error) {
      return {
        success: false,
        error: error,
        message: 'Gagal menghapus data',
      };
    }
  }

  // Mengambil data spesifik berdasarkan ID
  async getDataById(collectionName: string, docId: string) {
    try {
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          success: true,
          data: {
            id: docSnap.id,
            ...docSnap.data(),
          },
        };
      } else {
        return {
          success: false,
          message: 'Data tidak ditemukan',
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error,
        message: 'Gagal mengambil data',
      };
    }
  }

  // Mengambil data berdasarkan field tertentu
  async getDataByField(
    collectionName: string,
    fieldName: string,
    operator: WhereFilterOp,
    value: any
  ) {
    try {
      const collectionRef = collection(db, collectionName);
      const q = query(collectionRef, where(fieldName, operator, value));
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return {
        success: true,
        data: data,
        total: data.length,
      };
    } catch (error) {
      return {
        success: false,
        error: error,
        message: 'Gagal mengambil data',
      };
    }
  }
}
