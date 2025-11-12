import { useCallback } from "react";
import type { Block } from "../types/Block";

export const useBlockResize = (
  block: Block,
  setOverlay: React.Dispatch<
    React.SetStateAction<{ x: number; y: number; w: number; h: number } | null>
  >
) => {
  const handleResizeMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      e.preventDefault();

      const startX = e.clientX;
      const startY = e.clientY;
      const startWidth = block.width || 200;
      const startHeight = block.height || 60;
      const aspect = startWidth / startHeight;

      setOverlay({ x: block.x, y: block.y, w: startWidth, h: startHeight });

      const onMove = (moveEvent: MouseEvent) => {
        let newWidth = startWidth + (moveEvent.clientX - startX);
        let newHeight = startHeight + (moveEvent.clientY - startY);

        if (moveEvent.shiftKey) {
          if (
            Math.abs(moveEvent.clientX - startX) >
            Math.abs(moveEvent.clientY - startY)
          ) {
            newHeight = newWidth / aspect;
          } else {
            newWidth = newHeight * aspect;
          }
        }

        block.width = Math.max(50, newWidth);
        block.height = Math.max(20, newHeight);

        setOverlay({ x: block.x, y: block.y, w: newWidth, h: newHeight });
      };

      const onUp = () => {
        setOverlay(null);
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      };

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    },
    [block, setOverlay]
  );

  return { handleResizeMouseDown };
};
