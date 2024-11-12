import React from 'react';
import CollapseComponents from '../Global/Collapse';
import { CardComponents } from '../Global/Card';

interface Props {
  id: number;
}

const Collapsedatapkpt: React.FC<Props> = ({ id }) => {
  return (
    <CollapseComponents title="Lihat Data PKPT">
      <CardComponents>
        <section className="md:flex justify-start items-start gap-3">
          <div className="md:w-1/5">
            <small>status data</small>
            <h2 className="text-2xl">PKPT {id}</h2>
          </div>
          <div className="flex-1">
            <div className="grid md:grid-cols-3 gap-3">
              <div>
                <small>Jenis Pengawasan</small>
                <h3>test</h3>
              </div>
              <div>
                <small>Area Pengawasan</small>
                <h3>test</h3>
              </div>
              <div>
                <small>Ruang Lingkup</small>
                <h3>test</h3>
              </div>
              <div>
                <small>Tujuan / Sasaran</small>
                <h3>test</h3>
              </div>
              <div>
                <small>Rencana Mulai</small>
                <h3>test</h3>
              </div>
              <div>
                <small>Rencana Penerbitan</small>
                <h3>test</h3>
              </div>
            </div>
          </div>
        </section>
      </CardComponents>
    </CollapseComponents>
  );
};

export default Collapsedatapkpt;
