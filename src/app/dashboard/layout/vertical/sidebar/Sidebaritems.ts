import { uniqueId } from 'lodash';

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
        name: 'Data Referensi',
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
      {
        name: 'Surat Tugas',
        icon: 'solar:file-send-line-duotone',
        id: uniqueId(),
        url: '/dashboard/perencanaan/surattugas',
      },
    ],
  },
  {
    heading: 'Pelaksanaan',
    children: [
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
  // {
  //   heading: 'Pelaporan',
  //   children: [
  //
  //   ],
  // },
  {
    heading: 'Tindak Lanjut',
    children: [
      {
        name: 'Rekap Temuan',
        icon: 'solar:presentation-graph-line-duotone',
        id: uniqueId(),
        url: '/dashboard/pelaksanaan/rekaptemuan',
      },
      {
        name: 'Tindak Lanjut',
        icon: 'solar:presentation-graph-line-duotone',
        id: uniqueId(),
        url: '/dashboard/pelaksanaan/tindaklanjut',
      },
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

export function filterSidebarByRole(role: string): MenuItem[] {
  return SidebarContent.map((item) => {
    const filteredChildren = item.children?.filter((child) => {
      if (role === 'Admin') {
        // Admin Role
        return (
          child.name &&
          ['Dashboard', 'Data Referensi', 'User Account'].includes(
            child.name
          )
        );
      }else if (role === 'Pempinan') {
        // Admin Role
        return (
          child.name &&
          ['Dashboard',' PKPT', 'Surat Tugas', 'Kendali Mutu', 'Nota Hasil', 'Lembar Hasil', 'Hasil Temuan', 'Rekap Temuan', 'Tindak Lanjut'].includes(
            child.name
          )
        );
      }
      else if (role === 'Perencana') {
        // Admin Role
        return (
          child.name &&
          ['Dashboard', 'Data Referensi', ' PKPT', 'Surat Tugas'].includes(
            child.name
          )
        );
      }
      else if (role === 'Pelaksana' || role === 'Auditor') {
        // Admin Role
        return (
          child.name &&
          ['Dashboard',' PKPT','Kendali Mutu', 'Nota Hasil', 'Lembar Hasil', 'Hasil Temuan', 'Rekap Temuan', 'Tindak Lanjut'].includes(
            child.name
          )
        );
      }
      return false;
    });

    return { ...item, children: filteredChildren };
  }).filter((item) => item.children && item.children.length > 0);
}

// const filteredSidebarContent = filterSidebarByRole(SidebarContent, userRole);

// Gunakan `filteredSidebarContent` untuk menampilkan sidebar
