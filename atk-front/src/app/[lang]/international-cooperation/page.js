import React from 'react'
import { getDictionary } from '../dictionaries'
import InternatonalCooperation from './component'

const Page = async ({ params: { lang } }) => {
  const dict = await getDictionary(lang)
  return <InternatonalCooperation dict={dict} />
}

export default Page