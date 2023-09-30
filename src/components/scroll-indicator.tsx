'use client';

import React from 'react';
import { ArrowDown } from 'lucide-react';

export default function ScrollIndicator() {
  return (
    <div className='absolute bottom-0 flex items-center gap-4 pb-8 transition-all hover:-translate-y-2 hover:cursor-pointer'>
      <ArrowDown
        size={32}
        className='text-white'
      />
    </div>
  );
}
