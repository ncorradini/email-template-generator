import styles from "./Inspector.module.css";
import type { Block } from "../../types/Block";

interface Props {
  selectedBlock: Block | null;
  onChange: (id: string, field: string, value: string) => void;
}

export const Inspector = ({ selectedBlock, onChange }: Props) => {
  if (!selectedBlock) {
    return (
      <aside className={styles.inspector}>
        <h3 className={styles.title}>Propiedades</h3>
        <p className={styles.empty}>Selecciona un bloque para editar.</p>
      </aside>
    );
  }

  return (
    <aside className={styles.inspector}>
      <h3 className={styles.title}>Propiedades</h3>

      <div className={styles.section}>
        <div className={styles.label}>Tipo:</div>
        <div className={styles.value}>{selectedBlock.type}</div>
      </div>

      {["title", "paragraph"].includes(selectedBlock.type) && (
        <>
          <div className={styles.section}>
            <label className={styles.label}>Color</label>
            <input
              type="color"
              value={selectedBlock.styles?.color || "#000000"}
              onChange={(e) =>
                onChange(selectedBlock.id, "color", e.target.value)
              }
            />
          </div>

          <div className={styles.section}>
            <label className={styles.label}>Tamaño de fuente</label>
            <input
              type="number"
              min={8}
              max={80}
              value={parseInt(selectedBlock.styles?.fontSize || "16", 10) || 16}
              onChange={(e) =>
                onChange(selectedBlock.id, "fontSize", e.target.value + "px")
              }
            />
          </div>
        </>
      )}

      {selectedBlock.type === "image" && (
        <div className={styles.section}>
          <label className={styles.label}>URL de imagen</label>
          <input
            type="text"
            value={selectedBlock.src || ""}
            onChange={(e) => onChange(selectedBlock.id, "src", e.target.value)}
            placeholder="https://..."
          />
        </div>
      )}

      {selectedBlock.type === "container" && (
        <div className={styles.section}>
          <label className={styles.label}>Color de fondo</label>
          <input
            type="color"
            value={selectedBlock.styles?.backgroundColor || "#f7f8fa"}
            onChange={(e) =>
              onChange(selectedBlock.id, "backgroundColor", e.target.value)
            }
          />
        </div>
      )}

      {selectedBlock.type === "table" && (
        <>
          <div className={styles.section}>
            <label className={styles.label}>Filas</label>
            <input
              type="number"
              min={1}
              max={20}
              value={selectedBlock.settings?.rows || 3}
              onChange={(e) =>
                onChange(selectedBlock.id, "rows", e.target.value)
              }
            />
          </div>

          <div className={styles.section}>
            <label className={styles.label}>Columnas</label>
            <input
              type="number"
              min={1}
              max={10}
              value={selectedBlock.settings?.columns || 3}
              onChange={(e) =>
                onChange(selectedBlock.id, "columns", e.target.value)
              }
            />
          </div>

          <div className={styles.section}>
            <label className={styles.label}>Borde</label>
            <div className={styles.borderControls}>
              <input
                type="number"
                min={0}
                max={10}
                value={
                  parseInt(selectedBlock.styles?.borderWidth || "1", 10) || 1
                }
                onChange={(e) =>
                  onChange(
                    selectedBlock.id,
                    "borderWidth",
                    e.target.value + "px"
                  )
                }
              />
              <input
                type="color"
                value={selectedBlock.styles?.borderColor || "#cccccc"}
                onChange={(e) =>
                  onChange(selectedBlock.id, "borderColor", e.target.value)
                }
              />
            </div>
          </div>

          <div className={styles.section}>
            <label className={styles.label}>Tamaño de fuente</label>
            <input
              type="number"
              min={8}
              max={48}
              value={parseInt(selectedBlock.styles?.fontSize || "14", 10) || 14}
              onChange={(e) =>
                onChange(selectedBlock.id, "fontSize", e.target.value + "px")
              }
            />
          </div>

          <div className={styles.section}>
            <label className={styles.label}>Alineación horizontal</label>
            <select
              value={selectedBlock.styles?.justifyContent || "flex-start"}
              onChange={(e) =>
                onChange(selectedBlock.id, "justifyContent", e.target.value)
              }
            >
              <option value="flex-start">Inicio</option>
              <option value="center">Centro</option>
              <option value="flex-end">Fin</option>
            </select>
          </div>

          <div className={styles.section}>
            <label className={styles.label}>Alineación vertical</label>
            <select
              value={selectedBlock.styles?.alignItems || "flex-start"}
              onChange={(e) =>
                onChange(selectedBlock.id, "alignItems", e.target.value)
              }
            >
              <option value="flex-start">Inicio</option>
              <option value="center">Centro</option>
              <option value="flex-end">Fin</option>
            </select>
          </div>
        </>
      )}
    </aside>
  );
};
