export interface FormUserManage {
  username: string;
  nip: string;
  no_whatsapp: string;
  jabatan: string;
  id_ruang_lingkup: string;
  role: string;
}

export type UserManageDB = {
  id_user: number;
  username: string;
  nip: string;
  no_whatsapp: string;
  jabatan: string;
  id_ruang_lingkup: string;
  role: string;
  created_at: string;
  otp: string;
  exp_otp: string;
};
