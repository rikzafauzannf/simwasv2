'use client';
import React from 'react';
import { CardComponents } from '../../Global/Card';
import { InputFieldComponent, SelectInputField } from '../../Global/Input';
import { ButtonType } from '../../Global/Button';

const InputRingkasanPengawasan = () => {
  const optionKodeTemuan = [
    { value: 'test', title: 'test' },
    { value: 'test', title: 'test' },
  ];
  return (
    <div className="space-y-3">
      <h3 className="text-xl">Input Temuan Hasil</h3>
      <CardComponents>
        <form className="space-y-3">
          <h3>Form Ringkasan Temuan</h3>
          <section className="grid grid-cols-2 gap-3">
            <InputFieldComponent
              label="Nomor dan Tanggal SP"
              identiti="nomor_tanggalSP"
              name="nomor_tanggalSP"
              placeholder="Masukan Nomor, Tgl SP"
              type="text"
              register={'nomor_tanggalSP'}
            />
            <InputFieldComponent
              label="Uraian, Audit, Nomor dan Tgl LHP"
              identiti="uraian"
              name="uraian"
              placeholder="Masukan Uraian, Audit, Nomor dan Tgl LHP "
              type="text"
              register={'uraian'}
            />
          </section>
          <h3>Kondisi Temuan</h3>
          <section className="grid grid-cols-3 gap-3">
            <SelectInputField
              label="Kode Temuan"
              identiti="kodeTemuan"
              options={optionKodeTemuan}
              register={'kodeTemuan'}
              placeholder="Pilih Kode Temuan"
              // error={errors.JenisPengawasan}
              type="select"
              name="kodeTemuan"
            />
            <div className="col-span-2">
              <InputFieldComponent
                label="Kondisi Temuan"
                identiti="kondisiTemuan"
                name="kondisiTemuan"
                placeholder="Masukan Kondisi Temuan"
                type="text"
                register={'kondisiTemuan'}
              />
            </div>
          </section>
          <h3>Rekomendasi dan Sasaran</h3>
          <section className="grid grid-cols-3 gap-3">
            <SelectInputField
              label="Kode Rekomendasi"
              identiti="kodeRekomendasi"
              options={optionKodeTemuan}
              register={'kodeRekomendasi'}
              placeholder="Pilih Kode Rekomendasi"
              // error={errors.JenisPengawasan}
              type="select"
              name="kodeRekomendasi"
            />
            <div className="col-span-2">
              <InputFieldComponent
                label="Rekomendasi/Saran"
                identiti="rekomendasiSaran"
                name="rekomendasiSaran"
                placeholder="Masukan Rekomendasi/Saran"
                type="text"
                register={'rekomendasiSaran'}
              />
            </div>
            <div className='col-span-3'>
              <InputFieldComponent
                label="Nilai Rekomendasi Rp."
                identiti="nilaiRekomendasi"
                name="nilaiRekomendasi"
                placeholder="Masukan Nominal Rekomendasi"
                type="number"
                register={'nilaiRekomendasi'}
              />
            </div>
          </section>
          <ButtonType Text='+ Buat Ringkasan Pengawasan' type='submit'/>
        </form>
      </CardComponents>
    </div>
  );
};

export default InputRingkasanPengawasan;
