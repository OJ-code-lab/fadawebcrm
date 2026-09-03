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
  category: Section;
};

// Section-keyed mock data
const initialDocuments: Document[] = [
  {
    id: "doc-1",
    name: "Certificate of Incorporation",
    type: "PDF",
    createdAt: "2026-01-15",
    category: "Company Documents",
  },
  {
    id: "doc-2",
    name: "Memorandum of Association",
    type: "PDF",
    createdAt: "2026-01-15",
    category: "Company Documents",
  },
  {
    id: "doc-4",
    name: "TIN Registration Clearance",
    type: "PDF",
    createdAt: "2026-03-01",
    category: "Tax",
  },
  {
    id: "doc-5",
    name: "VAT Clearance Certificate",
    type: "PDF",
    createdAt: "2026-03-12",
    category: "Tax",
  },
];

export default function DocumentSections() {
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Filter documents by section category
  const sectionDocuments = initialDocuments.filter((doc) => {
    if (selectedSection === "All documents") return true;
    return doc.category === selectedSection;
  });

  // 2. Filter remaining section documents by search term
  const filteredDocuments = sectionDocuments.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
            setSearchQuery(""); // Clear search query when closing
          }
        }}
      >
        <DrawerContent className="flex flex-col p-6 h-dvh w-full max-h-dvh rounded-none lg:max-w-120 lg:rounded-l-[12px] lg:rounded-r-none">
          <DrawerHeader className="flex flex-row items-center justify-between mt-8 shrink-0">
            <DrawerTitle className="font-bold text-xl">
              {selectedSection}
            </DrawerTitle>

            <DrawerClose aria-label="Close drawer">
              <X size={25} />
            </DrawerClose>
          </DrawerHeader>

          <InputGroup className="bg-gray-100/40 py-6 mt-4 shrink-0">
            <InputGroupInput
              id="inline-start-input"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mt-0 text-light-black"
            />
            <InputGroupAddon align="inline-start">
              <Search />
            </InputGroupAddon>
          </InputGroup>

          <div className="flex flex-col gap-4 mt-8 px-1 overflow-y-auto flex-1 min-h-0">
            {filteredDocuments.length === 0 ? (
              <div className="mt-8">
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
                  <p className="font-medium text-xl text-gray-700">
                    No documents available
                  </p>
                  <p className="font-medium text-base text-light-black">
                    There are no documents available in this category. As
                    documents are added to this section, they will appear here.
                  </p>
                </div>
              </div>
            ) : (
              filteredDocuments.map((document) => (
                <Card
                  key={document.id}
                  className="flex-row items-center justify-between gap-8 px-4 py-4"
                >
                  <span className="font-medium text-base">{document.name}</span>
                  <a
                    href={`/api/download/${document.id}`}
                    download
                    aria-label={`Download ${document.name}`}
                    className="shrink-0 cursor-pointer hover:opacity-75 transition-opacity"
                  >
                    <Download className="text-light-black" size={20} />
                  </a>
                </Card>
              ))
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
