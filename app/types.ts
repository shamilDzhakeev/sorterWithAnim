export interface HeaderOptions {
  onAddButtonClick: () => void;
  onDownButtonClick: () => void;
  onUpButtonClick: () => void;
  destenationNode: HTMLElement;
}

export interface RendererOptions {
  valuesArr: number[];
  blockToDraw: HTMLElement;
  onclickEvent: () => void;
}
