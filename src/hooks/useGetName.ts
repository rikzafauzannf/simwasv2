import { UserManageDB } from '@/interface/interfaceUserManage';
import { useFetchAll } from './useFetchAll';
import {
  JenisAuditDB,
  JenisLaporanDB,
  JenisPengawasanDB,
  KodeReferensiData,
  KodeRekomendasiData,
  KodeTemuanDB,
  RuangLingkupDB,
  TingkatResikoDB,
} from '@/interface/interfaceReferensi';
import { SuratTugasData } from '@/interface/interfaceSuratTugas';
import { LHPData } from '@/interface/interfaceHasilPengawasan';
import { PKPTData, PKPTDataBase } from '@/interface/interfacePKPT';
import { TemuanHasilData } from '@/interface/interfaceTemuanHasil';

// ======Ruang Lingkup======
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

// ======LHP======
export const useGetNameLHP = () => {
  const {
    data: DataRuangLingkup,
    isLoading,
    error,
  } = useFetchAll<LHPData>('lhp');

  const getNomorLHP = (id: number) => {
    const data = DataRuangLingkup.filter((item) => item.id_lhp === id);
    return data.length > 0 ? data[0].no_lhp : '';
  };

  const getUraianLHP = (id: number) => {
    const data = DataRuangLingkup.filter((item) => item.id_lhp === id);
    return data.length > 0 ? data[0].keterangan_lhp : '';
  };

  const getSTLHP = (id: number) => {
    const data = DataRuangLingkup.filter((item) => item.id_lhp === id);
    return data.length > 0 ? data[0].id_st : '';
  };

  return { getNomorLHP, getUraianLHP, getSTLHP, isLoading, error };
};

// ======User (Pengguna)======
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

  const getUserNIP = (id: number) => {
    const data = DataPengguna.filter((item) => item.id_user === id);
    return data.length > 0 ? data[0].nip : '';
  };

  return { getNameUser, getUserPhone, getUserNIP, isLoading, error };
};

// ======Jenis Pengawasan======
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

// ======Jenis Laporan======
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

// ======Tingkat Resiko======
export const useGetNameTingkatResiko = () => {
  const {
    data: DataTingkatResiko,
    isLoading,
    error,
  } = useFetchAll<TingkatResikoDB>('tingkat_resiko');

  const getNameTingkatResiko = (id: number) => {
    const data = DataTingkatResiko.filter(
      (item) => item.id_tingkat_resiko === id
    );
    return data.length > 0 ? data[0].tingkat_resiko : '';
  };

  return { getNameTingkatResiko, isLoading, error };
};

// ======Surat Tugas======
export const useGetNameST = () => {
  const {
    data: DataST,
    isLoading,
    error,
  } = useFetchAll<SuratTugasData>('surat_tugas');

  const getNameNoSP = (id: number) => {
    const data = DataST.filter((item) => item.id_st === id);
    return data.length > 0 ? data[0].no_tglsp : '';
  };

  const getProgramAudit = (id: number) => {
    const data = DataST.filter((item) => item.id_st === id);
    return data.length > 0 ? data[0].program_audit : '';
  };

  return { getNameNoSP, getProgramAudit, isLoading, error };
};

// ======Jenis Audit======
export const useGetNameJenisAudit = () => {
  const {
    data: DataJenisAudit,
    isLoading,
    error,
  } = useFetchAll<JenisAuditDB>('jenis_audit');

  const getNameJenisAudit = (id: number) => {
    const data = DataJenisAudit.filter((item) => item.id_jenis_audit === id);
    return data.length > 0 ? data[0].jenis_audit : '';
  };

  return { getNameJenisAudit, isLoading, error };
};

// ======PKPT======
export const useGetNamePKPT = () => {
  const {
    data: DataPKPT,
    isLoading,
    error,
  } = useFetchAll<PKPTDataBase>('pkpt');

  const getNameAreaPengawasan = (id: number) => {
    const data = DataPKPT.filter((item) => item.id_pkpt === id);
    return data.length > 0 ? data[0].area_pengawasan : '';
  };

  const getNameStatusPKPT = (id: number) => {
    const data = DataPKPT.filter((item) => item.id_pkpt === id);
    return data.length > 0 ? data[0].status : '';
  };

  return { getNameAreaPengawasan, getNameStatusPKPT, isLoading, error };
};

// ======Kode Rekomendasi======
export const useGetNameKode = () => {
  const { data: DataKodeRekomendasi } =
    useFetchAll<KodeRekomendasiData>('kode_rekomendasi');

  const { data: DataKodeReferensi } =
    useFetchAll<KodeReferensiData>('kode_referensi');

  const { data: DataKodeTemuan } = useFetchAll<KodeTemuanDB>('kode_temuan');

  const getNameKodeRekomendasi = (id: number) => {
    const data = DataKodeRekomendasi.filter(
      (item) => item.id_kode_rekomendasi === id
    );
    return data.length > 0 ? data[0].kode_rekomendasi : '';
  };

  const getFieldKodeRekomendasi = (id: number) => {
    const data = DataKodeRekomendasi.filter(
      (item) => item.id_kode_rekomendasi === id
    );
    return data.length > 0 ? data[0].keterangan_kode : '';
  };

  const getNameKodeReferensi = (id: number) => {
    const data = DataKodeReferensi.filter(
      (item) => item.id_kode_referensi === id
    );
    return data.length > 0 ? data[0].kode_referensi : '';
  };

  const getFieldKodeReferensi = (id: number) => {
    const data = DataKodeReferensi.filter(
      (item) => item.id_kode_referensi === id
    );
    return data.length > 0 ? data[0].keterangan_kode : '';
  };

  const getNameKodeTemuan = (id: number) => {
    const data = DataKodeTemuan.filter((item) => item.id_kode_temuan === id);
    return data.length > 0 ? data[0].kode_temuan : '';
  };
  const getFieldKodeTemuan = (id: number) => {
    const data = DataKodeTemuan.filter((item) => item.id_kode_temuan === id);
    return data.length > 0 ? data[0].keterangan_kode : '';
  };

  return {
    getNameKodeRekomendasi,
    getNameKodeReferensi,
    getNameKodeTemuan,
    getFieldKodeRekomendasi,
    getFieldKodeReferensi,
    getFieldKodeTemuan,
  };
};

// ======TLHP Temuan Hasil======
export const useGetNameTemuanHasil = () => {
  const {
    data: DataTemuanHasil,
    isLoading,
    error,
  } = useFetchAll<TemuanHasilData>('temuan_hasil');

  const getNameKondisiTemuan = (id: number) => {
    const data = DataTemuanHasil.filter((item) => item.id_tlhp === id);
    return data.length > 0 ? data[0].kondisi_temuan : '';
  };

  const getUraianTemuan = (id: number) => {
    const data = DataTemuanHasil.filter((item) => item.id_tlhp === id);
    return data.length > 0 ? data[0].uraian : '';
  };

  const getiIdSTTemuan = (id: number) => {
    const data = DataTemuanHasil.filter((item) => item.id_tlhp === id);
    return data.length > 0 ? data[0].id_st : null;
  };

  return {
    getNameKondisiTemuan,
    getUraianTemuan,
    getiIdSTTemuan,
    isLoading,
    error,
  };
};
