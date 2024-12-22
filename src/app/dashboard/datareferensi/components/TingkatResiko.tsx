'use client';
import { ButtonType } from '@/app/components/Global/Button';
import { CardComponents } from '@/app/components/Global/Card';
import { InputFieldComponent } from '@/app/components/Global/Input';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TingkatResikoDB } from '@/interface/interfaceReferensi';
import { AxiosService } from '@/services/axiosInstance.service';
import { useFetch } from '@/hooks/useFetch';

const axiosService = new AxiosService();

const TingkatResiko = () => {
  const { data: DataTingkatResiko, refetch } =
    useFetch<TingkatResikoDB>('tingkat_resiko');
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tingkat_resiko: '',
    },
  });

  const [isEditing, setIsEditing] = React.useState(false);
  const [currentEditId, setCurrentEditId] = React.useState<number | null>(null);
  const [currentEditValue, setCurrentEditValue] = React.useState<string>('');

  const onSubmit: SubmitHandler<{ tingkat_resiko: string }> = async (data) => {
    try {
      const result = await axiosService.addData('/tingkat_resiko', data);
      if (result.success) {
        alert('Data Tingkat Resiko berhasil disimpan');
        reset();
        refetch();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      alert('Gagal menyimpan data Tingkat Resiko');
    }
  };

  const onEditSubmit: SubmitHandler<{ tingkat_resiko: string }> = async (
    data
  ) => {
    try {
      const result = await axiosService.updateData(
        `/tingkat_resiko/${currentEditId}`,
        data
      );
      if (result.success) {
        alert('Data Tingkat Resiko berhasil diperbarui');
        reset();
        refetch();
        handleCancelEdit();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      alert('Gagal memperbarui data Tingkat Resiko');
    }
  };

  const handleDelete = async (id: string) => {
    if (
      window.confirm('Apakah Anda yakin ingin menghapus tingkat resiko ini?')
    ) {
      try {
        const result = await axiosService.deleteData(
          `/tingkat_resiko/${Number(id)}`
        );
        if (result.success) {
          alert('Tingkat Resiko berhasil dihapus');
          refetch();
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        alert('Gagal menghapus tingkat resiko');
      }
    }
  };

  const handleEdit = (id: number, value: string) => {
    setIsEditing(true);
    setCurrentEditId(Number(id));
    setValue('tingkat_resiko', value);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentEditId(null);
    setCurrentEditValue('');
    reset();
  };

  return (
    <div className="space-y-3">
      <h3 className="text-xl"># Tingkat Resiko</h3>
      <CardComponents>
        <form
          onSubmit={
            isEditing ? handleSubmit(onEditSubmit) : handleSubmit(onSubmit)
          }
          className="grid gap-3"
        >
          <InputFieldComponent
            label="Tingkat Resiko"
            identiti="tingkat_resiko"
            name="tingkat_resiko"
            placeholder="Tuliskan Tingkat Resiko"
            type="text"
            register={register('tingkat_resiko', {
              required: 'Tingkat Resiko wajib diisi',
            })}
            error={errors.tingkat_resiko}
          />
          <ButtonType
            Text={
              isEditing
                ? '+ Perbarui Tingkat Resiko'
                : '+ Simpan Tingkat Resiko'
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
      <section className="grid grid-cols-2 gap-3">
        {DataTingkatResiko.map((item) => (
          <CardComponents key={item.id_tingkat_resiko}>
            <h3 className="text-xl font-bold">
              {'>>'} {item.tingkat_resiko}
            </h3>
            <button
              onClick={() =>
                handleEdit(Number(item.id_tingkat_resiko), item.tingkat_resiko)
              }
              className="py-2 text-center w-full rounded-md shadow-md bg-blue-500 hover:bg-blue-700 text-white font-semibold"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(item.id_tingkat_resiko)}
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

export default TingkatResiko;
