export type RekapTemuanDB = {
  id_rekap_temuan: number;
  id_tlhp: number;
  jumlah_kejadian: number;
  persentase: number;
  nilai_rp: number;
  id_user: number;
  created_at: string;
};

export interface FormRekapTemuan {
  id_tlhp: number;
  jumlah_kejadian: number;
  persentase: number;
  nilai_rp: number;
  id_user: number;
}
