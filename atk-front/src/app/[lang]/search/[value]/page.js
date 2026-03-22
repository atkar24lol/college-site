import React from 'react'
import Search from './component'
import { getDictionary } from '../../dictionaries'

const Page = async ({ params: { lang } }) => {
  const dict = await getDictionary(lang)
  return <Search dict={dict} />
}

export default Page