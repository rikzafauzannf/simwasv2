export interface FormNHP {
  id_st: number;
  file_nhp: string;
  id_user: number;
  keterangan_nhp: string;
}

export type NHPData = {
  id_nhp: number;
  id_st: number;
  file_nhp: string;
  id_user: number;
  keterangan_nhp: string;
  created_at: string;
};

export interface FormLHP {
  id_pkpt: number;
  id_no: string;
  link_lhp: string;
  keterangan_lhp: string;
}
