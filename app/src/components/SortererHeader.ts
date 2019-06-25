import Button from './Button';

export default function SortererHeader(back: any, up: any, close: any): HTMLDivElement {
  const sortBackButton = Button(back, 'Back');
  const sortUpkButton = Button(up, 'Up');
  const closeButton = Button(close, '✖', 'close-button');

  const sortererHeader = document.createElement('div');
  sortererHeader.className = 'sorterer-header';
  sortererHeader.append(sortBackButton, sortUpkButton, closeButton);
  return sortererHeader;
}
