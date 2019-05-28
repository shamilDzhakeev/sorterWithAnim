class DataSourceInput {
  public async getData(input: HTMLInputElement): Promise<number[]> {
    const valuesArr = input.value ? input.value.split('').map(Number) : [];
    return valuesArr;
  }
}

class DataSourceServer {
  public async getData(): Promise<[]> {
    const resp = await fetch('http://localhost:1234/array');
    if (resp.ok) {
      const data = await resp.json();
      return data.result;
    } else {
      throw new Error('Ошибка получения данных с сервера.');
    }
  }
}

const libs = {
  0: DataSourceInput,
  1: DataSourceServer,
};

export default function getDataSource(
  type: number,
): DataSourceInput | DataSourceServer {
  const DataSource = libs[type];
  return new DataSource();
}
