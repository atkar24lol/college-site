import React from 'react'
import { getDictionary } from '../dictionaries'
import AdditionalEducation from './component'

const Page = async ({ params: { lang } }) => {
  const dict = await getDictionary(lang)
  return (
    <AdditionalEducation dict={dict} />
  )
}

export default Page;
