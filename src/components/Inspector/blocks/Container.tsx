/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "../Inspector.module.css";
import type { Block } from "../../../types/Block";

interface Props {
  block: Block;
  onChange: (id: string, field: string, value: any) => void;
}

export const ContainerSettings = ({ block, onChange }: Props) => {
  return (
    <div className={styles.section}>
      <label className={styles.label}>Color de fondo</label>
      <input
        type="color"
        value={block.styles?.backgroundColor || "#f7f8fa"}
        onChange={(e) => onChange(block.id, "backgroundColor", e.target.value)}
      />
    </div>
  );
};
