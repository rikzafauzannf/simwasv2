'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CardComponents } from '../../Global/Card';
import { InputFieldComponent } from '../../Global/Input';
import { ButtonType } from '../../Global/Button';
import { AxiosService } from '@/services/axiosInstance.service';
import { FormKendaliMutu } from '@/interface/interfaceKendaliMutu';
import { useRouter } from 'next/navigation';

interface PropsID {
  id_pkpt: number;
}

const axiosService = new AxiosService();

const InputKendaliMutu: React.FC<PropsID> = ({ id_pkpt }) => {
  console.log('id_pkpt data: ', id_pkpt);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormKendaliMutu>({
    defaultValues: {
      ceklis_penyelesaian: false,
      dokumentasi_pemeriksaan: false,
      kartu_penugasan: false,
      kertas_kerja_pengawasan: false,
      notulensi_kesepakatan: false,
      program_kerja_pengawasan: false,
      reviu_supervisi: false,
      link_google_drive: '',
      id_no_tg: '',
    },
  });

  const onSubmitKendaliMutu: SubmitHandler<FormKendaliMutu> = async (data) => {
    // const selectedCheckboxes = Object.keys(data).filter(
    //   (key) => key !== 'linkGDrive' && key !== 'keterangan' && data[key]
    // );

    console.log('Data Kendali Mutu:', {
      ...data,
      // selectedCheckboxes,
      id_pkpt_data: id_pkpt,
    });
    try {
      console.log('Data Laporan Mingguan:', data);
      const result = await axiosService.addData('/kendali_mutu', {
        kartu_penugasan: String(data.kartu_penugasan),
        kertas_kerja_pengawasan: String(data.kertas_kerja_pengawasan),
        ceklis_penyelesaian: String(data.ceklis_penyelesaian),
        program_kerja_pengawasan: String(data.program_kerja_pengawasan),
        dokumentasi_pemeriksaan: String(data.dokumentasi_pemeriksaan),
        notulensi_kesepakatan: String(data.notulensi_kesepakatan),
        reviu_supervisi: String(data.reviu_supervisi),
        link_google_drive: data.link_google_drive,
        id_no_tg: data.id_no_tg,
        id_pkpt: Number(id_pkpt),
      });

      console.log('Respons dari server:', result);

      if (result.success) {
        console.log('Kendali Mutu berhasil disimpan:', result);
        reset();
        alert('Data Kendali Mutu berhasil disimpan');
        router.push('/dashboard/pelaksanaan/kendalimutu');
      } else {
        throw new Error(result.message);
        // refetch();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Gagal menyimpan data Kendali Mutu');
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-xl">Kendali Mutu</h3>
      {/* <CardComponents>
        <SelectInputField
          label="Pilih Surat Tugas"
          identiti="pilihSuratTugas"
          options={optionsSuratTugas}
          register={'pilihSuratTugas'}
          placeholder="Pilih Surat Tugas Tujuan"
          // error={errors.JenisPengawasan}
          type="select"
          name="pilihSuratTugas"
        />
      </CardComponents> */}

      <CardComponents>
        <form
          onSubmit={handleSubmit(onSubmitKendaliMutu)}
          className="space-y-3"
        >
          <section className="grid md:grid-cols-3 gap-3">
            <div className="md:col-span-3">
              <InputFieldComponent
                label="No.Tgl"
                identiti="no_tgl"
                type="text"
                name="no_tgl"
                placeholder="Masukan Nomor Tgl"
                register={register('id_no_tg', {
                  required: 'Nomor Tgl wajib diisi',
                })}
                error={errors.id_no_tg}
              />
            </div>
            <label className="text-slate-800">
              <input
                type="checkbox"
                {...register('kartu_penugasan')}
                className="shadow-md me-2"
              />
              Kartu Penugasan
            </label>
            <label className="text-slate-800">
              <input
                type="checkbox"
                {...register('program_kerja_pengawasan')}
                className="shadow-md me-2"
              />
              Program Kerja Pengawasan
            </label>
            <label className="text-slate-800">
              <input
                type="checkbox"
                {...register('notulensi_kesepakatan')}
                className="shadow-md me-2"
              />
              Notulensi Kesepakatan
            </label>
            <label className="text-slate-800">
              <input
                type="checkbox"
                {...register('kertas_kerja_pengawasan')}
                className="shadow-md me-2"
              />
              Kertas Kerja Pengawasan
            </label>
            <label className="text-slate-800">
              <input
                type="checkbox"
                {...register('dokumentasi_pemeriksaan')}
                className="shadow-md me-2"
              />
              Dokumentasi Pemeriksaan
            </label>
            <label className="text-slate-800">
              <input
                type="checkbox"
                {...register('reviu_supervisi')}
                className="shadow-md me-2"
              />
              Reviu Supervisi
            </label>
            <label className="text-slate-800">
              <input
                type="checkbox"
                {...register('ceklis_penyelesaian')}
                className="shadow-md me-2"
              />
              Ceklis Penyelesaian
            </label>
          </section>
          <hr />
          <InputFieldComponent
            label="Masukan Link Google Drive (Public)"
            identiti="linkGDrive"
            name="linkGDrive"
            placeholder="Masukan Link GDrive"
            type="link"
            register={register('link_google_drive')}
            error={errors.link_google_drive}
          />
          <ButtonType Text="+ Buat Kendali Mutu" type="submit" />
        </form>
      </CardComponents>
    </div>
  );
};

export default InputKendaliMutu;
