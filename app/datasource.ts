export default function getData(): number[] {
  const req = new XMLHttpRequest();
  req.open('GET', 'http://localhost:1234/array', false);
  req.send();

  const responseObj = JSON.parse(req.responseText);
  console.log(req);

  if (req.status !== 200) {
    console.log('Некорректные данные с сервера.');
  } else {
    console.log(responseObj.result);
    return responseObj.result;
  }
  return [1];
}
