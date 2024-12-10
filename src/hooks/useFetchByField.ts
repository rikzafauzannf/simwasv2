import { useEffect, useState, useCallback } from 'react';
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

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await firestoreService.getDataByField(
        collection,
        fieldName,
        operator,
        value
      );
      if (response.success && Array.isArray(response.data)) {
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
  }, [collection, fieldName, operator, value]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
};
