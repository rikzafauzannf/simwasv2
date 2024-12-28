export type TemuanHasilData = {
  id_tlhp: number;
  id_st: number;
  uraian: string;
  kondisi_temuan: string;
  rekomendasi_saran: string;
  nilai_rekomendasi: number;
  id_kode_rekomendasi: number;
  id_kode_referensi: number;
  id_kode_temuan: number;
  id_user: number;
  created_at: string;
};

export interface FormTemuanHasil {
  id_st: number;
  uraian: string;
  kondisi_temuan: string;
  rekomendasi_saran: string;
  nilai_rekomendasi: number;
  id_kode_rekomendasi: number;
  id_kode_referensi: number;
  id_kode_temuan: number;
  id_user: number;
}
