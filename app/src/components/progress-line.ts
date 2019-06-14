import create from '../utils/create-element';
import createCloseBtn from './close-button';
export default class ProgressLine {
  private progressBar: HTMLDivElement;
  private progressText: HTMLSpanElement;
  private i: number;
  private length: number;
  private percentage: number;

  public constructor(columnsContainer: HTMLElement) {
    this.length = 0;
    this.percentage = 0;
    this.i = 0;

    this.progressText = create('span', { className: 'progressText', textContent: `${this.i}` });
    this.progressBar = create(
      'div',
      { className: 'progressBar' },
      this.progressText,
      createCloseBtn('little-remove'),
    );
    columnsContainer.append(this.progressBar);
  }

  private advanceProgress(value: number): void {
    this.progressBar.style.backgroundImage =
      'linear-gradient(90deg, var(--light-blue) ' + value + '%, var(--white)' + value + '%)';
  }

  public stepUp(len): void {
    if (this.i < len) {
      this.progressText.textContent = `${++this.i}`;
      this.percentage = this.percentage + 100 / len;
      this.advanceProgress(this.percentage);
    }
  }

  public stepDown(): void {
    if (this.i > 0) {
      this.progressText.textContent = `${--this.i}`;
      this.percentage = this.percentage - 100 / this.length;
      this.advanceProgress(this.percentage);
    }
  }
}
