import { useAuthStore } from '@/middleware/Store/useAuthStore';
import { AxiosService } from '@/services/axiosInstance.service';
import React from 'react'
import { HiPaperAirplane } from 'react-icons/hi';
import Swal from 'sweetalert2';

interface PropsCompo {
    id_st: number
}

const axiosSecvice = new AxiosService();

const CreateReport = ({id_st}:PropsCompo) => {
    const { user } = useAuthStore();
      const handleCreateReport = async (id_st: number) => {
        Swal.fire({
          title: 'Buat Laporan Mingguan',
          html: `
            <input id="nomor" type="date" class="swal2-input" placeholder="Nomor Laporan"/>        
            <textarea id="reportContent" class="swal2-textarea" placeholder="Isi Laporan"></textarea>
          `,
          focusConfirm: false,
          preConfirm: async () => {
            const nomor = (document.getElementById('nomor') as HTMLInputElement)
              .value;
            const content = (
              document.getElementById('reportContent') as HTMLTextAreaElement
            ).value;
            if (!content || !nomor) {
              Swal.showValidationMessage('Silakan isi semua field');
              return;
            }
            return { content, id_st, nomor };
          },
        }).then(async (result) => {
          if (result.isConfirmed) {
            // Logika untuk menyimpan laporan
            const dataForm = {
              id_st: id_st,
              id_user: String(user?.id_user),
              id_no: String(result.value.nomor),
              laporan_mingguan: String(result.value.content),
            };
            try {
              const response = await axiosSecvice.addData(
                '/laporan_mingguan',
                dataForm
              );
              console.log('Laporan:', response);
              Swal.fire('Laporan berhasil dibuat!', '', 'success');
            } catch (error) {
              console.error('Error creating report:', error);
              Swal.fire('Gagal membuat laporan!', '', 'error');
            }
          }
        });
      };
  return (
    <button
                    onClick={() => handleCreateReport(id_st)}
                    className="p-2 border border-blue-500 text-black rounded-md hover:bg-blue-600 hover:text-white flex gap-3 justify-start items-center"
                  >
                    <HiPaperAirplane /> <p> || Buat laporan Harian / Mingguan</p>
                  </button>
  )
}

export default CreateReport
