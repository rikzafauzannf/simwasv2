export interface FormKendaliMutu {
  id_st: number;
  id_user: number;
  id_no_tg: string;
  kartu_penugasan: boolean;
  kertas_kerja_pengawasan: boolean;
  ceklis_penyelesaian: boolean;
  program_kerja_pengawasan: boolean;
  dokumentasi_pemeriksaan: boolean;
  notulensi_kesepakatan: boolean;
  reviu_supervisi: boolean;
  link_google_drive: string;
}

export interface KendaliMutuData {
  id: number;
  id_st: number;
  id_user: number;
  id_no_tg: string;
  kartu_penugasan: boolean;
  kertas_kerja_pengawasan: boolean;
  ceklis_penyelesaian: boolean;
  program_kerja_pengawasan: boolean;
  dokumentasi_pemeriksaan: boolean;
  notulensi_kesepakatan: boolean;
  reviu_supervisi: boolean;
  link_google_drive: string;
}

export type LaporanMingguan = {
  id: number;
  id_user: string;
  id_st: number;
  id_no: string;
  laporan_mingguan: string;
};
