'use client';
import { ButtonType } from '@/app/components/Global/Button';
import { CardComponents } from '@/app/components/Global/Card';
import { InputFieldComponent } from '@/app/components/Global/Input';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { JenisPengawasanDB } from '@/interface/interfaceReferensi';
import { AxiosService } from '@/services/axiosInstance.service';
import { useFetchAll } from '@/hooks/useFetchAll';

const axiosService = new AxiosService();

const JenisPengawasan = () => {
  const { data: DataJenisPengawasan, refetch } =
    useFetchAll<JenisPengawasanDB>('/jenis_pengawasan');
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      jenis_pengawasan: '',
    },
  });

  const [isEditing, setIsEditing] = React.useState(false);
  const [currentEditId, setCurrentEditId] = React.useState<number | null>(null);

  const onSubmit: SubmitHandler<{ jenis_pengawasan: string }> = async (
    data
  ) => {
    try {
      const result = await axiosService.addData('/jenis_pengawasan', data);
      if (result.success) {
        alert('Data Jenis Pengawasan berhasil disimpan');
        reset();
        refetch();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      alert('Gagal menyimpan data Jenis Pengawasan');
    }
  };

  const onEditSubmit: SubmitHandler<{ jenis_pengawasan: string }> = async (
    data
  ) => {
    try {
      const result = await axiosService.updateData(
        `/jenis_pengawasan/${currentEditId}`,
        data
      );
      if (result.success) {
        alert('Data Jenis Pengawasan berhasil diperbarui');
        reset();
        refetch();
        handleCancelEdit();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      alert('Gagal memperbarui data Jenis Pengawasan');
    }
  };

  const handleDelete = async (id: number) => {
    if (
      window.confirm('Apakah Anda yakin ingin menghapus jenis pengawasan ini?')
    ) {
      try {
        const result = await axiosService.deleteData(`/jenis_pengawasan/${id}`);
        if (result.success) {
          alert('Jenis Pengawasan berhasil dihapus');
          refetch();
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        alert('Gagal menghapus jenis pengawasan');
      }
    }
  };

  const handleEdit = (id: number, value: string) => {
    setIsEditing(true);
    setCurrentEditId(id);
    setValue('jenis_pengawasan', value);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentEditId(null);
    reset();
  };

  return (
    <div className="space-y-3">
      <h3 className="text-xl"># Jenis Pengawasan</h3>
      <CardComponents>
        <form
          onSubmit={
            isEditing ? handleSubmit(onEditSubmit) : handleSubmit(onSubmit)
          }
          className="grid gap-3"
        >
          <InputFieldComponent
            label="Jenis Pengawasan"
            identiti="jenis_pengawasan"
            name="jenis_pengawasan"
            placeholder="Tuliskan Jenis Pengawasan"
            type="text"
            register={register('jenis_pengawasan', {
              required: 'Jenis Pengawasan wajib diisi',
            })}
            error={errors.jenis_pengawasan}
          />
          <ButtonType
            Text={
              isEditing
                ? '+ Perbarui Jenis Pengawasan'
                : '+ Simpan Jenis Pengawasan'
            }
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
        {DataJenisPengawasan.map((item) => (
          <CardComponents key={item.id_jenis_pengawasan}>
            <h3 className="text-xl font-bold">
              {'>>'} {item.jenis_pengawasan}
            </h3>
            <div className='grid grid-cols-2 gap-3'>
            <button
              onClick={() =>
                handleEdit(item.id_jenis_pengawasan, item.jenis_pengawasan)
              }
              className="py-2 text-center w-full rounded-md shadow-md bg-blue-500 hover:bg-blue-700 text-white font-semibold"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(item.id_jenis_pengawasan)}
              className="py-2 text-center w-full rounded-md shadow-md bg-red-500 hover:bg-red-700 text-white font-semibold"
            >
              Hapus
            </button>
            </div>
          </CardComponents>
        ))}
      </section>
    </div>
  );
};

export default JenisPengawasan;
