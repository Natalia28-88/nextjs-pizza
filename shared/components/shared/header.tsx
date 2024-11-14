'use client';

import { cn } from '@/shared/lib/utils';
import { Container } from './container';
import React from 'react';
import Link from 'next/link';
import { AuthModal, CartButton, ProfileButton, SearchInput } from '.';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';

interface pageProps {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<pageProps> = ({
  hasSearch = true,
  hasCart = true,
  className,
}) => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [openAuthModal, setOpenAuthModal] = React.useState(false);

  React.useEffect(() => {
    let toastMessage = '';

    if (searchParams.has('paid')) {
      toastMessage = 'Заказ успешно оплачён! Информация отправлена на почту';
    }

    if (searchParams.has('verified')) {
      toastMessage = 'Почта успешно подтверждена!';
    }

    if (toastMessage) {
      setTimeout(() => {
        toast.success(toastMessage, { icon: '✅', duration: 3000 });
        router.push('/');
      }, 1000);
    }
  }, [searchParams, router]);
  return (
    <header className={cn('border-b', className)}>
      <Container className="sm:flex sm:flex-col sm:pt-5 lg:flex-row lg:items-center lg:justify-between py-8">
        {/* Левая часть */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Logo" width={35} height={35} />

            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                вкусней уже некуда
              </p>
            </div>
          </div>
        </Link>
        <div className="flex items-center flex-col-reverse sm:justify-between sm:flex-row py-8 w-full lg:w-[800px]">
          {hasSearch && (
            <div className="sm:mx-10 sm:flex-1 sm:mr-[100px] w-full">
              <SearchInput />
            </div>
          )}
          {/* Правая часть */}
          <div className="flex sm:items-center sm:gap-3 sm:mb-0 mb-5">
            <AuthModal
              open={openAuthModal}
              onClose={() => setOpenAuthModal(false)}
            />
            <ProfileButton
              onClickOpenModal={() => setOpenAuthModal(true)}
              className="mr-[120px] sm:mr-0"
            />
            {hasCart && <CartButton />}
          </div>
        </div>
      </Container>
    </header>
  );
};
