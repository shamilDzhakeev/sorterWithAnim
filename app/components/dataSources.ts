// источник 1 - Input в DOM

class DataSourceInput {
  public getData(): number[] | null {
    // @ts-ignore
    const targetString = document.querySelector('.text-box').value;
    const valuesArr = targetString ? targetString.split('').map(Number) : null;
    return valuesArr;
  }
}

// источник 2 - сервер

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
