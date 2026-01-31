// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50">
        {children}
      </body>
    </html>
  );
}
