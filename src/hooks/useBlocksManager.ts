import { useState } from "react";
import type { Block } from "../types/Block";

export const useBlocksManager = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);

  const addBlock = (block: Block) => {
    setBlocks((prev) => [...prev, block]);
  };

  const updateBlockPosition = (id: string, dx: number, dy: number) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, x: b.x + dx, y: b.y + dy } : b))
    );
  };

  const updateBlockContent = (id: string, value: string) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, content: value } : b))
    );
  };

  const updateBlockStyle = (id: string, field: string, value: string) => {
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              styles: { ...b.styles, [field]: value },
              ...(field === "src" ? { src: value } : {}),
            }
          : b
      )
    );
  };

  const deleteBlock = (id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  const moveBlockForward = (id: string) => {
    setBlocks((prev) => {
      const index = prev.findIndex((b) => b.id === id);
      if (index === -1 || index === prev.length - 1) return prev;

      const newBlocks = [...prev];
      const [item] = newBlocks.splice(index, 1);
      newBlocks.splice(index + 1, 0, item);
      return newBlocks;
    });
  };

  const moveBlockBackward = (id: string) => {
    setBlocks((prev) => {
      const index = prev.findIndex((b) => b.id === id);
      if (index <= 0) return prev;

      const newBlocks = [...prev];
      const [item] = newBlocks.splice(index, 1);
      newBlocks.splice(index - 1, 0, item);
      return newBlocks;
    });
  };

  return {
    blocks,
    setBlocks,
    addBlock,
    updateBlockPosition,
    updateBlockContent,
    deleteBlock,
    moveBlockForward,
    moveBlockBackward,
    updateBlockStyle,
  };
};
