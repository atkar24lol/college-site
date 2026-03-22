"use client"

import { ClientPageTitle } from '@/components/ui/ClientPageTitle'
import React, { useCallback, useEffect, useState } from 'react'
import "./styles.css"
import { Pagination } from '@mui/material'
import InfoMiniBox from '@/components/infoMiniBox/component'
import { API } from '@/requester'
import { useParams } from 'next/navigation'

const Teachers = ({ dict }) => {
  const [plans, setPlans] = useState([])
  const [plansProps, setPlansProps] = useState({
    search: '',
    page: 1,
    pageSize: 3,
    order: 1,
    count: 0,
  });

  const { lang } = useParams()

  const handleChangePage = (e, page) => {
    setPlansProps((prevValue) => ({
      ...prevValue,
      page: page,
    }));
  };

  const handleGetPlans = useCallback(async () => {
    const { data } = await API.get('education/schedule', {
      params: { page: plansProps.page, page_size: plansProps.pageSize },
    })
    setPlans(data?.results ?? [])
    setPlansProps((prev) => ({ ...prev, count: data?.count ?? 0 }))
  }, [plansProps.page, plansProps.pageSize])

  useEffect(() => {
    handleGetPlans()
  }, [handleGetPlans])

  const materials = [
    {
      image: '/education-route-icon.svg',
      title: dict?.teachers?.materials?.materialOne?.title,
      description: dict?.teachers?.materials?.materialOne?.description,
      button: dict?.teachers?.materials?.materialOne?.buttonText,
    },
    {
      image: '/education-route-icon.svg',
      title: dict?.teachers?.materials?.materialTwo?.title,
      description: dict?.teachers?.materials?.materialTwo?.description,
      button: dict?.teachers?.materials?.materialTwo?.buttonText,
    },

    {
      image: '/education-route-icon.svg',
      title: dict?.teachers?.materials?.materialThree?.title,
      description: dict?.teachers?.materials?.materialThree?.description,
      button: dict?.teachers?.materials?.materialThree?.buttonText,
    },

    {
      image: '/education-route-icon.svg',
      title: dict?.teachers?.materials?.materialFour?.title,
      description: dict?.teachers?.materials?.materialFour?.description,
      button: dict?.teachers?.materials?.materialFour?.buttonText,
    },

    {
      image: '/education-route-icon.svg',
      title: dict?.teachers?.materials?.materialFour?.title,
      description: dict?.teachers?.materials?.materialFour?.description,
      button: dict?.teachers?.materials?.materialFour?.buttonText,
    },

    {
      image: '/education-route-icon.svg',
      title: dict?.teachers?.materials?.materialFour?.title,
      description: dict?.teachers?.materials?.materialFour?.description,
      button: dict?.teachers?.materials?.materialFour?.buttonText,
    },
  ]

  return (
    <ClientPageTitle dict={dict}>
    <div className='w-full h-auto min-h-screen flex flex-col gap-8 py-10 learning-plan-box'>
      <div className='flex flex-col justify-between gap-[15px]'>
        <p className='font-[800] text-[34px] text-[#000] text-center'>{dict?.teachers?.title}</p>

        <div className='flex gap-[30px] py-8 xl:justify-center xxl:justify-center justify-between sm:justify-center md:justify-center w-full flex-wrap'>
          {plans?.map((predmet, index) => (
            <div key={index} className='flex sm:items-center flex-col relative xl:items-center justify-evenly shadow-xl'>
              <div className={`w-[320px] min-h-[310px] h-auto p-[25px] flex flex-col justify-between items-center rounded-[5px] shadow-lg`}
              >
                <img src={predmet?.image} alt={predmet?.title} className='w-full h-[196px]' />

                <p className='font-[700] text-[20px] text-[#0072BC] text-center pt-[45px]'>{predmet?.[`title_${lang}`]}</p>

                <div className='absolute translate-y-[170%] rounded-lg bg-white shadow-sm w-[86px] h-[86px] flex justify-center items-center mission-box-icon'>
                  <img src='/teacher-react-icon.svg' alt={predmet?.title} />
                </div>
                <a href={predmet?.file} download={predmet?.[`title_${lang}`]}>
                  <button
                    className="cursor-pointer hover:underline pt-4"
                  >
                    {dict?.download}
                  </button>
                </a>

              </div>
            </div>
          ))}
        </div>

        <div
          className={'w-full flex justify-center items-center py-6'}
        >
          <Pagination
            variant="outlined"
            shape="rounded"
            onChange={handleChangePage}
            page={plansProps?.page}
            count={Math.ceil(plansProps.count / plansProps.pageSize) || 1}
            showFirstButton
            showLastButton
            siblingCount={2}
          />
        </div>

        <div className='pt-[53px] pb-[55px]'>
          <div className='flex flex-wrap xl:gap-0 gap-7 justify-start xl:justify-center xxl:justify-center w-full min-h-[450px]'>
            <div className='flex border-[1px] border-[#0072BC] flex-col p-[22px] xl:w-[30%] xxl:w-[40%] xxl:items-center w-full'>
              <img src='/college-value-preview.png' className='w-full h-[320px] pb-5' />
              <p className='font-[800] text-[34px] md:text-[24px] sm:text-[20px] text-[#000]'>{dict?.teachers?.materials?.title}</p>
            </div>

            <div className='xl:w-[70%] px-4 w-full md:pt-4 sm:pt-4 justify-center flex-wrap sm:flex-col flex gap-4 items-center'>{materials?.map((item, index) => (
              <InfoMiniBox item={item} key={index} />
            ))}</div>
          </div>
        </div>
      </div>
    </div>
    </ClientPageTitle>
  )
}

export default Teachers

