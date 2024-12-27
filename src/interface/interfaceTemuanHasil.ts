export type TemuanHasilData = {
    id_tlhp: number;
    id_st: number;
    uraian: string;
    kondisi_temuan: string;
    id_kode_temuan: number;
    rekomendasi_saran: string;
    nilai_rekomendasi: string;
    id_kode_rekomendasi: number;
    link_google_drive: string;
    id_kode_referensi: number;
    id_user: number;
    created_at: string;
}

export interface FormTemuanHasil {
    id_st: number;
    uraian: string;
    kondisi_temuan: string;
    id_kode_temuan: number;
    rekomendasi_saran: string;
    nilai_rekomendasi: string;
    id_kode_rekomendasi: number;
    link_google_drive: string;
    id_kode_referensi: number;
    id_user: number;
}