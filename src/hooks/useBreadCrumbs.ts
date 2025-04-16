'use client';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

type BreadcrumbItem = {
  title: string;
  link: string;
};

// Static route mappings
const routeMapping: Record<string, BreadcrumbItem[]> = {
  '/dashboard': [{ title: 'Dashboard', link: '/dashboard' }],
  '/dashboard/pkpt': [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Data PKPT', link: '/dashboard/pkpt' },
  ],
  '/dashboard/surattugas': [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Surat Tugas', link: '/dashboard/surattugas' },
  ],
  '/dashboard/hasiltemuan': [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Hasil Temuan', link: '/dashboard/hasiltemuan' },
  ],
  '/dashboard/laporanhasil': [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Laporan Hasil', link: '/dashboard/laporanhasil' },
  ],
  '/dashboard/notahasil': [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Nota Hasil', link: '/dashboard/notahasil' },
  ],
};

// Dynamic route patterns - Add patterns for routes with parameters
const dynamicRoutePatterns = [
  {
    pattern: /^\/dashboard\/pkpt\/([^\/]+)$/,
    getBreadcrumbs: (pathname: string, id: string) => [
      { title: 'Dashboard', link: '/dashboard' },
      { title: 'Data PKPT', link: '/dashboard/pkpt' },
      { title: `Detail PKPT`, link: pathname },
    ],
  },
  {
    pattern: /^\/dashboard\/pkpt\/actions\/([^\/]+)$/,
    getBreadcrumbs: (pathname: string, id: string) => [
      { title: 'Dashboard', link: '/dashboard' },
      { title: 'Data PKPT', link: '/dashboard/pkpt' },
      { title: `Action PKPT`, link: pathname },
    ],
  },
  {
    pattern: /^\/dashboard\/pkpt\/create\/([^\/]+)$/,
    getBreadcrumbs: (pathname: string, id: string) => [
      { title: 'Dashboard', link: '/dashboard' },
      { title: 'Data PKPT', link: '/dashboard/pkpt' },
      { title: `Create PKPT`, link: pathname },
    ],
  },
  {
    pattern: /^\/dashboard\/pkpt\/preview\/([^\/]+)$/,
    getBreadcrumbs: (pathname: string, id: string) => [
      { title: 'Dashboard', link: '/dashboard' },
      { title: 'Data PKPT', link: '/dashboard/pkpt' },
      { title: `Preview Data PKPT`, link: pathname },
    ],
  },
  {
    pattern: /^\/dashboard\/surattugas\/([^\/]+)$/,
    getBreadcrumbs: (pathname: string, id: string) => [
      { title: 'Dashboard', link: '/dashboard' },
      { title: 'Surat Tugas', link: '/dashboard/surattugas' },
      { title: `Detail Surat Tugas`, link: pathname },
    ],
  },
  {
    pattern: /^\/dashboard\/surattugas\/form\/([^\/]+)$/,
    getBreadcrumbs: (pathname: string, id: string) => [
      { title: 'Dashboard', link: '/dashboard' },
      { title: 'Surat Tugas', link: '/dashboard/surattugas' },
      { title: `Create Surat Tugas`, link: pathname },
    ],
  },
  // Add more dynamic route patterns as needed
];

export function useBreadcrumbs() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    // First check static routes
    if (routeMapping[pathname]) {
      return routeMapping[pathname];
    }

    // Then check dynamic routes
    for (const { pattern, getBreadcrumbs } of dynamicRoutePatterns) {
      const match = pathname.match(pattern);
      if (match) {
        // Extract the dynamic part (e.g., id_pkpt)
        const id = match[1];
        return getBreadcrumbs(pathname, id);
      }
    }

    // Fallback to default breadcrumb generation
    const segments = pathname.split('/').filter(Boolean);
    return segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join('/')}`;
      return {
        title: segment.charAt(0).toUpperCase() + segment.slice(1),
        link: path,
      };
    });
  }, [pathname]);

  return breadcrumbs;
}
