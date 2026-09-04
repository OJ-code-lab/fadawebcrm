import Link from "next/link";

const page = () => {
  return (
    <div className="flex max-w-5xl gap-5 *:text-wizard-green">
      <Link href="/auth">auth</Link>
      <Link href="/nigeria">nigeria</Link>
      <Link href="/usa">usa</Link>
    </div>
  );
};

export default page;
