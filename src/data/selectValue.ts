import { useFetchAll } from '@/hooks/useFetchAll';
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
import { UserManageDB } from '@/interface/interfaceUserManage';
import { useAuthStore } from '@/middleware/Store/useAuthStore';

export const useOptions = () => {
  const { data: DataJenisLaporan = [] } =
    useFetchAll<JenisLaporanDB>('jenis_laporan');
  const { data: DataPengawasan = [] } =
    useFetchAll<JenisPengawasanDB>('jenis_pengawasan');
  const { data: DataTingkatRisiko = [] } =
    useFetchAll<TingkatResikoDB>('tingkat_resiko');
  const { data: DataRuangLingkup = [] } =
    useFetchAll<RuangLingkupDB>('ruang_lingkup');
  const { data: DataUser = [] } = useFetchAll<UserManageDB>('pengguna');
  const { data: DataJenisAudit = [] } =
    useFetchAll<JenisAuditDB>('jenis_audit');
  const { data: DataKodeTemuan } = useFetchAll<KodeTemuanDB>('kode_temuan');
  const { data: DataKodeRekomendasi } =
    useFetchAll<KodeRekomendasiData>('kode_rekomendasi');
  const { data: DataKodeReferensi } =
    useFetchAll<KodeReferensiData>('kode_referensi');

  const {user} = useAuthStore()
  
  const optionsJenisLaporan = DataJenisLaporan.map((item) => ({
    value: String(item.id_jenis_laporan),
    label: `${item.jenis_laporan} - ${item.keterangan}`,
  }));

  const optionsJenisPengawasan = DataPengawasan.map((item) => ({
    value: String(item.id_jenis_pengawasan),
    label: item.jenis_pengawasan,
  }));

  const optionsTingkatRisiko = DataTingkatRisiko.map((item) => ({
    value: String(item.id_tingkat_resiko),
    label: item.tingkat_resiko,
  }));

  const optionsRuangLingkup = DataRuangLingkup.map((item) => ({
    value: String(item.id_ruang_lingkup),
    label: item.ruang_lingkup,
  }));

  const potentialScopes = DataRuangLingkup.map((item) => ({
    id: item.id_ruang_lingkup,
    name: item.ruang_lingkup,
  }));

  const optionsDataUser = DataUser.filter((item) => item.role !== 'Admin').map(
    (item) => ({
      value: String(item.id_user),
      label: `${item.username} - ${item.jabatan}`,
    })
  );

  const potentialMembers = DataUser.filter((item) => item.role !== 'Admin').map(
    (item) => ({
      id: item.id_user,
      name: `${item.username} - ${item.jabatan}`,
    })
  );

  const optionsJenisAudit = DataJenisAudit.map((item) => ({
    value: String(item.id_jenis_audit),
    label: `${item.jenis_audit} - ${item.keterangan}`,
  }));

  const optionKodeTemuan = DataKodeTemuan.map((item) => ({
    value: String(item.id_kode_temuan),
    label: `${item.kode_temuan} - ${item.keterangan_kode}`,
  }));

  const optionKodeRekomendasi = DataKodeRekomendasi.map((item) => ({
    value: String(item.id_kode_rekomendasi),
    label: `${item.kode_rekomendasi} - ${item.keterangan_kode}`,
  }));

  const optionKodeReferensi = DataKodeReferensi.map((item) => ({
    value: String(item.id_kode_referensi),
    label: `${item.kode_referensi} - ${item.keterangan_kode}`,
  }));

// note
// Role (be)
// 1. Admin
// - referensi
// - Dashboard
// - user management
// 2. Pimpinan
// - bisa melihat semua fitur tetapi hanya melihat saja
// - Referensi nggak perlu
//
// 3. PEP (perencana evaluasi & pelaporan)
// - pkpt
// - Ringkasan hasil
// - Tindak lanjut
// - Ringkasan Hasil
// - LHP
// - temuan hasil
// - Realisasi pkpt
// 4. JFA/PPUPD (Auditor / pelaksana) = hanya dapat melihat di tim saja
// - pkpt,
// - ST, 
// - kendali mutu, 
// - nhp,
// - lhp 
// - ringkasan hasil, 
// - tindak lanjut
// - Rekap temuan
// - Realisasi pkpt
// 5. OPD/Auditi
// - Rekapan Tindak Lanjut Berdasarkan Ruang Lingkup

  const optionsRole = [
    {
      value: 'Admin',
      label: 'Admin',
    },
    {
      value: 'Pimpinan',
      label: 'Pimpinan',
    },
    // {
    //   value: 'Perencana',
    //   label: 'Perencana',
    // },
    // {
    //   value: 'Pelaksana',
    //   label: 'Pelaksana',
    // },
    // {
    //   value: 'Auditor',
    //   label: 'Auditor',
    // },
    // { 
    //   value: 'Developer',
    //   label: 'Developer',
    // },
    {
      value: 'PEP',
      label: 'PEP (perencana evaluasi & pelaporan)',
    },
    {
      value: 'JFA',
      label: 'JFA/PPUPD (Auditor / pelaksana)',
    },
    {
      value: 'OPD',
      label: 'OPD/Auditi',
    },
  ];

  if (user?.role === 'Admin' || user?.role === 'Developer') {
    optionsRole.push({
      value: 'Developer',
      label: 'Developer',
    });
  }

  const OptionsStatusTL = [
    {
      value: 'sesuai',
      label: 'Sesuai',
    },
    {
      value: 'dalam proses',
      label: 'Dalam Proses',
    },
    {
      value: 'belum ditindak lanjut',
      label: 'Belum Ditindak Lanjut',
    },
    {
      value: 'tidak dapat ditindak lanjut',
      label: 'Tidak Dapat Ditindak Lanjut',
    },
  ];

  return {
    optionsJenisLaporan,
    optionsJenisPengawasan,
    optionsTingkatRisiko,
    optionsRuangLingkup,
    potentialScopes,
    optionsDataUser,
    potentialMembers,
    optionsJenisAudit,
    optionKodeTemuan,
    optionKodeReferensi,
    optionKodeRekomendasi,
    optionsRole,
    OptionsStatusTL,
  };
};
