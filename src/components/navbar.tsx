import React from 'react';
import { Typography } from './ui/typography';

export default function Navbar() {
  return (
    <nav className='flex w-full items-center justify-center py-4'>
      <Typography
        element='h3'
        className='text-lg xs:text-2xl'
      >
        Intellektuelle Schule 2023
      </Typography>
    </nav>
  );
}
