"use client"

import { ClientPageTitle } from '@/components/ui/ClientPageTitle'
import InfoMiniBox from '@/components/infoMiniBox/component'
import PrioretyEntrantsBlock from '@/components/prioretyEntrantsBlock/component'
import PrioretyEntrantsDate from '@/components/prioretyEntrantsDate/component'
import { API } from '@/requester'
import { useParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import "./styles.css"
import Specialization from '@/components/specialization/component'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css';
import 'swiper/css/pagination';

import { Navigation } from 'swiper/modules';
import { Accordion, AccordionDetails, AccordionSummary, IconButton, Pagination } from '@mui/material'
import { ArrowDropDownRounded, KeyboardArrowDownRounded } from '@mui/icons-material'

const Entrants = ({ dict }) => {
  const [prioretyDate, setPrioretyDate] = useState([])
  const [specializations, setSpecializations] = useState([])
  const [faq, setFaqs] = useState([])
  const [specializationsProps, setSpecializationsProps] = useState({
    search: '',
    page: 1,
    pageSize: 3,
    order: 1,
    count: 0,
  });

  const { lang } = useParams()

  const handleChangePage = (e, page) => {
    setSpecializationsProps((prevValue) => ({
      ...prevValue,
      page: page,
    }));
  };

  const admissionProcedures = [
    {
      image: '/education-route-icon.svg',
      title: dict?.entrants?.admissionProcedures?.blockOne?.title,
      description: dict?.entrants?.admissionProcedures?.blockOne?.description,
    },

    {
      image: '/education-route-icon.svg',
      title: dict?.entrants?.admissionProcedures?.blockTwo?.title,
      description: dict?.entrants?.admissionProcedures?.blockTwo?.description,
    },

    {
      image: '/education-route-icon.svg',
      title: dict?.entrants?.admissionProcedures?.blockThree?.title,
      description: dict?.entrants?.admissionProcedures?.blockThree?.description,
    },

    {
      image: '/education-route-icon.svg',
      title: dict?.entrants?.admissionProcedures?.blockFour?.title,
      description: dict?.entrants?.admissionProcedures?.blockFour?.description,
    },

    {
      image: '/education-route-icon.svg',
      title: dict?.entrants?.admissionProcedures?.blockFive?.title,
      description: dict?.entrants?.admissionProcedures?.blockFive?.description,
    },

    {
      image: '/education-route-icon.svg',
      title: dict?.entrants?.admissionProcedures?.blockSix?.title,
      description: dict?.entrants?.admissionProcedures?.blockSix?.description,
    },
  ]

  const handleGetPrioretyDates = useCallback(async () => {
    const { data } = await API.get('education/admission-dates', { params: { page_size: 100 } })
    setPrioretyDate(Array.isArray(data) ? data : data?.results ?? [])
  }, [])

  const handleGetSpecializations = useCallback(async () => {
    const { data } = await API.get('education/specialtie', {
      params: { page: specializationsProps.page, page_size: specializationsProps.pageSize },
    })
    setSpecializations(data?.results ?? [])
    setSpecializationsProps((prev) => ({ ...prev, count: data?.count ?? 0 }))
  }, [specializationsProps.page, specializationsProps.pageSize])

  const handleGetFaqs = useCallback(async () => {
    const { data } = await API.get('abouts/faq', { params: { page_size: 100 } })
    setFaqs(Array.isArray(data) ? data : data?.results ?? [])
  }, [])

  useEffect(() => {
    handleGetPrioretyDates()
    handleGetSpecializations()
    handleGetFaqs()
  }, [handleGetPrioretyDates, handleGetSpecializations, handleGetFaqs])

  return (
    <ClientPageTitle dict={dict}>
    <div className='w-full flex flex-col items-center'>
      <div className='w-full max-w-6xl h-auto min-h-screen py-10 sm:py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between'>
        <PrioretyEntrantsBlock dict={dict} />
        <div className='w-full flex flex-col justify-between gap-[30px]   text-center'>
          <p className='font-[800] text-[#000] text-[34px] md:text-[20px] sm:text-[18px]'>{dict?.entrants?.dateReception?.title}</p>

          <div className='w-full flex justify-evenly items-center gap-4 flex-wrap'>
            {prioretyDate?.map((data, index) => (
              <PrioretyEntrantsDate data={data} key={index} />
            ))}
          </div>

          <div className="w-full flex flex-col py-[50px] md:py-[30px] sm:py-4 gap-10 md:gap-6 sm:gap-3">
            <p className='font-[800] text-[#000] text-[34px] md:text-[20px] sm:text-[18px]'>{dict?.entrants?.admissionProcedures?.title}</p>

            <div className='px-[100px] md:px-[40px] sm:px-4 flex w-full justify-between items-center flex-wrap gap-10'>
              {
                admissionProcedures?.map((item, index) => (
                  <InfoMiniBox className='block' item={item} index={index} key={index} />
                ))
              }
            </div>
          </div>

          <div className='w-full flex flex-col gap-20 items-center'>


            {specializations && specializations?.length > 0 && (
              <div className='flex w-full gap-5 flex-col justify-evenly items-center'>
                <p className='font-[800] text-[#000] text-[34px] md:text-[20px] sm:text-[18px]'>{dict?.entrants?.specializations?.title}</p>

                <div className='w-full flex gap-8 flex-wrap justify-center items-center'>

                  {specializations?.map((route) => (
                    <Specialization key={route.id} dict={dict} route={route} />
                  ))}
                </div>
              </div>
            )}

            <div
              className={'w-full flex justify-center items-center py-6'}
            >
              <Pagination
                variant="outlined"
                shape="rounded"
                onChange={handleChangePage}
                page={specializationsProps?.page}
                count={Math.ceil(specializationsProps.count / specializationsProps.pageSize) || 1}
                showFirstButton
                showLastButton
                siblingCount={2}
              />
            </div>
          </div>

          <div className='w-full flex md:flex-wrap sm:flex-wrap sm:gap-4 justify-between py-[100px] md:py-[40px] sm:py-6'>
            <div className='w-1/2 md:w-full sm:w-full flex flex-col justify-start gap-[50px]'>
              <p className='font-[800] text-[45px] md:text-[30px] sm:text-[20px] text-[#042442] max-w-1/2'>{dict?.entrants?.faq?.title}</p>

              <div className='w-full flex flex-col gap-[25px]'>
                {faq?.map((quest, index) => (
                  <Accordion
                    square='false'
                    sx={{ borderRadius: '40px', border: "none", }}
                    key={index}
                    className='faq-block bg-white p-[10px] accordion'

                  >
                    <AccordionSummary
                      expandIcon={<KeyboardArrowDownRounded />}
                      sx={{
                        borderBottom: '1px solid transparent',
                        '&.Mui-expanded': {
                          borderBottom: '1px solid transparent',
                        },
                      }}
                      className='accordion'
                    >
                      <p className='font-[700] text-[16px] text-[#042442]'>
                        {quest?.[`question_${lang}`]}
                      </p>
                    </AccordionSummary>
                    <AccordionDetails className='accordion'>
                      <div className='w-full flex justify-start items-center'>
                        <span className='tracking-[1px] font-[600] whitespace-normal break-words max-w-full text-[14px] text-[#042442]'>
                          {quest?.[`answer_${lang}`]}
                        </span>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
            </div>
            <img src='/faq-preview.svg' className='w-1/2 md:w-full sm:w-full h-full' />
          </div>
        </div>
      </div>
    </div>
    </ClientPageTitle>
  )
}

export default Entrants

