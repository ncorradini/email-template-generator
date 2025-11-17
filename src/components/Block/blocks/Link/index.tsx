import ContentEditable from "react-contenteditable";
import type { Block } from "../../../../types/Block";
import { styles } from "./style";

interface Props {
  block: Block;
  onChange: (id: string, value: string) => void;
}

export const LinkBlock = ({ block, onChange }: Props) => {
  return (
    <ContentEditable
      html={block.content || "Texto del enlace"}
      onChange={(e) => onChange(block.id, e.target.value)}
      style={{ ...styles.link, ...styles.editable, ...block.styles }}
    />
  );
};
