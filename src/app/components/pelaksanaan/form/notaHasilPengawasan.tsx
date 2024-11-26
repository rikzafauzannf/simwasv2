'use client';
import React, { useState } from 'react';
import {
  InputFieldComponent,
  TextAreaFieldComponent,
} from '../../Global/Input';
import { CardComponents } from '../../Global/Card';
import { Input } from '@headlessui/react';
import { ButtonType } from '../../Global/Button';

const NotaHasilPengawasan = () => {
  const [uploadOption, setUploadOption] = useState('file');

  const handleUploadOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUploadOption(event.target.value);
  };
  return (
    <form className="space-y-3">
      <h3 className="text-xl">Upload NHP (Nota Hasil Pengawasan)</h3>
      <CardComponents>
        <div className="space-y-3">
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
            {/* <hr className='my-4 border-4'/> */}
            <TextAreaFieldComponent
              rows={5}
              label="Keterangan"
              identiti="keterangan"
              name="keterangan"
              placeholder="Masukan Keterangan ST"
              type="text"
              register={'keterangan'}
            />
          </div>
        </div>
      </CardComponents>
      <ButtonType Text='+ Submit Data NHP' type='submit'/>
    </form>
  );
};

export default NotaHasilPengawasan;
