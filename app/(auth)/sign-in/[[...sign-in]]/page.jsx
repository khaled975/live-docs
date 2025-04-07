import { SignIn } from "@clerk/nextjs";

export default function SigninPage() {
  return (
    <div className="auth-page">
      <SignIn />
    </div>
  );
}
