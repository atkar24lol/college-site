import SpecialityDetails from './component';
import { getDictionary } from '../../dictionaries'

export default async function SpecialityDetailsPage({ params: { lang, specialityId } }) {
  const dict = await getDictionary(lang);

  return <SpecialityDetails dict={dict} />;
}