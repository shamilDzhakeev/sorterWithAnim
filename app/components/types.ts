export interface HeaderOptions {
  onDownButtonClick: () => void;
  onUpButtonClick: () => void;
  destenationNode: HTMLElement;
}

export interface RendererOptions {
  valuesArr: number[];
  blockToDraw: HTMLElement;
}
