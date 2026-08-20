import Link from "next/link";

function Navbar() {
  return (
    <nav className="flex flex-col gap-8 bg-transparent">
      <div className="px-4">
        <Link href="/">LOGO</Link>
      </div>

      <div className="flex flex-col gap-12 *:text-light-black font-normal text-[16px]">
        <div className="flex flex-col gap-2 ">
          <Link
            href="/"
            className="border py-2.5 px-4 rounded-[8px] hover:bg-blue-card hover:text-white "
          >
            <span></span> <span>Dashboard</span>
          </Link>
          <Link
            href="/"
            className="border py-2.5 px-4 rounded-[8px] hover:bg-blue-card hover:text-white "
          >
            <span></span> <span>Company</span>
          </Link>
          <Link
            href="/"
            className="border py-2.5 px-4 rounded-[8px] hover:bg-blue-card hover:text-white "
          >
            <span></span> <span>Services</span>
          </Link>
          <Link
            href="/"
            className="border py-2.5 px-4 rounded-[8px] hover:bg-blue-card hover:text-white "
          >
            <span></span> <span>Tax Compliance </span>
          </Link>
          <Link
            href="/"
            className="border py-2.5 px-4 rounded-[8px] hover:bg-blue-card hover:text-white "
          >
            <span></span> <span>My Order</span>
          </Link>
        </div>

        <div className="border-t flex flex-col gap-2 py-3">
          <Link
            href="/"
            className="border py-2.5 px-4 rounded-[8px] hover:bg-blue-card hover:text-white "
          >
            <span></span> <span>Setting</span>
          </Link>
          <Link
            href="/"
            className="border py-2.5 px-4 rounded-[8px] hover:bg-blue-card hover:text-white "
          >
            <span></span> <span>Refer & Earn </span>
          </Link>
          <Link
            href="/"
            className="border py-2.5 px-4 rounded-[8px] text-red-600 hover:bg-blue-card "
          >
            <span></span> <span> Logout</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
