'use client';
import React, { useState } from 'react';
import {
  InputFieldComponent,
  TextAreaFieldComponent,
} from '../../Global/Input';
import { CardComponents } from '../../Global/Card';
import { ButtonType } from '../../Global/Button';
import { FormNHP } from '@/interface/interfaceHasilPengawasan';
import { AxiosService } from '@/services/axiosInstance.service';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuthStore } from '@/middleware/Store/useAuthStore';

interface PropsID {
  id_st: number;
}

const axiosService = new AxiosService();
const NotaHasilPengawasan = ({ id_st }: PropsID) => {
  const { user } = useAuthStore();
  const [uploadOption, setUploadOption] = useState('link');

  const handleUploadOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUploadOption(event.target.value);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormNHP>({
    defaultValues: {
      keterangan_nhp: '',
      file_nhp: '',
    },
  });

  const onSubmit: SubmitHandler<FormNHP> = async (data) => {
    try {
      const result = await axiosService.addData('nhp', {
        id_st: Number(id_st),
        id_user: Number(user?.id_user),
        file_nhp: data.file_nhp,
        keterangan_nhp: data.keterangan_nhp,
      });

      if (result.success) {
        console.log('Nota Hasil Pengawasan berhasil disimpan:', result);
        reset(); // Reset form after successful submission
        alert('Data Nota Hasil Pengawasan berhasil disimpan');
        // refetch(); // Refetch data to update the list
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Gagal menyimpan data Nota Hasil Pengawasan');
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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
                  value="link"
                  checked={uploadOption === 'link'}
                  onChange={handleUploadOptionChange}
                />
                Masukkan Link
              </label>
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
            </div>
            {/* <section className="flex gap-2 w-full"> */}
            <div className="grid grid-cols-2 gap-3">
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
                  register={register('file_nhp', {
                    required: 'harap masukan link NHP',
                  })}
                  error={errors.file_nhp}
                />
              )}
              {/* <InputFieldComponent
                label="Tanggal LHP"
                identiti="tanggal_lhp"
                name="tanggal_lhp"
                placeholder="Masukan tanggal lhp"
                type="date"
                register={register('tanggal_lhp', {
                  required: 'masukan tanggal_lhp',
                })}
                error={errors.tanggal_lhp}
              /> */}
            </div>
            {/* </section> */}
            {/* <hr className='my-4 border-4'/> */}
            <TextAreaFieldComponent
              rows={5}
              label="Keterangan"
              identiti="keterangan"
              name="keterangan"
              placeholder="Masukan Keterangan ST"
              type="text"
              register={register('keterangan_nhp', {
                required: 'Pastikan anda menyertakan keterangan untuk nhp',
              })}
              error={errors.keterangan_nhp}
            />
          </div>
        </div>
      </CardComponents>
      <ButtonType Text="+ Submit Data NHP" type="submit" />
    </form>
  );
};

export default NotaHasilPengawasan;
