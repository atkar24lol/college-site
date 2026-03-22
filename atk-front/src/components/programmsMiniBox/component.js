"use client"

import { useParams, usePathname } from 'next/navigation'
import React from 'react'

const ProgrammsMiniBox = ({ item, index }) => {
  return (
    <div key={index} className='w-[305px] h-[205px] shadow-xl rounded-[5px] items-center justify-evenly sm:w-full md:w-full gap-7 flex flex-col p-5 bg-[#fff]'>
      <img src={item?.image} alt={item?.title} className='w-[41px] h-[64px]' />
      <p className='text-[16px] text-[#000] text-center font-[400]'>
        {item?.title}
      </p>
    </div>
  )
}

export default ProgrammsMiniBox