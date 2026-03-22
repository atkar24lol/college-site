import React from 'react'
import { getDictionary } from '../dictionaries'
import Contacts from './component'

const Page = async ({ params: { lang } }) => {
  const dict = await getDictionary(lang)
  return <Contacts dict={dict} />
}

export default Page