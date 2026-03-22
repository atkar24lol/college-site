import React from 'react'
import NewsDetails from './component'
import { getDictionary } from '../../dictionaries'

const Page = async ({ params: { lang } }) => {
  const dict = await getDictionary(lang)
  return (
    <NewsDetails dict={dict} />
  )
}

export default Page;