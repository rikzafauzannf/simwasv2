'use client';
import React, { useState } from 'react';
import {
  InputFieldComponent,
  TextAreaFieldComponent,
} from '../../Global/Input';
import { CardComponents } from '../../Global/Card';

import { ButtonType } from '../../Global/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  FormLHP,
  LHPData,
  NHPData,
} from '@/interface/interfaceHasilPengawasan';
import { AxiosService } from '@/services/axiosInstance.service';
import { useFetchById } from '@/hooks/useFetchById';
import { useAuthStore } from '@/middleware/Store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useFetchAll } from '@/hooks/useFetchAll';

interface PropsID {
  id_nhp: number;
}

const axiosService = new AxiosService();
const LembarHasilPengawasan: React.FC<PropsID> = ({ id_nhp }) => {
  const { user } = useAuthStore();
  const router = useRouter();

  const [uploadOption, setUploadOption] = useState('link');

  console.log('data nhp: ', id_nhp);

  const { data: DataNHP, error } = useFetchById<NHPData>('nhp', id_nhp);

  const id_st = Number(DataNHP ? DataNHP.id_st : null);

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
  } = useForm<FormLHP>({
    defaultValues: {
      file_lhp: '',
      keterangan_lhp: '',
    },
  });

  const onSubmit: SubmitHandler<FormLHP> = async (data) => {
    try {
      const result = await axiosService.addData('lhp', {
        file_lhp: data.file_lhp,
        keterangan_lhp: data.keterangan_lhp,
        no_lhp: data.no_lhp,
        id_nhp: Number(id_nhp),
        id_st: Number(id_st),
        id_user: Number(user?.id_user),
      });

      if (result.success) {
        console.log('Laporan Hasil Pengawasan berhasil disimpan:', result);
        reset(); // Reset form after successful submission
        alert('Data Laporan Hasil Pengawasan berhasil disimpan');
        // refetch(); // Refetch data to update the list
        router.push('/dashboard/pelaporan/lembarhasil');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Gagal menyimpan data Laporan Hasil Pengawasan');
    }
  };

  const { data: DataLHP } = useFetchAll<LHPData>('lhp');
  const detectLHP = DataLHP.filter(
    (itemsFilter) =>
      itemsFilter.id_nhp === Number(id_nhp) &&
      itemsFilter.id_st === Number(id_st)
  );

  console.log('jumlah data Detect: ', detectLHP.length);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <h3 className="text-xl">Upload LHP (Lembar Hasil Pengawasan)</h3>
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
                  register={register('file_lhp', {
                    required: 'Masukan Link Laporan Hasil Pengawasan',
                  })}
                  error={errors.file_lhp}
                />
              )}
              {/* </section> */}
              {/* <hr className='my-4 border-4'/> */}
              <InputFieldComponent
                label="Nomor LHP"
                identiti="no_lhp"
                name="no_lhp"
                placeholder="Masukan Nomor LHP"
                type="text"
                register={register('no_lhp', {
                  required: 'Masukan Nomor LHP',
                })}
                error={errors.no_lhp}
              />
              <TextAreaFieldComponent
                rows={5}
                label="Keterangan"
                identiti="keterangan"
                name="keterangan"
                placeholder="Masukan Keterangan ST"
                type="text"
                register={register('keterangan_lhp', {
                  required:
                    'Masukan Keterangan terkait Laporan HasilPengawasan',
                })}
                error={errors.keterangan_lhp}
              />
            </div>
          </div>
        </CardComponents>
        <ButtonType Text="+ Submit Data LHP" type="submit" />
      </form>
      {/* <div className='grid gap-4 mt-4'>
      {detectLHP.length > 0 && 'Data Sudah Ada!'}
      {detectLHP.map((items, index) => {
        return (
          <React.Fragment key={index}>
            <iframe src={items.file_lhp} className="w-full rounded-md shadow-md"/>
          </React.Fragment>
        );
      })}
      </div> */}
    </>
  );
};

export default LembarHasilPengawasan;
