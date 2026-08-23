"use client";

import { useState } from "react";
import { ChevronRight, Download, Search, X } from "lucide-react";

import { Card } from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import Image from "next/image";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

const sections = [
  "All documents",
  "Company Documents",
  "Business Compliance",
  "Tax",
] as const;

type Section = (typeof sections)[number];

type Document = {
  id: string;
  name: string;
  type: string;
  createdAt: string;
};

const initialDocuments: Document[] = [
  {
    id: "tin-document-1",
    name: "TIN Document",
    type: "PDF",
    createdAt: "2026-01-15",
  },
  {
    id: "tin-document-2",
    name: "TIN Document",
    type: "PDF",
    createdAt: "2026-01-15",
  },
  {
    id: "tin-document-3",
    name: "TIN Document",
    type: "PDF",
    createdAt: "2026-01-15",
  },
  {
    id: "tin-document-4",
    name: "TIN Document",
    type: "PDF",
    createdAt: "2026-01-15",
  },
];

export default function DocumentSections() {
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);

  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (!selectedSection) return;

  //   async function fetchDocuments() {
  //     try {
  //       setLoading(true);

  //       const response = await fetch(
  //         `/api/documents?section=${encodeURIComponent(selectedSection)}`
  //       );

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch documents");
  //       }

  //       const data: Document[] = await response.json();

  //       setDocuments(data);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchDocuments();
  // }, [selectedSection]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {sections.map((section) => (
          <Card
            key={section}
            className="cursor-pointer px-8 py-6"
            onClick={() => setSelectedSection(section)}
          >
            <div className="flex justify-between text-lg font-medium">
              <p>{section}</p>

              <ChevronRight size={18} />
            </div>
          </Card>
        ))}
      </div>

      <Drawer
        open={selectedSection !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedSection(null);
            setDocuments([]);
          }
        }}
      >
        <DrawerContent className="p-6">
          <DrawerHeader className="flex flex-row items-center justify-between mt-8">
            <DrawerTitle className="font-bold text-xl">
              {selectedSection}
            </DrawerTitle>

            <DrawerClose>
              <X size={25} />
            </DrawerClose>
          </DrawerHeader>
          <InputGroup className=" bg-gray-100/40 py-6 mt-4">
            <InputGroupInput
              id="inline-start-input"
              placeholder="Search"
              className="mt-0 text-light-black"
            />
            <InputGroupAddon align="inline-start">
              <Search />
            </InputGroupAddon>
          </InputGroup>

          <div className="flex flex-col gap-4 mt-8">
            {
              // loading ? (
              //   <p>Loading documents...</p>
              // )
              documents.length === 0 ? (
                <div className=" mt-8 ">
                  <div>
                    <Image
                      src="/img/undraw_file-searching_yska.png"
                      alt="A person searching through a folder"
                      width={160}
                      height={120}
                      className="mx-auto"
                    />
                  </div>
                  <div className="text-center space-y-4 mt-4">
                    <p className="font-medium text-xl text-gray-700 ">
                      No documents available
                    </p>
                    <p className="font-medium text-base text-light-black">
                      There are no documents available in this category. As
                      documents are added to this section, they will appear
                      here.
                    </p>
                  </div>
                </div>
              ) : (
                documents.map((document) => (
                  <Card
                    key={document.id}
                    className="flex-row items-center justify-between gap-8 px-4"
                  >
                    <span className="font-medium text-base">
                      {document.name}
                    </span>
                    <span className="shrink-0">
                      <Download className="text-light-black" size={20} />
                    </span>
                  </Card>
                ))
              )
            }
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
