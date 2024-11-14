import { cn } from '@/shared/lib/utils';
import React from 'react';

interface Props {
  className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        'mx-auto max-w-[400px] sm:max-w-[590px] md:max-w-[650px] lg:max-w-[1000px] xl:max-w-[1240px] ',
        className
      )}
    >
      {children}
    </div>
  );
};
