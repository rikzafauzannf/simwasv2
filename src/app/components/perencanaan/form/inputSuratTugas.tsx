'use client';
import React, { useState } from 'react';
import {
  InputFieldComponent,
  SelectInputField,
  TextAreaFieldComponent,
} from '../../Global/Input';
import { ButtonType } from '../../Global/Button';
import { CardComponents } from '../../Global/Card';
import { useTeamStore } from '@/middleware/Store/useTeamStore';
import { FaTrash } from 'react-icons/fa';

const InputSuratTugas = () => {
  const [uploadOption, setUploadOption] = useState('file');

  const handleUploadOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUploadOption(event.target.value);
  };

  const { teamMembers, addTeamMember, removeTeamMember, resetTeamMembers } =
    useTeamStore();
  const [newMember, setNewMember] = React.useState('');

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMember.trim()) {
      addTeamMember(newMember.trim());
      setNewMember('');
    }
  };

  const optionsKegiatan = [
    {
      value: 'test',
      title: 'Title',
    },
  ];
  return (
    <>
      <h3 className="text-xl mb-3">Penginputan Rekap Surat Tugas</h3>
      <form className="space-y-3">
        <CardComponents>
          <div className="space-y-3">
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
                {/* <InputFieldComponent
                  label="Anggota Tim"
                  identiti="anggotaTim"
                  name="anggotaTim"
                  placeholder="Masukan Anggota Tim"
                  type="text"
                  register={'anggotaTim'}
                /> */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="Tim" className="text-slate-800">
                    TIM [{teamMembers.length}]
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMember}
                      onChange={(e) => setNewMember(e.target.value)}
                      placeholder="Masukkan nama anggota tim"
                      className="border border-b-2 border-t-0 border-l-0 border-r-0 shadow-md border-slate-600 text-black bg-slate-200/25 flex-1"
                    />
                    <button
                      onClick={handleAddMember}
                      type="button"
                      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-lightprimary"
                    >
                      Tambah
                    </button>
                  </div>
                </div>
                {/* Display Team Members */}
                <div className="mt-4 space-y-2">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between bg-slate-100 p-2 rounded-md"
                    >
                      <span className="text-slate-800">{member.name}</span>
                      <button
                        onClick={() => removeTeamMember(member.id)}
                        type="button"
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
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
              {/* <InputFieldComponent
                label="Jenis Audit"
                identiti="jenisAudit"
                name="jenisAudit"
                placeholder="Tentukan Jenis Audit"
                type="text"
                register={'jenisAudit'}
              /> */}
              <SelectInputField
                label="Jenis Audit"
                identiti="jenisAudit"
                name="jenisAudit"
                options={optionsKegiatan}
                placeholder="Tentukan Jenis Audit"
                register={'jenisAudit'}
                type="select"
              />
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
                <small>
                  Max file size is ... mb. File Support .pdf .xlcl .docx
                </small>
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
          </div>
        </CardComponents>
        <ButtonType Text="+ Buat Rekap Surat Tugas" type="submit" />
      </form>
    </>
  );
};

export default InputSuratTugas;
