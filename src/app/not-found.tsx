import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <Image
        src="/img/error404.png"
        alt="Page not found"
        width={400}
        height={400}
        priority
      />
      <h1 className="mt-6 text-3xl font-bold">
        Uh-oh... I think I took a wrong turn.
      </h1>
      <p className="mt-2 text-gray-500">
        Let&apos;s get you back to where the cute things live.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-gray-100 px-4 py-2 hover:bg-gray-200"
      >
        Go home
      </Link>
    </div>
  );
}
