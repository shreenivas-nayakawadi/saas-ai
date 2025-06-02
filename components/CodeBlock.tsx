// components/CodeBlock.tsx
"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface CodeBlockProps {
      code: string;
}

export const CodeBlock = ({ code }: CodeBlockProps) => {
      const [copied, setCopied] = useState(false);

      const handleCopy = () => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
      };

      return (
            <div className="relative bg-gray-900 rounded-lg overflow-hidden border border-gray-700 mt-4">
                  {/* Copy Button */}
                  <div className="absolute top-2 right-2 z-10">
                        <button
                              onClick={handleCopy}
                              className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-all ${
                                    copied
                                          ? "bg-green-600/20 text-green-400"
                                          : "bg-gray-700/80 text-gray-300 hover:bg-gray-600/80"
                              }`}
                              title={copied ? "Copied!" : "Copy to clipboard"}
                        >
                              {copied ? (
                                    <>
                                          <Check
                                                size={14}
                                                className="text-green-400"
                                          />
                                          <span>Copied</span>
                                    </>
                              ) : (
                                    <>
                                          <Copy size={14} />
                                          <span className="hidden sm:inline">
                                                Copy
                                          </span>
                                    </>
                              )}
                        </button>
                  </div>

                  {/* Code Block */}
                  <div className="p-4 overflow-x-auto">
                        <pre className="font-mono text-sm leading-relaxed text-gray-100 whitespace-pre-wrap">
                              <code>
                                    {code.split("\n").map((line, i) => (
                                          <div key={i} className="flex">
                                                <span className="select-none text-gray-500 w-8 text-right pr-4 mr-2">
                                                      {i + 1}
                                                </span>
                                                <span className="flex-1">
                                                      {line}
                                                </span>
                                          </div>
                                    ))}
                              </code>
                        </pre>
                  </div>

                  {/* Mobile Optimizations */}
                  <style jsx>{`
                        @media (max-width: 640px) {
                              pre {
                                    font-size: 0.85rem;
                                    line-height: 1.4;
                              }
                              .text-xs {
                                    font-size: 0.7rem;
                              }
                        }
                  `}</style>
            </div>
      );
};
