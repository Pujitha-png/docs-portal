"use client";

import { useState } from "react";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

function getCodeText(children: React.ReactNode): string {
  if (typeof children === "string") {
    return children;
  }

  if (Array.isArray(children)) {
    return children.map(getCodeText).join("");
  }

  if (children && typeof children === "object" && "props" in children) {
    const value = children as { props?: { children?: React.ReactNode } };
    return getCodeText(value.props?.children ?? "");
  }

  return "";
}

export default function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const code = getCodeText(children).replace(/\n$/, "");

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative my-5 overflow-hidden rounded-lg border border-slate-800 bg-slate-950" data-testid="code-block">
      <pre className="overflow-x-auto p-4 text-sm text-slate-100">
        <code>{code}</code>
      </pre>
      <button
        type="button"
        data-testid="copy-code-button"
        onClick={copyCode}
        className="absolute right-2 top-2 rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs font-medium text-slate-100 transition hover:bg-slate-800"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
