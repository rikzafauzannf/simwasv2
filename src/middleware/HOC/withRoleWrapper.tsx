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
  const { user, token, refreshAuth } = useAuthStore();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // First effect: Check if we're on client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Second effect: Real-time auth check with refresh mechanism
  useEffect(() => {
    if (!isClient) return; // Skip server-side execution

    const checkAuth = async () => {
      try {
        // Check for token in localStorage
        const storedToken = localStorage.getItem('user');


        if (storedToken) {
          // If there's a token in localStorage, try to refresh the auth state
          if (!token || !user) {
            await refreshAuth(); // Assuming refreshAuth is a function to reload user data from token
          }

          // After refresh, if we have a user but wrong role
          if (user && !allowedRoles.includes(user.role)) {
            router.push('/dashboard/accessdenied');
          }
        } else if (!token) {
          // No token in localStorage or state, redirect to unauthorized
          router.push('/unauthorized');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/unauthorized');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [user, token, allowedRoles, router, isClient, refreshAuth]);

  // Show loading state or render children
  if (!isClient || isLoading) {
    return <div>Loading...</div>; // Show a loader during auth check
  }

  // After loading, if still no valid auth, render nothing (will be redirected)
  if (!token || !user || !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};

export default AuthRoleWrapper;
