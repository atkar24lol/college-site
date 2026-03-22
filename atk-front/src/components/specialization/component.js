"use client"
import { useParams } from 'next/navigation'
import React from 'react'
import "./styles.css"

const Specialization = ({ dict, route }) => {
  const { lang } = useParams()

  return (
    <div className='min-h-[500px] max-h-[600px] overflow-y-auto gap-[50px] h-auto w-[400px] md:w-[350px] sm:w-full flex flex-col justify-evenly items-center p-5 rounded-md specialization-box '>
      <img src={route?.study_time} className='w-full h-[280px] rounded-md' />
      <div className='w-full flex flex-col justify-evenly items-center gap-5'>
        <div className='flex py-3 justify-around items-center w-full'>
          <span className='text-[gray] text-[14px] underline'>{route?.code} 28068778</span>
          <p className='text-[20px] font-[900] tracking-[1px] uppercase'>{route?.[`title_${lang}`]}</p>
        </div>

        <span className='break-words max-w-full text-justify'>{route?.[`description_${lang}`]}</span>

        <div className='flex flex-col justify-evenly items-start gap-3'>
          <p className='text-[#0072BC] text-[18px] font-[700] tracking-[1px]'>{dict?.entrants?.specializations?.long} {route?.long && route?.long} 2 года</p>

          <p className='text-[#0072BC] text-[18px] font-[700] tracking-[1px]'>{dict?.entrants?.specializations?.format} {route?.budget && route?.budget}</p>

          <p className='text-[#0072BC] text-[18px] font-[700] tracking-[1px]'>{dict?.entrants?.specializations?.contract} {route?.budget && route?.type?.toUpperCase()}</p>
        </div>
      </div>
    </div >
  )
}

export default Specialization