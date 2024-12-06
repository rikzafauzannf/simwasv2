'use client';
import { ButtonType } from '@/app/components/Global/Button';
import { CardComponents } from '@/app/components/Global/Card';
import { InputFieldComponent } from '@/app/components/Global/Input';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FirestoreService } from '@/services/firestore.service';
import { JenisPengawasanDB } from '@/interface/interfaceReferensi';
import { useFetch } from '@/hooks/useFetch';
import { AxiosService } from '@/services/axiosInstance.service';
import { useFetchAll } from '@/hooks/useFetchAll';


const axiosService = new AxiosService();
const JenisPengawasan = () => {
  const {
    data: DataJenisPengawasan,
    isLoading,
    error,
    refetch,
  } = useFetchAll<JenisPengawasanDB>('/jenis_pengawasan');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      jenis_pengawasan: '',
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const onSubmit: SubmitHandler<{ jenis_pengawasan: string }> = async (
    data
  ) => {
    try {
      console.log('Data yang dikirim:', data);
      const result = await axiosService.addData("/jenis_pengawasan", {
        jenis_pengawasan: data.jenis_pengawasan,
      });

      console.log('Respons dari server:', result);

      if (result.success) {
        console.log('Jenis Pengawasan berhasil disimpan:', result);
        reset();
        alert('Data Jenis Pengawasan berhasil disimpan');
        refetch();
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
        console.error('Error deleting jenis pengawasan:', error);
        alert('Gagal menghapus jenis pengawasan');
      }
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-xl"># Jenis Pengawasan</h3>
      <CardComponents>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
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
          <ButtonType Text="+ Simpan Jenis Pengawasan" type="submit" />
        </form>
      </CardComponents>
      <section className="grid grid-cols-2 gap-3">
        {DataJenisPengawasan.map((item) => (
          <CardComponents key={item.id}>
            <h3 className="text-xl font-bold">
              {'>>'} {item.jenis_pengawasan}
            </h3>
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

export default JenisPengawasan;
