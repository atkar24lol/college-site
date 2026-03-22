import React from 'react'
import { getDictionary } from '../dictionaries'
import Entrants from './component'

const Page = async ({ params: { lang } }) => {
  const dict = await getDictionary(lang)
  return <Entrants dict={dict} />
}

export default Page