'use client';

import React from 'react';
import { useIntersection } from 'react-use';

import { useCategoryStore } from '@/shared/store/category';

import { ProductCard, Title } from '.';
import { cn } from '@/shared/lib';
import { ProductWithRelations } from '@/@types/prisma';

interface Props {
  title: string;
  items: ProductWithRelations[];
  className?: string;
  listClassName?: string;
  categoryId: number;
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  listClassName,
  categoryId,
  className,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, title, intersection?.isIntersecting, setActiveCategoryId]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div
        className={cn(
          'grid gap-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-[50px]',
          listClassName
        )}
      >
        {items.map((product, i) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={`${product.imageUrl}`}
            ingredients={product.ingredients}
            price={product.items[0].price} //у самого продукта стоимости нет, стоимость закладывается в его исполнение (тонкое тесто или толстое, размеры), которое возвращает массив этих вариантов, а так как цена идет от, то и пишем первый элемент массива - 0
          />
        ))}
      </div>
    </div>
  );
};
