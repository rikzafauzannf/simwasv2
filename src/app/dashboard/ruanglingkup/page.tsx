'use client';
import { ButtonType } from '@/app/components/Global/Button';
import { CardComponents } from '@/app/components/Global/Card';
import { InputFieldComponent } from '@/app/components/Global/Input';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FirestoreService } from '@/services/firestore.service';
import { useFetch } from '@/hooks/useFetch';
import { RuangLingkupDB } from '@/interface/interfaceReferensi';
import { AxiosService } from '@/services/axiosInstance.service';
import { useFetchAll } from '@/hooks/useFetchAll';
import AuthRoleWrapper from '@/middleware/HOC/withRoleWrapper';

const axiosService = new AxiosService();

const RuangLingkup = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentEditId, setCurrentEditId] = React.useState<number | null>(null);
  const [currentEditValue, setCurrentEditValue] = React.useState<string>('');

  const {
    data: DataRuangLingkup,
    isLoading,
    error,
    refetch,
  } = useFetchAll<RuangLingkupDB>('/ruang_lingkup');
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ruang_lingkup: '',
    },
  });

  React.useEffect(() => {
    if (isEditing) {
      setValue('ruang_lingkup', currentEditValue);
    } else {
      reset();
    }
  }, [isEditing, currentEditValue, reset, setValue]);

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  const onSubmit: SubmitHandler<{ ruang_lingkup: string }> = async (data) => {
    try {
      const result = await axiosService.addData('/ruang_lingkup', {
        ruang_lingkup: data.ruang_lingkup,
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
        const result = await axiosService.deleteData(`/ruang_lingkup/${id}`);
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

  const handleEdit = (id: number, value: string) => {
    setIsEditing(true);
    setCurrentEditId(id);
    setCurrentEditValue(value);
  };

  const onEditSubmit: SubmitHandler<RuangLingkupDB> = async (data) => {
    try {
      const result = await axiosService.updateData(
        `/ruang_lingkup/${currentEditId}`,
        {
          ruang_lingkup: data.ruang_lingkup,
        }
      );

      if (result.success) {
        console.log('Ruang Lingkup berhasil diperbarui:', result);
        reset(); // Reset form after successful submission
        alert('Data Ruang Lingkup berhasil diperbarui');
        refetch(); // Refetch data to update the list
        setIsEditing(false);
        setCurrentEditId(null);
        setCurrentEditValue('');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error updating form:', error);
      alert('Gagal memperbarui data Ruang Lingkup');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentEditId(null);
    setCurrentEditValue('');
    reset(); // Reset form saat membatalkan edit
  };

  return (
    <AuthRoleWrapper allowedRoles={['Admin', 'Perencana', 'Developer']}>
      <div className="space-y-3">
        <h3 className="text-xl"># Ruang Lingkup</h3>
        <CardComponents>
          <form
            onSubmit={
              isEditing
                ? handleSubmit(
                    onEditSubmit as SubmitHandler<{ ruang_lingkup: string }>
                  )
                : handleSubmit(onSubmit)
            }
            className="grid gap-3"
          >
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
            <ButtonType
              Text={
                isEditing
                  ? '+ Perbarui Ruang Lingkup'
                  : '+ Simpan Ruang Lingkup'
              }
              type="submit"
            />
            {isEditing && ( // Tambahkan tombol Batal hanya saat dalam mode editing
              <button
                type="button"
                onClick={handleCancelEdit}
                className="py-2 text-center w-full rounded-md shadow-md bg-gray-500 hover:bg-gray-700 text-white font-semibold"
              >
                Batal
              </button>
            )}
          </form>
        </CardComponents>
        <section className="grid lg:grid-cols-2 gap-3">
          {DataRuangLingkup.map((item) => (
            <CardComponents key={item.id_ruang_lingkup}>
              <h3 className="text-xl font-bold">
                {'>>'} {item.ruang_lingkup}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() =>
                    handleEdit(item.id_ruang_lingkup, item.ruang_lingkup)
                  }
                  className="py-2 text-center w-full rounded-md shadow-md bg-blue-500 hover:bg-blue-700 text-white font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id_ruang_lingkup)}
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

export default RuangLingkup;
