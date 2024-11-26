'use client';
import React, { useState } from 'react';
import {
  InputFieldComponent,
  SelectInputField,
  TextAreaFieldComponent,
} from '../../Global/Input';
import { ButtonType } from '../../Global/Button';

const InputSuratTugas = () => {
  const [uploadOption, setUploadOption] = useState('file');

  const handleUploadOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUploadOption(event.target.value);
  };

  const optionsKegiatan = [
    {
      value: 'test',
      title: 'Test Title',
    },
  ];
  return (
    <form className="space-y-3">
      <h3 className="text-xl">Penginputan Rekap Surat Tugas</h3>
      <section className="grid grid-cols-2 gap-3">
        <InputFieldComponent
          label="Bulan"
          identiti="Bulan"
          name="bulan"
          placeholder="Masukan Bulan Penugasan"
          type="text"
          register={'bulan'}
        />
        <InputFieldComponent
          label="No/Tgl.SP"
          identiti="noTgl"
          name="noTgl"
          placeholder="Masukan Nomor/TGL.SP"
          type="text"
          register={'noTgl'}
        />
        <div className="col-span-2">
          <SelectInputField
            label="Program Audit/Kegiatan"
            identiti="programAudit"
            name="programAugit"
            options={optionsKegiatan}
            placeholder="Tentukan Kegiatan"
            register={'kegiatan'}
            type="select"
          />
        </div>
      </section>
      <h3>Tim Audit</h3>
      <section className="grid gird-cols-2 gap-3">
        <InputFieldComponent
          label="Tim Pemeriksa/Pelaksana Kegiatan"
          identiti="timPemeriksa"
          name="timPemeriksa"
          placeholder="Tentukan Tim Pemeriksa"
          type="text"
          register={'timPemeriksa'}
        />
        <InputFieldComponent
          label="Irban/Wk.Penanggung Jawab"
          identiti="irbanwk"
          name="irbanwk"
          placeholder="Tentuakan Irban/Wk,Penanggung Jawab"
          type="text"
          register={'irbanwk'}
        />
        <InputFieldComponent
          label="Pengendali Teknis/Supervisor"
          identiti="pengendaliTeknis"
          name="pengendaliTeknis"
          placeholder="Tentukan Pengendali Teknis"
          type="text"
          register={'PengendaliTeknis'}
        />
        <InputFieldComponent
          label="Ketua Tim"
          identiti="ketuaTIM"
          name="ketuaTIM"
          placeholder="Tentukan Ketua Tim"
          type="text"
          register={'ketuaTIM'}
        />
        <div className="col-span-2">
          <InputFieldComponent
            label="Anggota Tim"
            identiti="anggotaTim"
            name="anggotaTim"
            placeholder="Masukan Anggota Tim"
            type="text"
            register={'anggotaTim'}
          />
        </div>
      </section>
      <h3>Audit</h3>
      <section className="grid grid-cols-2 gap-3">
        <InputFieldComponent
          label="Jumlah Objek Pengawasan"
          identiti="jumlahObjek"
          name="jumlahObjek"
          placeholder="Tentukan Jumlah Objek Pengawasan"
          type="number"
          register={'jumlahObjek'}
        />
        <InputFieldComponent
          label="Jumlah Laporan"
          identiti="jumlahLaporan"
          name="jumlahLaporan"
          placeholder="Tentukan Jumlah Laporan"
          type="number"
          register={'jumlahLaporan'}
        />
        <InputFieldComponent
          label="No.Tgl.LHP/LHE/LHR"
          identiti="noTglLh"
          name="noTglLh"
          placeholder="Tentukan No.Tgl.LHP/LHE/LHR"
          type="text"
          register={'noTglLh'}
        />
        <InputFieldComponent
          label="Jenis Audit"
          identiti="jenisAudit"
          name="jenisAudit"
          placeholder="Tentukan Jenis Audit"
          type="text"
          register={'jenisAudit'}
        />
        {/* <SelectInputField
            label="Jenis Audit"
            identiti="jenisAudit"
            name="jenisAudit"
            options={optionsKegiatan}
            placeholder="Tentukan Jenis Audit"
            register={'jenisAudit'}
            type="select"
          /> */}
        <TextAreaFieldComponent
          rows={5}
          label="Keterangan"
          identiti="keterangan"
          name="keterangan"
          placeholder="Masukan Keterangan ST"
          type="text"
          register={'keterangan'}
        />
        <div className="space-y-2">
          <label htmlFor="" className="text-slate-800">
            Upload Surat Tugas
          </label>
          <br />
          <small>Max file size is ... mb. File Support .pdf .xlcl .docx</small>
          <div className="flex justify-start gap-3">
            <label>
              <input
                type="radio"
                name="uploadOption"
                value="file"
                checked={uploadOption === 'file'}
                onChange={handleUploadOptionChange}
              />
              Unggah File
            </label>
            <label>
              <input
                type="radio"
                name="uploadOption"
                value="link"
                checked={uploadOption === 'link'}
                onChange={handleUploadOptionChange}
              />
              Masukkan Link
            </label>
          </div>
          {/* <section className="flex gap-2 w-full"> */}
            {uploadOption === 'file' ? (
              // <input type="file" name="fileUpload" />
              <InputFieldComponent
                label="Upload File"
                identiti="uploadFile"
                name="uploadFile"
                placeholder="Upload File ST"
                type="file"
                register={'uploadFile'}
              />
            ) : (
              // <input type="text" name="linkInput" placeholder="Masukkan Link" />
              <InputFieldComponent
                label="Masukan Link Suresman"
                identiti="linkStSuresman"
                name="linkStSuresman"
                placeholder="Masukan Link Suresman ST"
                type="link"
                register={'linkStSuresman'}
              />
            )}
          {/* </section> */}
        </div>
      </section>
      <ButtonType Text='+ Buat Rekap Surat Tugas' type='submit'/>
    </form>
  );
};

export default InputSuratTugas;
