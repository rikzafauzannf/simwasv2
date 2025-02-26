import { Badge, Dropdown } from 'flowbite-react';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useFetchAll } from '@/hooks/useFetchAll';
import { NotifikasiDB } from '@/interface/interfaceNotifikasi';
import { formatToLocalDate } from '@/data/formatData';
import { useGetNameUser } from '@/hooks/useGetName';

const Notification = () => {
  const { data: DataNotifikasi } = useFetchAll<NotifikasiDB>('notifikasi');
  const { getNameUser } = useGetNameUser();

  // Filter dan urutkan data notifikasi
  const latestNotifications = DataNotifikasi
    ? [...DataNotifikasi]
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ) // Urutkan berdasarkan created_at (terbaru dulu)
        .slice(0, 4) // Ambil 5 teratas
    : [];

  return (
    <div className="relative group/menu">
      <Dropdown
        label=""
        className="rounded-sm w-44 notification"
        dismissOnClick={false}
        renderTrigger={() => (
          <span
            className="h-10 w-10 hover:text-primary hover:bg-lightprimary rounded-full flex justify-center items-center cursor-pointer relative"
            aria-label="Notifications"
          >
            <Icon icon="solar:bell-linear" height={20} />
            <Badge className="h-2 w-2 rounded-full absolute end-2 top-1 bg-primary p-0" />
          </span>
        )}
      >
        {latestNotifications.map((item) => (
          <Dropdown.Item
            key={item.id_notifikasi}
            as={Link}
            href={`/dashboard/perencanaan/pkpt/${item.id_pkpt}`}
            className="px-3 py-3 flex items-center bg-hover group/link w-full gap-3 text-dark hover:bg-gray-100"
          >
            <div className="flex items-center gap-5">
              <div>
                <Image
                  src="/images/profile/user-1.jpg"
                  alt="user"
                  width={35}
                  height={35}
                  className="rounded-full"
                />
              </div>
              <div>
                <small className="text-[8px]">
                  {formatToLocalDate(item.created_at)}
                </small>
                <h2>{getNameUser(item.id_user)}</h2>
                <small className="leading-none">{item.notifikasi}</small>
              </div>
            </div>
          </Dropdown.Item>
        ))}

        {latestNotifications.length === 0 && (
          <p className="text-center text-gray-500 py-2">
            No notifications available
          </p>
        )}

        {/* Add View All link */}
        <Dropdown.Item
          as={Link}
          href="/dashboard/perencanaan/pkpt"
          className="text-center text-blue-600 hover:underline py-2 grid"
        >
          View All
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default Notification;
