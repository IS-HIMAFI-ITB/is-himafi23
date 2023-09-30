'use client';

import useTimer from '-/hooks/useTimer';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Typography } from './ui/typography';
import { cn } from '-/lib/utils';

type Countdown = {
  date: Date;
  className?: string;
};

function TimeHolder(props: PropsWithChildren<{ time: string }>) {
  return (
    <div className='relative flex flex-col items-center justify-center gap-2'>
      <Typography
        element='h1'
        className='absolute left-2 top-1 text-5xl text-background xs:text-7xl sm:text-8xl lg:text-[7rem] xl:text-9xl 2xl:text-[9rem]'
      >
        {props.time}
      </Typography>
      <Typography
        element='h1'
        className='text-5xl text-yellow-light drop-shadow-glow xs:text-7xl sm:text-8xl lg:text-[7rem] xl:text-9xl 2xl:text-[9rem]'
      >
        {props.time}
      </Typography>
      <Typography
        element='h3'
        className='text-xl font-light lg:text-2xl'
      >
        {props.children}
      </Typography>
    </div>
  );
}

export default function Countdown({ date, className }: Countdown) {
  const [mounted, setMounted] = useState(false);
  const { hours, minutes, seconds } = useTimer(date.toISOString());

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div className={cn('flex items-center gap-8 sm:gap-16', className)}>
        <TimeHolder time={'00'}>jam</TimeHolder>

        <TimeHolder time={'00'}>menit</TimeHolder>

        <TimeHolder time={'00'}>detik</TimeHolder>
      </div>
    );

  return (
    <div className={cn('flex items-center gap-8 sm:gap-16', className)}>
      <TimeHolder time={hours}>jam</TimeHolder>

      <TimeHolder time={minutes}>menit</TimeHolder>

      <TimeHolder time={seconds}>detik</TimeHolder>
    </div>
  );
}
