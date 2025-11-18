import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import type { Block } from "../types/Block";

export const useDragHandlers = (
  blocks: Block[],
  addBlock: (b: Block) => void,
  updateBlockPosition: (id: string, dx: number, dy: number) => void,
  setActiveBlock: React.Dispatch<React.SetStateAction<Block | null>>
) => {
  const handleDragStart = (event: DragStartEvent) => {
    const isTemplate = event.active.data.current?.isTemplate;
    if (isTemplate) {
      setActiveBlock({
        id: "preview",
        type: event.active.id as Block["type"],
        x: 0,
        y: 0,
      });
    } else {
      const found = blocks.find((b) => b.id === event.active.id);
      if (found) setActiveBlock(found);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over, delta } = event;
    if (!over) return;

    const canvas = document.querySelector(
      "[data-droppable='canvas']"
    ) as HTMLElement;
    if (!canvas) return;

    const canvasRect = canvas.getBoundingClientRect();

    const initialRect = event.active.rect.current.initial;
    if (!initialRect) return;

    const finalX = initialRect.left + delta.x;
    const finalY = initialRect.top + delta.y;

    const x = finalX - canvasRect.left;
    const y = finalY;

    const isTemplate = active.data.current?.isTemplate;

    if (isTemplate) {
      const type = active.id as Block["type"];

      addBlock({
        id: crypto.randomUUID(),
        type,
        x,
        y,
      });
    } else {
      updateBlockPosition(active.id as string, delta.x, delta.y);
    }

    setActiveBlock(null);
  };

  return { handleDragStart, handleDragEnd };
};
