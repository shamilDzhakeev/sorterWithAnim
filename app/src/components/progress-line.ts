import create from '../utils/create-element';
import createCloseBtn from './close-button';
export default class ProgressLine {
  private progressBar: HTMLDivElement;
  private progressText: HTMLSpanElement;
  private percentage: number;

  public constructor(columnsContainer: HTMLElement) {
    this.percentage = 0;

    this.progressText = create('span', {
      className: 'progressText',
      textContent: `0`,
    });
    this.progressBar = create(
      'div',
      { className: 'progressBar' },
      this.progressText,
      createCloseBtn('little-remove'),
    );
    columnsContainer.append(this.progressBar);
  }

  private advanceProgress(value: number): void {
    this.progressBar.style.backgroundImage = `linear-gradient(90deg, var(--light-blue) ${value}%, var(--white) ${value}%)`;
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
