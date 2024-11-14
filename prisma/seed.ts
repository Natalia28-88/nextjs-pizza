import { Prisma, PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';

import { categories, ingredients, products } from './constants';

const prisma = new PrismaClient();

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  pizzaType,
  size,
  rating,
  price,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
  rating: number | null;
  price: number;
}) => {
  return {
    productId,
    price,
    pizzaType,
    size,
    rating,
  } as Prisma.ProductItemUncheckedCreateInput;
};

// up - генерирует данные (эти функции нужны для удобства. Т.о. перед запуском seed сначала данные очищаются, чтобы не создавать мусор, а потом генерируются)
async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: 'User',
        email: 'user@test.ru',
        password: hashSync('1234567', 10),
        verified: new Date(),
        role: 'USER',
      },
      {
        fullName: 'Admin',
        email: 'admin@test.ru',
        password: hashSync('1234567', 10),
        verified: new Date(),
        role: 'ADMIN',
      },
    ],
  });

  await prisma.category.createMany({ data: categories });

  await prisma.ingredient.createMany({ data: ingredients });

  await prisma.product.createMany({ data: products }); // продукты, которые не являются пиццами и к ним не надо привязывать ингредиенты

  const pizza1 = await prisma.product.create({
    data: {
      name: 'Пепперони фреш',
      imageUrl: 'pepperoni-fresh.webp',
      categoryId: 1,
      rating: 10,
      price: 450,
      ingredients: {
        connect: ingredients.slice(0, 5), // привязываем к каждой базовой пицце какие-то ингредиенты
      },
    },
  });

  const pizza2 = await prisma.product.create({
    data: {
      name: 'Сырная',
      imageUrl: 'cheese.webp',
      categoryId: 1,
      rating: 9,
      price: 400,
      ingredients: {
        connect: ingredients.slice(5, 10),
      },
    },
  });

  const pizza3 = await prisma.product.create({
    data: {
      name: 'Чоризо фреш',
      imageUrl: 'chorizo-fresh.webp',
      categoryId: 1,
      rating: 8,
      price: 470,
      ingredients: {
        connect: ingredients.slice(10, 17),
      },
    },
  });

  await prisma.productItem.createMany({
    data: [
      // Пицца "Пепперони фреш"
      generateProductItem({
        productId: pizza1.id,
        pizzaType: 1,
        size: 20,
        price: Math.round(pizza1.price),
        rating: pizza1.rating,
      }),
      generateProductItem({
        productId: pizza1.id,
        pizzaType: 2,
        size: 30,
        price: Math.round(pizza1.price * 1.2),
        rating: pizza1.rating,
      }),
      generateProductItem({
        productId: pizza1.id,
        pizzaType: 2,
        size: 40,
        price: Math.round(pizza1.price * 1.4),
        rating: pizza1.rating,
      }),

      // Пицца "Сырная"
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 1,
        size: 20,
        price: Math.round(pizza2.price),
        rating: pizza2.rating,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 1,
        size: 30,
        price: Math.round(pizza2.price * 1.25),
        rating: pizza2.rating,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 1,
        size: 40,
        price: Math.round(pizza2.price * 1.5),
        rating: pizza2.rating,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 2,
        size: 20,
        price: pizza2.price,
        rating: pizza2.rating,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 2,
        size: 30,
        price: Math.round(pizza2.price * 1.2),
        rating: pizza2.rating,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 2,
        size: 40,
        price: Math.round(pizza2.price * 1.45),
        rating: pizza2.rating,
      }),

      // Пицца "Чоризо фреш"
      generateProductItem({
        productId: pizza3.id,
        pizzaType: 1,
        size: 20,
        price: pizza3.price,
        rating: pizza3.rating,
      }),
      generateProductItem({
        productId: pizza3.id,
        pizzaType: 2,
        size: 30,
        price: Math.round(pizza3.price * 1.2),
        rating: pizza3.rating,
      }),
      generateProductItem({
        productId: pizza3.id,
        pizzaType: 2,
        size: 40,
        price: Math.round(pizza3.price * 1.45),
        rating: pizza3.rating,
      }),

      // Остальные продукты
      generateProductItem({
        productId: 1,
        rating: products[0].rating,
        price: products[0].price,
      }),
      generateProductItem({
        productId: 2,
        rating: products[1].rating,
        price: products[1].price,
      }),
      generateProductItem({
        productId: 3,
        rating: products[2].rating,
        price: products[2].price,
      }),
      generateProductItem({
        productId: 4,
        rating: products[3].rating,
        price: products[3].price,
      }),
      generateProductItem({
        productId: 5,
        rating: products[4].rating,
        price: products[4].price,
      }),
      generateProductItem({
        productId: 6,
        rating: products[5].rating,
        price: products[5].price,
      }),
      generateProductItem({
        productId: 7,
        rating: products[6].rating,
        price: products[6].price,
      }),
      generateProductItem({
        productId: 8,
        rating: products[7].rating,
        price: products[7].price,
      }),
      generateProductItem({
        productId: 9,
        rating: products[8].rating,
        price: products[8].price,
      }),
      generateProductItem({
        productId: 10,
        rating: products[9].rating,
        price: products[9].price,
      }),
      generateProductItem({
        productId: 11,
        rating: products[10].rating,
        price: products[10].price,
      }),
      generateProductItem({
        productId: 12,
        rating: products[11].rating,
        price: products[11].price,
      }),
      generateProductItem({
        productId: 13,
        rating: products[12].rating,
        price: products[12].price,
      }),
      generateProductItem({
        productId: 14,
        rating: products[13].rating,
        price: products[13].price,
      }),
      generateProductItem({
        productId: 15,
        rating: products[14].rating,
        price: products[14].price,
      }),
      generateProductItem({
        productId: 16,
        rating: products[15].rating,
        price: products[15].price,
      }),
      generateProductItem({
        productId: 17,
        rating: products[16].rating,
        price: products[16].price,
      }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      { userId: 1, totalAmount: 0, token: '111' },
      { userId: 2, totalAmount: 0, token: '222' },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      },
    },
  });

  await prisma.story.createMany({
    data: [
      {
        previewImageUrl: 'story-1.webp',
      },
      {
        previewImageUrl: 'story-2.webp',
      },
      {
        previewImageUrl: 'story-3.webp',
      },
      {
        previewImageUrl: 'story-4.webp',
      },
      {
        previewImageUrl: 'story-5.webp',
      },
      {
        previewImageUrl: 'story-6.webp',
      },
    ],
  });

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl: 'storyItem-1.webp',
      },
      {
        storyId: 1,
        sourceUrl: 'storyItem-2.webp',
      },
      {
        storyId: 1,
        sourceUrl: 'storyItem-3.webp',
      },
      {
        storyId: 1,
        sourceUrl: 'storyItem-4.webp',
      },
      {
        storyId: 1,
        sourceUrl: 'storyItem-5.webp',
      },
    ],
  });
}

// down - очищает данные
async function down() {
  // с пом. язык ql очищаем все данные, связ. с польз. сместе с его id
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "StoryItem" RESTART IDENTITY CASCADE;`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
