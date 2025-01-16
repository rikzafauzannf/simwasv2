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
      {
        name: 'Data Jenis Audit',
        icon: 'solar:shield-plus-line-duotone',
        id: uniqueId(),
        url: '/dashboard/datareferensi/jenisaudit',
      },
      {
        name: 'Data Jenis Laporan',
        icon: 'solar:shield-plus-line-duotone',
        id: uniqueId(),
        url: '/dashboard/datareferensi/jenislaporan',
      },
      {
        name: 'Data Jenis Pengawasan',
        icon: 'solar:shield-plus-line-duotone',
        id: uniqueId(),
        url: '/dashboard/datareferensi/jenispengawasan',
      },
      {
        name: 'Data Kode Referensi',
        icon: 'solar:shield-plus-line-duotone',
        id: uniqueId(),
        url: '/dashboard/datareferensi/kodereferensi',
      },
      {
        name: 'Data Kode Rekomendasi',
        icon: 'solar:shield-plus-line-duotone',
        id: uniqueId(),
        url: '/dashboard/datareferensi/koderekomendasi',
      },
      {
        name: 'Data Kode Temuan',
        icon: 'solar:shield-plus-line-duotone',
        id: uniqueId(),
        url: '/dashboard/datareferensi/kodetemuan',
      },
      {
        name: 'Data Ruang Lingkup',
        icon: 'solar:shield-plus-line-duotone',
        id: uniqueId(),
        url: '/dashboard/datareferensi/ruanglingkup',
      },
      {
        name: 'Data Tingkat Resiko',
        icon: 'solar:shield-plus-line-duotone',
        id: uniqueId(),
        url: '/dashboard/datareferensi/tingkatresiko',
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
      // {
      //   name: 'Surat Tugas',
      //   icon: 'solar:file-send-line-duotone',
      //   id: uniqueId(),
      //   url: '/dashboard/perencanaan/surattugas',
      // },
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
  const dataReferensi = [
    'Data Jenis Audit',
    'Data Jenis Laporan',
    'Data Jenis Pengawasan',
    'Data Kode Referensi',
    'Data Kode Rekomendasi',
    'Data Kode Temuan',
    'Data Ruang Lingkup',
    'Data Tingkat Resiko',
  ];
  const roleBasedFilter = {
    Admin: [
      'Dashboard',
      ...dataReferensi,
      // 'Data Referensi',
      'Dashboard',
      'PKPT',
      'Surat Tugas',
      'Kendali Mutu',
      'Nota Hasil',
      'Lembar Hasil',
      'Hasil Temuan',
      'Rekap Temuan',
      'Tindak Lanjut',
      'User Account',
    ],
    Pimpinan: [
      'Dashboard',
      'PKPT',
      'Surat Tugas',
      'Kendali Mutu',
      'Nota Hasil',
      'Lembar Hasil',
      'Hasil Temuan',
      'Rekap Temuan',
      'Tindak Lanjut',
    ],
    Perencana: ['Dashboard', ...dataReferensi, 'PKPT', 'Surat Tugas'],
    Pelaksana: [
      'Dashboard',
      'PKPT',
      'Kendali Mutu',
      'Nota Hasil',
      'Lembar Hasil',
      'Hasil Temuan',
      'Rekap Temuan',
      'Tindak Lanjut',
    ],
    Auditor: [
      'Dashboard',
      'PKPT',
      'Kendali Mutu',
      'Nota Hasil',
      'Lembar Hasil',
      'Hasil Temuan',
      'Rekap Temuan',
      'Tindak Lanjut',
    ],
  };

  return SidebarContent.map((item) => {
    const filteredChildren = item.children?.filter((child) => {
      // const allowedNames = roleBasedFilter[role as keyof typeof roleBasedFilter];
      const allowedNames =
        roleBasedFilter[role as keyof typeof roleBasedFilter];

      return allowedNames ? allowedNames.includes(child.name as string) : false;
    });

    return { ...item, children: filteredChildren };
  }).filter((item) => item.children && item.children.length > 0);
}

// const filteredSidebarContent = filterSidebarByRole(SidebarContent, userRole);

// Gunakan `filteredSidebarContent` untuk menampilkan sidebar
