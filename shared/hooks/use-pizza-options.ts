import React from 'react';
import { useSet } from 'react-use';
import { PizzaSize, PizzaType } from '../constants/pizza';
import { ProductItem } from '@prisma/client';
import { getAvailablePizzaSizes } from '../lib';
import { Variant } from '../components/shared/group-variants';

interface ReturnProps {
  size: PizzaSize;
  type: PizzaType;
  selectedIngredients: Set<number>;
  availableSizes: Variant[];
  currentItemId?: number;
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  addIngredient: (id: number) => void;
}
export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = React.useState<PizzaSize>(20);
  const [type, setType] = React.useState<PizzaType>(1);
  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );
  const availableSizes = getAvailablePizzaSizes(items, type);

  const currentItemId = items.find(
    (item) => item.pizzaType === type && item.size === size
  )?.id;

  // У нас баг, если пицца отсутствует в списке доступных пицц, все равно окно выбрано по умолчанию. Для этого используем useEffect
  React.useEffect(() => {
    const isAvailableSize = availableSizes?.find(
      (item) => Number(item.value) === size && !item.disabled
    ); //поиск текущего и активногоразмера
    const availableSize = availableSizes?.find((item) => !item.disabled); //поиск первого доступного размера
    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize); //установка значения первого доступного размера
    }
  }, [type, availableSizes, size]);

  return {
    size,
    type,
    selectedIngredients,
    availableSizes,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  };
};
