import Image from "next/image";
import Link from "next/link";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <Image
        src="/img/error404.png"
        alt="Page not found"
        width={400}
        height={400}
        priority
      />
      <h1 className="text-3xl font-bold mt-6">
        Uh-oh... I think I took a wrong turn.
      </h1>
      <p className="text-gray-500 mt-2">
        {" "}
        Lets get you back to where the cute things live.
      </p>
      <Link
        href="/nigeria/nigeria-dashboard"
        className="mt-6 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
      >
        Go home
      </Link>
    </div>
  );
}

export default NotFound;

// app/not-found.tsx
