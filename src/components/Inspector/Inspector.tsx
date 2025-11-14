import styles from "./Inspector.module.css";
import type { Block } from "../../types/Block";

interface Props {
  selectedBlock: Block | null;
  onChange: (id: string, field: string, value: string | boolean) => void;
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

  const updateStyle = (field: string, value: string) => {
    onChange(selectedBlock.id, field, value);
  };

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

          <div className={styles.section}>
            <label className={styles.label}>Grosor del texto</label>
            <select
              value={selectedBlock.styles?.fontWeight || "400"}
              onChange={(e) =>
                onChange(selectedBlock.id, "fontWeight", e.target.value)
              }
            >
              <option value="300">Light</option>
              <option value="400">Normal</option>
              <option value="500">Medio</option>
              <option value="600">Semibold</option>
              <option value="700">Bold</option>
              <option value="800">Extra Bold</option>
            </select>
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
            <label className={styles.label}>Mostrar bordes internos</label>
            <input
              type="checkbox"
              checked={selectedBlock.settings?.showInternalBorders || false}
              onChange={(e) =>
                onChange(
                  selectedBlock.id,
                  "showInternalBorders",
                  e.target.checked
                )
              }
            />
          </div>

          {["Top", "Right", "Bottom", "Left"].map((side) => (
            <div className={styles.section} key={side}>
              <label className={styles.label}>Borde {side}</label>
              <div className={styles.borderControls}>
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={parseInt(
                    selectedBlock.styles?.[`border${side}Width`] || "1",
                    10
                  )}
                  onChange={(e) =>
                    updateStyle(`border${side}Width`, e.target.value + "px")
                  }
                />
                <input
                  type="color"
                  value={
                    selectedBlock.styles?.[`border${side}Color`] || "#000000"
                  }
                  onChange={(e) =>
                    updateStyle(`border${side}Color`, e.target.value)
                  }
                />
              </div>
            </div>
          ))}

          <div className={styles.section}>
            <label className={styles.label}>Color del texto</label>
            <input
              type="color"
              value={selectedBlock.styles?.color || "#000000"}
              onChange={(e) => updateStyle("color", e.target.value)}
            />
          </div>

          <div className={styles.section}>
            <label className={styles.label}>Tamaño de fuente</label>
            <input
              type="number"
              min={8}
              max={48}
              value={parseInt(selectedBlock.styles?.fontSize || "14", 10)}
              onChange={(e) => updateStyle("fontSize", e.target.value + "px")}
            />
          </div>

          <div className={styles.section}>
            <label className={styles.label}>Grosor del texto</label>
            <select
              value={selectedBlock.styles?.fontWeight || "400"}
              onChange={(e) => updateStyle("fontWeight", e.target.value)}
            >
              <option value="300">Fino</option>
              <option value="400">Normal</option>
              <option value="500">Medio</option>
              <option value="600">Seminegrita</option>
              <option value="700">Negrita</option>
              <option value="800">Extra negrita</option>
            </select>
          </div>

          <div className={styles.section}>
            <label className={styles.label}>Alineación horizontal</label>
            <select
              value={selectedBlock.styles?.justifyContent || "flex-start"}
              onChange={(e) => updateStyle("justifyContent", e.target.value)}
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
              onChange={(e) => updateStyle("alignItems", e.target.value)}
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
