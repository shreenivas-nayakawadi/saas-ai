"use client";

import { Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

interface CodeBlockProps {
  code: string;
}

export const CodeBlock = ({ code }: CodeBlockProps) => {
  const { copied, copy } = useCopyToClipboard();

  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden border border-gray-700 mt-4">
      {/* Copy Button */}
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={() => copy(code)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs transition-all ${
            copied
              ? "bg-green-600/20 text-green-400"
              : "bg-gray-700/80 text-gray-300 hover:bg-gray-600/80"
          }`}
          title={copied ? "Copied!" : "Copy to clipboard"}
        >
          {copied ? (
            <>
              <Check size={16} className="text-green-400" />
              <span className="hidden sm:inline">Copied</span>
            </>
          ) : (
            <>
              <Copy size={16} />
              <span className="hidden sm:inline">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Block */}
      <div className="p-3 sm:p-4 overflow-x-auto">
        <pre className="font-mono text-xs sm:text-sm leading-relaxed text-gray-100 whitespace-pre-wrap">
          <code>
            {code.split("\n").map((line, i) => (
              <div key={i} className="flex">
                <span className="select-none text-gray-500 w-8 text-right pr-3 mr-2">
                  {i + 1}
                </span>
                <span className="flex-1">{line}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};
