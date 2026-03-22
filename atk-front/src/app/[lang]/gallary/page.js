import React from 'react'
import { getDictionary } from '../dictionaries'
import Gallary from './component'

const Page = async ({ params: { lang } }) => {
  const dict = await getDictionary(lang)
  return <Gallary dict={dict} />
}

export default Page