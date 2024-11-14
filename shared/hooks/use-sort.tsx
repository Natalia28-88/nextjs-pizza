'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import qs from 'qs';

export type SortOption = 'price_asc' | 'price_desc' | 'rating';

export const useSort = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Стейт для хранения выбранного параметра сортировки
  const [sortBy, setSortBy] = useState<SortOption>(
    (searchParams.get('sortBy') as SortOption) || 'rating'
  );

  // Функция для обновления параметра сортировки
  const updateSort = (newSortBy: SortOption) => {
    setSortBy(newSortBy);

    // Создаем объект с параметрами сортировки и передаем его в URL
    const params = {
      ...Object.fromEntries(searchParams.entries()), // сохраняем другие параметры из URL
      sortBy: newSortBy,
    };

    const query = qs.stringify(params, { arrayFormat: 'comma' });
    router.push(`?${query}`, { scroll: false });
  };

  return { sortBy, updateSort };
};
