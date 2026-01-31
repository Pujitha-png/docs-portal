"use client";

import { useState } from "react";

export default function FeedbackWidget() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Feedback submitted: " + message);
    setMessage("");
  };

  return (
    <form
      data-testid="feedback-widget"
      onSubmit={handleSubmit}
      className="mt-6 p-4 border rounded"
    >
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Your feedback..."
      />
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Submit
      </button>
    </form>
  );
}
 