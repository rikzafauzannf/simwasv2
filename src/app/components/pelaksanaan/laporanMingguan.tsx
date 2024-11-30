import React from 'react';
import { CardComponents } from '../Global/Card';

const LaporanMingguanComponent = () => {
  const dummyLaporanMingguan = [
    {
      jam: '01.00',
      tanggal: '15/09/2024',
      username: 'ucok',
      laporan:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa, delectus?',
    },
    {
      jam: '11.00',
      tanggal: '19/09/2024',
      username: 'Jhon Doe',
      laporan:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa, delectus?',
    },
  ];
  return (
    <CardComponents>
      <h3>Rekap Laporan Mingguan</h3>
      <section className="grid w-full gap-3">
        {dummyLaporanMingguan.map((item, index) => (
          <div
            key={index}
            className="space-y-2 p-3 rounded-md shadow-md hover:bg-slate-500/35 hover:text-black"
          >
            <p>
              {item.jam} , {item.tanggal} - <strong>{item.username}</strong>{' '}
            </p>
            <p className="text-slate-800">{item.laporan}</p>
            <hr />
          </div>
        ))}
      </section>
    </CardComponents>
  );
};

export default LaporanMingguanComponent;
