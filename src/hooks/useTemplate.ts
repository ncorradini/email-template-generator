import type { Block } from "../types/Block";

export const useTemplate = (
  blocks: Block[],
  setBlocks: (blocks: Block[]) => void
) => {
  const exportTemplate = () => {
    const dataStr = JSON.stringify(blocks, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "template.json";
    a.click();
  };

  const importTemplate = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        if (Array.isArray(json)) {
          setBlocks(json);
        } else {
          alert("El archivo no contiene un formato válido de plantilla.");
        }
      } catch (error) {
        console.log(error);
      }
    };
    reader.readAsText(file);
  };

  const handleImportClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) importTemplate(file);
    };
    input.click();
  };

  return { exportTemplate, importTemplate, handleImportClick };
};
