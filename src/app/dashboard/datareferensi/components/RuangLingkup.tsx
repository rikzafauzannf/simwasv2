'use client';
import { ButtonType } from '@/app/components/Global/Button';
import { CardComponents } from '@/app/components/Global/Card';
import { InputFieldComponent } from '@/app/components/Global/Input';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FirestoreService } from '@/services/firestore.service';
import { useFetch } from '@/hooks/useFetch';
import { RuangLingkupDB } from '@/interface/interfaceReferensi';

const firestoreService = new FirestoreService();
const RuangLingkup = () => {
  const {
    data: DataRuangLingkup,
    isLoading,
    error,
    refetch,
  } = useFetch<RuangLingkupDB>('ruang_lingkup');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ruang_lingkup: '',
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const onSubmit: SubmitHandler<{ ruang_lingkup: string }> = async (data) => {
    try {
      const result = await firestoreService.addData('ruang_lingkup', {
        ruang_lingkup: data.ruang_lingkup,
        createdAt: new Date(),
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
        const result = await firestoreService.deleteData('ruang_lingkup', id);
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
      <h3 className="text-xl"># Ruang Lingkup</h3>
      <CardComponents>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
          <InputFieldComponent
            label="Ruang Lingkup"
            identiti="ruang_lingkup"
            name="ruang_lingkup"
            placeholder="Tuliskan Ruang Lingkup"
            type="text"
            register={register('ruang_lingkup', {
              required: 'Ruang Lingkup wajib diisi',
            })}
            error={errors.ruang_lingkup}
          />
          <ButtonType Text="+ Simpan Ruang Lingkup" type="submit" />
        </form>
      </CardComponents>
      <section className="grid grid-cols-2 gap-3">
        {DataRuangLingkup.map((item) => (
          <CardComponents key={item.id}>
            <h3 className="text-xl font-bold">
              {'>>'} {item.ruang_lingkup}
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

export default RuangLingkup;
