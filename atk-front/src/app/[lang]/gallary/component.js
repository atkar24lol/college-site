"use client"

import { ClientPageTitle } from '@/components/ui/ClientPageTitle';
import React, { useCallback, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';


import './styles.css';
import { Pagination } from 'swiper/modules';
import { useMediaQuery, useTheme } from '@mui/material';
import { useParams } from 'next/navigation';
import { API } from '@/requester';

const Gallary = ({ dict }) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const md = useMediaQuery(theme.breakpoints.down('md'));

  const [gallary, setGallary] = useState({
    pictures: [],
    videos: [],
    graduetes: []
  });
  const { lang } = useParams()

  const handleGetNews = useCallback(async () => {
    const { data } = await API.get('abouts/images-of-multimedia/', { params: { page_size: 100 } });
    const raw = Array.isArray(data) ? data : data?.results ?? [];
    const picture = raw.filter((item) => item.type === 'picture')
    const videos = raw.filter((item) => item.type === 'video')
    const graduates = raw.filter((item) => item.type === 'graduates')
    setGallary({ pictures: picture, videos: videos, graduetes: graduates });
  }, [lang]);

  useEffect(() => {
    handleGetNews();
  }, [handleGetNews]);


  return (
    <ClientPageTitle dict={dict}>
    <div className='flex flex-col w-full min-h-screen pb-16'>

      <div className='w-full flex justify-between gap-3 flex-wrap'>
        <p className='pb-[50px] text-[34px] md:text-[20px] sm:text-[20px] sm:text-center w-full font-[800] text-[#000] pt-[50px] gallary-swiper-container'>{dict?.gallary?.titleImages}</p>

        {gallary && gallary?.pictures?.length > 0 && (
          <Swiper
            slidesPerView={sm ? 1 : md ? 2 : 3}
            loop
            pagination={{
              clickable: true,
            }}
            spaceBetween={30}
            modules={[Pagination]}
            className="gallary-swiper"
          >
            {gallary.pictures?.map((picture, index) => (
              <SwiperSlide key={index}>
                <div className='flex flex-col'>
                  <img src={picture?.image} alt={picture?.[`title_${lang}`]} className='w-[390px] sm:w-full h-[260px]' />

                  <p className='text-[#000] text-[24px] font-[600]'>{picture?.[`title_${lang}`]}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <div className='w-full flex justify-between gap-3 flex-wrap'>
        <p className='pb-[50px] text-[34px] md:text-[20px] sm:text-[20px] sm:text-center w-full font-[800] text-[#000] pt-[50px]'>{dict?.gallary?.titleVideos}</p>
        {gallary && gallary?.videos?.length > 0 && (
          <Swiper
            slidesPerView={sm ? 1 : md ? 2 : 3}
            loop
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="gallary-swiper"
          >
            {gallary.videos?.map((videoData, index) => (
              <SwiperSlide key={index}>
                <div className='flex flex-col'>
                  <iframe
                    className='sm:w-full w-[390px] h-[260px]'
                    src={videoData?.link}
                    title={videoData?.[`title_${lang}`]}
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                  <p className='text-[#000] text-[24px] font-[600]'>{videoData?.[`title_${lang}`]}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <div className='w-full flex justify-between gap-3 flex-wrap'>
        <p className='pb-[50px] text-[34px] md:text-[20px] sm:text-[20px] sm:text-center w-full font-[800] text-[#000] pt-[50px]'>{dict?.gallary?.titleImagesGraduates}</p>

        {gallary && gallary?.graduetes?.length > 0 && (
          <Swiper
            slidesPerView={sm ? 1 : md ? 2 : 3}
            loop
            pagination={{
              clickable: true,
            }}
            spaceBetween={30}
            modules={[Pagination]}
            className="gallary-swiper"
          >
            {gallary.graduetes?.map((graduetes, index) => (
              <SwiperSlide key={index}>
                <div className='flex flex-col'>
                  <img src={graduetes?.image} alt={graduetes?.[`title_${lang}`]} className='w-[390px] sm:w-full h-[260px]' />

                  <p className='text-[#000] text-[24px] font-[600]'>{graduetes?.[`title_${lang}`]}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
    </ClientPageTitle>
  )
}

export default Gallary