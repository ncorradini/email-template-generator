export type BlockType =
  | "title"
  | "paragraph"
  | "image"
  | "button"
  | "divider"
  | "link"
  | "container"
  | "table";

export interface Block {
  id: string;
  type: BlockType;
  content?: string;
  src?: string;
  href?: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  children?: Block[];
  settings?: {
    rows?: number;
    columns?: number;
    tableData?: string[][];
  };
  styles?: Record<string, string>;
}
