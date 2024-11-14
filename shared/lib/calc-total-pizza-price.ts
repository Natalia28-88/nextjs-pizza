import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { ProductItem, Ingredient } from '@prisma/client';

/**
 * Функция для вычисления общей стоимости пиццы
 * @params type - тип теста выбранной пиццы
 * @params size - размер выбранной пиццы
 * @params ingredients - список ингредиентов
 * @params selectedIngredients - список выбранных ингредиентов
 * @params items - список вариаций
 *
 *
 * @returns - number общую стоимость*/

export const calcTotalPizzaPrice = (
  items: ProductItem[],
  type: PizzaType,
  size: PizzaSize,
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const pizzaPrice =
    items.find((item) => item.pizzaType === type && item.size === size)
      ?.price || 0;

  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + totalIngredientsPrice;
};
