import React from 'react';
import { useRouter } from 'next/navigation';
import qs from 'qs';

import { Filters } from './use-filters';

export const useQueryFilters = (filters: Filters) => {
  const isMounted = React.useRef(false);
  const router = useRouter();

  React.useEffect(() => {
    if (isMounted.current) {
      //создадем объект со всей информацией о фильтрах и его надо вшить в URL c использованием отд. библиотеки qs
      const params = {
        ...filters.prices,
        pizzaTypes: Array.from(filters.pizzaTypes),
        sizes: Array.from(filters.sizes),
        ingredients: Array.from(filters.selectedIngredients),
      };

      const query = qs.stringify(params, { arrayFormat: 'comma' });

      router.push(`?${query}`, { scroll: false });
    }

    isMounted.current = true;
  }, [filters, router]);
};
