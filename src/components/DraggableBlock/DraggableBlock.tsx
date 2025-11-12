import styles from "./DraggableBlock.module.css";
import type { Block } from "../../types/Block";
import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { TbArrowUp, TbArrowDown, TbTrash } from "react-icons/tb";
import { BlockItem } from "../Block/Block";
import { useBlockResize } from "../../hooks/useBlockResize";

interface Props {
  block: Block;
  onChange: (id: string, value: string) => void;
  registerRef: (el: HTMLDivElement | null) => void;
  setOverlay: React.Dispatch<
    React.SetStateAction<{ x: number; y: number; w: number; h: number } | null>
  >;
  onDelete?: (id: string) => void;
  moveBlockForward?: (id: string) => void;
  moveBlockBackward?: (id: string) => void;
  selectedBlockId?: string | null;
}

export const DraggableBlock = ({
  block,
  onChange,
  registerRef,
  setOverlay,
  onDelete,
  moveBlockForward,
  moveBlockBackward,
  selectedBlockId,
}: Props) => {
  const { listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: block.id,
    data: { isTemplate: false },
  });
  const [hover, setHover] = useState(false);
  const { handleResizeMouseDown } = useBlockResize(block, setOverlay);

  const style: React.CSSProperties = {
    position: "absolute",
    left: block.x,
    top: block.y,
    opacity: isDragging ? 0.6 : 1,
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    zIndex: isDragging ? 1000 : 1,
    width: block.width,
    height: block.height,
  };

  const isSelected = selectedBlockId === block.id;

  return (
    <div
      ref={(el) => {
        setNodeRef(el);
        registerRef(el);
      }}
      style={style}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`${styles.blockWrapper} ${
          isDragging ? styles.dragging : ""
        } ${isSelected ? styles.selected : ""}`}
      >
        <div
          className={styles.dragHandle}
          {...listeners}
          data-handle
          title="Arrastrar"
        >
          ⠿
        </div>

        <div className={styles.contentWrapper}>
          <BlockItem block={block} onChange={onChange} />
        </div>

        <div
          className={styles.resizeHandle}
          onMouseDown={(e) => handleResizeMouseDown(e)}
          title="Redimensionar (Shift = mantener proporción)"
        />

        {hover && (
          <>
            {onDelete && (
              <button
                className={styles.deleteButton}
                onClick={() => onDelete(block.id)}
              >
                <TbTrash size={12} />
              </button>
            )}
            <div className={styles.layerControls}>
              <button
                className={styles.layerButton}
                onClick={() => moveBlockForward?.(block.id)}
                title="Traer al frente"
              >
                <TbArrowUp size={10} />
              </button>
              <button
                className={styles.layerButton}
                onClick={() => moveBlockBackward?.(block.id)}
                title="Enviar atrás"
              >
                <TbArrowDown size={10} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
