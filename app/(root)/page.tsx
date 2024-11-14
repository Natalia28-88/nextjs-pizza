import React, { Suspense } from 'react';
import {
  Container,
  Filters,
  ProductsGroupList,
  TopBar,
  Title,
  Stories,
} from '@/shared/components/shared';
import { GetSearchParams, findPizzas } from '@/shared/lib/find-pizzas';

const Home = async ({ searchParams }: { searchParams: GetSearchParams }) => {
  const categories = await findPizzas(searchParams);
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold"></Title>
      </Container>

      <Stories />

      {/* Если товаров нет о данным категориям, они не будут выводиться */}
      <TopBar
        categories={categories.filter(
          (category) => category.products.length > 0
        )}
      />
      <Container className="mt-10 pb-14">
        <div className="flex flex-col sm:gap-[80px] lg:flex-row">
          {/* Фильтрация */}
          <div className="w-full lg:w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      items={category.products}
                      categoryId={category.id}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
