'use client';
import { ButtonType } from '@/app/components/Global/Button';
import { CardComponents } from '@/app/components/Global/Card';
import {
  InputFieldComponent,
  SelectInputField,
} from '@/app/components/Global/Input';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useFetch } from '@/hooks/useFetch';
import { AxiosService } from '@/services/axiosInstance.service';
import { KodeTemuanDB, RuangLingkupDB } from '@/interface/interfaceReferensi';
import { FormUserManage, UserManageDB } from '@/interface/interfaceUserManage';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useGetNameRuangLingkup } from '@/hooks/useGetName';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import { useOptions } from '@/data/selectValue';

const axiosService = new AxiosService();
const UserManage = () => {
  const {optionsRuangLingkup,optionsRole} = useOptions()
  const {
    data: DataPengguna,
    isLoading,
    error,
    refetch,
  } = useFetch<UserManageDB>('/pengguna');
  // const { data: DataRuangLingkup } = useFetch<RuangLingkupDB>('ruang_lingkup');
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

  const [isEditing, setIsEditing] = React.useState(false);
  const [currentEditId, setCurrentEditId] = React.useState<number | null>(null);

  if (isLoadingRuangLingkup) return <div>Loading...</div>;
  if (errorRuangLingkup) return <div>Error: {errorRuangLingkup.message}</div>;

  

  const onSubmit: SubmitHandler<FormUserManage> = async (data) => {
    try {
      const result = await axiosService.addData('/pengguna', {
        username: data.username,
        nip: data.nip,
        no_whatsapp: data.no_whatsapp,
        jabatan: data.jabatan,
        role: data.role,
        id_ruang_lingkup: Number(data.id_ruang_lingkup),
      });
      if (result.success) {
        alert('Data User berhasil disimpan');
        reset();
        refetch();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Gagal menyimpan data User');
    }
  };

  const onEditSubmit: SubmitHandler<FormUserManage> = async (data) => {
    try {
      const result = await axiosService.updateData(
        `/pengguna/${currentEditId}`,
        {
          username: data.username,
          nip: data.nip,
          no_whatsapp: data.no_whatsapp,
          jabatan: data.jabatan,
          role: data.role,
          id_ruang_lingkup: Number(data.id_ruang_lingkup),
        }
      );
      if (result.success) {
        alert('Data User berhasil diperbarui');
        reset();
        refetch();
        handleCancelEdit();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Gagal memperbarui data User');
    }
  };

  const handleEdit = (user: UserManageDB) => {
    setIsEditing(true);
    setCurrentEditId(user.id_user);
    reset({
      username: user.username,
      nip: user.nip,
      no_whatsapp: user.no_whatsapp,
      jabatan: user.jabatan,
      role: user.role,
      id_ruang_lingkup: user.id_ruang_lingkup,
    });
  };

  const handleCancelEdit = () => {
    reset();
    setIsEditing(false);
    setCurrentEditId(null);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus User ini?')) {
      try {
        const result = await axiosService.deleteData(`/pengguna/${id}`);
        if (result.success) {
          alert('User berhasil dihapus');
          refetch();
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        console.error('Error deleting User:', error);
        alert('Gagal menghapus User');
      }
    }
  };

  return (
    <AuthRoleWrapper allowedRoles={['Admin']}>
      <div className="space-y-3">
        <h3 className="text-xl"># UserManage</h3>
        <CardComponents>
          <form
            onSubmit={handleSubmit(isEditing ? onEditSubmit : onSubmit)}
            className="grid gap-3"
          >
            <section className="grid md:grid-cols-4 gap-3 w-full">
              <div className="md:col-span-3">
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
              <SelectInputField
                label="Role"
                identiti="select-field-role"
                options={optionsRole}
                register={register('role')}
                placeholder="Pilih Ruang Lingkup Anda"
                error={errors.role}
                type="select"
                name="role"
              />
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
            </section>
            <ButtonType
              Text={isEditing ? '+ Perbarui User' : '+ Simpan User'}
              type="submit"
            />
            {isEditing && (
              <button type="button" onClick={handleCancelEdit}>
                Batal
              </button>
            )}
          </form>
        </CardComponents>
        <section className="grid lg:grid-cols-2 gap-3">
          {DataPengguna.map((item) => (
            <CardComponents key={item.id_user}>
              <p>@ {item.role}</p>
              <h3 className="text-xl font-bold">
                {'>>'} {item.username}
              </h3>
              <p className="font-medium flex gap-3 items-center">
                <Icon icon="solar:shield-check-broken" width="24" height="24" />
                {getNameRuangLingkup(Number(item.id_ruang_lingkup))}
              </p>
              <div className="grid grid-cols-2 gap-3 w-full">
                <p className="font-medium flex gap-3 items-center">
                  <Icon icon="solar:card-2-broken" width="24" height="24" />
                  {item.nip}
                </p>

                <p className="font-medium flex gap-3 items-center">
                  <Icon
                    icon="solar:phone-calling-broken"
                    width="24"
                    height="24"
                  />
                  {item.no_whatsapp}
                </p>
                <div className="col-span-2">
                  <p className="font-medium flex gap-3 items-center">
                    <Icon icon="solar:user-id-broken" width="24" height="24" />
                    {item.jabatan}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 ">
                <button
                  onClick={() => handleEdit(item)}
                  className="py-2 text-center w-full rounded-md shadow-md bg-blue-500 hover:bg-blue-700 text-white font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id_user)}
                  className="py-2 text-center w-full rounded-md shadow-md bg-red-500 hover:bg-red-700 text-white font-semibold"
                >
                  Hapus
                </button>
              </div>
            </CardComponents>
          ))}
        </section>
      </div>
    </AuthRoleWrapper>
  );
};

export default UserManage;
