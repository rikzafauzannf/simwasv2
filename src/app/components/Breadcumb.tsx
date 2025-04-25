'use client';
import { useBreadcrumbs } from '@/hooks/useBreadCrumbs';
import { Breadcrumb } from 'flowbite-react';
import Link from 'next/link';

const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <Breadcrumb className="mb-4">
      {/* <Breadcrumb.Item>
        <Link href="/" className="font-semibold text-blue-700">
          Home
        </Link>
      </Breadcrumb.Item> */}

      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;
        return (
          <Breadcrumb.Item key={item.link}>
            {isLast ? (
              <span className="font-bold">{item.title}</span>
            ) : (
              <Link href={item.link} className="font-semibold text-blue-700">
                {item.title}
              </Link>
            )}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
