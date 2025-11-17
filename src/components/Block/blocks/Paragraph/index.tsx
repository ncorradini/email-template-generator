import ContentEditable from "react-contenteditable";
import type { Block } from "../../../../types/Block";
import { styles } from "./styles";

interface Props {
  block: Block;
  onChange: (id: string, value: string) => void;
}

export const ParagraphBlock = ({ block, onChange }: Props) => {
  const common = { ...block.styles };

  return (
    <ContentEditable
      html={block.content || "Párrafo de texto..."}
      onChange={(e) => onChange(block.id, e.target.value)}
      style={{ ...styles.paragraph, ...styles.editable, ...common }}
    />
  );
};
