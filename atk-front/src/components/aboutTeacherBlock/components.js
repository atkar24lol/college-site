"use client"
import { useState } from 'react'
import './styles.css'
import { useParams } from 'next/navigation'

const AboutTeacherBlock = ({ dict, teacher }) => {
  let age = 'лет'
  const { lang } = useParams()

  if (teacher?.age % 10 === 1 && teacher?.age % 100 !== 11) {
    age = ' год'
  } else if (teacher?.age % 10 >= 2 && teacher?.age % 10 <= 4 && (teacher?.age % 100 < 10 || teacher?.age % 100 >= 20)) {
    age = ' года'
  } else {
    age = ' лет'
  }

  return (
    <div className='w-full bg-[#fff] teacher-block gap-7 rounded flex xl:flex-nowrap flex-wrap justify-around items-center py-5 px-10 md:px-6 sm:px-4'>
      <div className='flex xl:w-[50%] gap-8 md:w-full sm:flex-wrap xl:justify-start justify-center xl:items-start items-center w-full xl:border-r-[1px] xl:border-r-[#0D8DE0] h-[80%]'>
        <img src={teacher?.avatar} alt={teacher?.[`name_${lang}`]} className='w-[176px] h-[176px] rounded-[50%] gap-5' />

        <div className='flex flex-col text-start sm:text-center'>
          <div className='flex flex-col'>
            <p className='text-[#000] text-[24px] font-[400]'>{teacher?.name}</p>

            <p className='text-[#0D8DE0] text-[16px] font-[400]'>{teacher?.[`subject_${lang}`]}</p>
          </div>

          <p>{teacher?.age} {age}</p>
        </div>
      </div>

      <div className='flex flex-wrap box-border text-wrap xl:w-[50%] w-full text-justify xl:text-start items-start'>
        <span className='teacher-description'>{teacher?.[`bio_${lang}`]}</span>
      </div>
    </div>
  )
}

export default AboutTeacherBlock