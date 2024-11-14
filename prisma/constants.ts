export const categories = [
  {
    name: 'Пиццы',
  },
  {
    name: 'Завтрак',
  },
  {
    name: 'Закуски',
  },
  {
    name: 'Коктейли',
  },
  {
    name: 'Напитки',
  },
];

export const ingredients = [
  {
    name: 'Сырный бортик',
    price: 179,
    imageUrl: 'cheese-side.png',
  },
  {
    name: 'Сливочная моцарелла',
    price: 79,
    imageUrl: 'creamy-mozarella.png',
  },
  {
    name: 'Сыры чеддер и пармезан',
    price: 79,
    imageUrl: 'cheddar-and-parmesan-cheeses.png',
  },
  {
    name: 'Острый перец халапеньо',
    price: 59,
    imageUrl: 'hot-jalapenopepper.png',
  },
  {
    name: 'Нежный цыпленок',
    price: 79,
    imageUrl: 'tender-chicken.png',
  },
  {
    name: 'Шампиньоны',
    price: 59,
    imageUrl: 'shampignons.png',
  },
  {
    name: 'Ветчина',
    price: 79,
    imageUrl: 'ham.png',
  },
  {
    name: 'Пикантная пепперони',
    price: 79,
    imageUrl: 'spicy-pepperoni.png',
  },
  {
    name: 'Острая чоризо',
    price: 79,
    imageUrl: 'spicy-chorizo.png',
  },
  {
    name: 'Маринованные огурчики',
    price: 59,
    imageUrl: 'pickled-cucumbers.png',
  },
  {
    name: 'Свежие томаты',
    price: 59,
    imageUrl: 'tomatoes.png',
  },
  {
    name: 'Красный лук',
    price: 59,
    imageUrl: 'red-onion.png',
  },
  {
    name: 'Сочные ананасы',
    price: 59,
    imageUrl: 'juicy-pineapples.png',
  },
  {
    name: 'Итальянские травы',
    price: 39,
    imageUrl: 'italian-herbs.png',
  },
  {
    name: 'Сладкий перец',
    price: 59,
    imageUrl: 'sweet-pepper.png',
  },
  {
    name: 'Кубики брынзы',
    price: 79,
    imageUrl: 'cheese-cubes.png',
  },
  {
    name: 'Митболы',
    price: 79,
    imageUrl: 'meatballs.png',
  },
].map((obj, index) => ({ id: index + 1, ...obj }));

export const products = [
  {
    name: 'Омлет с ветчиной и грибами',
    imageUrl: 'omelet-with-ham.webp',
    categoryId: 2,
    rating: 4.5,
    price: 179,
  },
  {
    name: 'Омлет с пепперони',
    imageUrl: 'omelet-with-pepperoni.webp',
    categoryId: 2,
    rating: 7,
    price: 159,
  },
  {
    name: 'Кофе Латте',
    imageUrl: 'latte.webp',
    categoryId: 2,
    rating: 10,
    price: 120,
  },
  {
    name: 'Сэндвич ветчина и сыр',
    imageUrl: 'ham-and-cheese-sandwich.webp',
    categoryId: 3,
    rating: 8,
    price: 165,
  },
  {
    name: 'Куриные наггетсы',
    imageUrl: 'chicken-nuggets.webp',
    categoryId: 3,
    rating: 9,
    price: 180,
  },
  {
    name: 'Картофель из печи с соусом 🌱',
    imageUrl: 'potato.webp',
    categoryId: 3,
    rating: 5,
    price: 100,
  },
  {
    name: 'Додстер',
    imageUrl: 'dodster.webp',
    categoryId: 3,
    rating: 7,
    price: 120,
  },
  {
    name: 'Острый Додстер 🌶️🌶️',
    imageUrl: 'spicy-dodster.webp',
    categoryId: 3,
    rating: 2,
    price: 120,
  },
  {
    name: 'Банановый молочный коктейль',
    imageUrl: 'banana-milkshake.webp',
    categoryId: 4,
    rating: 6,
    price: 110,
  },
  {
    name: 'Карамельное яблоко молочный коктейль',
    imageUrl: 'carame-apple-milkshake.webp',
    categoryId: 4,
    rating: 4,
    price: 140,
  },
  {
    name: 'Молочный коктейль с печеньем Орео',
    imageUrl: 'milkshake-with-oreo-cookies.webp',
    categoryId: 4,
    rating: 5,
    price: 165,
  },
  {
    name: 'Классический молочный коктейль 👶',
    imageUrl: 'classic-milkshake.webp',
    categoryId: 4,
    rating: 8,
    price: 115,
  },
  {
    name: 'Ирландский Капучино',
    imageUrl: 'irish-cappuccino.webp',
    categoryId: 5,
    rating: 7,
    price: 134,
  },
  {
    name: 'Кофе Карамельный капучино',
    imageUrl: 'caramel-cappuccino-coffee.webp',
    categoryId: 5,
    rating: 6,
    price: 156,
  },
  {
    name: 'Кофе Кокосовый латте',
    imageUrl: 'coconut-latte-coffee.webp',
    categoryId: 5,
    rating: 5,
    price: 190,
  },
  {
    name: 'Кофе Американо',
    imageUrl: 'americano.webp',
    categoryId: 5,
    rating: 10,
    price: 110,
  },
  {
    name: 'Кофе Латте',
    imageUrl: 'latte-coffee.webp',
    categoryId: 5,
    rating: 9,
    price: 125,
  },
];
