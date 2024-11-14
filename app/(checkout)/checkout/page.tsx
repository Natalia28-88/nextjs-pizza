import { CheckoutContent } from '@/shared/components/shared/checkout-content';
import React, { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
