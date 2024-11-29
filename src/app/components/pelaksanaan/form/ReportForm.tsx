import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Swal from 'sweetalert2';

interface ReportFormData {
  report: string;
}

const ReportForm: React.FC<{ id: number }> = ({ id }) => {
  const { register, handleSubmit, reset } = useForm<ReportFormData>();

  const onSubmit: SubmitHandler<ReportFormData> = async (data) => {
    console.log('Report Data:', { id, ...data });
    // Here you can handle the submission to your backend or state management
    await Swal.fire({
      title: 'Success!',
      text: 'Laporan Mingguan berhasil disimpan.',
      icon: 'success',
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <textarea
        {...register('report', { required: 'Laporan wajib diisi' })}
        placeholder="Tulis laporan mingguan..."
        className="w-full p-2 border rounded-md"
      />
      <button type="submit" className="py-2 px-4 bg-green-600 text-white rounded-md">
        Simpan Laporan
      </button>
    </form>
  );
};

export default ReportForm;