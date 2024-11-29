import InputKendaliMutu from '@/app/components/pelaksanaan/form/inputKendaliMutu'
import React from 'react'

interface PageProps{
    params:{
        id_st:number
    }
}

const FormKendaliMutuPage = ({params}:PageProps) => {
    const id = params.id_st
  return (
    <div className='space-y-3'>
        <InputKendaliMutu/>
    </div>
  )
}

export default FormKendaliMutuPage