import type { FC } from "react";
import type { Block } from "../../types/Block";

import { TitleBlock } from "./blocks/Title";
import { ParagraphBlock } from "./blocks/Paragraph";
import { ImageBlock } from "./blocks/Image";
import { ButtonBlock } from "./blocks/Button";
import { DividerBlock } from "./blocks/Divider";
import { LinkBlock } from "./blocks/Link";
import { ContainerBlock } from "./blocks/Container";
import { TableBlock } from "./blocks/Table";

interface Props {
  block: Block;
  onChange: (id: string, value: string) => void;
}

const BLOCK_COMPONENTS: Record<string, FC<Props>> = {
  title: TitleBlock,
  paragraph: ParagraphBlock,
  image: ImageBlock,
  button: ButtonBlock,
  divider: DividerBlock,
  link: LinkBlock,
  container: ContainerBlock,
  table: TableBlock,
};

export const BlockItem = ({ block, onChange }: Props) => {
  const Component = BLOCK_COMPONENTS[block.type];

  if (!Component) return null;

  return <Component block={block} onChange={onChange} />;
};
