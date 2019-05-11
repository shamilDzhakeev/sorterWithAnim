/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { input } from './template';

class DataSourceInput {
  public async getData() {
    const valuesArr = input.value ? input.value.split('').map(Number) : [];
    return valuesArr;
  }
}

class DataSourceServer {
  public async getData() {
    const resp = await fetch('http://localhost:1234/array');
    const data = await resp.json();
    return data.result;
  }
}

const libs = {
  0: DataSourceInput,
  1: DataSourceServer,
};

export default function getDataSource(
  type: string
): DataSourceInput | DataSourceServer {
  const DataSource = libs[type];
  return new DataSource();
}
