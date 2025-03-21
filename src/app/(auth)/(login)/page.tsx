'use client';
import FullLogo from '@/app/dashboard/layout/shared/logo/FullLogo';
import React from 'react';
import Link from 'next/link';
import AuthLogin from '../authforms/AuthLogin';
import AuthRegister from '../authforms/AuthRegister';
import useAuthToggleStore from '@/middleware/Store/useAuthToggleStore';

const gradientStyle = {
  background:
    'linear-gradient(45deg, rgb(238, 119, 82,0.2), rgb(231, 60, 126,0.2), rgb(35, 166, 213,0.2), rgb(35, 213, 171,0.2))',
  backgroundSize: '400% 400%',
  animation: 'gradient 15s ease infinite',
  height: '100vh',
};

const BoxedLogin = () => {
  const { isLogin, toggleAuth } = useAuthToggleStore();

  return (
    <div style={gradientStyle} className="relative overflow-hidden h-screen">
      <div className="flex h-full justify-center items-center px-4">
        <div className="rounded-xl shadow-md bg-white dark:bg-darkgray p-6 w-full md:w-96 border-none">
          <div className="flex flex-col gap-2 p-0 w-full">
            <div className="mx-auto">
              <FullLogo />
            </div>
            <p className="text-sm text-center text-dark my-3">
              {isLogin ? 'Login Menggunakan NIP' : 'Register Menggunakan NIP'}
            </p>
            {isLogin ? <AuthLogin /> : <AuthRegister />}
            <button
              onClick={toggleAuth}
              className="mt-4 text-primary text-sm font-medium"
            >
              {isLogin ? 'Switch to Signup' : 'Switch to Login'}
            </button>
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default BoxedLogin;
