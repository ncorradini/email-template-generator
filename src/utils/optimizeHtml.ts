export const optimizeHTML = (html: string): string => {
  const template = document.createElement("div");
  template.innerHTML = html;

  const styleMap = new Map<string, string>();
  let classCounter = 0;

  const elements = template.querySelectorAll("[style]");

  elements.forEach((el) => {
    const style = el.getAttribute("style")!.trim();

    if (!style) {
      el.removeAttribute("style");
      return;
    }

    if (styleMap.has(style)) {
      const existingClass = styleMap.get(style)!;
      el.removeAttribute("style");
      el.classList.add(existingClass);
      return;
    }

    const className = `c${++classCounter}`;
    styleMap.set(style, className);

    el.classList.add(className);
    el.removeAttribute("style");
  });

  let css = "";
  for (const [style, className] of styleMap.entries()) {
    css += `.${className}{${style}}\n`;
  }

  const finalHTML = `<style>${css}</style>\n${template.innerHTML}`;

  return finalHTML
    .replace(/\n+/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/> </g, "><")
    .trim();
};
