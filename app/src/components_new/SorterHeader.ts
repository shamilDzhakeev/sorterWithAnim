import Button from './Button';

export default function SorterHeader(back: any, up: any, close: any): HTMLDivElement {
  const sortBackButton = Button(back, 'Back');
  const sortUpkButton = Button(up, 'Up');
  const closeButton = Button(close, '✖', 'close-button');

  const sorterHeader = document.createElement('div');
  sorterHeader.className = 'sorter-header';
  sorterHeader.append(sortBackButton, sortUpkButton, closeButton);
  return sorterHeader;
}
