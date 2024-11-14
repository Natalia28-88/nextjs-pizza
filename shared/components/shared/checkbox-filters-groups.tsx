'use client';

import React from 'react';
import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox';
import { Input, Skeleton } from '../ui';

type Item = FilterCheckboxProps;

interface Props {
  title: string;
  items: Item[]; //весь список items
  defaultItems?: Item[]; //при нераскрытом списке
  limit?: number;
  loading?: boolean;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void; //возвращает чекбоксы, которые мы выбрали
  defaultValue?: string[]; //выбраны чекбоксы по умолчанию
  selected?: Set<string>;
  className?: string;
  name?: string;
}

export const CheckboxFiltersGroups: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  limit = 5,
  loading,
  searchInputPlaceholder = 'Поиск...',
  onClickCheckbox,
  selected,
  className,
  name,
}) => {
  //Для того, чтобы сделать кнопку вызова всех компонентов, исп. useState()
  const [showAll, setShowAll] = React.useState(false);

  //Делаем поск рабочим, исп. useState()
  const [searchValue, setSearchValue] = React.useState('');

  if (loading) {
    return (
      <div className="">
        <p className="font-bold mb-3 md:mb-0">{title}</p>
        {...Array(limit)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="h-6 mb-4 rounded-[8px] " />
          ))}
        <Skeleton className="w-28 h-6 mb-4 rounded-[8px] " />
      </div>
    );
  }

  //Если у нас нажато показать всё(showAll), рендерятся все ингредиенты, иначе только те, что стоят по умолчанию в интервале от 0 до устанорвленного лимита, который можно менять и далее уже перебираем не items, а list
  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLowerCase())
      )
    : (defaultItems || items).slice(0, limit);

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>

      {/* Поиск показывается только в том случае, если раскрыты все компоненты */}
      {showAll && (
        <div className="mb-5">
          <Input
            onChange={onChangeSearchInput}
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
          />
        </div>
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment} //доп. информация
            checked={selected?.has(item.value)} // проверка, есть ли необходимый id
            onCheckedChange={() => onClickCheckbox?.(item.value)}
            name={name}
          />
        ))}
      </div>

      {/* Кнопка, которая при клике изменяет состояние, которая должна отображаться только в том случае, если ингредиентов больше, чем лимит */}
      {items.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button
            //при клике на эту кнопку мы переключаем состояние
            onClick={() => setShowAll(!showAll)}
            className="text-primary mt-3"
          >
            {showAll ? 'Скрыть' : '+ Показать все'}
          </button>
        </div>
      )}
    </div>
  );
};
