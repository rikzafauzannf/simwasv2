'use client';
import { AxiosService } from '@/services/axiosInstance.service';
import { Button, Label, TextInput } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import Swal from 'sweetalert2';

const axiosService = new AxiosService();

const AuthLogin = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [error, setError] = useState<string>('');
  const [focusIndex, setFocusIndex] = useState<number>(0);
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [NIP, setNIP] = useState();
  const route = useRouter();

  const onSubmitNIP: SubmitHandler<FieldValues> = async (data) => {
    const { NIP } = data;

    // Kirim NIP dan tunggu respons
    const response = await axiosService.addData('login', { nip: NIP });
    setNIP(NIP);
    console.log('Response server: ', response);
    if (response.success) {
      setShowOtp(true); // Tampilkan OTP setelah NIP berhasil dikirim
      Swal.fire({
        icon: 'success',
        title: 'NIP Diterima',
        text: 'Silakan masukkan OTP yang telah dikirim.',
      });
    } else {
      setError('NIP tidak terdaftar'); // Tampilkan error jika NIP tidak valid
      Swal.fire({
        icon: 'error',
        title: 'NIP Tidak Ditemukan',
        text: 'NIP yang Anda masukkan tidak terdaftar.',
      });
    }
  };

  const onSubmitOTP = async () => {
    if (!NIP) {
      setError('NIP is not set');
      return;
    }

    try {
      const response = await axiosService.addData('verify-otp', {
        nip: NIP,
        otp: otp.join(''),
      });

      if (response.success && response.data) {
        Swal.fire({
          icon: 'success',
          title: 'Login Berhasil',
          text: 'Anda berhasil masuk.',
        });
        localStorage.setItem('user', JSON.stringify(response.data));
      } else {
        throw new Error('OTP tidak valid');
      }

      route.push('/dashboard');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Terjadi kesalahan');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error instanceof Error ? error.message : 'Terjadi kesalahan',
      });
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value.trim();
      setOtp(newOtp);
      setError('');
      if (value !== '') {
        setFocusIndex(index + 1);
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      setFocusIndex(index - 1);
    }
  };

  useEffect(() => {
    const inputElement = document.getElementById(`otp-input-${focusIndex}`);
    if (inputElement) inputElement.focus();
  }, [focusIndex]);

  return (
    <>
      {/* form send nip */}
      <form onSubmit={handleSubmit(onSubmitNIP)}>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="NIP" value="NIP" />
          </div>
          <div className="flex items-center">
            <TextInput
              id="NIP"
              type="number"
              sizing="md"
              className="form-control form-rounded-xl flex-1"
              disabled={showOtp}
              {...register('NIP', { required: 'NIP is required' })}
            />
            {errors.NIP && <p className="text-red-500">NIP tidak terdaftar</p>}
            <Button
              type="submit"
              className="ml-2 text-slate-800 bg-slate-400 font-bold rounded-md shadow-md"
              disabled={showOtp}
            >
              Send
            </Button>
          </div>
        </div>
      </form>
      {/* form send otp */}
      {showOtp && (
        <>
          <div className="mb-4">
            <div className="mb-2 block">
              <Label htmlFor="OTP" value="OTP" />
            </div>
            <div className="flex justify-between space-x-2 items-center">
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="form-control form-rounded-xl w-12 text-center"
                  autoFocus={index === focusIndex}
                />
              ))}
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <Button
            color={'primary'}
            className="w-full bg-primary text-white rounded-xl"
            onClick={onSubmitOTP}
          >
            Login
          </Button>
        </>
      )}
    </>
  );
};

export default AuthLogin;
