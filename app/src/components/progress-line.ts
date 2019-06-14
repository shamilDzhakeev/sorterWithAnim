import create from '../utils/create-element';
export default class ProgressLine {
  private progressBar: HTMLDivElement;
  private progressText: HTMLSpanElement;
  private progressCount: HTMLSpanElement;
  private i: number;
  private length: number;
  private percentage: number;

  public constructor(columnsContainer: HTMLDivElement, length: number) {
    this.length = length;
    this.percentage = 0;
    this.i = 0;

    this.progressCount = create('span', {
      className: 'stepNumber',
      textContent: `${this.i}`,
    });
    this.progressText = create(
      'span',
      { className: 'progressText' },
      this.progressCount,
      `/${length}`,
    );
    this.progressBar = create('div', { className: 'progressBar' }, this.progressText);
    columnsContainer.append(this.progressBar);
  }

  private advanceProgress(value: number): void {
    this.progressBar.style.backgroundImage =
      'linear-gradient(90deg, var(--light-blue) ' + value + '%, var(--white)' + value + '%)';
  }

  public stepUp(): void {
    if (this.i < this.length) {
      this.progressCount.textContent = `${++this.i}`;
      this.percentage = this.percentage + 100 / this.length;
      this.advanceProgress(this.percentage);
    }
  }

  public stepDown(): void {
    if (this.i > 0) {
      this.progressCount.textContent = `${--this.i}`;
      this.percentage = this.percentage - 100 / this.length;
      this.advanceProgress(this.percentage);
    }
  }
}
