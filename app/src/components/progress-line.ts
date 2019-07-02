import createCloseBtn from './close-button';

export default class ProgressLine {
  private color: string;
  private percentage: number;
  private progressBar: HTMLDivElement;
  private progressText: HTMLSpanElement;

  public constructor(columnsContainer: HTMLElement, color: string) {
    this.color = color;
    this.percentage = 0;

    this.progressText = document.createElement('span');
    this.progressText.className = 'progressText';
    this.progressText.textContent = '0';

    this.progressBar = document.createElement('div');
    this.progressBar.className = 'progressBar';

    this.progressBar.append(
      this.progressText,
      createCloseBtn('close-button second'),
    );
    columnsContainer.append(this.progressBar);
  }

  private advanceProgress(value: number): void {
    this.progressBar.style.background =
      `linear-gradient(90deg, ${this.color} ${value}%, var(--white) ${value}%)`;
  }

  public updateProgressLine(total: number, current: number): void {
    this.progressText.textContent = `${current}`;

    if (current === total) {
      this.percentage = current ? 100 : 0;
    } else {
      this.percentage = (100 * current) / total;
    }

    this.advanceProgress(this.percentage);
  }
}
