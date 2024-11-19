export interface DataPKPT{
    id:string;
    area_pengawasan: string;
    jenis_pengawasan: string;
    ruang_lingkup: string;
    tujuan_sasaran: string;
    rencana_penugasan: string;
    rencana_penerbitan: string;
    penanggung_jawab: number;
    wakil_penanggung_jawab: number;
    supervisor:string;
    ketua_tim: string;
    anggota_tim: number;
    jumlah: number;
    tim: string[];
    anggaran: number;
    jumlah_laporan: number;
    sarana_prasarana: string;
    tingkat_risiko: string;
    keterangan: string;
    // data identiti
    id_user:number;
    createdAt: string;
    status: string;
    active:string;   
}