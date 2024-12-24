import { AxiosService } from '@/services/axiosInstance.service';
import { useCallback, useEffect, useState } from 'react';

const axiosService = new AxiosService();

export const useFetchById = <T>(collection: string, id: number) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axiosService.getDataById(collection, id);
      console.log('Raw API Response:', response);
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
  }, [collection, id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
};
