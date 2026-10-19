"use client";

import {
  Sheet,
  //   SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TextAlignJustify } from "lucide-react";

export function MobileMenu() {
  return (
    <div className="flex flex-wrap gap-2">
      <Sheet>
        <SheetTrigger
          render={
            <button>
              <TextAlignJustify size={30} />
            </button>
          }
        />
        <SheetContent
          side="left"
          className="data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]"
        >
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>

          <SheetFooter>
            {/* <Button type="submit">Save changes</Button> */}
            {/* <SheetClose render={<Button variant="outline"></Button>} /> */}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
