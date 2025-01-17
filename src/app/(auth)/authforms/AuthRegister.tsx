import { ButtonType } from '@/app/components/Global/Button';
import {
  InputFieldComponent,
  SelectInputField,
} from '@/app/components/Global/Input';
import { useOptions } from '@/data/selectValue';
import { useFetch } from '@/hooks/useFetch';
import { useGetNameRuangLingkup } from '@/hooks/useGetName';
import { RuangLingkupDB } from '@/interface/interfaceReferensi';
import { FormUserManage } from '@/interface/interfaceUserManage';
import useAuthToggleStore from '@/middleware/Store/useAuthToggleStore';
import { AxiosService } from '@/services/axiosInstance.service';
import { Button, Label, TextInput } from 'flowbite-react';
import Link from 'next/link';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const axiosService = new AxiosService();

const AuthRegister = () => {
  // const { data: DataRuangLingkup } = useFetch<RuangLingkupDB>('ruang_lingkup');
  const {optionsRuangLingkup} = useOptions()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormUserManage>({
    defaultValues: {
      username: '',
      jabatan: '',
      nip: '',
      no_whatsapp: '',
    },
  });

  const {
    getNameRuangLingkup,
    isLoading: isLoadingRuangLingkup,
    error: errorRuangLingkup,
  } = useGetNameRuangLingkup();

  const toggleAuth = useAuthToggleStore((state) => state.toggleAuth);

  if (isLoadingRuangLingkup) return <div>Loading...</div>;
  if (errorRuangLingkup) return <div>Error: {errorRuangLingkup.message}</div>;

  // const optionRuangLingkup = DataRuangLingkup.map((item) => ({
  //   value: String(item.id_ruang_lingkup),
  //   title: item.ruang_lingkup,
  // }));

  

  // const OptionsRole = [
  //   {
  //     value: 'Admin',
  //     title: 'Admin',
  //   },
  //   {
  //     value: 'Pimpinan',
  //     title: 'Pimpinan',
  //   },
  //   {
  //     value: 'Perencana',
  //     title: 'Perencana',
  //   },
  //   {
  //     value: 'Pelaksana',
  //     title: 'Pelaksana',
  //   },
  //   {
  //     value: 'Auditor',
  //     title: 'Auditor',
  //   },
  // ];

  const onSubmit: SubmitHandler<FormUserManage> = async (data) => {
    try {
      const result = await axiosService.addData('/pengguna', {
        username: data.username,
        nip: data.nip,
        no_whatsapp: data.no_whatsapp,
        jabatan: data.jabatan,
        role: 'Admin',
        id_ruang_lingkup: Number(data.id_ruang_lingkup),
      });
      if (result.success) {
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Data User berhasil disimpan',
        });
        reset();
        toggleAuth();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Gagal menyimpan data User',
      });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
        {/* <h3 className="text-2xl">Daftar</h3> */}
        <section className="grid grid-cols-2 gap-2 w-full">
          <div className="col-span-2">
            <InputFieldComponent
              label="Nama Lengkap"
              identiti="nama"
              name="nama"
              placeholder="Tuliskan nama"
              type="text"
              register={register('username', {
                required: 'nama wajib diisi',
              })}
              error={errors.username}
            />
          </div>
          <div className="col-span-2">
            <InputFieldComponent
              label="NIP"
              identiti="nip"
              name="nip"
              placeholder="Tuliskan nip"
              type="number"
              register={register('nip', {
                required: 'nip wajib diisi',
              })}
              error={errors.nip}
            />
          </div>
          {/* <SelectInputField
            label="Role"
            identiti="select-field-role"
            options={OptionsRole}
            register={register('role')}
            placeholder="Pilih Ruang Lingkup Anda"
            error={errors.role}
            type="select"
            name="role"
          /> */}
          <SelectInputField
            label="Asal Dinas"
            identiti="select-field-asal"
            options={optionsRuangLingkup}
            register={register('id_ruang_lingkup')}
            placeholder="Pilih Ruang Lingkup Anda"
            error={errors.id_ruang_lingkup}
            type="select"
            name="asal"
          />
          <InputFieldComponent
            label="Jabatan"
            identiti="jabatan"
            name="jabatan"
            placeholder="Tuliskan jabatan"
            type="text"
            register={register('jabatan', {
              required: 'jabatan wajib diisi',
            })}
            error={errors.jabatan}
          />
          <div className="col-span-2">
            <InputFieldComponent
              label="Nomor Whatsapp"
              identiti="nomor_wa"
              name="nomor_wa"
              placeholder="Tuliskan Nomor Whatsapp"
              type="text"
              register={register('no_whatsapp', {
                required: 'Nomor Whatsapp wajib diisi',
              })}
              error={errors.no_whatsapp}
            />
          </div>
        </section>
        <ButtonType Text={'Signup'} type="submit" />
      </form>
    </>
  );
};

export default AuthRegister;
