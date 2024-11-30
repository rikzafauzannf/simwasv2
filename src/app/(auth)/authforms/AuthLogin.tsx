'use client'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const AuthLogin = () => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [error, setError] = useState<string>('');
  const [focusIndex, setFocusIndex] = useState<number>(0);
  const [showOtp, setShowOtp] = useState<boolean>(false);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      setFocusIndex(index - 1);
    }
  };

  const handleSend = () => {
    // Trigger OTP logic here
    // Assuming the OTP is correct, show the OTP input
    setShowOtp(true);
  };

  useEffect(() => {
    const inputElement = document.getElementById(`otp-input-${focusIndex}`);
    if (inputElement) inputElement.focus();
  }, [focusIndex]);

  return (
    <>
      <form>
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
            />
            <Button
              onClick={handleSend}
              className="ml-2 text-slate-800 bg-slate-400 rounded-md shadow-md"
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
          <Link href={'/dashboard'} className="text-primary text-sm font-medium">
          Kirim Kembali OTP?
          </Link>
        </div>
        <Button
          color={'primary'}
          href="/dashboard"
          as={Link}
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
