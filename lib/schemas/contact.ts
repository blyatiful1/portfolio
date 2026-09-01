import { z } from "zod";

// ONE schema, both sides of the wire import it.
export const contactSchema = z.object({
  name: z.string().min(2, { error: "Your name, so I know who's asking" }),
  email: z.email({ error: "An email like you@company.com" }),
  message: z
    .string()
    .min(20, { error: "A bit more — what are you building, at least 20 characters" }),
});
