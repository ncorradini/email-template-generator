/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./Inspector.module.css";
import type { Block } from "../../types/Block";
import { TextSettings } from "./blocks/Texts";
import { ImageSettings } from "./blocks/Image";
import { ContainerSettings } from "./blocks/Container";
import { TableSettings } from "./blocks/Table";

interface Props {
  selectedBlock: Block | null;
  onChange: (id: string, field: string, value: any) => void;
}

const INSPECTOR_MAP: Record<string, any> = {
  title: TextSettings,
  paragraph: TextSettings,
  image: ImageSettings,
  container: ContainerSettings,
  table: TableSettings,
};

export const Inspector = ({ selectedBlock, onChange }: Props) => {
  if (!selectedBlock) {
    return (
      <aside className={styles.inspector}>
        <h3 className={styles.title}>Propiedades</h3>
        <p className={styles.empty}>Selecciona un bloque para editar.</p>
      </aside>
    );
  }

  const Component = INSPECTOR_MAP[selectedBlock.type];

  return (
    <aside className={styles.inspector}>
      <h3 className={styles.title}>Propiedades</h3>

      <div className={styles.section}>
        <div className={styles.label}>Tipo:</div>
        <div className={styles.value}>{selectedBlock.type}</div>
      </div>

      {Component && <Component block={selectedBlock} onChange={onChange} />}
    </aside>
  );
};
