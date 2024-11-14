import { Ingredient, ProductItem } from '@prisma/client';
import { mapPizzaType, PizzaSize, PizzaType } from '../constants/pizza';
import { calcTotalPizzaPrice } from './';

export const getPizzaDetails = (
  items: ProductItem[],
  type: PizzaType,
  size: PizzaSize,
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const totalPrice = calcTotalPizzaPrice(
    items,
    type,
    size,
    ingredients,
    selectedIngredients
  );

  const textDetails = `${size} см, ${mapPizzaType[type]}, ингредиенты: (${selectedIngredients.size})`;

  return {
    totalPrice,
    textDetails,
  };
};
