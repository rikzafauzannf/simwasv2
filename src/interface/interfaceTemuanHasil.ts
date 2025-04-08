export type TemuanHasilData = {
  id_tlhp: number;
  id_st: number;
  uraian: string;
  kondisi_temuan: string;
  id_kode_temuan: number;
  id_user: number;
  created_at: string;
};

export interface FormTemuanHasil {
  id_st: number;
  uraian: string;
  kondisi_temuan: string;
  id_kode_temuan: number;
  id_user: number;
}

export type RekomendasiData = {
  id_rekomendasi: number;
  id_tlhp: number;
  id_kode_rekomendasi: number;
  rekomendasi_saran: string;
  rekomendasi_nilai: number;
  id_user: number;
  created: string;
};

export interface FormRekomendasiTemuan {
  id_tlhp: number;
  id_kode_rekomendasi: number;
  rekomendasi_saran: string;
  rekomendasi_nilai: number;
  id_user: number;
}
