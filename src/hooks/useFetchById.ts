import { useEffect, useState, useCallback } from 'react';
import { FirestoreService } from '@/services/firestore.service';
import { AxiosService } from '@/services/axiosInstance.service';

const firestoreService = new FirestoreService();
const axiosService = new AxiosService();

export const useFetchById = <T>(collection: string, docId: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axiosService.getDataById(`${collection}/${docId}`);
      if (response.success && Array.isArray(response.data)) {
        setData(response.data as T);
        setError(null);
      } else {
        setError(new Error(response.message));
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [collection, docId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
};
