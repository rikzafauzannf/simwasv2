export type TindakLanjutDB = {
  id_tindak_lanjut: number;
  id_tlhp: number;
  uraian: string;
  nilai_setor: string;
  kondisi_temuan: string;
  kondisi_rekomendasi: string;
  sisa_nominal: number;
  tanggal_pengiriman: string;
  batas_akhit_tl: string;
  keterangan: string;
  id_user: number;
  created_at: string;
};

export interface FormTindakLanjut {
  id_tlhp: number;
  uraian: string;
  nilai_setor: string;
  kondisi_temuan: string;
  kondisi_rekomendasi: string;
  sisa_nominal: number;
  tanggal_pengiriman: string;
  batas_akhit_tl: string;
  keterangan: string;
  id_user: number;
}
