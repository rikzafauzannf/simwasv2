'use client';
import { ButtonType } from '@/app/components/Global/Button';
import { CardComponents } from '@/app/components/Global/Card';
import { InputFieldComponent } from '@/app/components/Global/Input';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  FormKodeReferensi,
  FormKodeRekomendasi,
  FormKodeTemuan,
  KodeReferensiData,
  KodeRekomendasiData,
  KodeTemuanDB,
} from '@/interface/interfaceReferensi';
import { AxiosService } from '@/services/axiosInstance.service';
import { useFetch } from '@/hooks/useFetch';

const axiosService = new AxiosService();

const KodeReferensi = () => {
  const { data: DataKodeReferensi, refetch } =
    useFetch<KodeReferensiData>('/kode_referensi');
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormKodeReferensi>({
    defaultValues: {
      kode_referensi: '',
      keterangan_kode: '',
    },
  });

  const [isEditing, setIsEditing] = React.useState(false);
  const [currentEditId, setCurrentEditId] = React.useState<number | null>(null);

  const onSubmit: SubmitHandler<FormKodeReferensi> = async (data) => {
    try {
      const result = await axiosService.addData('/kode_referensi', data);
      if (result.success) {
        alert('Data Kode Referensi berhasil disimpan');
        reset();
        refetch();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      alert('Gagal menyimpan data Kode Referensi');
    }
  };

  const onEditSubmit: SubmitHandler<FormKodeReferensi> = async (data) => {
    try {
      const result = await axiosService.updateData(
        `/kode_referensi/${currentEditId}`,
        data
      );
      if (result.success) {
        alert('Data Kode Referensi berhasil diperbarui');
        reset();
        refetch();
        handleCancelEdit();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      alert('Gagal memperbarui data Kode Referensi');
    }
  };

  const handleDelete = async (id: number) => {
    if (
      window.confirm('Apakah Anda yakin ingin menghapus Kode Referensi ini?')
    ) {
      try {
        const result = await axiosService.deleteData(`/kode_referensi/${id}`);
        if (result.success) {
          alert('Kode Referensi berhasil dihapus');
          refetch();
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        alert('Gagal menghapus Kode Referensi');
      }
    }
  };

  const handleEdit = (id: number, value: string, keterangan: string) => {
    setIsEditing(true);
    setCurrentEditId(id);
    setValue('kode_referensi', value);
    setValue('keterangan_kode', keterangan);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentEditId(null);
    reset();
  };

  return (
    <div className="space-y-3">
      <h3 className="text-xl"># Kode Referensi</h3>
      <CardComponents>
        <form
          onSubmit={
            isEditing ? handleSubmit(onEditSubmit) : handleSubmit(onSubmit)
          }
          className="grid gap-3"
        >
          <InputFieldComponent
            label="Kode Referensi"
            identiti="kode_referensi"
            name="kode_temuan"
            placeholder="Kode Referens"
            type="text"
            register={register('kode_referensi', {
              required: 'Kode Referensi wajib diisi',
            })}
            error={errors.kode_referensi}
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
                ? '+ Perbarui Kode Referensi'
                : '+ Simpan Kode Referensi'
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
        {DataKodeReferensi.map((item) => (
          <CardComponents key={item.id_kode_referensi}>
            <h3 className="text-xl font-bold">
              {'>>'} {item.kode_referensi}
            </h3>
            <p>{item.keterangan_kode}</p>
            <button
              onClick={() =>
                handleEdit(
                  item.id_kode_referensi,
                  item.kode_referensi,
                  item.keterangan_kode
                )
              }
              className="py-2 text-center w-full rounded-md shadow-md bg-blue-500 hover:bg-blue-700 text-white font-semibold"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(item.id_kode_referensi)}
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

export default KodeReferensi;
