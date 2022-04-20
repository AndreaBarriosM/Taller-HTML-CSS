let d = document
let tbody = document.querySelector('#departamentos');
let filasDep = []
let casosDia = new Array(20).fill(0);
let totales = new Array(20).fill(0);

let pathName = window.location.pathname.split('/');
let url = pathName.length > 2 ? pathName[1] : '';

fetch(`public/departamentos.json`).then(res => res.json()).then(data => {
  data.departamentos.forEach(departamento => {
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    let td2 = document.createElement('td')
    td.innerHTML = departamento[0];
    td2.innerHTML = departamento[1]
    tr.classList.add(`${departamento[0].replace(/\s/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()}`);
    tr.appendChild(td);
    tr.appendChild(td2)
    filasDep.push(tr);
    tbody.appendChild(tr);
  })
})
window.onload = async function () {
  setTimeout(() => {
    filasDep.forEach((fila, index) => {
      let total = 0
      for (let i = 0; i < 20; i++) {
        let td = document.createElement('td');
        let num = Math.floor(Math.random() * 2 + 1);
        casosDia[i] += num;
        td.innerHTML = num
        total += num;
        fila.append(td);
      }
      let td = document.createElement('td');
      td.innerHTML = total;
      fila.append(td);
      totales[index] = total;
    })
    
    let total = document.querySelector('#total_dia');
    casosDia.forEach((caso, i) => {
      let td = document.createElement('td');
      td.innerHTML = caso;
      total.append(td);
    })
    let td = document.createElement('td');
    let casosdiarios = casosDia.reduce((a, b) => a + b, 0);
    let totalesentrefechas = totales.reduce((a, b) => a + b, 0);
    td.innerHTML = casosdiarios+totalesentrefechas;
    total.append(td);    
  }, 250);
}