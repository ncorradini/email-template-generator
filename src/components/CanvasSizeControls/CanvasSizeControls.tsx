/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import styles from "./CanvasSizeControls.module.css";

const PAGE_SIZES = {
  A4: { width: 794, height: 1123 },
  Letter: { width: 816, height: 1056 },
  A5: { width: 559, height: 794 },
  Square: { width: 800, height: 800 },
};

interface Props {
  canvasRef: React.RefObject<any>;
}

export const CanvasSizeControls = ({ canvasRef }: Props) => {
  const [preset, setPreset] = useState("A4");

  const handleChange = (newPreset: string) => {
    setPreset(newPreset);

    const size = PAGE_SIZES[newPreset as keyof typeof PAGE_SIZES];

    if (canvasRef.current && size) {
      canvasRef.current.setPageSize(size);
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>Tamaño:</label>
      <select
        className={styles.select}
        value={preset}
        onChange={(e) => handleChange(e.target.value)}
      >
        {Object.keys(PAGE_SIZES).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
};
