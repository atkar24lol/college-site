import React from 'react'
import "./styles.css"


const CooperationPrograms = ({ dict }) => {
  return (
    <div className='w-full flex xl:justify-between justify-center gap-5 items-center sm:flex-wrap py-[80px] md:py-[40px] sm:py-[40px]'>
      <div className='flex flex-col justify-between w-[70%] md:w-[60%] sm:w-full items-start md:items-center sm:items-center gap-5'>
        <p className='text-[34px] md:text-[24px] sm:text-center sm:text-[20px] text-[#000] font-[900]'>{dict?.cooperation?.programsBlock?.title}</p>

        <p className='text-[22px] md:text-[20px] sm:text-[20px] sm:text-center text-[#0079C1] font-[700]'>{dict?.cooperation?.programsBlock?.titleTwo}</p>

        <span className="text-[#000] text-[16px] font-[400] whitespace-normal break-words sm:text-center">
          {dict?.cooperation?.programsBlock?.description}
        </span>
      </div>

      <div className='bg-white p-2.5 rounded sm:w-full sm:h-[300px]'>
        <img className='rounded-sm preview-programs sm:w-full sm:h-[300px] md:w-full md:h-full' src='/cooperation-programs-preview.png' alt={dict?.cooperation?.programsBlock?.title} />
      </div>
    </div>
  )
}

export default CooperationPrograms