import Navbar from "@/src/components/navbar";

export default function DashLayout({ children }: LayoutProps<"/">) {
  return (
    <body className="min-h-full flex flex-col">
      <div className="grid grid-cols-[208px_3fr] grid-rows-[auto_1fr] gap-10">
        <aside className=" row-span-2 bg-primary flex flex-col justify-between pt-18.25 pb-8 pl-4 pr-2 rounded-[12px]   ">
          {" "}
          <Navbar />{" "}
        </aside>
        <header className=" bg-primary p-2.5 text-center">header</header>
        <main className="bg-primary p-2.5 min-h-dvh">{children}</main>
      </div>
    </body>
  );
}
