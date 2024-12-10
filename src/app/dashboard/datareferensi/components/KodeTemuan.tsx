'use client';
import { ButtonType } from '@/app/components/Global/Button';
import { CardComponents } from '@/app/components/Global/Card';
import { InputFieldComponent } from '@/app/components/Global/Input';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useFetch } from '@/hooks/useFetch';
import { AxiosService } from '@/services/axiosInstance.service';
import { KodeTemuanDB } from '@/interface/interfaceReferensi';

const axiosSecvice = new AxiosService();
const KodeTemuan = () => {
  const {
    data: DataKodeTemuan,
    isLoading,
    error,
    refetch,
  } = useFetch<KodeTemuanDB>('/kode_temuan');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      kode_temuan: '',
      keterangan:''
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const onSubmit: SubmitHandler<{ kode_temuan: string,keterangan:string }> = async (data) => {
    try {
      const result = await axiosSecvice.addData('/kode_temuan', {
        kode_temuan: data.kode_temuan,
        keterangan: data.keterangan,
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

  const handleDelete = async (id: number) => {
    if (
      window.confirm('Apakah Anda yakin ingin menghapus ruang lingkup ini?')
    ) {
      try {
        const result = await axiosSecvice.deleteData(`/kode_temuan/${id}`);
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
      <h3 className="text-xl"># Kode Temuan</h3>
      <CardComponents>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
          <section className='grid md:grid-cols-3 gap-3 w-full'>
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
            <div className='md:col-span-2'>
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
            </div>
          </section>
          
          <ButtonType Text="+ Simpan Kode Temuan" type="submit" />
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
