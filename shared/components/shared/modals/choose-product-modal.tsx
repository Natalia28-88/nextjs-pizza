'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import { ProductWithRelations } from '@/@types/prisma';
import { Dialog, DialogContent, DialogTitle } from '@/shared/components/ui';
import { ProductForm } from '@/shared/components/shared';

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter(); //чтобы модальное окно закрывалось при нажатии на ссылку

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        aria-describedby={undefined}
        className={cn(
          'p-0 lg:w-[1000px] lg:max-w-[1000px] lg:h-[800px] lg:overflow-hidden bg-white overflow-y-scroll scrollbar max-h-screen',
          className
        )}
      >
        <DialogTitle className="opacity-0 absolute" />
        <ProductForm product={product} onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
