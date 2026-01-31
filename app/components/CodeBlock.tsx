"use client";

import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = "text" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative my-4" data-testid="code-block-copy">
      <pre className="p-4 bg-gray-100 rounded overflow-x-auto">
        <code>{code}</code>
      </pre>
      <button
        onClick={copyCode}
        className="absolute top-2 right-2 px-2 py-1 bg-indigo-600 text-white rounded text-sm"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
