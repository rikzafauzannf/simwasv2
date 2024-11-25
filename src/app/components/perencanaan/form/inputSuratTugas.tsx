'use client';
import React from 'react';
import { InputFieldComponent, SelectInputField } from '../../Global/Input';

const InputSuratTugas = () => {
  const optionsKegiatan = [
    {
      value: 'test',
      title: 'Test Title',
    },
  ];
  return (
    <form className="space-y-3">
      <h3 className="text-xl">Penginputan SUrat Tugas</h3>
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
    </form>
  );
};

export default InputSuratTugas;
