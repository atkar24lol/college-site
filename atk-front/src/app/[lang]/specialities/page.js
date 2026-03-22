import { getDictionary } from '../dictionaries';
import SpecialitiesView from './client-page';

export default async function Page({ params: { lang } }) {
  const dict = await getDictionary(lang);
  return <SpecialitiesView dict={dict} />;
}
