import React from 'react';
import { CardComponents } from '../Global/Card';
import { InputFiledComponent } from '../Global/Input';
import { ButtonType } from '../Global/Button';

interface Props {
  id: number;
}

const InputRealisasi: React.FC<Props> = ({ id }) => {
  const id_pkpt = id;
  return (
    <form className="space-y-3">
      {/* input realisasi pkpt */}
      <CardComponents>
        <h3 className="mb-3">Realisasi PKPT</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <InputFiledComponent
              label="Program Audit / Kegiatan"
              identiti="PAudit"
              name="PAudit"
              placeholder="Tentukan Program Audit"
              type="text"
            />
          </div>
          <InputFiledComponent
            label="Jumlah Surat Tugas"
            identiti="JSuratTugas"
            name="JSuratTugas"
            placeholder="Masukan Jumlah Surat Tugas"
            type="number"
          />
          <InputFiledComponent
            label="Bulan"
            identiti="Bulan"
            name="Bulan"
            placeholder="Tentukan Bulan"
            type="text"
          />
          <InputFiledComponent
            label="No/Tgl SP"
            identiti="NTglSp"
            name="NTglSp"
            placeholder="Tentukan Nomor/Tanggal SP"
            type="text"
          />
          <InputFiledComponent
            label="Waktu Penugasan"
            identiti="WPenugasan"
            name="WPenugasan"
            placeholder="Tentukan waktu penugasan"
            type="time"
          />
        </div>
      </CardComponents>
      {/* tim st */}
      <CardComponents>
        <h3 className="mb-3">TIM ST</h3>
        <div className="grid grid-cols-2 gap-3">
        <InputFiledComponent
            label="Tim Pemeriksa / Pelaksana Kegiatan"
            identiti="TPemeriksa"
            name="TPemeriksa"
            placeholder="Tentukan Tim Pemeriksa"
            type="text"
          />
          <InputFiledComponent
            label="Pengendali Teknis / Supervisor"
            identiti="PTeknis"
            name="PTeknis"
            placeholder="Tentukan Pengendali Teknis"
            type="text"
          />
          <InputFiledComponent
            label="Ketua TIM"
            identiti="KTim"
            name="KTim"
            placeholder="Tentukan Ketua TIM"
            type="text"
          />
          <InputFiledComponent
            label="Anggota TIM"
            identiti="ATim"
            name="ATim"
            placeholder="Tentukan Anggota TIM"
            type="text"
          />
        </div>
      </CardComponents>
      {/* jumlah objek laporan */}
      <CardComponents>
        <h3 className='mb-3'>Jumlah Objek dan Laporan</h3>
        <div className='grid grid-cols-2 gap-3'>
          <InputFiledComponent
            label="Jumlah Objek Pengawasan"
            identiti="JObjekPengawasan"
            name="JObjekPengawasan"
            placeholder="Tentukan Jumlah Objek Pengawasan"
            type="number"
          />
          <InputFiledComponent
            label="Jumlah Laporan"
            identiti="JLaporan"
            name="JLaporan"
            placeholder="Tentukan Jumlah Laporan"
            type="number"
          />
        </div>
      </CardComponents>
      {/* button action */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <ButtonType Text="Ulangi" type="reset" />
        <ButtonType Text="Simpan Data" type="submit" />
      </section>
    </form>
  );
};

export default InputRealisasi;
