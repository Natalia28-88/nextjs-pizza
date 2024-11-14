import { Product, ProductItem, Ingredient } from '@prisma/client';

// отдельный тип для продукта, который берет тип из призмы и докручивает его. Т.о. берем продукт и докручиваем его
export type ProductWithRelations = Product & {
  items: ProductItem[];
  ingredients: Ingredient[];
};
