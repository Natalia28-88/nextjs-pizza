'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import 'react-dadata/dist/react-dadata.css';

const AddressSuggestions = dynamic(
  () => import('react-dadata').then((mod) => mod.AddressSuggestions),
  { ssr: false }
);

interface Props {
  onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="120639625f740e3c78ba4be5a87a1e9a0236c630"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
