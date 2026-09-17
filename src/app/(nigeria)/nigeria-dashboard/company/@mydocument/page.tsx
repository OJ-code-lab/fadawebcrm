// import { Card } from "@/components/ui/card";
// import { ChevronRight } from "lucide-react";

import DocumentSections from "./document_section/page";

// export default function MyDocumentPage() {
//   return (
//     <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 ">
//       <Card className="px-8 py-6">
//         <div className="flex justify-between text-lg font-medium">
//           <p>All documents</p>
//           <span>
//             {" "}
//             <ChevronRight size={18} />{" "}
//           </span>
//         </div>
//       </Card>
//       <Card className="px-8 py-6">
//         <div className="flex justify-between text-lg font-medium">
//           <p>Company Documents</p>
//           <span>
//             {" "}
//             <ChevronRight size={18} />{" "}npm run dev
//           </span>
//         </div>
//       </Card>
//       <Card className="px-8 py-6">
//         <div className="flex justify-between text-lg font-medium">
//           <p>Business Compliance</p>
//           <span>
//             {" "}
//             <ChevronRight size={18} />{" "}
//           </span>
//         </div>
//       </Card>
//       <Card className="px-8 py-6">
//         <div className="flex justify-between text-lg font-medium">
//           <p>Tax</p>
//           <span>
//             {" "}
//             <ChevronRight size={18} />{" "}
//           </span>
//         </div>
//       </Card>
//     </div>
//   );
// }

export default function MyDocumentPage() {
  return <DocumentSections />;
}
