/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "../Inspector.module.css";
import type { Block } from "../../../types/Block";

interface Props {
  block: Block;
  onChange: (id: string, field: string, value: any) => void;
}

export const ImageSettings = ({ block, onChange }: Props) => {
  return (
    <div className={styles.section}>
      <label className={styles.label}>URL de imagen</label>
      <input
        type="text"
        value={block.src || ""}
        placeholder="https://..."
        onChange={(e) => onChange(block.id, "src", e.target.value)}
      />
    </div>
  );
};
