const Button = (clickHandler, label, clasName = ''): HTMLButtonElement => {
  const btn = document.createElement('button');
  btn.addEventListener('click', clickHandler);
  btn.innerText = label;
  btn.className = clasName;
  return btn;
};

export default Button;
