import defaultImage from "../../../../assets/default.png";
import type { Block } from "../../../../types/Block";
import { styles } from "./styles";

interface Props {
  block: Block;
}

export const ImageBlock = ({ block }: Props) => {
  return (
    <img
      src={block.src || defaultImage}
      style={{
        ...styles.image,
        ...block.styles,
        width: block.width || 200,
        height: block.height || 120,
      }}
    />
  );
};
