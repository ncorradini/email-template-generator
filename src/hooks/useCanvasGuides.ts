import { useState } from "react";
import { useDndMonitor } from "@dnd-kit/core";
import type { Block } from "../types/Block";

export const useCanvasGuides = (
  blocks: Block[],
  blockRefs: React.RefObject<Record<string, HTMLDivElement | null>>,
  canvasRef: React.RefObject<HTMLDivElement | null>
) => {
  const [guides, setGuides] = useState<{
    vertical?: number;
    horizontal?: number;
  }>({});

  useDndMonitor({
    onDragMove(event) {
      const { active, delta } = event;

      if (!active || active.data.current?.isTemplate) return;

      const movingBlock = blocks.find((b) => b.id === active.id);

      if (!movingBlock || !canvasRef.current) return;

      const canvasRect = canvasRef.current.getBoundingClientRect();
      const blockNode = blockRefs.current[movingBlock.id];

      if (!blockNode) return;

      const rect = blockNode.getBoundingClientRect();
      const moveX = movingBlock.x + delta.x;
      const moveY = movingBlock.y + delta.y;

      const movingEdges = {
        left: moveX,
        centerX: moveX + rect.width / 2,
        right: moveX + rect.width,
        top: moveY,
        centerY: moveY + rect.height / 2,
        bottom: moveY + rect.height,
      };

      const snapThreshold = 6;

      let guideV: number | undefined;
      let guideH: number | undefined;

      const canvasCenterX = canvasRect.width / 2;
      const canvasCenterY = canvasRect.height / 2;

      for (const edge of ["left", "centerX", "right"] as const) {
        if (Math.abs(movingEdges[edge] - canvasCenterX) < snapThreshold)
          guideV = canvasCenterX;
      }

      for (const edge of ["top", "centerY", "bottom"] as const) {
        if (Math.abs(movingEdges[edge] - canvasCenterY) < snapThreshold)
          guideH = canvasCenterY;
      }

      for (const other of blocks) {
        if (other.id === movingBlock.id) continue;

        const otherNode = blockRefs.current[other.id];

        if (!otherNode) continue;

        const otherRect = otherNode.getBoundingClientRect();
        const otherEdges = {
          left: other.x,
          centerX: other.x + otherRect.width / 2,
          right: other.x + otherRect.width,
          top: other.y,
          centerY: other.y + otherRect.height / 2,
          bottom: other.y + otherRect.height,
        };

        for (const edge of ["left", "centerX", "right"] as const) {
          if (Math.abs(movingEdges[edge] - otherEdges[edge]) < snapThreshold)
            guideV = otherEdges[edge];
        }
        for (const edge of ["top", "centerY", "bottom"] as const) {
          if (Math.abs(movingEdges[edge] - otherEdges[edge]) < snapThreshold)
            guideH = otherEdges[edge];
        }
      }

      setGuides({ vertical: guideV, horizontal: guideH });
    },
    onDragEnd() {
      setGuides({});
    },
    onDragCancel() {
      setGuides({});
    },
  });

  return guides;
};
