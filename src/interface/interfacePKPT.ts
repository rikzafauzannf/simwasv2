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
  id: number;
  active: boolean;
  anggaran: number;
  anggota_tim: number;
  area_pengawasan: string;
  createdAt: Date;
  pengendali_teknis: number;
  ketua_tim: number;
  id_user: number;
  jenis_pengawasan: string;
  jumlah: number;
  jumlah_laporan: string;
  keterangan: string;
  penanggung_jawab: number;
  rencana_penerbitan: string;
  rencana_penugasan: string;
  ruang_lingkup: string;
  sarana_prasarana: string;
  status: string;
  tim: TimData[];
  tingkat_risiko: string;
  tujuan_sasaran: string;
  wakil_penanggung_jawab: number;
};

export interface PKPTFormData {
  JenisPengawasan: number;
  AreaPengawasan: string;
  RuangLingkup: number;
  TujuanSasaran: string;
  RencanaPenugasan: string;
  RencanaPenerbitan: string;
  PenanggungJawab: number;
  WakilPenanggungJawab: number;
  Supervisor: number;
  KetuaTIM: number;
  ATim: number;
  Jumlah: number;
  Anggaran?: number;
  JumlahLaporan: number;
  SaranaDanPrasarana?: number;
  TingkatRisiko: number;
  Keterangan?: string;
  JenisLaporan: string;
}
