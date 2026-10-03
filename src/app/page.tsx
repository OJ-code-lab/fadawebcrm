import LoginForm from "@/components/auth/LoginForm";
// import Link from "next/link";

const page = () => {
  return (
    <div className=" max-w-7xl mx-auto my-4 grid grid-cols-1 place-items-center w-full">
      {/* <Link href="/auth">auth</Link>
      <Link href="/nigeria-dashboard">nigeria</Link>
      <Link href="/usa">usa</Link> */}
      <LoginForm />
    </div>
  );
};

export default page;
