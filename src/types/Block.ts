export type BlockType =
  | "title"
  | "paragraph"
  | "image"
  | "button"
  | "divider"
  | "link"
  | "container"
  | "grid";

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
  settings?: Record<string, unknown>;
  styles?: Record<string, string>;
}
