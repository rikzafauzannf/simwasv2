'use client';
import { ButtonType } from '@/app/components/Global/Button';
import { CardComponents } from '@/app/components/Global/Card';
import { InputFieldComponent } from '@/app/components/Global/Input';
import { FormTindakLanjut } from '@/interface/interfaceTindakLanjut';
import React from 'react';
import { useForm } from 'react-hook-form';

interface PageProps {
  params: {
    id_tlhp: number;
  };
}

const TndakLanjutFormPage: React.FC<PageProps> = ({ params }) => {
  const id_tlhp = params.id_tlhp;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormTindakLanjut>({
    defaultValues: {
      uraian: '',
      keterangan: '',
      kondisi_rekomendasi: '',
      kondisi_temuan: '',
    },
    mode: 'onBlur',
  });
  return (
    <div className="space-y-3">
      <h3 className="text-xl">Tindak Lanjut {id_tlhp}</h3>
      <CardComponents>
        <form className="grid grid-cols-2 gap-3 w-full">
          <div className="col-span-2">
            <InputFieldComponent
              label="Uraian"
              identiti="uraian"
              type="text"
              name="Uraian"
              placeholder="Tuliskan Uraian Tindak Lanjut"
              register={register('uraian', {
                required: 'Uraian Tindak Lanjut wajib diisi',
              })}
              error={errors.uraian}
            />
          </div>
          <InputFieldComponent
            label="Nilai Setor"
            identiti="nilai_setor"
            type="number"
            name="nilai_setor"
            placeholder="Masukan Nulai Retoran"
            register={register('nilai_setor', {
              required: 'Nilai Setor Tindak Lanjut wajib diisi',
            })}
            error={errors.nilai_setor}
          />
          <InputFieldComponent
            label="Kondisi temuan"
            identiti="kondisi_temuan"
            type="text"
            name="kondisi_temuan"
            placeholder="Tuliskan Kondisi Temuan Tindak Lanjut"
            register={register('kondisi_temuan', {
              required: 'Kondisi Temuan Tindak Lanjut wajib diisi',
            })}
            error={errors.kondisi_temuan}
          />
          <InputFieldComponent
            label="Kondisi Rekomendasi"
            identiti="kondisi_rekomendasi"
            type="text"
            name="kondisi_rekomendasi"
            placeholder="Tuliskan Kondisi Rekomendasi Tindak Lanjut"
            register={register('kondisi_rekomendasi', {
              required: 'Kondisi Rekomendasi Tindak Lanjut wajib diisi',
            })}
            error={errors.kondisi_rekomendasi}
          />
          <InputFieldComponent
            label="Sisa Nominal"
            identiti="sisa_nominal"
            type="number"
            name="sisa_nominal"
            placeholder="Tuliskan Sisa Nominal Tindak Lanjut"
            register={register('sisa_nominal', {
              required: 'Sisa Nominal Tindak Lanjut wajib diisi',
            })}
            error={errors.sisa_nominal}
          />
          <InputFieldComponent
            label="Tanggal Pengiriman"
            identiti="tanggal_pengiriman"
            type="date"
            name="tanggal_pengiriman"
            placeholder="Tentukan Tanggal Pengiriman Tindak Lanjut"
            register={register('tanggal_pengiriman', {
              required: 'Tanggal Pengiriman Tindak Lanjut wajib diisi',
            })}
            error={errors.tanggal_pengiriman}
          />
          <InputFieldComponent
            label="Batas Akhir Tl"
            identiti="batas_akhir_tl"
            type="number"
            name="batas_akhir_tl"
            placeholder="Tentukan Batas Akhir Tindak Lanjut"
            register={register('batas_akhit_tl', {
              required: 'Batas Akhir Tindak Lanjut wajib diisi',
            })}
            error={errors.batas_akhit_tl}
          />
          <div className="col-span-2">
            <InputFieldComponent
              label="Keterangan"
              identiti="keterangan"
              type="text"
              name="keterangan"
              placeholder="Tuliskan Keterangan Tindak Lanjut"
              register={register('keterangan', {
                required: 'Keterangan Tindak Lanjut wajib diisi',
              })}
              error={errors.keterangan}
            />
          </div>
          <ButtonType type="submit" Text="Buat Tindak Lanjut" />
        </form>
      </CardComponents>
    </div>
  );
};

export default TndakLanjutFormPage;
