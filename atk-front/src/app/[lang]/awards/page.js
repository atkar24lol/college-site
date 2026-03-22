import React from "react";
import { getDictionary } from "../dictionaries";
import Awards from "./component";

const Page = async ({ params: { lang } }) => {
  const dict = await getDictionary(lang);
  return <Awards dict={dict} />;
};

export default Page;
