'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import Link from 'next/link';
import { Button } from '../ui';
import { CartDrawerItem } from '.';
import { cn, getCartItemDetails } from '@/shared/lib';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { useCart } from '@/shared/hooks';

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart();
  const [redirecting, setRedirecting] = React.useState(false);

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  const calcTotalItemsQuantity = (): number => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const totalItemsQuantity = calcTotalItemsQuantity();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        className="flex flex-col justify-between pb-0 bg-[#f4f1ee] w-full max-w-full sm:w-full sm:max-w-full md:w-full md:max-w-full lg:w-[400px]"
        aria-describedby={undefined}
      >
        <div
          className={cn(
            'flex flex-col h-full',
            !totalAmount && 'justify-center'
          )}
        >
          {totalAmount > 0 && (
            <SheetHeader>
              <SheetTitle>
                Итого в корзине позиций:{'    '}
                <span className="font-bold">{totalItemsQuantity}</span>
              </SheetTitle>
              <SheetDescription />
            </SheetHeader>
          )}

          {!totalAmount && (
            <div className="flex flex-col items-center justify-center w-72 mx-auto">
              <SheetHeader>
                <Image
                  src="/empty-box.png"
                  width={120}
                  height={120}
                  alt="Empty cart"
                />
                <SheetTitle className="text-center font-bold my-2">
                  Корзина пустая
                </SheetTitle>
              </SheetHeader>
              <SheetDescription className="text-center text-neutral-500 mb-5">
                Добавьте хотя бы одну пиццу, чтобы совершить заказ
              </SheetDescription>

              <SheetClose asChild>
                <Button className="w-56 h-12 text-base" size="lg">
                  <ArrowLeft className="w-5 mr-2" />
                  Вернуться назад
                </Button>
              </SheetClose>
            </div>
          )}

          {totalAmount > 0 && (
            <>
              <div className="-mx-6 mt-5 overflow-auto flex-1">
                <div className="mb-2">
                  {items.map((item) => (
                    <CartDrawerItem
                      key={item.id}
                      id={item.id}
                      imageUrl={item.imageUrl}
                      name={item.name}
                      details={getCartItemDetails(
                        item.ingredients,
                        item.pizzaSize as PizzaSize,
                        item.pizzaType as PizzaType
                      )}
                      price={item.price}
                      disabled={item.disabled}
                      quantity={item.quantity}
                      onClickCountButton={(type) =>
                        onClickCountButton(item.id, item.quantity, type)
                      }
                      onClickRemove={() => removeCartItem(item.id)}
                    />
                  ))}
                </div>
              </div>
              <SheetFooter className="-mx-6 bg-white p-8">
                <div className="w-full">
                  <div className="flex mb-4">
                    <span className="flex flex-1 text-lg text-neutral-500">
                      Итого
                      <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                    </span>

                    <span className="font-bold text-lg">{totalAmount} ₽</span>
                  </div>
                  <Link href="/checkout">
                    <Button
                      onClick={() => setRedirecting(true)}
                      loading={redirecting}
                      type="submit"
                      className="w-full h-12 text-base"
                    >
                      Оформить заказ
                      <ArrowRight className="w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
