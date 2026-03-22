import React from 'react';
import { getDictionary } from '../../dictionaries';
import CourseDetails from './component';

const Page = async ({ params: { lang } }) => {
  const dict = await getDictionary(lang);
  return <CourseDetails dict={dict} />;
};

export default Page;
