import React from 'react';
import MapDataTemuanHasil from '../../../components/realisasi/dataTemuanHasil';

const TindakLajutPage = () => {
  return (
    <div className="space-y-3">
      <h3 className="text-xl">Tindak Lanjut</h3>
      <MapDataTemuanHasil todo="pelaksanaan/tindaklanjut/form" />
    </div>
  );
};

export default TindakLajutPage;
