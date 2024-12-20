export type JenisPengawasanDB = {
  id_jenis_pengawasan: number;
  jenis_pengawasan: string;
};

export type JenisLaporanDB = {
  id_jenis_laporan: number;
  jenis_laporan: string;
  keterangan: string;
  created_at: string;
  // keterangan:string;
};

export type RuangLingkupDB = {
  id_ruang_lingkup: number;
  ruang_lingkup: string;
  created_at: string;
};

export type TingkatResikoDB = {
  id_tingkat_resiko: string;
  tingkat_resiko: string;
};

export type KodeTemuanDB = {
  id: number;
  kode_temuan: string;
  keterangan: string;
};
