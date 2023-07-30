export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <main className="w-full" data-theme="lofi">
        {children}
      </main>
    );
  }
  