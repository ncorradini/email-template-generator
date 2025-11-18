export type BlockType =
  | "title"
  | "paragraph"
  | "image"
  | "button"
  | "divider"
  | "link"
  | "container"
  | "table";

export interface CellData {
  text: string;
  justifyContent?: "flex-start" | "center" | "flex-end";
  alignItems?: "flex-start" | "center" | "flex-end";
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  width?: number;
}

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
    tableData?: CellData[][];
    showInternalBorders?: boolean;
  };
  styles?: Record<string, string>;
}
