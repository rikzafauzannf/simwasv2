import { useEffect, useState, useCallback } from 'react';
import { AxiosService } from '@/services/axiosInstance.service';

const axiosService = new AxiosService();
export const useFetchAll = <T>(collection: string) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axiosService.getAllData(collection);
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
  }, [collection]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
};
