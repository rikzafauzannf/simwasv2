// File: src/components/SummaryCard.tsx
interface SummaryCardProps {
  title: string;
  value: string;
}

export default function SummaryCard({ title, value }: SummaryCardProps) {
  return (
    <div className="bg-white bg-opacity-30 p-6 rounded-lg text-center">
      <h3 className="text-white font-medium mb-2">{title}</h3>
      <p className="text-white text-3xl font-bold">{value}</p>
    </div>
  );
}