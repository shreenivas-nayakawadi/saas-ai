declare module "react-copy-to-clipboard" {
  import * as React from "react";

  export interface CopyToClipboardProps {
    text: string;
    onCopy?: (text: string, result: boolean) => void;
    options?: {
      debug?: boolean;
      message?: string;
    };
    children: React.ReactNode;
  }

  const CopyToClipboard: React.FC<CopyToClipboardProps>;

  export { CopyToClipboard };
  export default CopyToClipboard;
}
