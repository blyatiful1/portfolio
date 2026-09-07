// Upper bounds for the contact form, in a zod-free module: the client form
// reads these for `maxLength`, the server schema for `.max()` — importing the
// schema itself into the client leaf would ship zod to every visitor.
export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  message: 5000,
} as const;
