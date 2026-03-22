import { getDictionary } from '@/app/[lang]/dictionaries';
import MainPage from './component';

export default async function Page({ params: { lang } }) {
  const dict = await getDictionary(lang);
  return <MainPage dict={dict} />;
}
