import React from 'react'

const PrioretyEntrantsBlock = ({ dict }) => {

  const listOne = [
    { text: dict?.entrants?.prioretyInformation?.blockOne?.title },
    { text: dict?.entrants?.prioretyInformation?.blockOne?.textOne },
    { text: dict?.entrants?.prioretyInformation?.blockOne?.textTwo },
    { text: dict?.entrants?.prioretyInformation?.blockOne?.textThree },
    { text: dict?.entrants?.prioretyInformation?.blockOne?.textFour },
    { text: dict?.entrants?.prioretyInformation?.blockOne?.textFive },
  ]

  const listTwo = [
    { text: dict?.entrants?.prioretyInformation?.blockTwo?.title },
    { text: dict?.entrants?.prioretyInformation?.blockTwo?.textOne },
    { text: dict?.entrants?.prioretyInformation?.blockTwo?.textTwo },
    { text: dict?.entrants?.prioretyInformation?.blockTwo?.textThree },
    { text: dict?.entrants?.prioretyInformation?.blockTwo?.textFour },
    { text: dict?.entrants?.prioretyInformation?.blockTwo?.textFive },
  ]

  return (
    <div className='w-full flex flex-col gap-12 justify-between pb-[50px] md:pb-[30px] sm:pb-4'>
      <div className='p-[20px] flex border-[1px] justify-between items-center border-[#0072BC] rounded-[5px] flex-wrap gap-10 w-full lg:justify-center'>
        <div className='flex flex-col h-full xxl:items-start justify-evenly gap-6'>
          {listOne?.map((item, index) => (
            <p
              key={index}
              className={`${index === 0
                ? 'text-[34px] md:text-[24px] sm:text-[20px] text-[#0072BC] font-[900]'
                : 'text-[20px] md:text-[20px] sm:text-[16px] text-[#626262] font-[400]'
                }`}
            >
              {item?.text}
            </p>
          ))}
        </div>
        <div className='w-[330px] flex lg:w-[500px] sm:w-full md:w-full xl:items-center xl:justify-center  xxl:items-center xxl:justify-center xl:h-[300px] lg:h-[400px]  h-full p-1.5 shadow-xl rounded'>
          <img src='/entrants-priorety-preview.png' alt={dict?.entrants?.prioretyInformation?.blockOne?.title} className='rounded-[10px] w-full h-full' />
        </div>
      </div>

      <div className='p-[20px] flex-row-reverse flex border-[1px] justify-between items-center border-[#0072BC] rounded-[5px] flex-wrap gap-10 lg:justify-center'>
        <div className='flex flex-col h-full justify-evenly gap-6'>
          {listTwo?.map((item, index) => (
            <p
              key={index}
              className={`${index === 0
                ? 'text-[34px] md:text-[24px] sm:text-[20px] text-[#0072BC] font-[900]'
                : 'text-[20px] md:text-[20px] sm:text-[16px] text-[#626262] font-[400]'
                }`}
            >
              {item?.text}
            </p>
          ))}
        </div>
        <div className='w-[330px] flex lg:w-[500px] sm:w-full md:w-full xl:items-center xl:justify-center  xxl:items-center xxl:justify-center  xl:h-[300px] lg:h-[400px]  h-full p-1.5 shadow-xl rounded'>
          <img src='/entrants-priorety-preview.png' alt={dict?.entrants?.prioretyInformation?.blockOne?.title} className='rounded-[10px] w-full h-full' />
        </div>
      </div>
    </div >
  )
}

export default PrioretyEntrantsBlock