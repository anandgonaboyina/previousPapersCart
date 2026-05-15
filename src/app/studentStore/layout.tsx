import Navbar from "@/components/navbar/page";

export default function storeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="min-h-full flex flex-col">
        {children}
      </div>

    </>

  );
}
