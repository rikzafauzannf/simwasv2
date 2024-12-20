import { useFetchAll } from './useFetchAll';
import { RuangLingkupDB } from '@/interface/interfaceReferensi';

export const useGetNameRuangLingkup = () => {
  const {
    data: DataRuangLingkup,
    isLoading,
    error,
  } = useFetchAll<RuangLingkupDB>('ruang_lingkup');

  const getNameRuangLingkup = (id: number) => {
    const data = DataRuangLingkup.filter(
      (item) => item.id_ruang_lingkup === id
    );
    return data.length > 0 ? data[0].ruang_lingkup : '';
  };

  return { getNameRuangLingkup, isLoading, error };
};
