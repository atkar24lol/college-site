"use client"

import { useParams, usePathname } from 'next/navigation'
import React from 'react'

const InfoMiniBox = ({ item, index }) => {

  const path = usePathname()
  const { lang } = useParams()

  return (
    <div className='w-[250px] shadow-xl rounded-[5px] items-center justify-evenly sm:w-full md:w-full min-h-[250px] gap-7 flex flex-col p-5'>
      <img src={item?.image} alt={item?.title} className='w-[41px] h-[64px]' />
      <p className={`${path === `/${lang}/international-cooperation` ? 'text-[16px] text-[#000] font-[400]' : 'font-[700] text-[20px] text-center text-[#0072BC]'}`}>
        {path === `/${lang}/entrants` ? `${index + 1}. ${item?.title}` : item?.title}
      </p>


      <span className='font-[400] text-[14px] leading-[22px] text-center text-[#000]'>{item?.description}</span>
      <button className={`${path === `/${lang}/teachers` ? 'block' : 'hidden'} 
      ${path === `/${lang}/entrants ? 'max-h-[250px]' : 'h-auto'`}
      font-[700] text-[10px] tracking-[0.8px] text-[#0072BC]`}>{item?.button}</button >
    </div>
  )
}

export default InfoMiniBox