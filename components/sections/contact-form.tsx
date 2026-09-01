"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitContact, type ContactState } from "@/app/actions/contact";

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

  if (state.status === "success") {
    return (
      <div
        className="border border-live/40 bg-card p-6"
        role="status"
        tabIndex={-1}
      >
        <p className="font-mono text-2xs tracking-[0.14em] uppercase text-live">
          ● delivered
        </p>
        <p className="mt-2 text-base">
          Landed in my inbox. I read everything — you&apos;ll hear back within
          a day or two.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="bracket-frame max-w-[30rem] space-y-5 p-6">
      {state.formError && (
        <p
          role="alert"
          className="border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {state.formError}
        </p>
      )}
      <Field label="Name" name="name" error={state.fieldErrors?.name} defaultValue={state.values?.name}>
        {(p) => <input type="text" autoComplete="name" required {...p} />}
      </Field>
      <Field label="Email" name="email" error={state.fieldErrors?.email} defaultValue={state.values?.email}>
        {(p) => <input type="email" autoComplete="email" required {...p} />}
      </Field>
      <Field label="What are you building?" name="message" error={state.fieldErrors?.message} defaultValue={state.values?.message}>
        {(p) => (
          <textarea
            rows={4}
            required
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
      </div>
    </form>
  );
}
