import { useEffect, useState, useCallback } from 'react';
import { AxiosService } from '@/services/axiosInstance.service';

const axiosService = new AxiosService();

export const useFetchById = <T>(collection: string, docId: number) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axiosService.getDataById(`${collection}/${docId}`);
      if (response.success) {
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
