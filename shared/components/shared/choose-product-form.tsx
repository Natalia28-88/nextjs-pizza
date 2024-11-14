import React from 'react';
import { Title } from '.';
import { cn } from '@/shared/lib/utils';
import { Button } from '../ui';

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  loading?: boolean;
  onSubmit?: VoidFunction;
  className?: string;
}

/**
 * Форма выбора продукта
 */

export const ChooseProductForm: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  loading,
  onSubmit,
  className,
}) => {
  return (
    <div className={cn('flex flex-col lg:flex-row w-full', className)}>
      <div className="flex items-center justify-center flex-1 relative w-full mt-5 sm:mt-8 lg:mt-0">
        <img
          src={`/${imageUrl}`}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[350px] lg:h-[350px]"
        />
      </div>

      <div className="flex flex-col items-center lg:w-[490px] bg-[#F7F6F5] p-4 w-full rounded-[18px] mt-5 sm:mt-8 lg:mt-0">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <Button
          loading={loading}
          onClick={() => onSubmit?.()}
          className="h-[50px] w-[300px] px-15 text-base rounded-[18px] mt-8 sm:mt-12 mb-4"
        >
          Добавить в корзину за {price} ₽
        </Button>
      </div>
    </div>
  );
};
