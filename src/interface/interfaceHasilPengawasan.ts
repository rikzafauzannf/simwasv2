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
  id_st: number;
  file_lhp: string;
  id_user: number;  
  keterangan_lhp: string;
  id_nhp: number;
}

export type LHPData ={
  id_lhp:number;
  id_st: number;
  file_lhp: string;
  id_user: number;  
  keterangan_lhp: string;
  id_nhp: number;
  created_at: string;
}
