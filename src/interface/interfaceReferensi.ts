export type JenisPengawasanDB = {
  id: number;
  jenis_pengawasan: string;
};

export type JenisLaporanDB = {
  id: number;
  jenis_laporan: string;
  // keterangan:string;
};

export type RuangLingkupDB = {
  id: number;
  ruang_lingkup: string;
};

export type TingkatResikoDB = {
  id: string;
  tingkat_resiko: string;
};

export type KodeTemuanDB = {
  id:number;
  kode_temuan:string;
  keterangan:string;
}
