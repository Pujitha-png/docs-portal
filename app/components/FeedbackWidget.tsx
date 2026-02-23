"use client";

import { useState } from "react";

export default function FeedbackWidget({
  label = "Feedback",
  placeholder = "Your feedback...",
  submitLabel = "Submit",
  successMessage = "Thanks for your feedback.",
}: {
  label?: string;
  placeholder?: string;
  submitLabel?: string;
  successMessage?: string;
}) {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      return;
    }
    setSubmitted(true);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900"
    >
      <label htmlFor="feedback" className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <textarea
        id="feedback"
        data-testid="feedback-input"
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
          if (submitted) {
            setSubmitted(false);
          }
        }}
        className="w-full rounded-md border border-slate-300 bg-white p-2.5 text-sm outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950"
        placeholder={placeholder}
      />
      <button
        type="submit"
        data-testid="feedback-submit"
        className="mt-3 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
      >
        {submitLabel}
      </button>
      {submitted && (
        <p data-testid="feedback-success-message" className="mt-2 text-sm text-green-700 dark:text-green-400">
          {successMessage}
        </p>
      )}
    </form>
  );
}
 