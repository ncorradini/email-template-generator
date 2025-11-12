import { blockStyles } from "./Block.styles";
import type { Block } from "../../types/Block";
import ContentEditable from "react-contenteditable";
import defaultImage from "../../assets/default.png";

interface Props {
  block: Block;
  onChange: (id: string, value: string) => void;
}

export const BlockItem = ({ block, onChange }: Props) => {
  const commonStyle = {
    width: block.width || "auto",
    height: block.height || "auto",
    ...(block.styles || {}),
  };

  switch (block.type) {
    case "title":
      return (
        <ContentEditable
          html={block.content || "Título"}
          onChange={(e) => onChange(block.id, e.target.value)}
          style={{
            ...blockStyles.title,
            ...blockStyles.editableBlock,
            ...commonStyle,
          }}
        />
      );

    case "paragraph":
      return (
        <ContentEditable
          html={block.content || "Párrafo de texto..."}
          onChange={(e) => onChange(block.id, e.target.value)}
          style={{
            ...blockStyles.paragraph,
            ...blockStyles.editableBlock,
            ...commonStyle,
          }}
        />
      );

    case "image":
      return (
        <img
          src={block.src || defaultImage}
          alt="img"
          style={{
            ...blockStyles.image,
            ...commonStyle,
            width: block.width || 200,
            height: block.height || 120,
            objectFit: "cover",
          }}
        />
      );

    case "button":
      return (
        <button style={{ ...blockStyles.button, ...commonStyle }}>
          {block.content || "Llamada a la acción"}
        </button>
      );

    case "divider":
      return (
        <div style={blockStyles.dividerWrapper}>
          <hr style={blockStyles.divider} />
        </div>
      );

    case "link":
      return (
        <ContentEditable
          html={block.content || "Texto del enlace"}
          onChange={(e) => onChange(block.id, e.target.value)}
          style={{
            ...blockStyles.link,
            ...blockStyles.editableBlock,
            ...commonStyle,
          }}
        />
      );

    case "container":
      return (
        <div
          style={{
            ...blockStyles.container,
            ...commonStyle,
          }}
        />
      );

    case "grid":
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.5rem",
            width: "100%",
          }}
        >
          <ContentEditable
            html="Columna 1"
            onChange={(e) => onChange(block.id, e.target.value + "_col1")}
            style={{
              ...blockStyles.gridColumn,
              ...blockStyles.editableBlock,
            }}
          />
          <ContentEditable
            html="Columna 2"
            onChange={(e) => onChange(block.id, e.target.value + "_col2")}
            style={{
              ...blockStyles.gridColumn,
              ...blockStyles.editableBlock,
            }}
          />
        </div>
      );

    default:
      return null;
  }
};
