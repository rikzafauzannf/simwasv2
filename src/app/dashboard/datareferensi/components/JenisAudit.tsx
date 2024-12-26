'use client';
import { ButtonType } from '@/app/components/Global/Button';
import { CardComponents } from '@/app/components/Global/Card';
import { InputFieldComponent } from '@/app/components/Global/Input';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { AxiosService } from '@/services/axiosInstance.service';
import { useFetchAll } from '@/hooks/useFetchAll';
import { FormJenisAudit, JenisAuditDB } from '@/interface/interfaceReferensi';

const axiosService = new AxiosService();

const JenisAudit = () => {
  const { data: DataJenisAudit, refetch } =
    useFetchAll<JenisAuditDB>('/jenis_audit');
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormJenisAudit>({
    defaultValues: {
      jenis_audit: '',
      keterangan: '',
    },
  });

  const [isEditing, setIsEditing] = React.useState(false);
  const [currentEditId, setCurrentEditId] = React.useState<number | null>(null);

  const onSubmit: SubmitHandler<FormJenisAudit> = async (data) => {
    try {
      const result = await axiosService.addData('jenis_audit', data);
      if (result.success) {
        alert('Data Jenis Audit berhasil disimpan');
        reset();
        refetch();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      alert('Gagal menyimpan data Jenis Audit');
    }
  };

  const onEditSubmit: SubmitHandler<FormJenisAudit> = async (data) => {
    try {
      const result = await axiosService.updateData(
        `/jenis_audit/${currentEditId}`,
        data
      );
      if (result.success) {
        alert('Data Jenis Audit berhasil diperbarui');
        reset();
        refetch();
        handleCancelEdit();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      alert('Gagal memperbarui data Jenis Audit');
    }
  };

  const handleDelete = async (id: number) => {
    if (
      window.confirm('Apakah Anda yakin ingin menghapus jenis audit ini?')
    ) {
      try {
        const result = await axiosService.deleteData(`/jenis_audit/${id}`);
        if (result.success) {
          alert('Jenis Audit berhasil dihapus');
          refetch();
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        alert('Gagal menghapus jenis audit');
      }
    }
  };

  const handleEdit = (id: number, value: string, keterangan: string) => {
    setIsEditing(true);
    setCurrentEditId(id);
    setValue('jenis_audit', value);
    setValue('keterangan', keterangan);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentEditId(null);
    reset();
  };

  return (
    <div className="space-y-3">
      <h3 className="text-xl"># Jenis Laporan</h3>
      <CardComponents>
        <form
          onSubmit={
            isEditing ? handleSubmit(onEditSubmit) : handleSubmit(onSubmit)
          }
          className="grid grid-cols-3 gap-3 w-full"
        >
          <InputFieldComponent
            label="Jenis laporan"
            identiti="jenis_laporan"
            name="jenis_laporan"
            placeholder="Tuliskan Jenis Laporan"
            type="text"
            register={register('jenis_audit', {
              required: 'Jenis audit wajib diisi',
            })}
            error={errors.jenis_audit}
          />
          <div className="col-span-2">
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
          <div className="col-span-3">
            <ButtonType
              Text={
                isEditing
                  ? '+ Perbarui Jenis Laporan'
                  : '+ Simpan Jenis Laporan'
              }
              type="submit"
            />
          </div>
          {isEditing && (
            <button type="button" onClick={handleCancelEdit}>
              Batal
            </button>
          )}
        </form>
      </CardComponents>
      <section className="grid grid-cols-2 gap-3">
        {DataJenisAudit.map((item) => (
          <CardComponents key={item.id_jenis_audit}>
            <h3 className="text-xl font-bold">
              {'>>'} {item.jenis_audit}
            </h3>
            <p>{item.keterangan}</p>
            <button
              onClick={() =>
                handleEdit(
                  item.id_jenis_audit,
                  item.jenis_audit,
                  item.keterangan
                )
              }
              className="py-2 text-center w-full rounded-md shadow-md bg-blue-500 hover:bg-blue-700 text-white font-semibold"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(item.id_jenis_audit)}
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

export default JenisAudit;
