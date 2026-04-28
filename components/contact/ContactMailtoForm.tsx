"use client";

import { useState } from "react";

type Props = {
  email: string;
};

export default function ContactMailtoForm({ email }: Props) {
  const [name, setName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [subject, setSubject] = useState("Product support");
  const [message, setMessage] = useState("");

  return (
    <form
      className="mt-6 space-y-4 rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-5 sm:p-6"
      onSubmit={(e) => {
        e.preventDefault();
        const body = [
          `Name: ${name.trim() || "-"}`,
          `Email: ${fromEmail.trim() || "-"}`,
          "",
          message.trim(),
        ].join("\n");
        const href = `mailto:${email}?subject=${encodeURIComponent(
          subject,
        )}&body=${encodeURIComponent(body)}`;
        window.location.href = href;
      }}
    >
      <div>
        <label
          htmlFor="contact-name"
          className="block text-sm font-medium text-[rgb(var(--ink))]"
        >
          Your name
        </label>
        <input
          id="contact-name"
          name="name"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/25 px-4 py-2.5 text-sm text-[rgb(var(--ink))] placeholder:text-[rgb(var(--ink-soft))]/65 outline-none transition focus:border-[rgb(var(--accent))]/45 focus:ring-2 focus:ring-[rgb(var(--accent))]/15"
          placeholder="Jane Smith"
        />
      </div>
      <div>
        <label
          htmlFor="contact-email"
          className="block text-sm font-medium text-[rgb(var(--ink))]"
        >
          Your email
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          value={fromEmail}
          onChange={(e) => setFromEmail(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/25 px-4 py-2.5 text-sm text-[rgb(var(--ink))] placeholder:text-[rgb(var(--ink-soft))]/65 outline-none transition focus:border-[rgb(var(--accent))]/45"
          placeholder="jane@example.com"
        />
      </div>
      <div>
        <label
          htmlFor="contact-subject"
          className="block text-sm font-medium text-[rgb(var(--ink))]"
        >
          Subject
        </label>
        <select
          id="contact-subject"
          name="subject"
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/25 px-4 py-2.5 text-sm text-[rgb(var(--ink))] outline-none transition focus:border-[rgb(var(--accent))]/45"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option>Product support</option>
          <option>Privacy / data request</option>
          <option>Expert partnership</option>
          <option>Press / media</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-[rgb(var(--ink))]"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-sm leading-relaxed text-[rgb(var(--ink))] placeholder:text-[rgb(var(--ink-soft))]/65 outline-none transition focus:border-[rgb(var(--accent))]/45"
          placeholder="How can we help?"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-magenta))] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[rgb(var(--accent)/0.28)] transition hover:brightness-110"
      >
        Send message
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
