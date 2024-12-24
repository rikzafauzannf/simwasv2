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
  id_tingkat_resiko: number;
  tingkat_resiko: string;
};

export type KodeTemuanDB = {
  id_kode_temuan: number;
  kode_temuan: string;
  keterangan_kode: string;
};

export interface FormKodeTemuan {
  kode_temuan: string;
  keterangan_kode: string;
}

export type JenisAuditDB = {
  id_jenis_audit: number;
  jenis_audit: string;
  keterangan: string;
  created_at : string;
}

export interface FormJenisAudit {
  jenis_audit: string;
  keterangan: string;
}
