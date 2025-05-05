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
      // {
      //   name: 'Data Jenis Audit',
      //   icon: 'solar:shield-plus-line-duotone',
      //   id: uniqueId(),
      //   url: '/dashboard/jenisaudit',
      // },
      {
        name: 'Data Jenis Laporan',
        icon: 'solar:shield-plus-line-duotone',
        id: uniqueId(),
        url: '/dashboard/jenislaporan',
      },
      {
        name: 'Data Jenis Pengawasan',
        icon: 'solar:shield-plus-line-duotone',
        id: uniqueId(),
        url: '/dashboard/jenispengawasan',
      },
      // {
      //   name: 'Data Kode Referensi',
      //   icon: 'solar:shield-plus-line-duotone',
      //   id: uniqueId(),
      //   url: '/dashboard/kodereferensi',
      // },
      {
        name: 'Data Kode Rekomendasi',
        icon: 'solar:shield-plus-line-duotone',
        id: uniqueId(),
        url: '/dashboard/koderekomendasi',
      },
      {
        name: 'Data Kode Temuan',
        icon: 'solar:shield-plus-line-duotone',
        id: uniqueId(),
        url: '/dashboard/kodetemuan',
      },
      {
        name: 'Data Ruang Lingkup',
        icon: 'solar:shield-plus-line-duotone',
        id: uniqueId(),
        url: '/dashboard/ruanglingkup',
      },
      {
        name: 'Data Tingkat Resiko',
        icon: 'solar:shield-plus-line-duotone',
        id: uniqueId(),
        url: '/dashboard/tingkatresiko',
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
        url: '/dashboard/pkpt',
      },
      // {
      //   name: 'Surat Tugas',
      //   icon: 'solar:file-send-line-duotone',
      //   id: uniqueId(),
      //   url: '/dashboard/surattugas',
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
        url: '/dashboard/surattugas',
      },
      {
        name: 'Kendali Mutu',
        icon: 'solar:checklist-minimalistic-line-duotone',
        id: uniqueId(),
        url: '/dashboard/kendalimutu',
      },
      {
        name: 'Nota Hasil',
        icon: 'solar:move-to-folder-line-duotone',
        id: uniqueId(),
        url: '/dashboard/notahasil',
      },
      {
        name: 'Laporan Hasil',
        icon: 'solar:folder-check-line-duotone',
        id: uniqueId(),
        url: '/dashboard/laporanhasil',
      },
      {
        name: 'Ringkasan Hasil',
        icon: 'solar:presentation-graph-line-duotone',
        id: uniqueId(),
        url: '/dashboard/hasiltemuan',
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
        name: 'Tindak Lanjut',
        icon: 'solar:presentation-graph-line-duotone',
        id: uniqueId(),
        url: '/dashboard/tindaklanjut',
      },
      {
        name: 'Rekap Temuan',
        icon: 'solar:presentation-graph-line-duotone',
        id: uniqueId(),
        url: '/dashboard/rekaptemuan',
      },
      // {
      //   name: 'TLHP',
      //   icon: 'solar:folder-check-broken',
      //   id: uniqueId(),
      //   url: '/dashboard/realisasipkpt',
      // },
      // {
      //   name: 'BAKTL',
      //   icon: 'solar:folder-check-broken',
      //   id: uniqueId(),
      //   url: '/dashboard/realisasipkpt',
      // },
      {
        name: 'Realisasi PKPT',
        icon: 'solar:book-bookmark-line-duotone',
        id: uniqueId(),
        url: '/dashboard/realisasi',
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
      // 'Dashboard',
      // 'PKPT',
      // 'Surat Tugas',
      // 'Kendali Mutu',
      // 'Nota Hasil',
      // 'Laporan Hasil',
      // 'Ringkasan Hasil',
      // 'Rekap Temuan',
      // 'Tindak Lanjut',
      // 'Realisasi PKPT',
      'User Account',
    ],
    Developer: [
      'Dashboard',
      ...dataReferensi,
      'PKPT',
      'Surat Tugas',
      'Kendali Mutu',
      'Nota Hasil',
      'Laporan Hasil',
      'Ringkasan Hasil',
      'Rekap Temuan',
      'Tindak Lanjut',
      'Realisasi PKPT',
      'User Account',
    ],
    Pimpinan: [
      'Dashboard',
      'PKPT',
      'Surat Tugas',
      'Kendali Mutu',
      'Nota Hasil',
      'Laporan Hasil',
      'Ringkasan Hasil',
      'Rekap Temuan',
      'Tindak Lanjut',
      'Realisasi PKPT',
    ],
    Perencana: [
      'Dashboard',
      // ...dataReferensi,
      'PKPT',
      'Surat Tugas',
      'Rekap Temuan',
      'Realisasi PKPT',
    ],
    Pelaksana: [
      'Dashboard',
      'PKPT',
      'Surat Tugas',
      'Kendali Mutu',
      'Nota Hasil',
      'Laporan Hasil',
      'Ringkasan Hasil',
      'Rekap Temuan',
      'Tindak Lanjut',
      'Realisasi PKPT',
    ],
    Auditor: [
      'Dashboard',
      'PKPT',
      'Surat Tugas',
      'Kendali Mutu',
      'Nota Hasil',
      'Laporan Hasil',
      'Ringkasan Hasil',
      'Rekap Temuan',
      'Tindak Lanjut',
      'Realisasi PKPT',
    ],
    PEP: [
      'Dashboard',
      'PKPT',
      'Surat Tugas',
      'Kendali Mutu',
      'Nota Hasil',
      'Laporan Hasil',
      'Ringkasan Hasil',
      'Rekap Temuan',
      'Tindak Lanjut',
      'Realisasi PKPT',
    ],
    JFA: [
      'Dashboard',
      'PKPT',
      'Surat Tugas',
      'Kendali Mutu',
      'Nota Hasil',
      'Laporan Hasil',
      'Ringkasan Hasil',
      'Rekap Temuan',
      'Tindak Lanjut',
      'Realisasi PKPT',
    ],
    OPD: [
      'Dashboard',
      'PKPT',
      // 'Surat Tugas',
      // 'Kendali Mutu',
      // 'Nota Hasil',
      // 'Laporan Hasil',
      // 'Ringkasan Hasil',
      'Rekap Temuan',
      'Tindak Lanjut',
      'Realisasi PKPT',
    ],
  };

  // note
//   Role (be)
// 1. Admin
// - referensi
// - Dashboard
// - user management
// 2. Pimpinan
// - bisa melihat semua fitur tetapi hanya melihat saja
// - Referensi nggak perlu
// 3. PEP (perencana evaluasi & pelaporan)
// - pkpt
// - Ringkasan hasil
// - Tindak lanjut
// - Ringkasan Hasil
// - LHP
// - temuan hasil
// - Realisasi pkpt
// 4. JFA/PPUPD (Auditor / pelaksana) = hanya dapat melihat di tim saja
// - pkpt,
// - ST, 
// - kendali mutu, 
// - nhp,
// - lhp 
// - ringkasan hasil, 
// - tindak lanjut
// - Rekap temuan
// - Realisasi pkpt
// 5. OPD/Auditi
// - Rekapan Tindak Lanjut Berdasarkan Ruang Lingkup

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
