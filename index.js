let departamentos = [];
let input;
let resultsElemt;
let activeIndex = 0;
let results;
//Llamado a la lista de departamentos
function init() {
  fetch(
    "https://gist.githubusercontent.com/Migue04fuentes/4dac4f408823eb71c9f3863d8960272c/raw/8673f617d5a772216991128c3792c3e802ed7fb7/municipios.json"
  )
    .then((response) => response.json())
    .then((data) => (departamentos = data));

  // Ejeecutar evento en el input
  input = document.getElementById("input_departamentos");
  resultsElemt = document.querySelector("ul");
  input.addEventListener("keydown", (event) => {
    setTimeout(() => {
      autocomplete(event);
    }, 1);
  });

  // Seleccionar departamento la hacer click
  resultsElemt.addEventListener("click", (event) => {
    handleResultClick(event);
  });

  //Recorrer la lista con el teclado
  input.addEventListener("keyup", (event) => {
    handleResultKeyDown(event);
  });
}

// Function de auotcompletado
function autocomplete() {
  const value = input.value;
  if (value) {
    let results = departamentos.filter((departamento) => {
      return departamento.departamento
        .toLowerCase()
        .startsWith(value.toLowerCase());
    });

    resultsElemt.innerHTML = results
      .map((result, index) => {
        const isSelected = index === 0;
        return `
      <li
      id='autocomplete-result-${index}' 
      value='${result.id}'
      class='autocomplete-result${isSelected ? "selected" : ""}'
      role='option'
      ${isSelected ? "aria-selected='true'" : ""}
      >
      ${result.departamento}
      </li>`;
      })
      .join("");
    resultsElemt.classList.remove("hidden");
  } else {
    hidelist();
  }
}

//function al seleccionar municipio
function handleResultClick(event) {
  if (event.target && event.target.nodeName === "LI") {
    selectItem(event.target);
  }
}

function selectItem(node) {
  if (node) {
    input.value = node.innerText;
    hidelist();
  }
}

//Ocultar y vaciar lista
function hidelist() {
  resultsElemt.innerHTML = "";
  resultsElemt.classList.add("hidden");
}

function handleResultKeyDown(event) {
  const { key } = event;
  const activeItem = this.getItemAt(activeIndex);
  if (activeItem) {
   activeItem.classList.remove('selected');
   activeItem.setAttribute('aria-selected', 'false');
  }
  switch (key) {
    case "Backspace":
      return;
    case "Escape":
      hidelist();
      input.value = "";
      return;
    case "ArrowUp": {
      if (activeIndex === 0) {
        activeIndex = departamentos.length - 1;
      }
      activeIndex--;
      break;
    }
    case "ArrowDown": {
      if (activeIndex === results.length - 1) {
        activeIndex = 0;
      }
      activeIndex++;
      break;
    }
    default:
      selectFirstResult();
  }
  console.log(activeIndex);
  selectResult();
}
function selectFirstResult() {
  activeIndex = 0;
}

function selectFirstResult() {
  activeIndex = 0;
}

// Devuelve todo el elemento
function getItemAt(index) {
  return resultsElemt.querySelector(`#autocomplete-result-${index}`);
}

function selectResult() {
  const value = input.value;
  console.log(results);
  const autocompleteValue = results[id].departamento;
  const activeItem = this.getItemAt(activeIndex);
  if (activeItem) {
   activeItem.classList.add('selected');
   activeItem.setAttribute('aria-selected', 'true');
  }
  if (!value || !autocompleteValue) {
    return;
  }
  if (value !== autocompleteValue) {
    input.value = autocompleteValue;
    input.setSelectionRange(value.length, autocompleteValue.length);
  }
}

init();
