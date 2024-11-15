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
    heading: 'Tahap Perencanaan',
    children: [
      {
        name: 'Perencanaan',
        icon: 'solar:circle-bottom-up-broken',
        id: uniqueId(),
        url: '/perencanaan',
      },
      {
        name: 'PKPT',
        icon: 'solar:folder-broken',
        id: uniqueId(),
        url: '/perencanaan/pkpt',
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
    heading: 'Pelaksanaan',
    children: [
      {
        name: 'Surat Tugas',
        icon: 'solar:airbuds-case-charge-outline',
        id: uniqueId(),
        url: '/ui/shadow',
      },
      {
        name: 'Pelaksanaan',
        icon: 'solar:login-2-linear',
        id: uniqueId(),
        url: '/auth/login',
      },
      {
        name: 'Kendali Mutu',
        icon: 'solar:shield-user-outline',
        id: uniqueId(),
        url: '/auth/register',
      },
      {
        name: 'Progress Pengawasan',
        icon: 'solar:shield-user-outline',
        id: uniqueId(),
        url: '/auth/register',
      },
    ],
  },
  {
    heading: 'Tahap Pelaporan',
    children: [
      {
        name: 'Pelaporan',
        icon: 'solar:smile-circle-outline',
        id: uniqueId(),
        url: '/icons/solar',
      },
      {
        name: 'Tindak Lanjut',
        icon: 'solar:notes-minimalistic-outline',
        id: uniqueId(),
        url: '/sample-page',
      },
    ],
  },
];

export default SidebarContent;
