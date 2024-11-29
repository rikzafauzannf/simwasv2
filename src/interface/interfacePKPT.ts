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
}

type TimData = {
  id: string;
  name: string;
}

export type PKPTDataBase = {
  id:string;
  active: boolean;
  anggaran: number;
  anggota_tim: number;
  area_pengawasan: string;
  createdAt: Date;
  pengendali_teknis: string;
  ketua_tim: string;
  id_user: number;
  jenis_pengawasan: string;
  jumlah: number;
  jumlah_laporan: string;
  keterangan: string;
  penanggung_jawab: string;
  rencana_penerbitan: string;
  rencana_penugasan: string;
  ruang_lingkup: string;
  sarana_prasarana: string;
  status: string;
  tim: TimData[];
  tingkat_risiko: string;
  tujuan_sasaran: string;
  wakil_penanggung_jawab: string;
}
