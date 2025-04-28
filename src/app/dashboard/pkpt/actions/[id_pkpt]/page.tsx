'use client';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CardComponents } from '@/app/components/Global/Card';
import { ButtonType } from '@/app/components/Global/Button';
import { useTeamStore } from '@/middleware/Store/useTeamStore';
import { FaTrash } from 'react-icons/fa';
import {
  PKPTData,
  PKPTDataBase,
  PKPTFormData,
} from '@/interface/interfacePKPT';
import { AxiosService } from '@/services/axiosInstance.service';
import { useScopeStore } from '@/middleware/Store/useScopeStore';
import { useAuthStore } from '@/middleware/Store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useOptions } from '@/data/selectValue';
import { useGetNameUser } from '@/hooks/useGetName';
import {
  InputFieldComponent,
  SelectInputField,
} from '@/app/components/Global/Input';
import { useFetchById } from '@/hooks/useFetchById';
import { Button } from 'flowbite-react';
import Swal from 'sweetalert2';
import InputPKPT from '@/app/components/perencanaan/form/InputPKPT';

const axiosSecvice = new AxiosService();

interface PageProps {
  params: {
    id_pkpt?: number;
  };
}

const ActiontPKPTPage: React.FC<PageProps> = ({ params }) => {
  const { data: DataPKPT, isLoading } = useFetchById<PKPTDataBase>(
      'pkpt',
      Number(params.id_pkpt)
    );
  return <InputPKPT mode='update' data={DataPKPT} status={DataPKPT?.status}/>
}

export default ActiontPKPTPage;
