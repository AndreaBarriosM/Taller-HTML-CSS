let ubicacion = document.querySelector('#ubicacion');
let fecha = document.querySelector('#fecha');
let form = document.querySelector('#form');
fecha.setAttribute('value', new Date().toISOString().substring(0, 10));

let pathName = window.location.pathname.split('/');
let url = pathName.length > 2 ? pathName[1] : '';

if (localStorage.getItem('departamentos') === null) {
  fetch(`public/departamentos.json`).then(res => res.json()).then(data => {
    localStorage.setItem('departamentos', JSON.stringify(data.departamentos))
    localStorage.setItem('fecha', new Date().toISOString().substring(0, 10));
    UpdateSelect();
  })
} else if (localStorage.getItem('fecha') !== fecha.value) {
  fetch(`public/departamentos.json`).then(res => res.json()).then(data => {
    localStorage.setItem('departamentos', JSON.stringify(data.departamentos))
    localStorage.setItem('fecha', new Date().toISOString().substring(0, 10));
    UpdateSelect();
  })
}

window.onload = function () {
  UpdateSelect();
};

function UpdateSelect() {
  let deps = JSON.parse(localStorage.getItem('departamentos'));
  ubicacion.innerHTML = ``;
  deps.forEach(departamento => {
    let option = document.createElement('option');
    option.value = departamento[0];
    option.innerHTML = departamento[0];
    ubicacion.appendChild(option);
  })
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let departamentos = JSON.parse(localStorage.getItem('departamentos'));
  let formData = new FormData(form);
  formData.forEach((value, key) => {
    let indicedepa;
    if (key === 'ubicacion') {
      departamentos.forEach((depa, i) => {
        if (depa[0] === value) {
          indicedepa = i;
        }
      })
      departamentos.splice(indicedepa, 1);
      localStorage.setItem('departamentos', JSON.stringify(departamentos));
    }
    UpdateSelect();
  })
  alert('Se completo el registro')
  form.reset()
})