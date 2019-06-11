export default function create(
  name: string,
  attributes: {},
  children: Node[],
): HTMLElement {
  const elem = document.createElement(name);
  for (const key in attributes) {
    if (attributes.hasOwnProperty(key)) {
      elem[key] = attributes[key];
    }
  }

  children.forEach(
    (value): void => {
      elem.appendChild(value);
    },
  );

  return elem;
}
