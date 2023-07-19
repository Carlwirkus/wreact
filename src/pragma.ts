type Tag = string | ((props: any, children: any[]) => JSX.Element);
type Props = Record<string, any> | null;
type Children = (Node | string)[];

export const h = (tag: Tag, props: Props, ...children: Children) => {
  // If the tag is a function component, pass props and children inside it
  if (typeof tag === "function") {
    return tag({ ...props }, children);
  }

  // Create the element and add attributes to it
  const el = document.createElement(tag);
  if (props) {
    Object.entries(props).forEach(([key, val]) => {
      if (key === "className") {
        el.classList.add(...((val as string) || "").trim().split(" "));
        return;
      }

      if (key === "onClick") {
        el.addEventListener("click", val);
      }

      if (key === "ref") {
        val.current = el;
        return;
      }

      if (key === "style") {
        Object.entries(val).forEach(([key, val]) => {
          // @ts-ignore
          el.style[key] = val;
        });
        return;
      }

      el.setAttribute(key, val);
    });
  }

  // Append all children to the element
  children.forEach((child) => {
    if (typeof child === "string" || typeof child === "number") {
      const textNode = document.createTextNode(child);
      el.appendChild(textNode);
      return;
    }

    if (Array.isArray(child)) {
      child.forEach((c) => {
        el.appendChild(c);
      });
      return;
    }

    if (child === null) return;

    el.appendChild(child);
  });

  return el;
};

export const Fragment = () => {
  return null;
};
