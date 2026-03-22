'use client';

import { ClientPageTitle } from '@/components/ui/ClientPageTitle';

export default function ElectronLibrary({ dict }) {
  const empty = dict?.electronLibraryPage?.empty ?? '';

  return (
    <ClientPageTitle dict={dict}>
      <div className="rounded-lg border border-neutral-200 bg-white p-6 text-sm text-neutral-600">
        {empty}
      </div>
    </ClientPageTitle>
  );
}
