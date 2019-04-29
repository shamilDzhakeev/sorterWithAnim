import { header } from './header';

class DataSourceInput {
  public textField: HTMLInputElement;
  public constructor() {
    this.textField = document.createElement('input');
    this.textField.classList.add('text-box');
    this.textField.placeholder = 'Введите строку из цифр';
    header.appendChild(this.textField);
  }
  public getData(): number[] | null {
    const valuesArr = this.textField.value
      ? this.textField.value.split('').map(Number)
      : null;
    return valuesArr;
  }
}

class DataSourceServer {
  public getData(): number[] | null {
    const req = new XMLHttpRequest();
    req.open('GET', 'http://localhost:1234/array', false);
    req.send();

    const responseObj = JSON.parse(req.responseText);

    if (req.status !== 200) {
      console.log('Некорректные данные с сервера.');
      return null;
    }
    return responseObj.result;
  }
}

const libs = {
  string: DataSourceInput,
  server: DataSourceServer,
};

export function getDataSource(
  type: string,
): DataSourceInput | DataSourceServer {
  const DataSource = libs[type];
  return new DataSource();
}
