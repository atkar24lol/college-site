"use client"

import { useParams } from 'next/navigation'
import React from 'react'

const PrioretyEntrantsDate = ({ data }) => {
  const { lang } = useParams()

  return (
    <div className="w-[350px] box-border sm:w-full md:w-full max-h-[250px] overflow-y-auto min-h-[250px] border-[1px] border-[#0072BC] gap-7 flex flex-col justify-between px-7 pt-[17px] pb-[30px] shadow-md">
      <div className="flex w-full justify-between">
        <div className="flex flex-col items-start flex-wrap">
          <p>2024</p>
          <p className="text-[18px] text-wrap text-start text-[#0072BC] font-[800] min-h-[50px] overflow-hidden whitespace-nowrap">{data?.[`title_${lang}`]}</p>
          <hr className="border-[1px] border-[#000] w-full my-4" />
          <span className="text-[18px] text-[#0072BC] font-[800]">12 марта - 26 апреля</span>
        </div>
        <img src="/calendar-preview.svg" alt="КНАУ календарь" className="w-[22px] h-[22px]" />
      </div>
      <span className="text-[14px] flex-wrap max-w-full font-[400] text-[#000000] tracking-[1px] break-words">{data?.[`description_${lang}`]}</span>
    </div>
  )
}

export default PrioretyEntrantsDate