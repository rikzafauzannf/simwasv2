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
        url: '/dashboard/',
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
        url: '/dashboard/datareferensi',
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
      //   url: '/dashboard/perencanaan',
      // },
      {
        name: 'PKPT',
        icon: 'solar:folder-broken',
        id: uniqueId(),
        url: '/dashboard/perencanaan/pkpt',
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
        url: '/dashboard/perencanaan/surattugas',
      },
      {
        name: 'Kendali Mutu',
        icon: 'solar:shield-user-outline',
        id: uniqueId(),
        url: '/dashboard/pelaksanaan/kendalimutu',
      },
      {
        name: 'Nota Hasil Pengawasan',
        icon: 'solar:shield-user-outline',
        id: uniqueId(),
        url: '/dashboard/pelaksanaan/notahasil',
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
        url: '/dashboard/pelaporan/lembarhasil',
      },
      {
        name: 'Ringkasan Pengawasan',
        icon: 'solar:notes-minimalistic-outline',
        id: uniqueId(),
        url: '/dashboard/pelaporan/ringkasanpengawasan',
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
        url: '/dashboard/perencanaan/realisasipkpt',
      },
      {
        name: 'BAKTL',
        icon: 'solar:folder-check-broken',
        id: uniqueId(),
        url: '/dashboard/perencanaan/realisasipkpt',
      },
      {
        name: 'Realisasi PKPT',
        icon: 'solar:folder-check-broken',
        id: uniqueId(),
        url: '/dashboard/perencanaan/realisasipkpt',
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
        url: '/dashboard/usermanage',
      },
    ],
  },
];

export default SidebarContent;
