import superjson from 'superjson';

import { Prisma } from '@prisma/client';

// This is a helper function that instantiates SuperJSON serializer
const instantiateSerializer = () => {
  superjson.registerCustom<Prisma.Decimal, string>(
    {
      isApplicable: (v): v is Prisma.Decimal => Prisma.Decimal.isDecimal(v),
      serialize: (v) => v.toJSON(),
      deserialize: (v) => new Prisma.Decimal(v),
    },
    'decimal.js',
  );

  return superjson;
};

const globalForSerializer = globalThis as unknown as {
  serializer?: typeof superjson;
};

export const serializer =
  globalForSerializer.serializer ?? instantiateSerializer();

if (process.env.NODE_ENV !== 'production')
  globalForSerializer.serializer = serializer;
