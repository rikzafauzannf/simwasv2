'use client';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import Swal from 'sweetalert2';

const AuthLogin = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [error, setError] = useState<string>('');
  const [focusIndex, setFocusIndex] = useState<number>(0);
  const [showOtp, setShowOtp] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { NIP } = data;
    if (!showOtp) {
        setShowOtp(true);
        return;
    }

    const isValidOtp = otp.join('') === '123456';
    if (isValidOtp) {
        await Swal.fire('Success', 'OTP is valid, redirecting...', 'success');
        window.location.href = '/dashboard';
    } else {
        Swal.fire('Error', 'Invalid OTP, please try again.', 'error');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
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
      <form onSubmit={handleSubmit(onSubmit)}>
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
            {/* {errors.NIP && <p className="text-red-500">{(errors.NIP as FieldError).message}</p>} */}
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
        {showOtp && (
          <>
            <div className="mb-4">
              <div className="mb-2 block">
                <Label htmlFor="OTP" value="OTP" />
              </div>
              <div className="flex space-x-2">
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
            <div className="flex justify-between my-5">
              <div className="flex items-center gap-2">
                <Checkbox id="accept" className="checkbox" />
                <Label
                  htmlFor="accept"
                  className="opacity-90 font-normal cursor-pointer"
                >
                  Remeber this Device
                </Label>
              </div>
              <Link
                href={'/dashboard'}
                className="text-primary text-sm font-medium"
              >
                Kirim Kembali OTP?
              </Link>
            </div>
            <Button
              color={'primary'}
              onClick={handleSubmit(onSubmit)}
              className="w-full bg-primary text-white rounded-xl"
            >
              Login
            </Button>
          </>
        )}
      </form>
    </>
  );
};

export default AuthLogin;
