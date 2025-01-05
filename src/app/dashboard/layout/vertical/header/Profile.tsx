import { Button, Dropdown } from 'flowbite-react';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useAuthStore } from '@/middleware/Store/useAuthStore';
import { useGetNameUser } from '@/hooks/useGetName';

const Profile = () => {
  const { user, clearAuth } = useAuthStore(); // Destructure clearAuth from useAuthStore
  const { getNameUser } = useGetNameUser();

  const handleLogout = () => {
    clearAuth(); // Call clearAuth to clear the authentication data
  };

  return (
    <div className="relative group/menu">
      <Dropdown
        label=""
        className="rounded-sm w-44"
        dismissOnClick={false}
        renderTrigger={() => (
          <span className="h-10 w-10 hover:text-primary hover:bg-lightprimary rounded-full flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary">
            <Image
              src="/images/profile/user-1.jpg"
              alt="logo"
              height="35"
              width="35"
              className="rounded-full"
            />
          </span>
        )}
      >
        <Dropdown.Item className="px-3 py-3 flex items-center bg-hover group/link w-full gap-3 text-dark">
          <Icon icon="solar:user-circle-outline" height={20} />
          {getNameUser(Number(user?.id_user)) || 'Guest'}
        </Dropdown.Item>
        <Dropdown.Item
          as={Link}
          href="/dashboard/usermanage"
          className="px-3 py-3 flex items-center bg-hover group/link w-full gap-3 text-dark"
        >
          <Icon icon="solar:letter-linear" height={20} />
          Account
        </Dropdown.Item>
        <div className="p-3 pt-0">
          <Button
            as={Link}
            size={'sm'}
            href="/"
            onClick={handleLogout} // Add onClick handler for logout
            className="mt-2 border border-primary text-primary bg-transparent hover:bg-lightprimary outline-none focus:outline-none"
          >
            Logout
          </Button>
        </div>
      </Dropdown>
    </div>
  );
};

export default Profile;
