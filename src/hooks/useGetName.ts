import { UserManageDB } from '@/interface/interfaceUserManage';
import { useFetchAll } from './useFetchAll';
import {
  JenisLaporanDB,
  JenisPengawasanDB,
  RuangLingkupDB,
} from '@/interface/interfaceReferensi';

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

export const useGetNameUser = () => {
  const {
    data: DataPengguna,
    isLoading,
    error,
  } = useFetchAll<UserManageDB>('pengguna');

  const getNameUser = (id: number) => {
    const data = DataPengguna.filter((item) => item.id_user === id);
    return data.length > 0 ? data[0].username : '';
  };

  const getUserPhone = (id: number) => {
    const data = DataPengguna.filter((item) => item.id_user === id);
    return data.length > 0 ? data[0].no_whatsapp : '';
  };

  return { getNameUser, getUserPhone, isLoading, error };
};

export const useGetNameJenisPengawasan = () => {
  const {
    data: DataJenisPengawasan,
    isLoading,
    error,
  } = useFetchAll<JenisPengawasanDB>('jenis_pengawasan');

  const getNameJenisPengawasan = (id: number) => {
    const data = DataJenisPengawasan.filter(
      (item) => item.id_jenis_pengawasan === id
    );
    return data.length > 0 ? data[0].jenis_pengawasan : '';
  };

  return { getNameJenisPengawasan, isLoading, error };
};

export const useGetNameJenisLaporan = () => {
  const {
    data: DataJenisLaporan,
    isLoading,
    error,
  } = useFetchAll<JenisLaporanDB>('jenis_laporan');

  const getNameJenisLaporan = (id: number) => {
    const data = DataJenisLaporan.filter(
      (item) => item.id_jenis_laporan === id
    );
    return data.length > 0 ? data[0].jenis_laporan : '';
  };

  return { getNameJenisLaporan, isLoading, error };
};
