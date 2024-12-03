import { useEffect, useState } from 'react';
import { FirestoreService } from '@/services/firestore.service';

const firestoreService = new FirestoreService();

export const useFetch = <T>(collection: string) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await firestoreService.getAllData(collection);
        if (response.success && response.data) {
          setData(response.data as T[]);
          setError(null);
        } else {
          setError(new Error(response.message));
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [collection]);

  return { data, isLoading, error };
};
