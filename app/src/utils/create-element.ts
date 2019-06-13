export default function create<T extends HTMLElement>(
  name: string,
  attributes?: {},
  ...children: (Node | string)[]
): T {
  const el = document.createElement(name);

  for (const key in attributes) {
    if (attributes.hasOwnProperty(key)) {
      el[key] = attributes[key];
    }
  }
  el.append(...children);
  return el as T;
}
