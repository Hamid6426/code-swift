export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-dvh p-2 scale-85 md:scale-100 flex items-center justify-center bg-background text-on-background">
      {children}
    </div>
  );
}
