import create from '../utils/create-element';
import createCloseBtn from './close-button';
export default class ProgressLine {
  private progressBar: HTMLDivElement;
  private progressText: HTMLSpanElement;
  /* private i: number; */
  private percentage: number;

  public constructor(columnsContainer: HTMLElement) {
    this.percentage = 0;
    /* this.i = 0; */

    this.progressText = create('span', {
      className: 'progressText',
      textContent: `0`,
    });
    this.progressBar = create(
      'div',
      { className: 'progressBar' },
      this.progressText,
      createCloseBtn('little-remove')
    );
    columnsContainer.append(this.progressBar);
  }

  private advanceProgress(value: number): void {
    this.progressBar.style.backgroundImage =
      'linear-gradient(90deg, var(--light-blue) ' +
      value +
      '%, var(--white)' +
      value +
      '%)';
  }

  public stepUp(totalCount: number, currCount: number): void {
    if (currCount <= totalCount) {
      this.progressText.textContent = `${currCount}`; /* `${++this.i}` */
      this.percentage = 100 / (totalCount - currCount || 1);
      console.log(this.percentage);

      this.advanceProgress(this.percentage);
    }
  }

  public stepDown(totalCount: number, currCount: number): void {
    if (currCount > 0) {
      this.progressText.textContent = `${currCount}`; /* `${--this.i}` */

      this.percentage = currCount ? 100 / (totalCount - currCount || 1) : 0;
      this.advanceProgress(this.percentage);
    }
  }
}
