'use client'; // This component will be client-side
import React, { useEffect, useState } from 'react';
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
  const [isClient, setIsClient] = useState(false);

  // First effect: Check if we're on client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Second effect: Real-time auth check
  useEffect(() => {
    if (!isClient) return; // Skip server-side execution

    // Check for token in localStorage
    const storedToken = localStorage.getItem('auth_token');
    
    if (storedToken && !token) {
      // If there's a token in localStorage but not in state,
      // redirect to dashboard (user is authenticated but not loaded in state yet)
      router.push('/dashboard');
      return;
    }

    if (!token) {
      // No token in state or localStorage, redirect to unauthorized
      router.push('/unauthorized');
    } else if (!user || !allowedRoles.includes(user.role)) {
      // Has token but wrong role, redirect to access denied
      router.push('/dashboard/accessdenied');
    }
  }, [user, token, allowedRoles, router, isClient]);

  // Handle loading state or unauthorized access
  if (!isClient || !token || !user || !allowedRoles.includes(user.role)) {
    return null; // Optionally, show a loader or placeholder
  }

  return <>{children}</>;
};

export default AuthRoleWrapper;