import { useDraggable } from "@dnd-kit/core";
import {
  TbTypography,
  TbTextCaption,
  TbPhoto,
  TbBrandMailgun,
  TbRectangle,
  TbLink,
  TbSeparator,
  TbLayoutGridAdd,
} from "react-icons/tb";
import styles from "./Sidebar.module.css";

type SidebarItemProps = {
  id: string;
  label: string;
  Icon: React.ElementType;
};

const SidebarItem = ({ id, label, Icon }: SidebarItemProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data: { isTemplate: true },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`${styles.item} ${isDragging ? styles.dragging : ""}`}
    >
      <Icon className={styles.icon} />
      <span>{label}</span>
    </div>
  );
};

export const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <h3 className={styles.title}>Email Template Generator</h3>

      <div className={styles.sectionTitle}>Elementos</div>
      <SidebarItem id="title" label="Título" Icon={TbTypography} />
      <SidebarItem id="paragraph" label="Párrafo" Icon={TbTextCaption} />
      <SidebarItem id="image" label="Imagen" Icon={TbPhoto} />
      <SidebarItem id="button" label="Botón" Icon={TbBrandMailgun} />
      <SidebarItem id="divider" label="Separador" Icon={TbSeparator} />
      <SidebarItem id="link" label="Enlace" Icon={TbLink} />

      <div className={styles.sectionTitle}>Layout</div>
      <SidebarItem id="container" label="Contenedor" Icon={TbRectangle} />
      <SidebarItem id="grid" label="Columna / Grid" Icon={TbLayoutGridAdd} />
    </aside>
  );
};
