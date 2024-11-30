export interface ChildItem {
  id?: number | string;
  name?: string;
  icon?: any;
  children?: ChildItem[];
  item?: any;
  url?: any;
  color?: string;
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: any;
  id?: number;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: any;
}

import { uniqueId } from 'lodash';

const SidebarContent: MenuItem[] = [
  {
    heading: 'Resume',
    children: [
      {
        name: 'Dashboard',
        icon: 'solar:widget-add-line-duotone',
        id: uniqueId(),
        url: '/',
      },
    ],
  },
  {
    heading: 'Referensi',
    children: [
      {
        name: 'Buat Data Referensi',
        icon: 'solar:add-circle-broken',
        id: uniqueId(),
        url: '/',
      },
    ],
  },
  {
    heading: 'Perencanaan',
    children: [
      // {
      //   name: 'Perencanaan',
      //   icon: 'solar:circle-bottom-up-broken',
      //   id: uniqueId(),
      //   url: '/perencanaan',
      // },
      {
        name: 'PKPT',
        icon: 'solar:folder-broken',
        id: uniqueId(),
        url: '/perencanaan/pkpt',
      },
    ],
  },
  {
    heading: 'Pelaksanaan',
    children: [
      {
        name: 'Surat Tugas',
        icon: 'solar:airbuds-case-charge-outline',
        id: uniqueId(),
        url: '/perencanaan/surattugas',
      },
      {
        name: 'Kendali Mutu',
        icon: 'solar:shield-user-outline',
        id: uniqueId(),
        url: '/pelaksanaan/kendalimutu',
      },
      {
        name: 'Nota Hasil Pengawasan',
        icon: 'solar:shield-user-outline',
        id: uniqueId(),
        url: '/pelaksanaan/notahasil',
      },
    ],
  },
  {
    heading: 'Pelaporan',
    children: [
      {
        name: 'Lembar Hasil Pengawasan',
        icon: 'solar:smile-circle-outline',
        id: uniqueId(),
        url: '/pelaporan/lembarhasil',
      },
      {
        name: 'Ringkasan Pengawasan',
        icon: 'solar:notes-minimalistic-outline',
        id: uniqueId(),
        url: '/pelaporan/ringkasanpengawasan',
      },
    ],
  },
  {
    heading: 'Tindak Lanjut',
    children: [
      {
        name: 'TLHP',
        icon: 'solar:folder-check-broken',
        id: uniqueId(),
        url: '/perencanaan/realisasipkpt',
      },
      {
        name: 'BAKTL',
        icon: 'solar:folder-check-broken',
        id: uniqueId(),
        url: '/perencanaan/realisasipkpt',
      },
      {
        name: 'Realisasi PKPT',
        icon: 'solar:folder-check-broken',
        id: uniqueId(),
        url: '/perencanaan/realisasipkpt',
      },
    ],
  },
  {
    heading: 'manage',
    children: [
      {
        name: 'User Account',
        icon: 'solar:smile-circle-outline',
        id: uniqueId(),
        url: '/usermanage',
      },
    ],
  },
];

export default SidebarContent;
