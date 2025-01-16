import { useFetchAll } from '@/hooks/useFetchAll';
import {
  JenisAuditDB,
  JenisLaporanDB,
  JenisPengawasanDB,
  RuangLingkupDB,
  TingkatResikoDB,
} from '@/interface/interfaceReferensi';
import { UserManageDB } from '@/interface/interfaceUserManage';

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

  return {
    optionsJenisLaporan,
    optionsJenisPengawasan,
    optionsTingkatRisiko,
    optionsRuangLingkup,
    potentialScopes,
    optionsDataUser,
    potentialMembers,
    optionsJenisAudit,
  };
};
