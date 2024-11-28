'use client';
import React, { useState } from 'react';
import { CardComponents } from '../../Global/Card';
import {
  InputFieldComponent,
  SelectInputField,
  TextAreaFieldComponent,
} from '../../Global/Input';
import { ButtonType } from '../../Global/Button';
import LaporanMingguanComponent from '../laporanMingguan';

const InputKendaliMutu = () => {
  const [KendaliMutu, setKendaliMutu] = useState(false);
  const [LaporanMingguan, setLaporanMingguan] = useState(false);

  const optionsSuratTugas = [
    {
      value: 'St1',
      title: 'ST.... - No.TGL/SP',
    },
  ];

  

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
  return (
    <div className="space-y-3">
      <h3 className="text-xl">Kendali Mutu</h3>
      <CardComponents>
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
      </CardComponents>
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
          <form className="space-y-3">
            <section className="grid grid-cols-3 gap-3">
              <label className="text-slate-800">
                <input
                  type="checkbox"
                  name="kartuPenugasan"
                  value="ada"
                  className="shadow-md me-2"
                />
                Kartu Penugasan
              </label>
              <label className="text-slate-800">
                <input
                  type="checkbox"
                  name="programKerja"
                  value="ada"
                  className="shadow-md me-2"
                />
                Program Kerja Pengawasan
              </label>
              <label className="text-slate-800">
                <input
                  type="checkbox"
                  name="notulensiKesepakatan"
                  value="ada"
                  className="shadow-md me-2"
                />
                Notulensi Kesepakatan
              </label>
              <label className="text-slate-800">
                <input
                  type="checkbox"
                  name="notulensiKesepakatan"
                  value="ada"
                  className="shadow-md me-2"
                />
                Notulensi Kesepakatan
              </label>
              <label className="text-slate-800">
                <input
                  type="checkbox"
                  name="kertasKerja"
                  value="ada"
                  className="shadow-md me-2"
                />
                Kertas Kerja Pengawasan
              </label>
              <label className="text-slate-800">
                <input
                  type="checkbox"
                  name="dokumentasiPemeriksaan"
                  value="ada"
                  className="shadow-md me-2"
                />
                Dokumentasi Pemeriksaan
              </label>
              <label className="text-slate-800">
                <input
                  type="checkbox"
                  name="reviuSupervisi"
                  value="ada"
                  className="shadow-md me-2"
                />
                Reviu Supervisi
              </label>
              <label className="text-slate-800">
                <input
                  type="checkbox"
                  name="ceklisPenyelesaian"
                  value="ada"
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
              register={'linkGDrive'}
            />
            <TextAreaFieldComponent
              rows={4}
              label="Keterangan"
              identiti="keterangan"
              name="keterangan"
              placeholder="Masukan Keterangan ST"
              type="text"
              register={'keterangan'}
            />
            <ButtonType Text="+ Buat Kendali Mutu" type="submit" />
          </form>
        </CardComponents>
      ) : (
        ''
      )}
      {LaporanMingguan ? (
        <CardComponents>
          <form className="space-y-3">
            <TextAreaFieldComponent
              rows={4}
              label="Laporan Mingguan / Harian"
              identiti="laporan"
              name="laporan"
              placeholder="Ketikan Laporan disini."
              type="text"
              register={'laporan'}
            />
            <ButtonType Text="+ Buat Laporan Mingguan" type="submit" />
          </form>
        </CardComponents>
      ) : (
        ''
      )}
      <CardComponents>
        <h3>Rekap Hasil Kendali Mutu</h3>
      </CardComponents>
      <LaporanMingguanComponent/>
    </div>
  );
};

export default InputKendaliMutu;
