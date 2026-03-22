'use client';

import MainInfoBlock from '@/components/mainInfoBlock/component';
import { ClientPageTitle } from '@/components/ui/ClientPageTitle';

export default function SpecialitiesView({ dict }) {
  return (
    <ClientPageTitle dict={dict}>
      <MainInfoBlock dict={dict} showHeading={false} />
    </ClientPageTitle>
  );
}
