const randomWidth = () => {
  return Math.max(Math.floor(Math.random() * 1000), 145);
};

const randomColor = () => {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase()
};

const addDOMListener = () => {
  const sessBtn = document.getElementById('sessBtn');
  sessBtn?.addEventListener('click', updateWidth);
  const localBtn = document.getElementById('localBtn');
  localBtn?.addEventListener('click', updateColor);
};

const updateWidth = () => {
  const sessValue = document.getElementById('sessValue');
  if (!sessValue) {
    return;
  }
  const width = randomWidth();
  sessValue.setAttribute('value', `${width}`);
  sessValue.style.width = `${width}px`;
  sessionStorage.setItem('value', `${width}`);
};

const updateColor = () => {
  const localValue = document.getElementById('localValue');
  if (!localValue) {
    return;
  }
  const color = randomColor();
  localValue.setAttribute('value', color);
  document.body.style.backgroundColor = color;
  localStorage.setItem('backgroundColor', color);
};

const addWindowListener = () => {
  window.addEventListener('storage', storageChanged);
}

const storageChanged = (event: StorageEvent) => {
  console.log({...event});
  const content = document.getElementById('content');
  if (content) {
    const {newValue, oldValue} = event;
    content.innerHTML = `
      <p style="background-color: ${newValue}">newValue: ${newValue}</p>
      <p style="background-color: ${oldValue}">oldValue: ${oldValue}</p>
    `;
  }
};

const initialization = () => {
  addDOMListener();
  addWindowListener();
};

initialization();
