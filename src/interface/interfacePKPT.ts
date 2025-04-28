export type PKPTData = {
  id: string;
  Status: string;
  JenisPengawasan: string;
  AreaPengawasan: string;
  RuangLingkup: string;
  Tujuan: string;
  RencanaPenugasan: string;
  RencanaPenerbitan: string;
  PenanggungJawab: string;
  WakilPenanggungJawab: string;
  PengendaliTeknis: string;
  KetuaTIM: string;
  TIM: {
    id: number;
    name: string;
  };
  Jumlah: number;
  Anggaran: number;
  JumlahLaporan: string;
  Saran: string;
  TingkatRisiko: string;
  Keterangan: string;
};

type TimData = {
  id: string;
  name: string;
};

export type PKPTDataBase = {
  id_pkpt: number;
  id_jenis_pengawasan: number;
  tujuan_sasaran: string;
  area_pengawasan: string;
  id_ruang_lingkup: any;
  rmp_pkpt: string;
  rpl_pkpt: string;
  penanggung_jawab: string;
  wakil_penanggung_jawab: string;
  pengendali_teknis: string;
  ketua_tim: string;
  anggota_tim: string;
  nama_penanggung_jawab: string;
  nama_wakil_penanggung_jawab: string;
  nama_pengendali_teknis: string;
  nama_ketua_tim: string;
  nama_anggota_tim: string;
  tim: string;
  jumlah: number;
  anggaran: string;
  jumlah_laporan: number;
  id_jenis_laporan: number;
  sarana_prasarana: string;
  id_tingkat_resiko: number;
  keterangan: string;
  status: string;
  id_user: number;
  created_at: string;
};

export interface PKPTFormData {
  id_jenis_pengawasan: number;
  tujuan_sasaran: string;
  area_pengawasan: string;
  id_ruang_lingkup: string;
  rmp_pkpt: string;
  rpl_pkpt: string;
  penanggung_jawab: string;
  wakil_penanggung_jawab: string;
  pengendali_teknis: string;
  ketua_tim: string;
  anggota_tim: string;
  nama_penanggung_jawab: string;
  nama_wakil_penanggung_jawab: string;
  nama_pengendali_teknis: string;
  nama_ketua_tim: string;
  nama_anggota_tim: string;
  tim: string;
  jumlah: number;
  anggaran: string;
  jumlah_laporan: number;
  id_jenis_laporan: number;
  sarana_prasarana: string;
  id_tingkat_resiko: number;
  keterangan: string;
  status: string;
  id_user: number;
}
