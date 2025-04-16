'use client';
import FullLogo from '@/app/dashboard/layout/shared/logo/FullLogo';
import React from 'react';
import Image from 'next/image';
import ilustrasi from '/public/images/backgrounds/unauthorized.svg';
import { ButtonLinkComponent } from '../components/Global/Button';

const gradientStyle = {
  background:
    'linear-gradient(45deg, rgb(238, 119, 82,0.2), rgb(231, 60, 126,0.2), rgb(35, 166, 213,0.2), rgb(35, 213, 171,0.2))',
  backgroundSize: '400% 400%',
  animation: 'gradient 15s ease infinite',
  height: '100vh',
};

const UnauthorizedPage = () => {
  return (
    <div style={gradientStyle} className="relative overflow-hidden h-screen">
      <div className="flex h-full justify-center items-center px-4">
        <div className="rounded-xl shadow-md bg-slate-50 dark:bg-darkgray p-6 w-96 md:w-max border-none">
          <div className="flex flex-col gap-2 p-0 w-full">
            <div className="mx-auto">
              <FullLogo />
            </div>
            <div>
    <div className='flex justify-center items-center w-full'>
      <Image
        src={ilustrasi}
        width={500}
        height={500}
        alt="Picture of the author"
      />
    </div>
            </div>
            <div className="text-center space-y-4 grid">
              <h1 className="text-2xl md:text-3xl font-extrabold">Hmm, Anda Belum Punya Akses</h1>
              <p className="text-sm md:text-md font-reguler">Sepertinya Anda belum punya izin untuk masuk ke sini. Jangan khawatir, Anda bisa menghubungi admin untuk memeriksa status akses Anda.</p>
              <ButtonLinkComponent Text='Login atau Daftar Terlebih Dahulu'  linkTo='/'/>

            </div>
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

export default UnauthorizedPage;
