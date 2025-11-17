import ContentEditable from "react-contenteditable";
import type { Block } from "../../../../types/Block";
import { styles } from "./styles";

interface Props {
  block: Block;
  onChange: (id: string, value: string) => void;
}

export const TableBlock = ({ block, onChange }: Props) => {
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
      row.map((cell, c) => (r === rowIndex && c === colIndex ? value : cell))
    );

    block.settings = { ...block.settings, tableData: newData };
    onChange(block.id, JSON.stringify(newData));
  };

  const cellHeight = block.height && rows > 0 ? block.height / rows : "auto";

  const showInside = block.settings?.showInternalBorders ?? true;

  return (
    <table
      style={{
        ...styles.table,
        width: block.width || "auto",
        height: block.height || "auto",
        borderTop: `${block.styles?.borderTopWidth || "1px"} solid ${
          block.styles?.borderTopColor || "black"
        }`,
        borderRight: `${block.styles?.borderRightWidth || "1px"} solid ${
          block.styles?.borderRightColor || "black"
        }`,
        borderBottom: `${block.styles?.borderBottomWidth || "1px"} solid ${
          block.styles?.borderBottomColor || "black"
        }`,
        borderLeft: `${block.styles?.borderLeftWidth || "1px"} solid ${
          block.styles?.borderLeftColor || "black"
        }`,
      }}
    >
      <tbody>
        {tableData.map((row, r) => (
          <tr key={r} style={{ height: cellHeight }}>
            {row.map((cell, c) => (
              <td
                key={c}
                style={{
                  ...styles.cell,
                  borderTop:
                    showInside && r > 0
                      ? `${block.styles?.borderTopWidth || "1px"} solid ${
                          block.styles?.borderTopColor || "black"
                        }`
                      : "none",
                  borderLeft:
                    showInside && c > 0
                      ? `${block.styles?.borderLeftWidth || "1px"} solid ${
                          block.styles?.borderLeftColor || "black"
                        }`
                      : "none",
                  fontSize: block.styles?.fontSize || "14px",
                  fontWeight: block.styles?.fontWeight || "400",
                  color: block.styles?.color || "#000000",
                }}
              >
                <ContentEditable
                  html={cell}
                  onChange={(e) => handleCellChange(r, c, e.target.value)}
                  style={{
                    ...styles.editable,
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
};
