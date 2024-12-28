'use client';
import { ButtonType } from '@/app/components/Global/Button';
import { CardComponents } from '@/app/components/Global/Card';
import { InputFieldComponent } from '@/app/components/Global/Input';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  FormKodeRekomendasi,
  FormKodeTemuan,
  KodeRekomendasiData,
  KodeTemuanDB,
} from '@/interface/interfaceReferensi';
import { AxiosService } from '@/services/axiosInstance.service';
import { useFetch } from '@/hooks/useFetch';

const axiosService = new AxiosService();

const KodeRekomendasi = () => {
  const { data: DataKodeRekomendasi, refetch } =
    useFetch<KodeRekomendasiData>('/kode_rekomendasi');
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormKodeRekomendasi>({
    defaultValues: {
      kode_rekomendasi: '',
      keterangan_kode: '',
    },
  });

  const [isEditing, setIsEditing] = React.useState(false);
  const [currentEditId, setCurrentEditId] = React.useState<number | null>(null);

  const onSubmit: SubmitHandler<FormKodeRekomendasi> = async (data) => {
    try {
      const result = await axiosService.addData('/kode_rekomendasi', data);
      if (result.success) {
        alert('Data Kode Rekomendasi berhasil disimpan');
        reset();
        refetch();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      alert('Gagal menyimpan data Kode Rekomendasi');
    }
  };

  const onEditSubmit: SubmitHandler<FormKodeRekomendasi> = async (data) => {
    try {
      const result = await axiosService.updateData(
        `/kode_rekomendasi/${currentEditId}`,
        data
      );
      if (result.success) {
        alert('Data Kode Rekomendasi berhasil diperbarui');
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
    if (
      window.confirm('Apakah Anda yakin ingin menghapus Kode Rekomendasi ini?')
    ) {
      try {
        const result = await axiosService.deleteData(`/kode_rekomendasi/${id}`);
        if (result.success) {
          alert('Kode Rekomendasi berhasil dihapus');
          refetch();
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        alert('Gagal menghapus Kode Rekomendasi');
      }
    }
  };

  const handleEdit = (id: number, value: string, keterangan: string) => {
    setIsEditing(true);
    setCurrentEditId(id);
    setValue('kode_rekomendasi', value);
    setValue('keterangan_kode', keterangan);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentEditId(null);
    reset();
  };

  return (
    <div className="space-y-3">
      <h3 className="text-xl"># Kode Rekomendasi</h3>
      <CardComponents>
        <form
          onSubmit={
            isEditing ? handleSubmit(onEditSubmit) : handleSubmit(onSubmit)
          }
          className="grid gap-3"
        >
          <InputFieldComponent
            label="Kode Rekomendasi"
            identiti="kode_rekomendasi"
            name="kode_temuan"
            placeholder="Kode Rekomendasi"
            type="text"
            register={register('kode_rekomendasi', {
              required: 'Kode Rekomendasi wajib diisi',
            })}
            error={errors.kode_rekomendasi}
          />
          <InputFieldComponent
            label="Keterangan"
            identiti="keterangan"
            name="keterangan"
            placeholder="Tuliskan Keterangan"
            type="text"
            register={register('keterangan_kode', {
              required: 'Keterangan wajib diisi',
            })}
            error={errors.keterangan_kode}
          />
          <ButtonType
            Text={
              isEditing
                ? '+ Perbarui Kode Rekomendasi'
                : '+ Simpan Kode Rekomendasi'
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
        {DataKodeRekomendasi.map((item) => (
          <CardComponents key={item.id_kode_rekomendasi}>
            <h3 className="text-xl font-bold">
              {'>>'} {item.kode_rekomendasi}
            </h3>
            <p>{item.keterangan_kode}</p>
            <button
              onClick={() =>
                handleEdit(
                  item.id_kode_rekomendasi,
                  item.kode_rekomendasi,
                  item.keterangan_kode
                )
              }
              className="py-2 text-center w-full rounded-md shadow-md bg-blue-500 hover:bg-blue-700 text-white font-semibold"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(item.id_kode_rekomendasi)}
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

export default KodeRekomendasi;
