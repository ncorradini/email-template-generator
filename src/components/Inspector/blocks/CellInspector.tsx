/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from "react";
import inspectorStyles from "../Inspector.module.css";

interface Props {
  cell: any;
  onChange: (value: any) => void;
}

export const CellInspector = forwardRef<HTMLDivElement, Props>(
  ({ cell, onChange }, ref) => {
    const update = (field: string, value: any) => onChange({ [field]: value });

    return (
      <div ref={ref} className={inspectorStyles.cellInspector}>
        <div className={inspectorStyles.section}>
          <label className={inspectorStyles.label}>Ancho columna</label>
          <input
            type="number"
            min={40}
            value={cell.width ?? 120}
            onChange={(e) => update("width", Number(e.target.value))}
          />
        </div>

        <div className={inspectorStyles.section}>
          <label className={inspectorStyles.label}>Alineación horizontal</label>
          <select
            value={cell.justifyContent || "flex-start"}
            onChange={(e) => update("justifyContent", e.target.value)}
          >
            <option value="flex-start">Inicio</option>
            <option value="center">Centro</option>
            <option value="flex-end">Fin</option>
          </select>
        </div>

        <div className={inspectorStyles.section}>
          <label className={inspectorStyles.label}>Alineación vertical</label>
          <select
            value={cell.alignItems || "flex-start"}
            onChange={(e) => update("alignItems", e.target.value)}
          >
            <option value="flex-start">Arriba</option>
            <option value="center">Centro</option>
            <option value="flex-end">Abajo</option>
          </select>
        </div>

        <div className={inspectorStyles.section}>
          <label className={inspectorStyles.label}>Color de texto</label>
          <input
            type="color"
            value={cell.color || "#000000"}
            onChange={(e) => update("color", e.target.value)}
          />
        </div>

        <div className={inspectorStyles.section}>
          <label className={inspectorStyles.label}>Tamaño de fuente</label>
          <input
            type="number"
            min={8}
            max={48}
            value={parseInt(cell.fontSize || "14")}
            onChange={(e) => update("fontSize", e.target.value + "px")}
          />
        </div>

        <div className={inspectorStyles.section}>
          <label className={inspectorStyles.label}>Grosor del texto</label>
          <select
            value={cell.fontWeight || "400"}
            onChange={(e) => update("fontWeight", e.target.value)}
          >
            <option value="300">Fino</option>
            <option value="400">Normal</option>
            <option value="500">Medio</option>
            <option value="600">Seminegrita</option>
            <option value="700">Negrita</option>
            <option value="800">Extra negrita</option>
          </select>
        </div>
      </div>
    );
  }
);
