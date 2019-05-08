/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
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
  async getData() {
    const response = await fetch('http://localhost:1234/array');
    const data = await response.json();
    return data.result;
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
