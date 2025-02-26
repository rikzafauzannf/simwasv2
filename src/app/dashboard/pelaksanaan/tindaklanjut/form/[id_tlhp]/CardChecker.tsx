import { formatCurrency, formatToLocalDate } from '@/data/formatData';
import { useFetchById } from '@/hooks/useFetchById';
import { useGetNameKode, useGetNameUser } from '@/hooks/useGetName';
import { TemuanHasilData } from '@/interface/interfaceTemuanHasil';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Card } from 'flowbite-react';
import Link from 'next/link';
import React from 'react';

const CardChecker = ({ id_tlhp }: { id_tlhp: number }) => {
  const {
    getFieldKodeRekomendasi,
    getFieldKodeTemuan,
    getNameKodeRekomendasi,
    getNameKodeTemuan,
  } = useGetNameKode();
  const { data: DataTemuan } = useFetchById<TemuanHasilData>(
    'temuan_hasil',
    id_tlhp
  );
  const { getNameUser, getUserPhone } = useGetNameUser();
  return (
    <Card>
      <div>
        <p>Uraian Temuan</p>
        <h1>{DataTemuan?.uraian}</h1>
      </div>
      <div className="grid grid-cols-3 gap-3 w-full">
        <div>
          <p>Kode Temuan</p>
          <h1>{getNameKodeTemuan(Number(DataTemuan?.id_kode_temuan))}</h1>
          <small>
            {getFieldKodeTemuan(Number(DataTemuan?.id_kode_temuan))}
          </small>
        </div>
        <div className="col-span-2">
          <p>Kondisi Temuan</p>
          <h1>{DataTemuan?.kondisi_temuan}</h1>
        </div>
        <div>
          <p>Kode Rekomendasi</p>
          <h1>
            {getNameKodeRekomendasi(Number(DataTemuan?.id_kode_rekomendasi))}
          </h1>
          <small>
            {getFieldKodeRekomendasi(Number(DataTemuan?.id_kode_rekomendasi))}
          </small>
        </div>
        <div>
          <p>Rekomendasi/Saran</p>
          <h1>{DataTemuan?.rekomendasi_saran}</h1>
        </div>
        <div>
          <p>Nilai Rekomendasi</p>
          <h1>{formatCurrency(Number(DataTemuan?.nilai_rekomendasi))}</h1>
        </div>
      </div>
      <div className="flex justify-between items-baseline gap-3">
        <Link
          href={`https://wa.me/${getUserPhone(Number(DataTemuan?.id_user))}`}
          target="_blank"
        >
          <p className="flex items-center gap-2 text-sm">
            <Icon icon="solar:user-check-line-duotone" width="18" height="18" />
            {getNameUser(Number(DataTemuan?.id_user))}
          </p>
        </Link>
        <p>{formatToLocalDate(String(DataTemuan?.created_at))}</p>
      </div>
    </Card>
  );
};

export default CardChecker;
