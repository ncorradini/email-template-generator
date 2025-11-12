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

    if (active.data.current?.isTemplate) {
      const type = active.id as Block["type"];
      const canvasElement = document.querySelector("[data-droppable='canvas']");
      const canvasRect = canvasElement?.getBoundingClientRect();

      const dropX = (event.over?.rect?.left ?? 0) - (canvasRect?.left ?? 0);
      const dropY = (event.over?.rect?.top ?? 0) - (canvasRect?.top ?? 0);

      const newBlock: Block = {
        id: crypto.randomUUID(),
        type,
        x: dropX + delta.x / 2,
        y: dropY + delta.y / 2,
      };
      addBlock(newBlock);
    } else {
      updateBlockPosition(active.id as string, delta.x, delta.y);
    }

    setActiveBlock(null);
  };

  return { handleDragStart, handleDragEnd };
};
