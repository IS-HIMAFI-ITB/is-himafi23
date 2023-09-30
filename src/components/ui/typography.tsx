import { cn } from '-/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

import { Slot } from '@radix-ui/react-slot';

type Variants = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'blockquote' | 'ul' | 'code';

const typographyVariant = cva([], {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      p: 'leading-7 [&:not(:first-child)]:mt-6',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      ul: 'my-6 ml-6 list-disc [&>li]:mt-2',
      code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof typographyVariant> {
  asChild?: boolean;
  element?: Variants;
  children?: React.ReactNode;
}

const Typography = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, asChild = false, element = 'p', children, ...props }, ref) => {
    const Comp = asChild ? Slot : (element as string);
    return (
      <Comp
        className={cn(typographyVariant({ variant: element, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

Typography.displayName = 'Typography';

export { Typography, typographyVariant };
