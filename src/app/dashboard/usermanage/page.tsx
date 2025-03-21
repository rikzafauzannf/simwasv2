'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useFetch } from '@/hooks/useFetch';
import { AxiosService } from '@/services/axiosInstance.service';
import { FormUserManage, UserManageDB } from '@/interface/interfaceUserManage';
import {
  InputFieldComponent,
  SelectInputField,
} from '@/app/components/Global/Input';
import { CardComponents } from '@/app/components/Global/Card';
import { ButtonType } from '@/app/components/Global/Button';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';
import { useOptions } from '@/data/selectValue';

const axiosService = new AxiosService();

const UserManage = () => {
  const { optionsRuangLingkup, optionsRole } = useOptions();
  const {
    data: DataPengguna,
    isLoading,
    error,
    refetch,
  } = useFetch<UserManageDB>('/pengguna');

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

  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const onSubmit: SubmitHandler<FormUserManage> = async (data) => {
    try {
      const formData = {
        username: data.username,
        nip: data.nip,
        no_whatsapp: data.no_whatsapp,
        jabatan: data.jabatan,
        id_ruang_lingkup: Number(data.id_ruang_lingkup),
        role: data.role,
      };
      const result = isEditing
        ? await axiosService.updateData(`/pengguna/${currentEditId}`, formData)
        : await axiosService.addData('/pengguna', formData);

      if (result.success) {
        alert(
          isEditing
            ? 'Data User berhasil diperbarui'
            : 'Data User berhasil disimpan'
        );
        reset();
        refetch();
        if (isEditing) setIsEditing(false);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(
        isEditing ? 'Gagal memperbarui data User' : 'Gagal menyimpan data User'
      );
    }
  };

  const handleEdit = (user: UserManageDB) => {
    setIsEditing(true);
    setCurrentEditId(user.id_user);
    reset(user);
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

  const filteredData = DataPengguna.filter(
    (item) =>
      item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.jabatan.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <AuthRoleWrapper allowedRoles={['Admin', 'Developer']}>
      <div className="space-y-3">
        <h3 className="text-xl"># UserManage</h3>

        <CardComponents>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
            <section className="grid md:grid-cols-4 gap-3 w-full">
              <InputFieldComponent
                label="Nama Lengkap"
                identiti="username"
                name="username"
                placeholder="Tuliskan nama"
                type="text"
                register={register('username', {
                  required: 'Nama wajib diisi',
                })}
                error={errors.username}
              />

              <SelectInputField
                type="select"
                name="role"
                label="Role"
                identiti="role"
                options={optionsRole}
                register={register('role', {
                  required: 'Role wajib dipilih',
                })}
                placeholder="Pilih Role"
                error={errors.role}
              />

              <SelectInputField
                type="select"
                name="id_ruang_lingkup"
                label="Asal Dinas"
                identiti="id_ruang_lingkup"
                options={optionsRuangLingkup}
                register={register('id_ruang_lingkup', {
                  required: 'Asal Dinas wajib dipilih',
                })}
                placeholder="Pilih Asal Dinas"
                error={errors.id_ruang_lingkup}
              />

              <InputFieldComponent
                label="NIP"
                identiti="nip"
                name="nip"
                placeholder="Tuliskan NIP"
                type="number"
                register={register('nip', {
                  required: 'NIP wajib diisi',
                })}
                error={errors.nip}
              />

              <InputFieldComponent
                label="Jabatan"
                identiti="jabatan"
                name="jabatan"
                placeholder="Tuliskan Jabatan"
                type="text"
                register={register('jabatan', {
                  required: 'Jabatan wajib diisi',
                })}
                error={errors.jabatan}
              />

              <InputFieldComponent
                label="Nomor Whatsapp"
                identiti="no_whatsapp"
                name="no_whatsapp"
                placeholder="Tuliskan Nomor Whatsapp"
                type="text"
                register={register('no_whatsapp', {
                  required: 'Nomor Whatsapp wajib diisi',
                })}
                error={errors.no_whatsapp}
              />
            </section>

            <ButtonType
              Text={isEditing ? 'Perbarui User' : 'Simpan User'}
              type="submit"
            />

            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  reset();
                  setIsEditing(false);
                }}
              >
                Batal
              </button>
            )}
          </form>
        </CardComponents>

        <div className="flex justify-between items-center mt-5">
          <input
            type="text"
            placeholder="Cari User..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded-md"
          />
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
          {paginatedData.map((item) => (
            <CardComponents key={item.id_user}>
              <p className="text-gray-600">@ {item.role}</p>
              <h3 className="text-xl font-bold text-blue-800">
                {item.username}
              </h3>
              <p className="text-gray-700">{item.jabatan}</p>
              <p className="text-gray-500">NIP: {item.nip}</p>
              <p className="text-gray-500">WA: {item.no_whatsapp}</p>

              <div className="grid grid-cols-2 gap-2 mt-3">
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

        <div className="flex justify-center mt-5">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 mx-1 rounded-md border ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-black'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </AuthRoleWrapper>
  );
};

export default UserManage;
