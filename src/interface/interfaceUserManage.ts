export interface FormUserManage {
  nama: string;
  nip: string;
  nomor_wa: string;
  jabatan: string;
  role: string;
}

export type UserManageDB = {
    id:number;
    nama: string;
    nip: string;
    nomor_wa: string;
    jabatan: string;
    role: string;
    kode_otp: string;
    exp_otp:string;
}
