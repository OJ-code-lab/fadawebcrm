import Link from "next/link";

function Navbar() {
  return (
    <nav className="flex flex-col bg-transparent">
      <div>
        <Link href="/">LOGO</Link>
      </div>

      <div>
        <div className="flex flex-col gap-2 *:text-light-black">
          <Link href="/">
            <span></span> <span>Dashboard</span>
          </Link>
          <Link href="/">
            <span></span> <span>Company</span>
          </Link>
          <Link href="/">
            <span></span> <span>Services</span>
          </Link>
          <Link href="/">
            <span></span> <span>Tax Compliance </span>
          </Link>
          <Link href="/">
            <span></span> <span>My Order</span>
          </Link>
        </div>
        <div>
          <Link href="/">
            <span></span> <span>Setting</span>
          </Link>
          <Link href="/">
            <span></span> <span>Refer & Earn </span>
          </Link>
          <Link href="/">
            <span></span> <span> Logout</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
