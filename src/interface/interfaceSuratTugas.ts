export type SuratTugasData = {
  id_st: number;
  id_pkpt: number;
  bulan: string;
  program_audit: string;
  no_tglsp: string;
  waktu_penugasan: string;
  tim_pemeriksa: string;
  wk_penanggung_jawab: string;
  pengendali_teknis: string;
  ketua_tim: string;
  anggota_tim: string;
  jumlah_objek: number;
  jumlah_laporan: number;
  no_tgllh: string;
  id_jenis_audit: number;
  keterangan: string;
  link_st: string;
  id_user: number;
  created_at: string;
};

export interface FormSuratTugas {
  id_pkpt: number;
  bulan: string;
  program_audit: string;
  no_tglsp: string;
  waktu_penugasan: string;
  tim_pemeriksa: string;
  wk_penanggung_jawab: string;
  pengendali_teknis: string;
  ketua_tim: string;
  anggota_tim: string;
  jumlah_objek: number;
  jumlah_laporan: number;
  no_tgllh: string;
  id_jenis_audit: number;
  keterangan: string;
  link_st: string;
  id_user: number;
}
