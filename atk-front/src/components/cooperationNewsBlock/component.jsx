'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import './styles.css';

const CooperationNewsBlock = ({ dict, news }) => {
  const { lang } = useParams();
  const router = useRouter();

  return (
    <div className="flex flex-col w-full max-w-[1440px]">
      <div className="flex py-[50px] items-center">
        <span className="text-[#000] md:text-[24px] sm:text-[20px] text-[34px] px-[80px] sm:px-6 font-[800]">
          {dict?.cooperation?.newsBlock?.title}
        </span>

        <span
          onClick={() => router.push(`/${lang}/news`)}
          className="flex gap-3 cursor-pointer justify-between items-center font-[700]
          text-[12px] tracking-[1.5px] text-[#0072BC]"
        >
          {dict?.cooperation?.newsBlock?.button}

          <img className="w-[7px]" src="/next-btn-main-news.png" alt="arrow" />
        </span>
      </div>

      <div className="flex w-full justify-center gap-7 md:flex-wrap sm:flex-wrap lg:flex-wrap">
        <div className="w-full flex items-center flex-col gap-5 justify-between flex-wrap">
          {news
            ?.filter((event, index) => index === 0 || index === 1)
            .map((event, index) => (
              <div
                onClick={() => router.push(`/${lang}/news/${event?.id}`)}
                className="w-[612px] cursor-pointer md:w-[490px] h-[340px] sm:w-full p-5 news-box flex flex-col justify-evenly items-start"
                style={{
                  backgroundImage: `url(${event?.image})`,
                  backgroundSize: '100% 100%',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <p className="text-[12px] tracking-[1px] text-[#fff] font-[900]">
                  {event?.date?.slice(0, 10)}
                </p>

                <p className="text-[34px] tracking-[1px] truncate w-full text-[#fff] font-[900]">
                  {event?.[`title_${lang}`]}
                </p>

                <span className="text-[14px] tracking-[1px] truncate w-full text-[#fff] font-[400]">
                  {event?.[`description_${lang}`]}
                </span>

                <span
                  onClick={() => router.push(`/${lang}/news/${event?.id}`)}
                  className="flex gap-3 pt-[60px] cursor-pointer justify-between items-center font-[700]
          text-[12px] tracking-[1px] text-[#fff]"
                >
                  {dict?.cooperation?.newsBlock?.aboutButton}
                  <img
                    className="w-[7px]"
                    src="/next-btn-cooperation-news.png"
                    alt="arrow"
                  />
                </span>
              </div>
            ))}
        </div>

        <div className="w-full flex flex-col items-center justify-between gap-5 flex-wrap">
          {news
            ?.filter((event, index) => index === 2 || index === 3)
            .map((event, index) => (
              <div
                onClick={() => router.push(`/${lang}/news/${event?.id}`)}
                className="w-[490px] sm:w-full cursor-pointer shadow-lg rounded-sm flex flex-col justify-between items-start"
              >
                <img
                  src={event?.image}
                  alt={event?.title}
                  className="w-full h-[280px]"
                />

                <div className="flex w-full flex-col bg-white p-5 justify-around items-start ">
                  <p className="text-[12px] tracking-[1px] text-[#838383] font-[900]">
                    {event?.date?.slice(0, 10)}
                  </p>

                  <p className="text-[18px] truncate w-full tracking-[1px] text-[#000000] font-[900]">
                    {event?.[`title_${lang}`]}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CooperationNewsBlock;
