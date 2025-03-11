import { ClerkProvider, SignIn, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-gray-100">
          <header className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md">
            <h1 className="text-2xl font-bold">Main Corp</h1>
            <UserButton showName />
          </header>
          <main className="flex flex-col items-center justify-center min-h-screen p-4">
            <SignedOut>
              <SignIn routing="hash" />
            </SignedOut>
            <SignedIn>
              <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
                {children}
              </div>
            </SignedIn>
          </main>
          <footer className="bg-gray-800 text-white text-center p-4">
            <p>&copy; {new Date().getFullYear()} Lorem Dev Vargas. All rights reserved.</p>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
