"use client";

import dynamic from "next/dynamic";

const SwaggerClient = dynamic(() => import("../components/SwaggerClient"), {
  ssr: false,
});

export default function ApiReferencePage() {
  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">API Reference</h1>
      <SwaggerClient />
    </main>
  );
}