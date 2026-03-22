import { useParams, usePathname } from 'next/navigation'
import React from 'react'

const EducationValueCard = ({ valueCollege }) => {

  const { lang } = useParams()
  const path = usePathname()

  return (
    <div className='flex flex-col relative'>
      <div className={`w-[280px] sm:w-full min-h-[551px] h-auto p-[25px] flex flex-col justify-between items-center ${path === `/${lang}/education-activity` ? 'border-[#0072BC] border-[1px]' : 'shadow-lg'} rounded-[5px] shadow-lg`}
      >
        <img src={valueCollege?.image} alt={valueCollege?.title} className='w-full h-[246px]' />

        <div className='absolute translate-y-[150%] rounded-lg bg-white shadow-sm w-[86px] h-[86px] flex justify-center items-center mission-box-icon'>
          <img src='/education-mission-icon.svg' alt='education' />
        </div>

        <div className='flex pt-[50px] flex-col justify-evenly w-full h-full'>
          <p className='font-[700] text-[20px] sm:text-[16px] text-[#0072BC]'>{valueCollege?.title}</p>

          <span className='font-[400] text-[14px]  sm:text-[12px] text-[#000] leading-[22px]'>{valueCollege?.descriptionOne}</span>

          <span className='font-[400] text-[14px]  sm:text-[12px] text-[#000] leading-[22px]'>{valueCollege?.descriptionTwo}</span>
        </div>

        <div className='w-full absolute h-[23px] bottom-0 bg-[#0079C1] rounded-b-[5px]' />
      </div>
    </div>
  )
}

export default EducationValueCard