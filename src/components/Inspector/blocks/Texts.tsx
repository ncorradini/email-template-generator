/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "../Inspector.module.css";
import type { Block } from "../../../types/Block";

interface Props {
  block: Block;
  onChange: (id: string, field: string, value: any) => void;
}

export const TextSettings = ({ block, onChange }: Props) => {
  const update = (field: string, value: any) =>
    onChange(block.id, field, value);

  return (
    <>
      <div className={styles.section}>
        <label className={styles.label}>Color</label>
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
          max={80}
          value={parseInt(block.styles?.fontSize || "16")}
          onChange={(e) => update("fontSize", e.target.value + "px")}
        />
      </div>

      <div className={styles.section}>
        <label className={styles.label}>Grosor del texto</label>
        <select
          value={block.styles?.fontWeight || "400"}
          onChange={(e) => update("fontWeight", e.target.value)}
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
  );
};
