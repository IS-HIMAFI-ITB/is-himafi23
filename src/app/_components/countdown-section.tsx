import Countdown from '-/components/countdown';
import { Typography } from '-/components/ui/typography';
import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import countdownBg from 'public/countdownBg.png';
import Link from 'next/link';

export default function CountdownSection() {
  const date = new Date('2023-09-30T20:00:00.000+07:00');

  return (
    <section className='flex min-h-[calc(100vh-60px)] flex-col items-center justify-center xs:min-h-[calc(100vh-64px)]'>
      <Image
        src={countdownBg}
        className='pointer-events-none absolute left-1/2 top-1/2 -z-50 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-20'
        alt='patung 7 pahlawan revolusi'
        priority
        quality={100}
      />

      <div className='relative flex h-full min-h-[calc(100vh-60px)] w-max flex-col items-center justify-center gap-8 pb-12 pt-24 xs:min-h-[calc(100vh-64px)]'>
        <div className='mt-auto flex flex-col items-center justify-center gap-6'>
          <Typography
            element='h3'
            className='text-md mt-auto xs:text-xl sm:text-2xl'
          >
            Kami tunggu kehadiran kalian dalam
          </Typography>
          <Countdown date={date} />
        </div>

        <div className='mt-auto flex flex-col items-center justify-center gap-12'>
          <div className='flex flex-col items-center justify-start gap-2'>
            <Typography
              element='h3'
              className='text-md font-light xs:text-xl'
            >
              Titik temu
            </Typography>

            <Typography
              element='h3'
              className='text-xl font-light xs:text-2xl sm:text-3xl'
            >
              -6.8591812, 107.6196285
            </Typography>
          </div>

          <Link
            href={'/#spek-kegiatan'}
            className='flex animate-bounce items-center gap-2 hover:cursor-pointer hover:text-primary'
          >
            Spek kegiatan <ArrowDown />
          </Link>
        </div>
      </div>

      {/* Color gradient */}
      <div className='absolute bottom-0 -z-50 h-full w-full bg-gradient-to-t from-background via-blue-darkest/10 to-transparent' />

      <div className='absolute top-0 -z-[49] h-1/2 w-full bg-gradient-to-b from-blue/40 to-transparent' />

      <div className='absolute top-0 -z-[48] h-screen w-screen bg-background/10' />
    </section>
  );
}
