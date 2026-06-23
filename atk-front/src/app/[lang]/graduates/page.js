import { getDictionary } from '../dictionaries';
import Graduates from './component';

const Page = async ({ params: { lang } }) => {
  const dict = await getDictionary(lang);
  return <Graduates dict={dict} />;
};

export default Page;
