import { z } from "zod";

// ONE schema, both sides of the wire import it. Upper bounds keep a public
// form from pushing arbitrary payload sizes into an email (panel I44).
export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  message: 5000,
} as const;

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { error: "Your name, so I know who’s asking" })
    .max(CONTACT_LIMITS.name, { error: "A name, not a paragraph — 100 characters max" }),
  email: z
    .email({ error: "An email like you@company.com" })
    .max(CONTACT_LIMITS.email, { error: "That address is longer than any mail server allows" }),
  message: z
    .string()
    .min(20, { error: "A bit more — what are you building, at least 20 characters" })
    .max(CONTACT_LIMITS.message, {
      error: "Keep it under 5,000 characters — the rest fits in a reply",
    }),
});
