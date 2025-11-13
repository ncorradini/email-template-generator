export const applyInlineStyles = (element: HTMLElement) => {
  const computed = window.getComputedStyle(element);
  const style: Record<string, string> = {};

  for (const prop of computed) {
    const value = computed.getPropertyValue(prop);
    if (
      value &&
      !prop.startsWith("transition") &&
      !prop.startsWith("animation") &&
      !prop.startsWith("cursor") &&
      !prop.startsWith("user-select")
    ) {
      style[prop] = value;
    }
  }

  Object.assign(element.style, style);
  Array.from(element.children).forEach((child) =>
    applyInlineStyles(child as HTMLElement)
  );
};