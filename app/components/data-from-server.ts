/* eslint-disable no-console */
export default function getDataSource(): number[] | null {
  const req = new XMLHttpRequest();
  req.open('GET', 'http://localhost:1234/array', false);
  req.send();

  const responseObj = JSON.parse(req.responseText);

  if (req.status !== 200) {
    console.log('Некорректные данные с сервера.');
    return null;
  }
  console.log(responseObj.result);
  return responseObj.result;
}
