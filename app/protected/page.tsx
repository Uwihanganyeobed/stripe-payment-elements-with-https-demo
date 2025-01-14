import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import { syncUserWithDatabase } from "@/lib/syncUser";

export default async function ProtectedPage() {
  // Sync user with database
  await syncUserWithDatabase();

  return (
    <div>
      <SignedOut>
        <SignIn />
      </SignedOut>
      <SignedIn>
        <h1>Welcome to the Protected Page!</h1>
        <p>Only signed-in users can see this page.</p>
      </SignedIn>
    </div>
  );
}
