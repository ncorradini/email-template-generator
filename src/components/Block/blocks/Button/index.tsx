import type { Block } from "../../../../types/Block";
import { styles } from "./styles";

interface Props {
  block: Block;
}

export const ButtonBlock = ({ block }: Props) => {
  return (
    <button style={{ ...styles.button, ...block.styles }}>
      {block.content || "Llamada a la acción"}
    </button>
  );
};
