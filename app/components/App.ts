import NumberInputField from './NumberInputField';
import { PrimaryButton } from './Buttons';
import Sorter from './Sorter';
import Column from './Column';

interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
  state: State;
}

interface State {
  sorterts: Sorter[];
  totalStepsCount: number;
}

interface Observer {
  update(data: State): void;
}

function App(): HTMLDivElement {
  const app = document.createElement('div');
  const input = NumberInputField();

  // Издатель владеет некоторым важным состоянием и оповещает наблюдателей о его изменениях.
  class ConcreteSubject implements Subject {
    public state: State = { sorterts: [], totalStepsCount: 0 };
    private observers: Observer[] = [];

    public attach(observer: Observer): void {
      console.log('Subject: Attached an observer.');
      this.observers.push(observer);
    }

    public detach(observer: Observer): void {
      const observerIndex = this.observers.indexOf(observer);
      this.observers.splice(observerIndex, 1);
      console.log('Subject: Detached an observer.');
    }

    public notify(): void {
      console.log('Subject: Notifying observers...');

      for (const observer of this.observers) {
        observer.update(this.state);
      }
    }

    public someBusinessLogic(): void {
      const data = input.value.split('').map(Number);
      const sorter = new Sorter(data);
      console.log(sorter);

      this.state.sorterts.push(sorter);
      console.log(`Subject: My state has just changed!`);
      this.notify();
    }
  }

  class ObserverLogger implements Observer {
    public update(state: State): void {
      console.log(`ObserverLogger: data changes to: ${state}`);
    }
  }

  class ObsereverColumnsContainer implements Observer {
    public readonly columnsContainer: HTMLDivElement[] = [];
    private indexes: number[] = [];
    private arr: number[];
    private spacing: number;

    public constructor(arr: number[], color: string) {
      this.arr = arr;
      const spacing = 30;
      this.spacing = spacing;

      this.arr.forEach(
        (height, index): void => {
          this.columnsContainer.push(Column({ height, index, color, spacing }));
          this.indexes.push(index);
        }
      );
    }

    private static swap(arr: number[], i: number, j: number): void {
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    public update(state: State): void {
      for (let i = 0; i < state.sorterts.length; i++) {
        if (state[i] !== this.arr[i]) {
          for (let j = i; j < state.length; j++) {
            if (state[i] === this.arr[j]) {
              ObsereverColumnsContainer.swap(this.arr, i, j);
              ObsereverColumnsContainer.swap(this.indexes, i, j);
              break;
            }
          }
        }
      }

      this.columnsContainer.forEach(
        (column: HTMLDivElement, i: number, columnsArr: HTMLDivElement[]): void => {
          columnsArr[this.indexes[i]].style.left = `${i * this.spacing}px`;
        }
      );

      this.arr = [...state];
    }
  }

  /**
   * Клиентский код.
   */

  const subject = new ConcreteSubject();

  const observer1 = new ObserverLogger(); // 1
  subject.attach(observer1);

  const observerColContainer = new ObsereverColumnsContainer([1, 8, 5], 'red'); // 2
  subject.attach(observerColContainer);

  app.append(...observerColContainer.columnsContainer);

  subject.someBusinessLogic();
  subject.someBusinessLogic();
  subject.someBusinessLogic();

  return app;
}

export default App;
