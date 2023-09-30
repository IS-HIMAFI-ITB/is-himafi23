import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    SHADOW_DATABASE_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string().min(1),
    UPLOADTHING_SECRET: z.string().min(1),
    UPLOADTHING_APP_ID: z.string().min(1),
    GOOGLE_CLIENT_EMAIL: z.string().min(1),
    GOOGLE_PRIVATE_KEY: z.string().min(1),
    GOOGLE_SHEETS_ID: z.string().min(1),
    TINYMCE_API_KEY: z.string().min(1),
  },
});
