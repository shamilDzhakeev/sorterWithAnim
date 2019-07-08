import { CloseButton } from './Buttons';

export default class ProgressLine {
  private progressBar: HTMLDivElement;
  private progressText: HTMLSpanElement;
  private percentage: number;
  private color: string;

  public constructor(renderNode: HTMLElement, color: string) {
    this.percentage = 0;
    this.color = color;
    this.progressText = document.createElement('span');
    this.progressText.className = 'progressText';
    this.progressText.textContent = '0';

    this.progressBar = document.createElement('div');
    this.progressBar.className = 'progressBar';

    this.progressBar.append(
      this.progressText,
      CloseButton((): void => {
        this.progressBar.remove();
      }),
    );
    renderNode.append(this.progressBar);
  }

  private advanceProgress(value: number): void {
    this.progressBar.style.background = `linear-gradient(90deg, ${this.color} ${value}%, var(--white) ${value}%)`;
  }

  public updateProgressLine(totalCount: number, currCount: number): void {
    this.progressText.textContent = `${currCount}`;
    if (currCount === totalCount) {
      this.percentage = currCount ? 100 : 0;
    } else {
      this.percentage = (100 * currCount) / totalCount;
    }
    this.advanceProgress(this.percentage);
  }
}
