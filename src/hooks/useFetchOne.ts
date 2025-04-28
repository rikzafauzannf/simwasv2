import { useEffect, useState, useCallback } from 'react';
import { AxiosService } from '@/services/axiosInstance.service';

const axiosService = new AxiosService();

export const useFetchOne = <T>(collection: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axiosService.getAllData(collection);
      console.log('Raw API Response:', response);

      if (response.success && response.data) {
        setData(response.data as T);
        setError(null);
      } else {
        setError(new Error(response.message || 'Unknown error'));
        setData(null);
      }
    } catch (err) {
      setError(err as Error);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [collection]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  };
};
