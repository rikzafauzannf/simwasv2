'use client'; // This component will be client-side

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/middleware/Store/useAuthStore';

interface AuthRoleWrapperProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const AuthRoleWrapper: React.FC<AuthRoleWrapperProps> = ({
  allowedRoles,
  children,
}) => {
  const { user, token } = useAuthStore();
  const router = useRouter();

  React.useEffect(() => {
    if (!token) {
      router.push('/'); // Redirect to login if not authenticated
    } else if (!user || !allowedRoles.includes(user.role)) {
      router.push('/unauthorized'); // Redirect to unauthorized page if role is not allowed
    }
  }, [user, token, allowedRoles, router]);

  if (!token || !user || !allowedRoles.includes(user.role)) {
    return null; // Optionally, show a loader or placeholder
  }

  return <>{children}</>;
};

export default AuthRoleWrapper;
