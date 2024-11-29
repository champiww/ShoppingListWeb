'use strict';

function actualizarContador(action) {
    if (action == '++') {
        let contador = localStorage.getItem('0');
        contador++;
        localStorage.setItem('0', contador);
    } else if (action == '--') {
        let contador = localStorage.getItem('0');
        contador--;
        localStorage.setItem('0', contador);
    }
}

function mostrarLocalStorage() {
    return Object.assign({}, localStorage);
}

function engadirElemento(elemento, posicion) {
    const whiteSpace = '&nbsp';
    localStorage.setItem(posicion.toString(), elemento);
    console.log(mostrarLocalStorage());
}

if (localStorage.getItem('0') == null) {
    localStorage.setItem('0', '1');
}

//Click no botón engadir
document.getElementById('btn_engadir').addEventListener('click', () => {
    engadirElemento(
        document.getElementById('txtb_elemento').value,
        localStorage.getItem('0')
    );
    actualizarContador('++');
});

//Click no botón borrar todo
document.getElementById('btn_borrar').addEventListener('click', () => {
    localStorage.clear();
});
