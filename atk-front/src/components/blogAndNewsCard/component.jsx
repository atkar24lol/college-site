'use client';

import { useParams, useRouter } from 'next/navigation';
import React from 'react';

const BlogAndNewsCard = ({ event, dict }) => {
  const { lang } = useParams();
  const router = useRouter()

  return (
    <div
    onClick={() => router.push(`/${lang}/news/${event?.id}`)}
    className="flex cursor-pointer shadow-lg hover:shadow-xl transition-[1s] pt-[24px] pb-[26px] w-[295px] min-h-[320px] tracking-[0.5px] max-h-[320px] flex-col gap-6 px-[10.5px] overflow-hidden">
      <img
        src={event?.image}
        alt={event?.[`title_${lang}`]}
        className="w-full min-h-[158px] h-[158px]"
      />
      <p className="font-[700] overflow-ellipsis truncate text-[18px] text-[#000]">
        {event?.[`title_${lang}`]}
      </p>

      <button className='hover:underline transition-[1s] hover:transition-[1s] cursor-pointer' onClick={() => router.push(`/${lang}/news/${event?.id}`)}>{dict?.blogAndNews?.titles?.aboutButton}</button>
    </div>
  );
};

export default BlogAndNewsCard;
