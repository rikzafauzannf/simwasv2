export interface FormKendaliMutu {
  kartuPenugasan: boolean;
  programKerja: boolean;
  notulensiKesepakatan: boolean;
  kertasKerja: boolean;
  dokumentasiPemeriksaan: boolean;
  reviuSupervisi: boolean;
  ceklisPenyelesaian: boolean;
  linkGDrive: string;
  laporan: string;
}

export interface KendaliMutuData {
  id?: number;
  kertasKerja: string;
  kartuPenugasan: string;
  programKerja: string;
  notulensiKesepakatan: string;
  dokumentasiPemeriksaan: string;
  riviuSupervisor: string;
  ceklisPenyelesaian: string;
  linkDrive: string;
  keterangan: string;
}

export type LaporanMingguan = {
  id: number;
  id_pkpt: number;
  id_no: string;
  laporan_mingguan: string;
};
