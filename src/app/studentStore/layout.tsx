import Navbar from "@/components/navBar";

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
