'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { ArrowUpDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '..';
import { useSort } from '@/shared/hooks/use-sort'; // Подключаем хук useSort
import { SortItem } from '@/@types/sort';
import { SortList } from '@/shared/constants';

interface Props {
  className?: string;
}

export const Sort: React.FC<Props> = ({ className }) => {
  const { sortBy, updateSort } = useSort(); // Получаем текущую сортировку и функцию для ее обновления
  const [open, setOpen] = React.useState(false);

  const onClickListItem = (obj: SortItem) => {
    updateSort(obj.sortId as 'price_asc' | 'price_desc' | 'rating'); // Обновляем сортировку в URL
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          onClick={() => setOpen((prev) => !prev)}
          className={cn(
            'inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer',
            className
          )}
        >
          <ArrowUpDown size={16} />
          <b>Сортировка по:</b>
          <b className="text-primary">
            {SortList.find((item) => item.sortId === sortBy)?.name}
          </b>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        <ul>
          {SortList.map((obj) => (
            <li
              onClick={() => onClickListItem(obj)}
              key={obj.sortId}
              className={cn(
                'hover:bg-secondary hover:text-primary p-2 px-4 cursor-pointer rounded-md',
                sortBy === obj.sortId && 'bg-secondary text-primary'
              )}
            >
              {obj.name}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
