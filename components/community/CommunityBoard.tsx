"use client";

import { useCallback, useEffect, useState } from "react";
import type { CommunityCopy } from "@/lib/i18n/community-page";
import { LOCALE_OPTIONS } from "@/lib/i18n/locale";

type Answer = {
  id: string;
  createdAt: string;
  authorName: string;
  body: string;
};

type Question = {
  id: string;
  createdAt: string;
  authorName: string;
  title: string;
  body: string;
  locale?: string | null;
  topic?: string | null;
  helpfulCount?: number;
  answers: Answer[];
};

type Props = {
  t: CommunityCopy;
  locale?: string;
  moderationNote: string;
  filterLangLabel: string;
  filterAllLabel: string;
};

export default function CommunityBoard({
  t,
  locale,
  moderationNote,
  filterLangLabel,
  filterAllLabel,
}: Props) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [warn, setWarn] = useState<string | null>(null);
  const [langFilter, setLangFilter] = useState<string>("all");
  const [topicFilter, setTopicFilter] = useState<string>("all");
  const [qTopic, setQTopic] = useState<string>("general");

  const [qName, setQName] = useState("");
  const [qEmail, setQEmail] = useState("");
  const [qTitle, setQTitle] = useState("");
  const [qBody, setQBody] = useState("");
  const [qPosting, setQPosting] = useState(false);

  const [replyFor, setReplyFor] = useState<string | null>(null);
  const [rName, setRName] = useState("");
  const [rEmail, setREmail] = useState("");
  const [rBody, setRBody] = useState("");
  const [rPosting, setRPosting] = useState(false);

  const load = useCallback(async () => {
    setErr(null);
    setWarn(null);
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (langFilter !== "all") params.set("locale", langFilter);
      if (topicFilter !== "all") params.set("topic", topicFilter);
      const qs = params.toString();
      const res = await fetch(
        `/api/community/questions${qs ? `?${qs}` : ""}`,
        {
          cache: "no-store",
        },
      );
      if (!res.ok) throw new Error("load");
      const data = (await res.json()) as {
        questions: Question[];
        unavailable?: boolean;
      };
      setQuestions(data.questions ?? []);
      if (data.unavailable) setWarn(t.dbUnavailable);
    } catch {
      setErr(t.errorGeneric);
    } finally {
      setLoading(false);
    }
  }, [langFilter, topicFilter, t.dbUnavailable, t.errorGeneric]);

  useEffect(() => {
    void load();
  }, [load]);

  async function submitQuestion(e: React.FormEvent) {
    e.preventDefault();
    setQPosting(true);
    setErr(null);
    try {
      const res = await fetch("/api/community/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authorName: qName,
          authorEmail: qEmail || undefined,
          title: qTitle,
          body: qBody,
          locale,
          topic: qTopic || undefined,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (res.status === 429) {
        setErr(t.rateLimited);
        return;
      }
      if (!res.ok) {
        if (res.status === 503 && data.error === "service_unavailable") {
          setErr(t.dbUnavailablePost);
          return;
        }
        if (data.error === "validation_title") setErr(t.validationTitle);
        else if (data.error === "validation_body") setErr(t.validationBody);
        else if (data.error === "validation_name") setErr(t.validationName);
        else if (data.error === "invalid_email") setErr(t.validationEmail);
        else setErr(t.errorGeneric);
        return;
      }
      setQName("");
      setQEmail("");
      setQTitle("");
      setQBody("");
      await load();
    } catch {
      setErr(t.errorGeneric);
    } finally {
      setQPosting(false);
    }
  }

  async function submitReply(questionId: string, e: React.FormEvent) {
    e.preventDefault();
    setRPosting(true);
    setErr(null);
    try {
      const res = await fetch(`/api/community/questions/${questionId}/answers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authorName: rName,
          authorEmail: rEmail || undefined,
          body: rBody,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (res.status === 429) {
        setErr(t.rateLimited);
        return;
      }
      if (!res.ok) {
        if (res.status === 503 && data.error === "service_unavailable") {
          setErr(t.dbUnavailablePost);
          return;
        }
        if (data.error === "validation_body") setErr(t.validationBody);
        else if (data.error === "validation_name") setErr(t.validationName);
        else if (data.error === "invalid_email") setErr(t.validationEmail);
        else setErr(t.errorGeneric);
        return;
      }
      setRName("");
      setREmail("");
      setRBody("");
      setReplyFor(null);
      await load();
    } catch {
      setErr(t.errorGeneric);
    } finally {
      setRPosting(false);
    }
  }

  const input =
    "mt-2 w-full rounded-xl border border-white/12 bg-black/30 px-3 py-2 text-sm text-[rgb(var(--ink))] placeholder:text-[rgb(var(--ink-soft))]/55 outline-none focus:border-[rgb(var(--accent))]/45";

  function hasVotedHelpful(id: string): boolean {
    try {
      return window.localStorage.getItem(`lde-helpful-${id}`) === "1";
    } catch {
      return false;
    }
  }

  async function markHelpful(id: string) {
    if (hasVotedHelpful(id)) return;
    try {
      const res = await fetch(`/api/community/questions/${id}/helpful`, {
        method: "POST",
      });
      if (!res.ok) return;
      window.localStorage.setItem(`lde-helpful-${id}`, "1");
      setQuestions((prev) =>
        prev.map((x) =>
          x.id === id
            ? { ...x, helpfulCount: (x.helpfulCount ?? 0) + 1 }
            : x,
        ),
      );
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="space-y-10">
      <div className="glass card-glow rounded-3xl border border-emerald-400/15 bg-gradient-to-br from-emerald-500/[0.06] to-transparent p-5 sm:p-6">
        <p className="text-sm leading-relaxed text-[rgb(var(--ink-soft))] [text-wrap:pretty]">
          {t.securityNote}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-[rgb(var(--ink-soft))]/90 [text-wrap:pretty]">
          {moderationNote}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-[rgb(var(--ink))]">
          <span>{filterLangLabel}</span>
          <select
            value={langFilter}
            onChange={(e) => setLangFilter(e.target.value)}
            className="cursor-pointer rounded-xl border border-white/12 bg-black/35 px-3 py-2 text-sm text-[rgb(var(--ink))] outline-none focus:border-[rgb(var(--accent))]/45"
          >
            <option value="all">{filterAllLabel}</option>
            {LOCALE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.flag} {opt.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-[rgb(var(--ink))]">
          <span>{t.topicLabel}</span>
          <select
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
            className="cursor-pointer rounded-xl border border-white/12 bg-black/35 px-3 py-2 text-sm text-[rgb(var(--ink))] outline-none focus:border-[rgb(var(--accent))]/45"
          >
            <option value="all">{t.filterTopicAll}</option>
            <option value="general">{t.topicGeneral}</option>
            <option value="relocation">{t.topicRelocation}</option>
            <option value="career">{t.topicCareer}</option>
            <option value="relationships">{t.topicRelationships}</option>
            <option value="finance">{t.topicFinance}</option>
            <option value="other">{t.topicOther}</option>
          </select>
        </label>
      </div>

      {warn ? (
        <p
          className="rounded-xl border border-amber-400/25 bg-amber-500/[0.08] px-4 py-3 text-sm leading-relaxed text-amber-100/95"
          role="status"
        >
          {warn}
        </p>
      ) : null}

      {err ? (
        <p className="text-sm text-rose-300" role="alert">
          {err}
        </p>
      ) : null}

      <form
        onSubmit={submitQuestion}
        className="glass card-glow rounded-3xl p-5 sm:p-7"
      >
        <h2 className="text-lg font-semibold text-[rgb(var(--ink))]">{t.askTitle}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm text-[rgb(var(--ink))]">
            {t.yourName}
            <input
              className={input}
              value={qName}
              onChange={(e) => setQName(e.target.value)}
              required
              maxLength={80}
              autoComplete="nickname"
            />
          </label>
          <label className="block text-sm text-[rgb(var(--ink))]">
            {t.yourEmail} ({t.optional})
            <input
              className={input}
              type="email"
              value={qEmail}
              onChange={(e) => setQEmail(e.target.value)}
              maxLength={120}
              autoComplete="email"
            />
          </label>
        </div>
        <label className="mt-4 block text-sm text-[rgb(var(--ink))]">
          {t.questionTitle}
          <input
            className={input}
            value={qTitle}
            onChange={(e) => setQTitle(e.target.value)}
            required
            maxLength={200}
          />
        </label>
        <label className="mt-4 block text-sm text-[rgb(var(--ink))]">
          {t.questionBody}
          <textarea
            className={`${input} min-h-[120px] resize-y`}
            value={qBody}
            onChange={(e) => setQBody(e.target.value)}
            required
            maxLength={5000}
          />
        </label>
        <label className="mt-4 block text-sm text-[rgb(var(--ink))]">
          {t.topicLabel}
          <select
            className={`${input} mt-2`}
            value={qTopic}
            onChange={(e) => setQTopic(e.target.value)}
          >
            <option value="general">{t.topicGeneral}</option>
            <option value="relocation">{t.topicRelocation}</option>
            <option value="career">{t.topicCareer}</option>
            <option value="relationships">{t.topicRelationships}</option>
            <option value="finance">{t.topicFinance}</option>
            <option value="other">{t.topicOther}</option>
          </select>
        </label>
        <button
          type="submit"
          disabled={qPosting}
          className="mt-5 rounded-2xl bg-gradient-to-r from-[rgb(var(--accent))] via-[rgb(var(--accent-2))] to-[rgb(var(--accent-magenta))] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[rgb(var(--accent)/0.25)] disabled:opacity-50"
        >
          {qPosting ? t.posting : t.submitQuestion}
        </button>
      </form>

      <section aria-labelledby="qlist-heading">
        <h2
          id="qlist-heading"
          className="text-lg font-semibold text-[rgb(var(--ink))]"
        >
          {t.questionsTitle}
        </h2>
        {loading ? (
          <p className="mt-4 text-sm text-[rgb(var(--ink-soft))]">…</p>
        ) : questions.length === 0 ? (
          <p className="mt-4 text-sm text-[rgb(var(--ink-soft))]">{t.empty}</p>
        ) : (
          <ul className="mt-6 space-y-6">
            {questions.map((q) => (
              <li
                key={q.id}
                className="glass rounded-2xl border border-white/[0.08] p-5 sm:p-6"
              >
                <p className="text-xs text-[rgb(var(--ink-soft))]">
                  {new Date(q.createdAt).toLocaleString()}{" "}
                  <span className="text-[rgb(var(--ink))]">· {q.authorName}</span>
                  {q.locale ? (
                    <span className="ms-2 rounded-full border border-white/12 bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-[rgb(var(--accent-2))]/90">
                      {q.locale}
                    </span>
                  ) : null}
                  {q.topic ? (
                    <span className="ms-2 rounded-full border border-white/12 bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-violet-200/90">
                      {q.topic}
                    </span>
                  ) : null}
                </p>
                <h3 className="mt-2 text-base font-semibold text-[rgb(var(--ink))]">
                  {q.title}
                </h3>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-[rgb(var(--ink-soft))]">
                  {q.body}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[rgb(var(--ink-soft))]">
                  <span className="text-[rgb(var(--accent-2))]/90">
                    {q.answers.length} {t.answersLabel}
                  </span>
                  <span>·</span>
                  <span>
                    {q.helpfulCount ?? 0} {t.helpfulStat}
                  </span>
                  <button
                    type="button"
                    disabled={hasVotedHelpful(q.id)}
                    onClick={() => void markHelpful(q.id)}
                    className="rounded-lg border border-white/12 bg-white/[0.06] px-2 py-1 text-[11px] font-medium text-[rgb(var(--ink))] transition enabled:hover:bg-white/[0.1] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {hasVotedHelpful(q.id) ? t.helpfulThanks : t.helpfulCta}
                  </button>
                </div>
                {q.answers.length > 0 ? (
                  <ul className="mt-4 space-y-3 border-t border-white/[0.06] pt-4">
                    {q.answers.map((a) => (
                      <li key={a.id} className="rounded-xl bg-black/20 px-3 py-2">
                        <p className="text-xs text-[rgb(var(--ink-soft))]">
                          <span className="font-medium text-[rgb(var(--ink))]">
                            {a.authorName}
                          </span>{" "}
                          · {new Date(a.createdAt).toLocaleString()}
                        </p>
                        <p className="mt-1 whitespace-pre-wrap text-sm text-[rgb(var(--ink-soft))]">
                          {a.body}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {replyFor === q.id ? (
                  <form
                    className="mt-4 border-t border-white/[0.06] pt-4"
                    onSubmit={(e) => submitReply(q.id, e)}
                  >
                    <p className="text-sm font-medium text-[rgb(var(--ink))]">
                      {t.replyTitle}
                    </p>
                    <div className="mt-2 grid gap-3 sm:grid-cols-2">
                      <input
                        className={input}
                        placeholder={t.yourName}
                        value={rName}
                        onChange={(e) => setRName(e.target.value)}
                        required
                        maxLength={80}
                      />
                      <input
                        className={input}
                        type="email"
                        placeholder={`${t.yourEmail} (${t.optional})`}
                        value={rEmail}
                        onChange={(e) => setREmail(e.target.value)}
                        maxLength={120}
                      />
                    </div>
                    <textarea
                      className={`${input} mt-2 min-h-[80px]`}
                      value={rBody}
                      onChange={(e) => setRBody(e.target.value)}
                      required
                      maxLength={8000}
                    />
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button
                        type="submit"
                        disabled={rPosting}
                        className="rounded-xl border border-white/15 bg-white/[0.08] px-4 py-2 text-sm font-medium text-[rgb(var(--ink))] disabled:opacity-50"
                      >
                        {rPosting ? t.postingReply : t.submitReply}
                      </button>
                      <button
                        type="button"
                        className="rounded-xl px-4 py-2 text-sm text-[rgb(var(--ink-soft))]"
                        onClick={() => {
                          setReplyFor(null);
                          setRBody("");
                        }}
                      >
                        {t.cancel}
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    type="button"
                    className="mt-3 text-sm font-medium text-[rgb(var(--accent-2))] hover:underline"
                    onClick={() => {
                      setReplyFor(q.id);
                      setRName("");
                      setREmail("");
                      setRBody("");
                    }}
                  >
                    {t.openReply}
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
