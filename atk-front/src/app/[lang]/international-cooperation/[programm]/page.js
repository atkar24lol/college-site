import React from 'react'
import InternatonalCooperation from './component'
import { getDictionary } from '../../dictionaries'

const Page = async ({ params: { lang } }) => {
  const dict = await getDictionary(lang)
  return <InternatonalCooperation dict={dict} />
}

export default Page