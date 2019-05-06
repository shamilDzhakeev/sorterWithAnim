//import { header } from './header';

class DataSourceInput {
  public textField: HTMLInputElement;
  public constructor() {
    this.textField = document.createElement('input');
  }
  public getData(): number[] {
    const valuesArr = this.textField.value
      ? this.textField.value.split('').map(Number)
      : [];
    return valuesArr;
  }
}

class DataSourceServer {
  public getData(): number[] {
    fetch('http://localhost:1234/array')
      .then(response => {
        if (response.status !== 200) {
          return Promise.reject(new Error(response.statusText));
        } else {
          return Promise.resolve(response);
        }
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.error('Ошибка: ', err));

    /*const req = new XMLHttpRequest();
    req.open('GET', 'http://localhost:1234/array', false);
    req.send();

    const responseObj = JSON.parse(req.responseText);

    if (req.status !== 200) {
      console.log('Некорректные данные с сервера.');
      return [];
    }
    return responseObj.result; */

    return [1];
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
