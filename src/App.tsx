import styles from "./App.module.css";
import type { Block } from "./types/Block";
import { useEffect, useRef, useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Canvas, type CanvasRef } from "./components/Canvas/Canvas";
import { Inspector } from "./components/Inspector/Inspector";
import { useBlocksManager } from "./hooks/useBlocksManager";
import { useDragHandlers } from "./hooks/useDragHandlers";
import { useExportHTML } from "./hooks/useExportHtml";

const App = () => {
  const canvasRef = useRef<CanvasRef>(null);
  const [activeBlock, setActiveBlock] = useState<Block | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);

  const {
    blocks,
    addBlock,
    updateBlockContent,
    deleteBlock,
    updateBlockPosition,
    moveBlockForward,
    moveBlockBackward,
    updateBlockStyle,
  } = useBlocksManager();

  const { handleDragStart, handleDragEnd } = useDragHandlers(
    blocks,
    addBlock,
    updateBlockPosition,
    setActiveBlock
  );

  const { exportHTML } = useExportHTML(canvasRef);

  const handleSelectBlock = (block: Block | null) => setSelectedBlock(block);
  const handleStyleChange = (id: string, field: string, value: string) =>
    updateBlockStyle(id, field, value);

  useEffect(() => {
    if (selectedBlock) {
      const updated = blocks.find((b) => b.id === selectedBlock.id);
      setSelectedBlock(updated || null);
    }
  }, [blocks]);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className={styles.app}>
        <Sidebar />
        <div className={styles.main}>
          <header className={styles.header}>
            <button onClick={exportHTML} className={styles.exportBtn}>
              Exportar HTML
            </button>
          </header>

          <div className={styles.canvasContainer}>
            <Canvas
              ref={canvasRef}
              blocks={blocks}
              onChange={updateBlockContent}
              onDeleteBlock={deleteBlock}
              moveBlockForward={moveBlockForward}
              moveBlockBackward={moveBlockBackward}
              onSelectBlock={handleSelectBlock}
              selectedBlock={selectedBlock}
            />
          </div>

          <div className={styles.inspectorContainer}>
            <Inspector
              selectedBlock={selectedBlock}
              onChange={handleStyleChange}
            />
          </div>
        </div>
      </div>

      <DragOverlay>
        {activeBlock && (
          <div
            style={{
              border: "2px dashed var(--color-primary)",
              background: "rgba(0,123,255,0.05)",
              borderRadius: "6px",
              width: "100%",
              height: "100%",
            }}
          />
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default App;
