import { CardComponents } from '@/app/components/Global/Card';
import { formatToLocalDate } from '@/data/formatData';
import { useGetNameUser } from '@/hooks/useGetName';
import { LHPData, NHPData } from '@/interface/interfaceHasilPengawasan';
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';
import React from 'react';
interface Props {
  NHPMAP: NHPData[];
  DataLHP: LHPData[];
}
const DatahpCheck = ({ NHPMAP, DataLHP }: Props) => {
  const { getNameUser, getUserNIP, getUserPhone } = useGetNameUser();
  return (
    <CardComponents>
      <h2 className="font-bold text-gray-800 mb-4">
        Daftar NHP - {NHPMAP.length}
      </h2>
      <ul className="list-disc list-inside space-y-3">
        {NHPMAP.map((item, index) => {
          return (
            <li
              className="text-gray-700 hover:text-gray-900 transition shadow space-y-1"
              key={index}
            >
              <small>NHP Data - {formatToLocalDate(item.created_at)}</small>
              <p className="text-xs font-semibold">Nomor NHP:{item.no_nhp}</p>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-3">
                <Link
                  href={item.file_nhp}
                  target="blank"
                  className="flex-1 flex gap-2"
                >
                  <Icon
                    icon="solar:paperclip-line-duotone"
                    width="16"
                    height="16"
                  />
                  <h3>{item.keterangan_nhp}</h3>
                </Link>

                <Link href={String(getUserPhone(item.id_user))}>
                  <p>
                    {getNameUser(item.id_user)} - {getUserNIP(item.id_user)}
                  </p>
                </Link>
              </div>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li className="text-gray-600 hover:text-gray-800 transition">
                  <small className="font-semibold">
                    {' '}
                    Jumlah Data LHP -{' '}
                    {
                      DataLHP.filter(
                        (itemsLHP) => itemsLHP.id_nhp === item.id_nhp
                      ).length
                    }
                  </small>
                </li>
                {DataLHP.filter(
                  (itemsLHP) => itemsLHP.id_nhp === item.id_nhp
                ).map((item, index) => (
                  <li
                    key={index}
                    className="text-gray-600 hover:text-gray-800 transition"
                  >
                    <small>
                      LHP Data - {formatToLocalDate(item.created_at)}
                    </small>
                    <p className="text-xs font-semibold">
                      Nomor LHP:{item.no_lhp}
                    </p>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-3">
                      <Link
                        href={item.file_lhp}
                        target="blank"
                        className="flex-1 flex gap-2"
                      >
                        <Icon
                          icon="solar:paperclip-line-duotone"
                          width="16"
                          height="16"
                        />
                        <h3>{item.keterangan_lhp}</h3>
                      </Link>

                      <Link href={String(getUserPhone(item.id_user))}>
                        <p>
                          {getNameUser(item.id_user)} -{' '}
                          {getUserNIP(item.id_user)}
                        </p>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </CardComponents>
  );
};

export default DatahpCheck;
