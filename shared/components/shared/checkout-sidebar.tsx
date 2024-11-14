import React from 'react';
import { CheckoutItemDetails, WhiteBlock } from '.';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { Button, Skeleton } from '../ui';
import { cn } from '@/shared/lib';

interface Props {
  totalAmount: number;
  loading?: boolean;
  className?: string;
}

const VAT = 20;
const DELIVERY_PRICE = 250;

export const CheckoutSidebar: React.FC<Props> = ({
  totalAmount,
  loading,
  className,
}) => {
  const vatPrice = (((totalAmount / (VAT / 100 + 1)) * VAT) / 100).toFixed(2);
  const totalPrice = totalAmount + DELIVERY_PRICE;

  return (
    <WhiteBlock className={cn('p-6 sticky top-4', className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        {loading ? (
          <Skeleton className="w-48 h-11" />
        ) : totalAmount > 0 ? (
          <span className="h-11 text-[34px] font-extrabold">
            {totalPrice} ₽
          </span>
        ) : (
          <span className="h-11 text-[34px] font-extrabold">0 ₽</span>
        )}
      </div>
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-400" />
            Стоимость корзины:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="w-16 h-6 rounded-[6px]" />
          ) : (
            `${totalAmount} ₽`
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Percent size={18} className="mr-2 text-gray-400" />В том числе НДС:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="w-16 h-6 rounded-[6px]" />
          ) : (
            `${vatPrice} ₽`
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-gray-400" />
            Доставка:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="w-16 h-6 rounded-[6px]" />
          ) : totalAmount > 0 ? (
            `${DELIVERY_PRICE} ₽`
          ) : (
            ' 0 ₽'
          )
        }
      />

      <Button
        loading={loading}
        type="submit"
        className="w-full h-14 mt-6 text-base font-bold"
      >
        Перейти к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
