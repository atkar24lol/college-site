"use client"

import { useParams, usePathname } from 'next/navigation'
import React from 'react'

const AdditionalEducationAdvantages = ({ advantage }) => {

  const { lang } = useParams()
  const path = usePathname()

  return (
    <div className='flex flex-col relative border-[1px] border-[#0072BC] rounded-md'>
      <div className={`w-[360px] sm:w-full min-h-[500px] h-auto p-[25px] flex flex-col items-center ${path === `/${lang}/education-activity` ? 'border-[#0072BC] border-[1px]' : 'shadow-lg'} rounded-[5px] shadow-lg`}
      >
        <img src={advantage?.image} alt={advantage?.title} className='w-full h-[246px] rounded-md' />

        <div className='absolute translate-y-[230%] rounded-lg bg-white shadow-sm w-[86px] h-[86px] flex justify-center items-center mission-box-icon'> 
          <img src={advantage?.icon} alt={advantage?.title} />
        </div>

        <div className='flex pt-[50px] flex-col justify-evenly leading-[22px] w-full h-full'>
          <p className='font-[700] text-[20px] sm:text-[16px] text-[#0072BC] text-center py-[10px]'>{advantage?.title}</p>

          <span className='font-[400] text-[14px] tracking-[1.5px] pb-[20px] sm:text-[12px] text-[#000] leading-[22px]'>{advantage?.description}</span>
        </div>

        <div className='w-full absolute h-[23px] bottom-0 bg-[#0079C1] rounded-b-[5px]' />
      </div>
    </div>
  )
}

export default AdditionalEducationAdvantages