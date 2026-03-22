import React from 'react'
import { getDictionary } from '../dictionaries'
import Teachers from './component'

const Page = async ({ params: { lang } }) => {
  const dict = await getDictionary(lang)
  return <Teachers dict={dict} />
}

export default Page