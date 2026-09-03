import Link from "next/link";

export default function Auth() {
  return (
    <div className="flex max-w-5xl gap-5 text-light-black">
      <Link href="/sign-in">Login</Link>
      <Link href="auth/sign-up">Register</Link>
    </div>
  );
}
