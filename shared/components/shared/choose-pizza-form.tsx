'use client';

import React from 'react';
import { Ingredient, ProductItem } from '@prisma/client';
import { cn } from '@/shared/lib/utils';

import { GroupVariants, IngredientItem, PizzaImage, Title } from '.';
import { Button } from '../ui';
import { PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { getPizzaDetails } from '@/shared/lib';
import { usePizzaOptions } from '@/shared/hooks';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

/**
 * Форма выбора пиццы
 */

export const ChoosePizzaForm: React.FC<Props> = ({
  imageUrl,
  name,
  ingredients,
  items,
  loading,
  onSubmit,
  className,
}) => {
  const {
    size,
    setSize,
    type,
    setType,
    selectedIngredients,
    addIngredient,
    availableSizes,
    currentItemId,
  } = usePizzaOptions(items);

  const { totalPrice, textDetails } = getPizzaDetails(
    items,
    type,
    size,
    ingredients,
    selectedIngredients
  );

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  };

  return (
    <div className={cn('flex sm:flex-col flex-1 lg:flex-row', className)}>
      <PizzaImage imageUrl={imageUrl} size={size} className="sm:py-20" />

      <div className="w-full p-3 bg-[#F7F6F5] sm:mt-30 lg:w-[490px] lg:p-7 lg:mt-0">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetails}</p>
        <div className="flex flex-col gap-4 mt-5 my-5">
          <GroupVariants
            items={availableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>
        <div className="bg-gray-50 p-3 rounded-md h-[420px] overflow-auto scrollbar mt-5 max-w-full">
          <div className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-3 lg:gap-3 w-full">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                imageUrl={`/${ingredient.imageUrl}`}
                name={ingredient.name}
                price={ingredient.price}
                active={selectedIngredients.has(ingredient.id)}
                onClick={() => {
                  addIngredient(ingredient.id);
                }}
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-1"
          onClick={handleClickAdd}
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
