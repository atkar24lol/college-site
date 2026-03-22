import React from 'react'
import { getDictionary } from '../dictionaries'
import SiteMap from './component'

const Page = async ({ params: { lang } }) => {
  const dict = await getDictionary(lang)
  return <SiteMap dict={dict} />
}

export default Page