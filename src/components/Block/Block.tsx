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

    case "table": {
      const rows = block.settings?.rows || 3;
      const columns = block.settings?.columns || 3;
      const tableData =
        block.settings?.tableData ||
        Array.from({ length: rows }, () =>
          Array.from({ length: columns }, () => "")
        );

      const handleCellChange = (
        rowIndex: number,
        colIndex: number,
        value: string
      ) => {
        const newData = tableData.map((row, r) =>
          row.map((cell, c) =>
            r === rowIndex && c === colIndex ? value : cell
          )
        );

        block.settings = { ...block.settings, tableData: newData };
        onChange(block.id, JSON.stringify(newData));
      };

      const cellHeight =
        block.height && rows > 0 ? block.height / rows : "auto";

      return (
        <table
          style={{
            ...blockStyles.table,
            width: block.width || "auto",
            height: block.height || "auto",
          }}
        >
          <tbody>
            {tableData.map((row, r) => (
              <tr key={r} style={{ height: cellHeight }}>
                {row.map((cell, c) => (
                  <td
                    key={c}
                    style={{
                      ...blockStyles.tableCell,
                      borderWidth: block.styles?.borderWidth || "1px",
                      borderStyle: "solid",
                      borderColor: block.styles?.borderColor || "black",
                      fontSize: block.styles?.fontSize || "14px",
                      height: cellHeight,
                    }}
                  >
                    <ContentEditable
                      html={cell}
                      onChange={(e) => handleCellChange(r, c, e.target.value)}
                      style={{
                        ...blockStyles.editableBlock,
                        display: "flex",
                        justifyContent:
                          block.styles?.justifyContent || "flex-start",
                        alignItems: block.styles?.alignItems || "flex-start",
                        textAlign:
                          block.styles?.justifyContent === "center"
                            ? "center"
                            : block.styles?.justifyContent === "flex-end"
                            ? "right"
                            : "left",
                        width: "100%",
                        height: "100%",
                        padding: "4px",
                        boxSizing: "border-box",
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    default:
      return null;
  }
};
