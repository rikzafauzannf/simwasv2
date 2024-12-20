'use client';
import { ButtonType } from '@/app/components/Global/Button';
import { CardComponents } from '@/app/components/Global/Card';
import { InputFieldComponent } from '@/app/components/Global/Input';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useFetch } from '@/hooks/useFetch';
import { TingkatResikoDB } from '@/interface/interfaceReferensi';
import { AxiosService } from '@/services/axiosInstance.service';

const axiosSecvice = new AxiosService();
const TingkatResiko = () => {
  const {
    data: DataTingkatResiko,
    isLoading,
    error,
    refetch,
  } = useFetch<TingkatResikoDB>('tingkat_resiko');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tingkat_resiko: '',
    },
  });

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  const onSubmit: SubmitHandler<{ tingkat_resiko: string }> = async (data) => {
    try {
      const result = await axiosSecvice.addData('/tingkat_resiko', {
        tingkat_resiko: data.tingkat_resiko,
        // createdAt: new Date(),
      });

      if (result.success) {
        console.log('Ruang Lingkup berhasil disimpan:', result);
        reset(); // Reset form after successful submission
        alert('Data Ruang Lingkup berhasil disimpan');
        refetch(); // Refetch data to update the list
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Gagal menyimpan data Jenis Pengawasan');
    }
  };

  const handleDelete = async (id: string) => {
    if (
      window.confirm('Apakah Anda yakin ingin menghapus ruang lingkup ini?')
    ) {
      try {
        const result = await axiosSecvice.deleteData(`/tingkat_resiko/${id}`);
        if (result.success) {
          alert('Ruang Lingkup berhasil dihapus');
          refetch(); // Refetch data to update the list
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        console.error('Error deleting ruang lingkup:', error);
        alert('Gagal menghapus ruang lingkup');
      }
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-xl"># Tingkat Resiko</h3>
      <CardComponents>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
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
          <ButtonType Text="+ Simpan Tingkat Resiko" type="submit" />
        </form>
      </CardComponents>
      <section className="grid grid-cols-2 gap-3">
        {DataTingkatResiko.map((item) => (
          <CardComponents key={item.id_tingkat_resiko}>
            <h3 className="text-xl font-bold">
              {'>>'} {item.tingkat_resiko}
            </h3>
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
