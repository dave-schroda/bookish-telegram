import { z } from "zod";

const Env = z.object({
  WP_URL: z.string().url(),
  NEXT_PUBLIC_BASE_URL: z.string().url(),
  WC_CONSUMER_KEY: z.string().optional(),
  WC_CONSUMER_SECRET: z.string().optional(),
});

export const env = Env.parse(process.env);
