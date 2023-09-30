'use client';

import React, { useEffect, useState } from 'react';
import { Typography } from './ui/typography';
import useTimer from '-/hooks/useTimer';

export default function Navbar() {
  const [offset, setOffset] = useState(0);
  const { hours, minutes, seconds } = useTimer(
    new Date('2023-09-30T20:00:00.000+07:00').toISOString(),
  );

  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.scrollY);
    };
  }, []);

  if (offset > 700) {
    return (
      <nav className='fixed top-0 z-[99] w-full bg-background py-4 transition-all ease-in-out lg:px-48'>
        <div className='flex w-full flex-col items-center justify-between gap-2 lg:flex-row'>
          <Typography
            element='h3'
            className='text-lg text-primary xs:text-xl'
          >
            Interaksi Lapangan 2
          </Typography>

          <Typography
            element='h3'
            className='text-lg font-light xs:text-xl'
          >
            {hours} jam {minutes} menit {seconds} detik
          </Typography>
        </div>
      </nav>
    );
  } else {
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
}
