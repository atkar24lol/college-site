import React from 'react'
import { getDictionary } from '../dictionaries'
import AboutTeachers from './component'

const Page = async ({ params: { lang } }) => {
  const dict = await getDictionary(lang)
  return <AboutTeachers dict={dict} />
}

export default Page