'use client';
import { ButtonType } from '@/app/components/Global/Button';
import { CardComponents } from '@/app/components/Global/Card';
import { InputFieldComponent } from '@/app/components/Global/Input';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FirestoreService } from '@/services/firestore.service';
import { JenisPengawasanDB } from '@/interface/interfaceReferensi';
import { useFetch } from '@/hooks/useFetch';

const firestoreService = new FirestoreService();
const JenisPengawasan = () => {
  const { data: DataJenisPengawasan, isLoading, error, refetch } = useFetch<JenisPengawasanDB>('jenis_pengawasan');
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      jenis_pengawasan: '',
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;  

  const onSubmit: SubmitHandler<{ jenis_pengawasan: string }> = async (data) => {
    try {
      const result = await firestoreService.addData('jenis_pengawasan', {
        jenis_pengawasan: data.jenis_pengawasan,
        createdAt: new Date(),
      });

      if (result.success) {
        console.log('Jenis Pengawasan berhasil disimpan:', result);
        reset(); // Reset form after successful submission
        alert('Data Jenis Pengawasan berhasil disimpan');
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
    if (window.confirm('Apakah Anda yakin ingin menghapus jenis pengawasan ini?')) {
      try {
        const result = await firestoreService.deleteData('jenis_pengawasan', id);
        if (result.success) {
          alert('Jenis Pengawasan berhasil dihapus');
          refetch(); // Refetch data to update the list
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
      <section className='grid grid-cols-2 gap-3'>
        {DataJenisPengawasan.map((item) => (
          <CardComponents key={item.id}>
            <h3 className='text-xl font-bold'>
              {'>>'} {item.jenis_pengawasan}
            </h3>
            <button onClick={() => handleDelete(item.id)} className="py-2 text-center w-full rounded-md shadow-md bg-red-500 hover:bg-red-700 text-white font-semibold">
              Hapus
            </button>
          </CardComponents>
        ))}
      </section>
    </div>
  );
};

export default JenisPengawasan;