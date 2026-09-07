"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { CONTACT_LIMITS } from "@/lib/schemas/contact";

// Optional booking link (panel I33) — set NEXT_PUBLIC_BOOKING_URL to a
// Cal.com / Calendly page; absent, the row keeps only the mailto.
const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL;

function Field({
  label,
  name,
  error,
  defaultValue,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  defaultValue?: string;
  children: (props: {
    id: string;
    name: string;
    defaultValue?: string;
    "aria-invalid"?: boolean;
    "aria-describedby"?: string;
    className: string;
  }) => React.ReactNode;
}) {
  const id = `contact-${name}`;
  const errId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-2xs font-medium tracking-[0.14em] uppercase text-muted-foreground">
        {label}
      </label>
      <div className="mt-1.5">
        {children({
          id,
          name,
          defaultValue,
          ...(error
            ? { "aria-invalid": true as const, "aria-describedby": errId }
            : {}),
          className:
            "w-full rounded-md border border-input bg-transparent px-3.5 py-3 text-base outline-none transition-[border-color] duration-[var(--dur-micro)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-[invalid=true]:border-destructive",
        })}
      </div>
      {error && (
        <p id={errId} className="mt-1.5 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="min-w-40" aria-busy={pending}>
      {pending && (
        <LoaderCircle className="animate-spin" aria-hidden="true" />
      )}
      {pending ? "Sending…" : "Work with me"}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState<ContactState, FormData>(
    submitContact,
    { status: "idle" },
  );
  const statusRef = useRef<HTMLDivElement>(null);
  const alertRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Focus management (panel I20 / I07): success moves focus onto the status
  // box (the submit button that held it has unmounted); a form-level error
  // moves it onto the alert; field errors move it onto the first invalid
  // input so its aria-describedby text is read. `state` is a fresh object per
  // action result, so a repeated error re-focuses.
  useEffect(() => {
    if (state.status === "success") {
      statusRef.current?.focus();
    } else if (state.status === "error") {
      if (state.formError) {
        alertRef.current?.focus();
      } else {
        formRef.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus();
      }
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div
        ref={statusRef}
        className="border border-live/40 bg-card p-6 outline-none focus-visible:ring-2 focus-visible:ring-ring"
        role="status"
        tabIndex={-1}
      >
        <p className="font-mono text-2xs tracking-[0.14em] uppercase text-live">
          ● delivered
        </p>
        <p className="mt-2 text-base">
          Landed in my inbox. I read everything — you’ll hear back within
          a day or two.
        </p>
      </div>
    );
  }

  return (
    // noValidate: the server action already returns a designed error for every
    // constraint the browser would bubble; the native tooltip broke the UI and
    // covered the next label (panel I07). `required`/`type=email` stay for
    // semantics and mobile keyboards.
    <form
      ref={formRef}
      action={formAction}
      noValidate
      className="bracket-frame max-w-[30rem] space-y-5 p-6"
    >
      {state.formError && (
        <p
          ref={alertRef}
          role="alert"
          tabIndex={-1}
          className="border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {state.formError}
        </p>
      )}
      <Field label="Name" name="name" error={state.fieldErrors?.name} defaultValue={state.values?.name}>
        {(p) => (
          <input type="text" autoComplete="name" required maxLength={CONTACT_LIMITS.name} {...p} />
        )}
      </Field>
      <Field label="Email" name="email" error={state.fieldErrors?.email} defaultValue={state.values?.email}>
        {(p) => (
          <input type="email" autoComplete="email" required maxLength={CONTACT_LIMITS.email} {...p} />
        )}
      </Field>
      <Field label="What are you building?" name="message" error={state.fieldErrors?.message} defaultValue={state.values?.message}>
        {(p) => (
          <textarea
            rows={4}
            required
            maxLength={CONTACT_LIMITS.message}
            {...p}
            className={`${p.className} [field-sizing:content] min-h-[6lh] max-h-[12lh] resize-none overflow-y-auto`}
          />
        )}
      </Field>
      {/* honeypot — hidden from humans, tempting to bots */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="contact-company-url">Leave this empty</label>
        <input
          id="contact-company-url"
          type="text"
          name="company_url"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton />
        <a
          href="mailto:iwan.braun2004@gmail.com"
          className="nav-link inline-block py-3.5 font-mono text-xs tracking-[0.08em] uppercase text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground"
        >
          or email directly
        </a>
        {BOOKING_URL && (
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="nav-link inline-block py-3.5 font-mono text-xs tracking-[0.08em] uppercase text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground"
          >
            or book 30 minutes <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
      {/* the promise belongs where the decision is made, not only after it
          (panel I64) */}
      <p className="font-mono text-2xs text-muted-foreground">
        I read everything and reply within a day or two.
      </p>
    </form>
  );
}
