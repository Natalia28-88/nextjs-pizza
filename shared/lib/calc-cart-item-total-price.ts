import { Ingredient, ProductItem } from '@prisma/client';
import { CartItemDTO } from '../services/dto/cart.dto';

type Item = {
  productItem: ProductItem;
  ingredients: Ingredient[];
  quantity: number;
};

export const calcCartItemTotalPrice = (item: Item): number => {
  const ingredientsPrice = item.ingredients.reduce(
    (acc, ingredient) => acc + ingredient.price,
    0
  );
  return (ingredientsPrice + item.productItem.price) * item.quantity;
};
