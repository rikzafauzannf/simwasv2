import { useEffect, useState } from 'react';
import { FirestoreService } from '@/services/firestore.service';
import { WhereFilterOp } from 'firebase/firestore';

const firestoreService = new FirestoreService();

export const useFetchByField = <T>(
  collection: string,
  fieldName: string,
  operator: WhereFilterOp,
  value: any
) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await firestoreService.getDataByField(
          collection,
          fieldName,
          operator,
          value
        );
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
  }, [collection, fieldName, operator, value]);

  return { data, isLoading, error };
};
