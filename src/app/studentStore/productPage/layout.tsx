export default function ProductPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="fixed inset-0 z-50 bg-neutral-50 dark:bg-neutral-950 overflow-y-auto">
      {children}
    </div>
  );
}
