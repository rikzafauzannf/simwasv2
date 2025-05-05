'use client'
import React from 'react'
import Lottie from "lottie-react";
import animationsload from '../../public/animation_load.json'
const Loading = () => {
  return (
    <div className='w-full min-h-dvh flex  justify-center items-center'>
      <Lottie animationData={animationsload} loop={true}/>
    </div>
  )
}

export default Loading
