"use client";

import { Copy } from "lucide-react";
import { useState } from "react";

function CopyButton({ copyText }: { copyText: string }) {
  const [copied, setCopied] = useState(false);
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("failed to copy", err);
    }
  }
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="hover:pointer-coarse:"
    >
      {copied ? "Copied!" : <Copy size={15} />}
    </button>
  );
}

export default CopyButton;
