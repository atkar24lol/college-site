import React from 'react'
import EducationActivity from './component'
import { getDictionary } from '../dictionaries'

const Page = async ({ params: { lang } }) => {
  const dict = await getDictionary(lang)
  return <EducationActivity dict={dict} />
}

export default Page