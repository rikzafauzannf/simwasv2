import { useFetch } from "@/hooks/useFetch";
import { useFetchAll } from "@/hooks/useFetchAll";
import { RekomendasiData, TemuanHasilData } from "@/interface/interfaceTemuanHasil";

// File: src/components/FindingsCard.tsx
export default function FindingsCard() {

  const { data: DatTemuanHasil, isLoading } =
      useFetch<TemuanHasilData>('temuan_hasil');

  const { data: DataRekomendasi, isLoading: isLoadingRekomendasi } =
    useFetchAll<RekomendasiData>('rekomendasi');
  
  return (
    <div className="mt-4">
      <div className="bg-blue-100 rounded-lg p-4 mb-2">
        <h4 className="text-center text-black text-sm">Jumlah Temuan</h4>
        <p className="text-center font-bold text-xl">{ DatTemuanHasil.length }</p>
      </div>
      <div className="bg-blue-100 rounded-lg p-4">
        <h4 className="text-center text-black text-sm">Jumlah Rekomendasi</h4>
        <p className="text-center font-bold text-xl">{ DataRekomendasi.length }</p>
      </div>
    </div>
  );
}