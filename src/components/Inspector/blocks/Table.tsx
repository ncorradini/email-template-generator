/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "../Inspector.module.css";
import type { Block } from "../../../types/Block";

interface Props {
  block: Block;
  onChange: (id: string, field: string, value: any) => void;
}

export const TableSettings = ({ block, onChange }: Props) => {
  const update = (field: string, value: any) =>
    onChange(block.id, field, value);

  return (
    <>
      <div className={styles.section}>
        <label className={styles.label}>Filas</label>
        <input
          type="number"
          min={1}
          max={20}
          value={block.settings?.rows || 3}
          onChange={(e) => update("rows", e.target.value)}
        />
      </div>

      <div className={styles.section}>
        <label className={styles.label}>Columnas</label>
        <input
          type="number"
          min={1}
          max={10}
          value={block.settings?.columns || 3}
          onChange={(e) => update("columns", e.target.value)}
        />
      </div>

      <div className={styles.section}>
        <label className={styles.label}>Mostrar bordes internos</label>
        <input
          type="checkbox"
          checked={block.settings?.showInternalBorders ?? true}
          onChange={(e) => update("showInternalBorders", e.target.checked)}
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
              value={parseInt(block.styles?.[`border${side}Width`] || "1")}
              onChange={(e) =>
                update(`border${side}Width`, e.target.value + "px")
              }
            />
            <input
              type="color"
              value={block.styles?.[`border${side}Color`] || "#000000"}
              onChange={(e) => update(`border${side}Color`, e.target.value)}
            />
          </div>
        </div>
      ))}

      <div className={styles.section}>
        <label className={styles.label}>Color del texto</label>
        <input
          type="color"
          value={block.styles?.color || "#000000"}
          onChange={(e) => update("color", e.target.value)}
        />
      </div>

      <div className={styles.section}>
        <label className={styles.label}>Tamaño de fuente</label>
        <input
          type="number"
          min={8}
          max={48}
          value={parseInt(block.styles?.fontSize || "14")}
          onChange={(e) => update("fontSize", e.target.value + "px")}
        />
      </div>

      <div className={styles.section}>
        <label className={styles.label}>Grosor del texto</label>
        <select
          value={block.styles?.fontWeight || "400"}
          onChange={(e) => update("fontWeight", e.target.value)}
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
          value={block.styles?.justifyContent || "flex-start"}
          onChange={(e) => update("justifyContent", e.target.value)}
        >
          <option value="flex-start">Inicio</option>
          <option value="center">Centro</option>
          <option value="flex-end">Fin</option>
        </select>
      </div>

      <div className={styles.section}>
        <label className={styles.label}>Alineación vertical</label>
        <select
          value={block.styles?.alignItems || "flex-start"}
          onChange={(e) => update("alignItems", e.target.value)}
        >
          <option value="flex-start">Inicio</option>
          <option value="center">Centro</option>
          <option value="flex-end">Fin</option>
        </select>
      </div>
    </>
  );
};
