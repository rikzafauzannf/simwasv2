import React from 'react';
import { CardComponents } from './Card';

interface DetailsProps {
  username: string;
  date: string;
}

interface Props {
  data: DetailsProps[];
}

export const NotofikasiEdit: React.FC<Props> = ({ data }) => {
  return (
    <CardComponents>
      <h3>Perubahan data oleh</h3>
      <div className="max-h-[250px] overflow-y-scroll space-y-3">
        {/* mapping data */}
        {data.map((items, index) => (
          <div className="p-2 bg-slate-300/50 rounded-md shadow-md" key={index}>
            <div className="flex space-x-3 items-center">
              <div className="w-[60px] h-[60px] rounded-full shadow"></div>
              <div>
                <h3>{items.username}</h3>
                <small className="text-end text-slate-800">{items.date}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardComponents>
  );
};
