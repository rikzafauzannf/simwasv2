'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { CardComponents } from '../../Global/Card';
import { InputFieldComponent } from '../../Global/Input';
import { ButtonType } from '../../Global/Button';
import { useAuthStore } from '@/middleware/Store/useAuthStore';
import { useFetchAll } from '@/hooks/useFetchAll';
import { PKPTDataBase } from '@/interface/interfacePKPT';
import { useFetchById } from '@/hooks/useFetchById';
import { SuratTugasData } from '@/interface/interfaceSuratTugas';
import { useGetNameRuangLingkup } from '@/hooks/useGetName';
import { useScopeStore } from '@/middleware/Store/useScopeStore';
import { FormKendaliMutu, KendaliMutuData } from '@/interface/interfaceKendaliMutu';
import { AxiosService } from '@/services/axiosInstance.service';
import { useRouter } from 'next/navigation';
import { Button } from 'flowbite-react';

interface PropsID {
  id_st: number;
  mode?: 'create' | 'update';
  id_kendalimutu?: number;
  data?: KendaliMutuData;
}

interface Scope {
  id: string;
  name: string;
}

const axiosService = new AxiosService();

const InputKendaliMutu: React.FC<PropsID> = ({
  id_st,
  mode = 'create',
  id_kendalimutu,
  data,
}) => {
  console.log('data approace : ', data);
  const { data: ST } = useFetchById<SuratTugasData>('surat_tugas', id_st);
  const { data: pkptCheck } = useFetchAll<PKPTDataBase>('pkpt');

  const dataGetRuanganL = pkptCheck.find(
    (items) => items.id_pkpt == ST?.id_pkpt
  );

  const dataRuangan = dataGetRuanganL?.id_ruang_lingkup;
  const { getNameRuangLingkup } = useGetNameRuangLingkup();

  const optionsRuanglingkup =
    dataRuangan?.split(', ').map((items: string) => ({
      id: items,
      name: getNameRuangLingkup(Number(items)),
    })) || [];

  const { scopes, addScope, removeScope,resetScopes } = useScopeStore();
  const [newScopeId, setNewScopeId] = useState<number | string>('');

  const handleAddScope = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      newScopeId &&
      !scopes.find((scope) => String(scope.id) === String(newScopeId))
    ) {
      const selectedScope = optionsRuanglingkup.find(
        (scope: Scope) => Number(scope.id) === Number(newScopeId)
      );
      if (selectedScope) {
        addScope({ id: selectedScope.id, name: selectedScope.name });
        setNewScopeId('');
      }
    }
  };

  const router = useRouter();
  const { user } = useAuthStore();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
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

  const isResetDone = useRef(false);

  useEffect(() => {
    if (mode === 'update' && data && !isResetDone.current) {
      reset({
        kartu_penugasan: String(data.kartu_penugasan) == 'true' ? true : false,
        kertas_kerja_pengawasan: String(data.kertas_kerja_pengawasan) == 'true' ? true : false,
        ceklis_penyelesaian: String(data.ceklis_penyelesaian) == 'true' ? true : false,
        program_kerja_pengawasan: String(data.program_kerja_pengawasan) == 'true' ? true : false,
        dokumentasi_pemeriksaan: String(data.dokumentasi_pemeriksaan) == 'true' ? true : false,
        notulensi_kesepakatan: String(data.notulensi_kesepakatan) == 'true' ? true : false,
        reviu_supervisi: String(data.reviu_supervisi) == 'true' ? true : false,
        link_google_drive: data.link_google_drive,
        id_no_tg: data.id_no_tg,
      });
      isResetDone.current = true;
      resetScopes()
    }
  }, [mode, data, reset,resetScopes]);

  const onSubmitKendaliMutu: SubmitHandler<FormKendaliMutu> = async (data) => {
    if (scopes.length === 0) {
      alert('Silakan pilih setidaknya satu ruang lingkup.');
      return;
    }

    try {
      const dataForm = {
        kartu_penugasan: String(data.kartu_penugasan),
        kertas_kerja_pengawasan: String(data.kertas_kerja_pengawasan),
        ceklis_penyelesaian: String(data.ceklis_penyelesaian),
        program_kerja_pengawasan: String(data.program_kerja_pengawasan),
        dokumentasi_pemeriksaan: String(data.dokumentasi_pemeriksaan),
        notulensi_kesepakatan: String(data.notulensi_kesepakatan),
        reviu_supervisi: String(data.reviu_supervisi),
        link_google_drive: data.link_google_drive,
        id_ruang_lingkup: scopes.map((item) => item.id).join(', '),
        id_no_tg: data.id_no_tg,
        id_user: Number(user?.id_user),
        id_st: Number(id_st),
      };

      let result;
      if (mode === 'create') {
        result = await axiosService.addData('/kendali_mutu', dataForm);
      } else {
        result = await axiosService.updateData(
          `/kendali_mutu/${id_kendalimutu}`,
          dataForm
        );
      }

      if (result.success) {
        reset();
        alert('Data Kendali Mutu berhasil disimpan');
        router.push('/dashboard/kendalimutu');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Gagal menyimpan data Kendali Mutu');
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-xl">Kendali Mutu</h3>
      <CardComponents>
        <form onSubmit={handleSubmit(onSubmitKendaliMutu)} className="space-y-3">
          <div className="lg:col-span-2 w-full">
            <div className="flex flex-col sm:flex-row items-start gap-4 w-full">
              <div className="w-full sm:w-5/6 flex-1">
                <div className="flex flex-col space-y-2 w-full">
                  <label htmlFor="ruangLingkup" className="text-slate-800 font-medium">
                    Ruang Lingkup [{scopes.length}]
                  </label>
                  <div className="flex flex-col gap-3 w-full">
                    <select
                      value={newScopeId}
                      onChange={(e) => setNewScopeId(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary flex-1"
                    >
                      <option value="" disabled>
                        Pilih ruang lingkup
                      </option>
                      {optionsRuanglingkup.map((scope: Scope) => (
                        <option key={scope.id} value={scope.id}>
                          {scope.name}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleAddScope}
                      type="button"
                      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      <FaPlus className="mr-2" /> Tambah
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {scopes.map((scope) => (
                    <div
                      key={scope.id}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-slate-800">{scope.name}</span>
                      <button
                        onClick={() => removeScope(scope.id)}
                        type="button"
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
              <input type="checkbox" {...register('kartu_penugasan')} />
              &nbsp; Kartu Penugasan
            </label>
            <label className="text-slate-800">
              <input type="checkbox" {...register('kertas_kerja_pengawasan')} />
              &nbsp; Kertas Kerja Pengawasan
            </label>
            <label className="text-slate-800">
              <input type="checkbox" {...register('ceklis_penyelesaian')} />
              &nbsp; Ceklis Penyelesaian
            </label>
            <label className="text-slate-800">
              <input
                type="checkbox"
                {...register('program_kerja_pengawasan')}
              />
              &nbsp; Program Kerja Pengawasan
            </label>
            <label className="text-slate-800">
              <input
                type="checkbox"
                {...register('dokumentasi_pemeriksaan')}
              />
              &nbsp; Dokumentasi Pemeriksaan
            </label>
            <label className="text-slate-800">
              <input
                type="checkbox"
                {...register('notulensi_kesepakatan')}
              />
              &nbsp; Notulensi Kesepakatan
            </label>
            <label className="text-slate-800">
              <input type="checkbox" {...register('reviu_supervisi')} />
              &nbsp; Reviu Supervisi
            </label>
          </section>

          <InputFieldComponent
          type='string'
            label="Masukan Link Google Drive (Public)"
            identiti="linkGDrive"
            name="linkGDrive"
            placeholder="Masukan Link GDrive"
            register={register('link_google_drive')}
          />

          <div className="mt-5 flex justify-end">
            {/* <Button              
              type="submit"
            >
              {mode === 'create' ? 'Simpan Data' : 'Perbarui Data'}
            </Button> */}
            <ButtonType Text={mode === 'create' ? 'Simpan Data' : 'Perbarui Data'} type='submit' />
            {/* <button type='submit' className='bg-blue-600'>
            {mode === 'create' ? 'Simpan Data' : 'Perbarui Data'}
            </button> */}
          </div>
        </form>
      </CardComponents>
    </div>
  );
};

export default InputKendaliMutu;
