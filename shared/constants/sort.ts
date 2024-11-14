import { SortItem } from '@/@types/sort';

export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  PRICE_DESC = 'price_desc',
  PRICE_ASC = 'price_asc',
}

export const SortList: SortItem[] = [
  {
    name: 'популярности',
    sortId: SortPropertyEnum.RATING_DESC,
  },
  {
    name: 'возрастанию цены',
    sortId: SortPropertyEnum.PRICE_ASC,
  },
  {
    name: 'убыванию цены',
    sortId: SortPropertyEnum.PRICE_DESC,
  },
];
