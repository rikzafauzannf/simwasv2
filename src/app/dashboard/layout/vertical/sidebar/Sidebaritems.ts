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
        icon: 'solar:home-smile-angle-line-duotone',
        id: uniqueId(),
        url: '/dashboard',
      },
    ],
  },
  {
    heading: 'Referensi',
    children: [
      {
        name: 'Buat Data Referensi',
        icon: 'solar:shield-plus-line-duotone',
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
        icon: 'solar:book-minimalistic-line-duotone',
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
        icon: 'solar:file-send-line-duotone',
        id: uniqueId(),
        url: '/dashboard/perencanaan/surattugas',
      },
      {
        name: 'Kendali Mutu',
        icon: 'solar:checklist-minimalistic-line-duotone',
        id: uniqueId(),
        url: '/dashboard/pelaksanaan/kendalimutu',
      },
      {
        name: 'Nota Hasil',
        icon: 'solar:move-to-folder-line-duotone',
        id: uniqueId(),
        url: '/dashboard/pelaksanaan/notahasil',
      },
    ],
  },
  {
    heading: 'Pelaporan',
    children: [
      {
        name: 'Lembar Hasil',
        icon: 'solar:folder-check-line-duotone',
        id: uniqueId(),
        url: '/dashboard/pelaporan/lembarhasil',
      },
      {
        name: 'Hasil Temuan',
        icon: 'solar:presentation-graph-line-duotone',
        id: uniqueId(),
        url: '/dashboard/pelaporan/ringkasanpengawasan',
      },
    ],
  },
  {
    heading: 'Tindak Lanjut',
    children: [
      // {
      //   name: 'TLHP',
      //   icon: 'solar:folder-check-broken',
      //   id: uniqueId(),
      //   url: '/dashboard/perencanaan/realisasipkpt',
      // },
      // {
      //   name: 'BAKTL',
      //   icon: 'solar:folder-check-broken',
      //   id: uniqueId(),
      //   url: '/dashboard/perencanaan/realisasipkpt',
      // },
      {
        name: 'Realisasi PKPT',
        icon: 'solar:book-bookmark-line-duotone',
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
