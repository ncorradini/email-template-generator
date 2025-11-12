import type { CanvasRef } from "../components/Canvas/Canvas";

export const useExportHTML = (canvasRef: React.RefObject<CanvasRef | null>) => {
  const exportHTML = () => {
    const html = canvasRef.current?.getCleanHTML() || "";
    const blob = new Blob([html], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "template.html";
    a.click();
  };

  return { exportHTML };
};
