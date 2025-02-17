import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = "pk_test_c3BsZW5kaWQtcm91Z2h5LTUyLmNsZXJrLmFjY291bnRzLmRldiQ";

if (!PUBLISHABLE_KEY) throw new Error("Clerk Key is missing!");

export function AuthProvider({ children }) {
  return <ClerkProvider publishableKey={PUBLISHABLE_KEY}>{children}</ClerkProvider>;
}
