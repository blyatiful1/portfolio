"use server";

import { headers } from "next/headers";
import { contactSchema } from "@/lib/schemas/contact";
import { checkRateLimit } from "@/lib/api";
import { getResend } from "@/lib/email";
import ContactNotification from "@/emails/contact-notification";

export type ContactState = {
  status: "idle" | "error" | "success";
  fieldErrors?: Record<string, string>;
  formError?: string;
  values?: Record<string, string>;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = Object.fromEntries(formData) as Record<string, string>;

  // honeypot: real users never fill "company_url"
  if (raw.company_url) return { status: "success" };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (!checkRateLimit(`contact:${ip}`)) {
    return {
      status: "error",
      formError: "Too many messages in a row — wait a minute and try again.",
      values: raw,
    };
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[String(issue.path[0])] ??= issue.message;
    }
    return { status: "error", fieldErrors, values: raw };
  }

  if (!process.env.RESEND_API_KEY) {
    return {
      status: "error",
      formError:
        "The mail line isn't wired up yet — email me directly: iwan.braun2004@gmail.com",
      values: raw,
    };
  }

  try {
    const { error } = await getResend().emails.send({
      from:
        process.env.CONTACT_FROM ?? "Portfolio wire <onboarding@resend.dev>",
      to: "iwan.braun2004@gmail.com",
      replyTo: parsed.data.email,
      subject: `${parsed.data.name} — work inquiry via the portfolio`,
      react: ContactNotification(parsed.data),
    });
    if (error) {
      return {
        status: "error",
        formError:
          "Didn't send — your message is still here. Try again, or email me directly.",
        values: raw,
      };
    }
  } catch {
    return {
      status: "error",
      formError:
        "Didn't send — your message is still here. Try again, or email me directly.",
      values: raw,
    };
  }

  return { status: "success" };
}
