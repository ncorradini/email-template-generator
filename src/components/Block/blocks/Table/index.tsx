import { useState, useEffect, useRef } from "react";
import ContentEditable from "react-contenteditable";
import type { Block, CellData } from "../../../../types/Block";
import { styles } from "./styles";
import { CellInspector } from "../../../Inspector/blocks/CellInspector";

interface Props {
  block: Block;
  onChange: (id: string, value: string) => void;
}

export const TableBlock = ({ block, onChange }: Props) => {
  const rows = block.settings?.rows || 3;
  const columns = block.settings?.columns || 3;

  const tableData: CellData[][] =
    block.settings?.tableData ||
    Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => ({ text: "" }))
    );

  const [selectedCell, setSelectedCell] = useState<{
    r: number;
    c: number;
  } | null>(null);
  const inspectorRef = useRef<HTMLDivElement>(null);

  const handleCellChange = (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    const newData = tableData.map((row, r) =>
      row.map((cell, c) =>
        r === rowIndex && c === colIndex ? { ...cell, text: value } : cell
      )
    );

    block.settings = { ...block.settings, tableData: newData };
    onChange(block.id, JSON.stringify(block.settings));
  };

  const handleCellStyleChange = (
    rowIndex: number,
    colIndex: number,
    value: Partial<CellData>
  ) => {
    const newData = [...tableData];

    if (value.width !== undefined) {
      for (let r = 0; r < newData.length; r++) {
        newData[r][colIndex] = { ...newData[r][colIndex], width: value.width };
      }
    } else {
      newData[rowIndex][colIndex] = {
        ...newData[rowIndex][colIndex],
        ...value,
      };
    }

    block.settings = { ...block.settings, tableData: newData };
    onChange(block.id, JSON.stringify(block.settings));
  };

  const cellHeight = block.height && rows > 0 ? block.height / rows : "auto";
  const showInside = block.settings?.showInternalBorders ?? true;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inspectorRef.current &&
        !inspectorRef.current.contains(event.target as Node)
      ) {
        setSelectedCell(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ position: "relative" }}>
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
                  onClick={() => setSelectedCell({ r, c })}
                  style={{
                    ...styles.cell,
                    width: cell.width || "120px",
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
                    fontSize: cell.fontSize || block.styles?.fontSize || "14px",
                    fontWeight:
                      cell.fontWeight || block.styles?.fontWeight || "400",
                    color: cell.color || block.styles?.color || "#000000",
                  }}
                >
                  <ContentEditable
                    html={cell.text}
                    onChange={(e) => handleCellChange(r, c, e.target.value)}
                    style={{
                      ...styles.editable,
                      display: "flex",
                      justifyContent:
                        cell.justifyContent ||
                        block.styles?.justifyContent ||
                        "flex-start",
                      alignItems:
                        cell.alignItems ||
                        block.styles?.alignItems ||
                        "flex-start",
                      textAlign:
                        (cell.justifyContent ||
                          block.styles?.justifyContent) === "center"
                          ? "center"
                          : (cell.justifyContent ||
                              block.styles?.justifyContent) === "flex-end"
                          ? "right"
                          : "left",
                      width: "100%",
                      height: "100%",
                      padding: "4px",
                      boxSizing: "border-box",
                    }}
                  />

                  {selectedCell?.r === r && selectedCell?.c === c && (
                    <CellInspector
                      ref={inspectorRef}
                      cell={cell}
                      onChange={(value) => handleCellStyleChange(r, c, value)}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
