import type { Block } from "../../../../types/Block";
import { styles } from "./styles";

interface Props {
  block: Block;
}

export const ContainerBlock = ({ block }: Props) => {
  return <div style={{ ...styles.container, ...block.styles }} />;
};
