'use client'
import React from 'react'

interface PageProps {
    params: {
      id_st: number;
    };
  }
const ViewSuratTugas = ({params}:PageProps) => {
    const id = params.id_st
  return (
    <div>ViewSuratTugas</div>
  )
}

export default ViewSuratTugas