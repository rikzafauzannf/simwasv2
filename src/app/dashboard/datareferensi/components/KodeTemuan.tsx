'use client';
import { ButtonType } from '@/app/components/Global/Button';
import { CardComponents } from '@/app/components/Global/Card';
import { InputFieldComponent } from '@/app/components/Global/Input';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { KodeTemuanDB } from '@/interface/interfaceReferensi';
import { AxiosService } from '@/services/axiosInstance.service';
import { useFetch } from '@/hooks/useFetch';

const axiosService = new AxiosService();

const KodeTemuan = () => {
  const { data: DataKodeTemuan, refetch } =
    useFetch<KodeTemuanDB>('/kode_temuan');
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      kode_temuan: '',
      keterangan: '',
    },
  });

  const [isEditing, setIsEditing] = React.useState(false);
  const [currentEditId, setCurrentEditId] = React.useState<number | null>(null);

  const onSubmit: SubmitHandler<{
    kode_temuan: string;
    keterangan: string;
  }> = async (data) => {
    try {
      const result = await axiosService.addData('/kode_temuan', data);
      if (result.success) {
        alert('Data Kode Temuan berhasil disimpan');
        reset();
        refetch();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      alert('Gagal menyimpan data Kode Temuan');
    }
  };

  const onEditSubmit: SubmitHandler<{
    kode_temuan: string;
    keterangan: string;
  }> = async (data) => {
    try {
      const result = await axiosService.updateData(
        `/kode_temuan/${currentEditId}`,
        data
      );
      if (result.success) {
        alert('Data Kode Temuan berhasil diperbarui');
        reset();
        refetch();
        handleCancelEdit();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      alert('Gagal memperbarui data Kode Temuan');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus Kode Temuan ini?')) {
      try {
        const result = await axiosService.deleteData(`/kode_temuan/${id}`);
        if (result.success) {
          alert('Kode Temuan berhasil dihapus');
          refetch();
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        alert('Gagal menghapus Kode Temuan');
      }
    }
  };

  const handleEdit = (id: number, value: string, keterangan: string) => {
    setIsEditing(true);
    setCurrentEditId(id);
    setValue('kode_temuan', value);
    setValue('keterangan', keterangan);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentEditId(null);
    reset();
  };

  return (
    <div className="space-y-3">
      <h3 className="text-xl"># Kode Temuan</h3>
      <CardComponents>
        <form
          onSubmit={
            isEditing ? handleSubmit(onEditSubmit) : handleSubmit(onSubmit)
          }
          className="grid gap-3"
        >
          <InputFieldComponent
            label="Kode Temuan"
            identiti="kode_temuan"
            name="kode_temuan"
            placeholder="Kode Temuan Resiko"
            type="text"
            register={register('kode_temuan', {
              required: 'Kode Temuan wajib diisi',
            })}
            error={errors.kode_temuan}
          />
          <InputFieldComponent
            label="Keterangan"
            identiti="keterangan"
            name="keterangan"
            placeholder="Tuliskan Keterangan"
            type="text"
            register={register('keterangan', {
              required: 'Keterangan wajib diisi',
            })}
            error={errors.keterangan}
          />
          <ButtonType
            Text={isEditing ? '+ Perbarui Kode Temuan' : '+ Simpan Kode Temuan'}
            type="submit"
          />
          {isEditing && (
            <button type="button" onClick={handleCancelEdit}>
              Batal
            </button>
          )}
        </form>
      </CardComponents>
      <section className="grid grid-cols-2 gap-3">
        {DataKodeTemuan.map((item) => (
          <CardComponents key={item.id}>
            <h3 className="text-xl font-bold">
              {'>>'} {item.kode_temuan}
            </h3>
            <p>{item.keterangan}</p>
            <button
              onClick={() =>
                handleEdit(item.id, item.kode_temuan, item.keterangan)
              }
              className="py-2 text-center w-full rounded-md shadow-md bg-blue-500 hover:bg-blue-700 text-white font-semibold"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              className="py-2 text-center w-full rounded-md shadow-md bg-red-500 hover:bg-red-700 text-white font-semibold"
            >
              Hapus
            </button>
          </CardComponents>
        ))}
      </section>
    </div>
  );
};

export default KodeTemuan;
