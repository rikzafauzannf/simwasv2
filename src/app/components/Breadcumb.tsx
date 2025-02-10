
'use client';

import { Breadcrumb } from 'flowbite-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Breadcrumbs = () => {
  const pathname = usePathname();
  const paths = pathname.split('/').filter((segment) => segment);

  return (
    <Breadcrumb className="mb-4">
      <Breadcrumb.Item>

        <Link href="/" className="font-semibold text-blue-700">
          Home
        </Link>
      </Breadcrumb.Item>
      {paths.map((segment, index) => {
        const href = `/${paths.slice(0, index + 1).join('/')}`;
        const label = segment.replace(/-/g, ' ');
        const isLast = index === paths.length - 1;

        return (
          <Breadcrumb.Item key={href}>
            {isLast ? (

              <span className="font-bold">
                {label.charAt(0).toUpperCase() + label.slice(1)}
              </span>
            ) : (
              <Link href={href} className="font-semibold text-blue-700">
                {label.charAt(0).toUpperCase() + label.slice(1)}
              </Link>
            )}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
