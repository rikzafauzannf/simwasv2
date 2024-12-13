'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CardComponents } from '../../Global/Card';
import {
  InputFieldComponent,
  SelectInputField,
  TextAreaFieldComponent,
} from '../../Global/Input';
import { ButtonType } from '../../Global/Button';
import LaporanMingguanComponent from '../laporanMingguan';
import TableKendaliMutu from '../table/tableKendaliMutu';
import { AxiosService } from '@/services/axiosInstance.service';
import { FormKendaliMutu } from '@/interface/interfaceKendaliMutu';

interface PropsID {
  id_st: string;
  id_pkpt: number;
}

const axiosService = new AxiosService();

const InputKendaliMutu = ({ id_st, id_pkpt }: PropsID) => {
  const [KendaliMutu, setKendaliMutu] = useState(false);
  const [LaporanMingguan, setLaporanMingguan] = useState(false);

  console.log('id_pkpt data: ', id_pkpt);
  console.log('id_st data: ', id_st);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      kartuPenugasan: false,
      programKerja: false,
      notulensiKesepakatan: false,
      kertasKerja: false,
      dokumentasiPemeriksaan: false,
      reviuSupervisi: false,
      ceklisPenyelesaian: false,
      linkGDrive: '',
      laporan: '',
    },
  });

  const handleKendaliMutu: React.MouseEventHandler<HTMLButtonElement> = () => {
    setKendaliMutu(true);
    setLaporanMingguan(false);
  };
  const handleLaporanMingguan: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setKendaliMutu(false);
    setLaporanMingguan(true);
  };

  const onSubmitKendaliMutu: SubmitHandler<FormKendaliMutu> = async (data) => {
    // const selectedCheckboxes = Object.keys(data).filter(
    //   (key) => key !== 'linkGDrive' && key !== 'keterangan' && data[key]
    // );

    console.log('Data Kendali Mutu:', {
      ...data,
      // selectedCheckboxes,
      id_st_data: id_st,
      id_pkpt_data: id_pkpt,
    });
    try {
      console.log('Data Laporan Mingguan:', data);
      const result = await axiosService.addData('/kendali_mutu', {
        kartu_penugasan: String(data.kartuPenugasan),
        kertas_kerja_pengawasan: String(data.kertasKerja),
        ceklis_penyelesaian: String(data.ceklisPenyelesaian),
        program_kerja_pengawasan: String(data.programKerja),
        dokumentasi_pemeriksaan: String(data.dokumentasiPemeriksaan),
        notulensi_kesepakatan: String(data.notulensiKesepakatan),
        reviu_supervisi: String(data.reviuSupervisi),
        link_google_drive: data.linkGDrive,
        id_no_tg: id_st,
        id_pkpt: id_pkpt,
      });

      console.log('Respons dari server:', result);

      if (result.success) {
        console.log('Kendali Mutu berhasil disimpan:', result);
        reset();
        alert('Data Kendali Mutu berhasil disimpan');
      } else {
        throw new Error(result.message);
        // refetch();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Gagal menyimpan data Kendali Mutu');
    }
  };

  const onSubmitLaporanMingguan: SubmitHandler<FormKendaliMutu> = async (
    data
  ) => {
    try {
      console.log('Data Laporan Mingguan:', data);
      const result = await axiosService.addData('/laporan_mingguan', {
        laporan_mingguan: data.laporan,
        id_no: id_st,
        id_pkpt: id_pkpt,
      });

      console.log('Respons dari server:', result);

      if (result.success) {
        console.log('Laporan Mingguan berhasil disimpan:', result);
        reset();
        alert('Data Laporan Mingguan berhasil disimpan');
      } else {
        throw new Error(result.message);
        // refetch();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Gagal menyimpan data Laporan Mingguan');
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
      <section className="flex justify-start gap-3">
        <button
          className={`py-2 px-4 ${KendaliMutu ? 'bg-[#D9D9D9] text-slate-800' : 'bg-[#14AE5C] text-white'}  rounded-md shadow-md  font-semibold transition-all ease-in-out`}
          onClick={handleKendaliMutu}
        >
          + Input Kendali Mutu
        </button>
        <button
          className={`py-2 px-4 ${LaporanMingguan ? 'bg-[#D9D9D9] text-slate-800' : 'bg-[#114CD6] text-white'}  rounded-md shadow-md font-semibold transition-all ease-in-out`}
          onClick={handleLaporanMingguan}
        >
          + Input Laporan Mingguan
        </button>
      </section>
      {/* section show from button */}
      {KendaliMutu ? (
        <CardComponents>
          <form
            onSubmit={handleSubmit(onSubmitKendaliMutu)}
            className="space-y-3"
          >
            <section className="grid grid-cols-3 gap-3">
              <label className="text-slate-800">
                <input
                  type="checkbox"
                  {...register('kartuPenugasan')}
                  className="shadow-md me-2"
                />
                Kartu Penugasan
              </label>
              <label className="text-slate-800">
                <input
                  type="checkbox"
                  {...register('programKerja')}
                  className="shadow-md me-2"
                />
                Program Kerja Pengawasan
              </label>
              <label className="text-slate-800">
                <input
                  type="checkbox"
                  {...register('notulensiKesepakatan')}
                  className="shadow-md me-2"
                />
                Notulensi Kesepakatan
              </label>
              <label className="text-slate-800">
                <input
                  type="checkbox"
                  {...register('kertasKerja')}
                  className="shadow-md me-2"
                />
                Kertas Kerja Pengawasan
              </label>
              <label className="text-slate-800">
                <input
                  type="checkbox"
                  {...register('dokumentasiPemeriksaan')}
                  className="shadow-md me-2"
                />
                Dokumentasi Pemeriksaan
              </label>
              <label className="text-slate-800">
                <input
                  type="checkbox"
                  {...register('reviuSupervisi')}
                  className="shadow-md me-2"
                />
                Reviu Supervisi
              </label>
              <label className="text-slate-800">
                <input
                  type="checkbox"
                  {...register('ceklisPenyelesaian')}
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
              register={register('linkGDrive')}
              error={errors.linkGDrive}
            />
            <ButtonType Text="+ Buat Kendali Mutu" type="submit" />
          </form>
        </CardComponents>
      ) : (
        ''
      )}
      {LaporanMingguan ? (
        <CardComponents>
          <form
            onSubmit={handleSubmit(onSubmitLaporanMingguan)}
            className="space-y-3"
          >
            <TextAreaFieldComponent
              rows={4}
              label="Laporan Mingguan / Harian"
              identiti="laporan"
              name="laporan"
              placeholder="Ketikan Laporan disini."
              type="text"
              register={register('laporan')}
              error={errors.laporan}
            />
            <ButtonType Text="+ Buat Laporan Mingguan" type="submit" />
          </form>
        </CardComponents>
      ) : (
        ''
      )}
    </div>
  );
};

export default InputKendaliMutu;
