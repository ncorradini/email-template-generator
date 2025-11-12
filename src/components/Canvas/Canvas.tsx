import styles from "./Canvas.module.css";
import type { Block } from "../../types/Block";
import {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { useDroppable } from "@dnd-kit/core";
import { useCanvasGuides } from "../../hooks/useCanvasGuides";
import { DraggableBlock } from "../DraggableBlock/DraggableBlock";

function applyInlineStylesRecursively(element: HTMLElement) {
  const computed = window.getComputedStyle(element);
  const style: Record<string, string> = {};

  for (const prop of computed) {
    const value = computed.getPropertyValue(prop);
    if (
      value &&
      !prop.startsWith("transition") &&
      !prop.startsWith("animation") &&
      !prop.startsWith("cursor") &&
      !prop.startsWith("user-select")
    ) {
      style[prop] = value;
    }
  }

  Object.assign(element.style, style);

  Array.from(element.children).forEach((child) =>
    applyInlineStylesRecursively(child as HTMLElement)
  );
}

export interface CanvasRef {
  getCleanHTML: () => string;
}

interface CanvasProps {
  blocks: Block[];
  selectedBlock: Block | null;
  onChange: (id: string, value: string) => void;
  onDeleteBlock?: (id: string) => void;
  moveBlockForward?: (id: string) => void;
  moveBlockBackward?: (id: string) => void;
  onSelectBlock?: (block: Block | null) => void;
}

export const Canvas = forwardRef<CanvasRef, CanvasProps>(
  (
    {
      blocks,
      onChange,
      onDeleteBlock,
      moveBlockForward,
      moveBlockBackward,
      onSelectBlock,
      selectedBlock,
    },
    ref
  ) => {
    const { setNodeRef } = useDroppable({ id: "canvas" });
    const canvasRef = useRef<HTMLDivElement>(null);
    const blockRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const guides = useCanvasGuides(blocks, blockRefs, canvasRef);
    const [resizeOverlay, setResizeOverlay] = useState<{
      x: number;
      y: number;
      w: number;
      h: number;
    } | null>(null);

    const handleCanvasClick = (e: React.MouseEvent) => {
      if (e.target === canvasRef.current) {
        onSelectBlock?.(null);
      }
    };

    useImperativeHandle(ref, () => ({
      getCleanHTML: () => {
        if (!canvasRef.current) return "";

        const clone = canvasRef.current.cloneNode(true) as HTMLElement;

        clone.querySelectorAll("[data-handle]").forEach((el) => el.remove());
        clone
          .querySelectorAll("[contenteditable]")
          .forEach((el) => el.removeAttribute("contenteditable"));
        clone
          .querySelectorAll("[draggable]")
          .forEach((el) => el.removeAttribute("draggable"));

        applyInlineStylesRecursively(clone);

        return clone.innerHTML;
      },
    }));

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onSelectBlock?.(null);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
      <div
        ref={setNodeRef}
        className={styles.canvas}
        data-droppable="canvas"
        onClick={handleCanvasClick}
      >
        <div ref={canvasRef} className={styles.canvasInner}>
          {blocks.map((block) => (
            <div
              key={block.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectBlock?.(block);
              }}
            >
              <DraggableBlock
                block={block}
                onChange={onChange}
                registerRef={(el) => (blockRefs.current[block.id] = el)}
                setOverlay={setResizeOverlay}
                onDelete={onDeleteBlock}
                moveBlockForward={moveBlockForward}
                moveBlockBackward={moveBlockBackward}
                selectedBlockId={selectedBlock?.id}
              />
            </div>
          ))}

          {guides.vertical !== undefined && (
            <div
              className={styles.guideVertical}
              style={{ left: guides.vertical }}
            />
          )}
          {guides.horizontal !== undefined && (
            <div
              className={styles.guideHorizontal}
              style={{ top: guides.horizontal }}
            />
          )}

          {resizeOverlay && (
            <div
              className={styles.resizeOverlay}
              style={{
                left: resizeOverlay.x,
                top: resizeOverlay.y,
                width: resizeOverlay.w,
                height: resizeOverlay.h,
              }}
            >
              <span className={styles.overlayLabel}>
                {Math.round(resizeOverlay.w)} × {Math.round(resizeOverlay.h)}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
);
