'use client';

import React from 'react';
import { CheckboxFiltersGroups, Title } from '.';
import { Input, RangeSlider } from '../ui';
import { useFilters, useIngredients, useQueryFilters } from '@/shared/hooks';

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();

  useQueryFilters(filters);

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices('priceFrom', prices[0]);
    filters.setPrices('priceTo', prices[1]);
  };

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
      <div className="sm:flex sm:justify-between lg:flex-col">
        <div>
          {/* Верхние чекбоксы (фильтрация по типу теста) */}
          <CheckboxFiltersGroups
            title="Тип теста"
            name="pizzaTypes"
            className="mb-5"
            items={[
              { text: 'Традиционное', value: '1' },
              { text: 'Тонкое', value: '2' },
            ]}
            onClickCheckbox={filters.setPizzaTypes}
            selected={filters.pizzaTypes}
          />
          {/* Верхние чекбоксы (фильтрация по размерам) */}
          <CheckboxFiltersGroups
            title="Размеры"
            name="sizes"
            className="mb-5"
            items={[
              { text: '20 см', value: '20' },
              { text: '30 см', value: '30' },
              { text: '40 см', value: '40' },
            ]}
            onClickCheckbox={filters.setSizes}
            selected={filters.sizes}
          />
          {/* Фильтр цен */}
          <div className="2xl:mt-5 2xl:border-y 2xl:border-y-neutral-100 2xl:py-6 2xl:pb-7 md:mt-0 md:py-0">
            <p className="font-bold mb-3 md:mb-0">Цена от и до:</p>
            <div className="flex gap-3 mb-5">
              <Input
                type="number"
                placeholder="0"
                min={0}
                max={1000}
                value={filters.prices.priceFrom}
                onChange={(e) =>
                  filters.setPrices('priceFrom', Number(e.target.value))
                }
              />
              <Input
                type="number"
                min={100}
                max={1000}
                placeholder="1000"
                value={filters.prices.priceTo}
                onChange={(e) =>
                  filters.setPrices('priceTo', Number(e.target.value))
                }
              />
            </div>
            <RangeSlider
              min={0}
              max={1000}
              step={10}
              value={[
                filters.prices.priceFrom || 0,
                filters.prices.priceTo || 1000,
              ]}
              onValueChange={updatePrices}
            />
          </div>
        </div>

        <CheckboxFiltersGroups
          title="Ингредиенты"
          name="ingredients"
          className="sm:mt-0 sm:mr-5 lg:mt-5 lg:mr-5"
          limit={6}
          defaultItems={items.slice(0, 6)}
          items={items}
          loading={loading}
          onClickCheckbox={filters.setSelectedIngredients}
          selected={filters.selectedIngredients}
        />
      </div>
    </div>
  );
};
