import ContentEditable from "react-contenteditable";
import type { Block } from "../../../../types/Block";
import { styles } from "./styles";

interface Props {
  block: Block;
  onChange: (id: string, value: string) => void;
}

export const TitleBlock = ({ block, onChange }: Props) => {
  const common = {
    width: block.width || "auto",
    height: block.height || "auto",
    ...block.styles,
  };

  return (
    <ContentEditable
      html={block.content || "Título"}
      onChange={(e) => onChange(block.id, e.target.value)}
      style={{ ...styles.title, ...styles.editable, ...common }}
    />
  );
};
