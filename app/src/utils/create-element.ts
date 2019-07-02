import { HTMLElements } from './types';

export default function create<T extends keyof HTMLElements>(
  name: T,
  attributes?: {},
  ...children: (Node | string)[]
): HTMLElements[T] {
  const el = document.createElement(name);

  for (const key in attributes) {
    if (attributes.hasOwnProperty(key)) {
      el[key] = attributes[key];
    }
  }
  el.append(...children);
  return el;
}
