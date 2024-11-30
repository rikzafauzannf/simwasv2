'use client';
import React, { useEffect, useState } from 'react';
import { CardComponents } from '../../Global/Card';
import { PKPTDataBase } from '@/interface/interfacePKPT';
import { FirestoreService } from '@/services/firestore.service';

interface Props {
  id_pkpt: string;
}

const DetailPengawasan = ({ id_pkpt }: Props) => {
  const [DataPKPT, setDataPKPT] = useState<PKPTDataBase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const firestoreService = new FirestoreService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await firestoreService.getDataById('pkpt', id_pkpt);
        if (response.success && response.data) {
          const datapkpt = response.data as PKPTDataBase;
          setDataPKPT([datapkpt]);
          setError(null);
        } else {
          setError(new Error(response.message));
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">
        # {DataPKPT[0].area_pengawasan}
      </h1>
      <p>Ruang Lingkup:</p>
      <section className="grid grid-cols-4 gap-3">
        <div className="bg-white p-2 rounded-md shadow-md text-center font-medium">
          {DataPKPT[0].ruang_lingkup}
        </div>
        {/* <div className="bg-white p-2 rounded-md shadow-md text-center font-medium">
          kominfo
        </div>
        <div className="bg-white p-2 rounded-md shadow-md text-center font-medium">
          kominfo
        </div>
        <div className="bg-white p-2 rounded-md shadow-md text-center font-medium">
          kominfo
        </div> */}
      </section>

      {/* section data identiti*/}
      <section className="grid grid-cols-3 gap-3">
        <CardComponents>
          <p className="text-sm">Jenis Pengawasan</p>
          <h3 className="text-xl">{DataPKPT[0].jenis_pengawasan}</h3>
        </CardComponents>
        <CardComponents>
          <p className="text-sm">Tingkat Resiko</p>
          <h3 className="text-xl">{DataPKPT[0].tingkat_risiko}</h3>
        </CardComponents>
        <CardComponents>
          <p className="text-sm">Anggaran</p>
          <h3 className="text-xl">
            Rp. {DataPKPT[0].anggaran.toLocaleString('id-ID')}
          </h3>
        </CardComponents>
      </section>
      {/* section jadwal penugasan */}
      <CardComponents>
        <p>Jadwal Penugasan</p>
        <hr />
        <section className="grid grid-cols-2 gap-3">
          <div>
            <p>Rencana Mulai Penugasan</p>
            <h3>{DataPKPT[0].rencana_penugasan}</h3>
          </div>
          <div>
            <p>Rencana Penerbitan Laporan</p>
            <h3>{DataPKPT[0].rencana_penerbitan}</h3>
          </div>
        </section>
      </CardComponents>
      {/* section tujuan dan tim */}
      <section className="grid grid-cols-2 gap-3">
        <CardComponents>
          <p className="font-medium">Tujuan/Sasaran</p>
          <p className="text-slate-950">{DataPKPT[0].tujuan_sasaran}</p>
        </CardComponents>
        <CardComponents>
          <p className="font-medium">Tim</p>
          <div className="flex flex-col gap-2">
            {DataPKPT[0].tim.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 p-2 rounded-md hover:font-semibold text-slate-950"
              >
                {item.name}
              </div>
            ))}
          </div>
        </CardComponents>
      </section>
      {/* section hari kerja */}
      <CardComponents>
        <p>Hari Penugasan</p>
        <section className="flex justify-start items-start gap-3">
          <div className="w-1/5">
            <small>Jumlah</small>
            <h2 className="text-2xl font-extrabold">{DataPKPT[0].jumlah}</h2>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <small>Penanggung Jawab</small>
                <h3>{DataPKPT[0].penanggung_jawab}</h3>
              </div>
              <div>
                <small>Wakil Penanggung Jawab</small>
                <h3>{DataPKPT[0].wakil_penanggung_jawab}</h3>
              </div>
              <div>
                <small>Dalnis/Supervisor</small>
                <h3>{DataPKPT[0].pengendali_teknis}</h3>
              </div>
              <div>
                <small>Ketua Tim</small>
                <h3>{DataPKPT[0].ketua_tim}</h3>
              </div>
              <div>
                <small>Anggota Tim</small>
                <h3>{DataPKPT[0].anggota_tim}</h3>
              </div>
            </div>
          </div>
        </section>
      </CardComponents>
      {/* data minor */}
      <section className="grid grid-cols-2 gap-3">
        <CardComponents>
          <p>Jumlah Laporan</p>
          <h3 className="text-xl">{DataPKPT[0].jumlah_laporan}</h3>
        </CardComponents>
        <CardComponents>
          <p>Keterangan</p>
          <h3>{DataPKPT[0].keterangan}</h3>
        </CardComponents>
        <div className="col-span-2">
          <CardComponents>
            <p>Sarana & Prasarana</p>
            <p className="text-slate-950">{DataPKPT[0].sarana_prasarana}</p>
          </CardComponents>
        </div>
      </section>
    </div>
  );
};

export default DetailPengawasan;
