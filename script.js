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

function actualizarListaElementos() {
    let divLista = document.getElementById('lista');

    [...divLista.childNodes].map((node) => {
        divLista.removeChild(node);
    });

    Object.keys(localStorage)
        .reverse()
        .map((key) => {
            if (key != 0) {
                engadirElementoHTML(key);
            }
        });
}

function engadirElementoHTML(key) {
    let divLista = document.getElementById('lista');
    let divElemento = document.createElement('div');
    divElemento.setAttribute('id', 'divElemento');
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');

    span1.innerText = localStorage.getItem(key) + ' ';
    span2.innerText = '\u2715';

    divElemento.append(span1);
    divElemento.append(span2);

    divLista.append(divElemento);
}

function engadirElementoLocalStorage(elemento, posicion) {
    localStorage.setItem(posicion.toString(), elemento);
    engadirElementoHTML(posicion.toString());
}

function eliminarElementoLocalStorage(elemento, posicion) {
    localStorage.removeItem(posicion.toString(), elemento);
}

// Object.assign({}, localStorage)
// *************************************************************

if (localStorage.getItem('0') == null) {
    localStorage.setItem('0', '1');
}
actualizarListaElementos();

//Click no botón engadir
document.getElementById('btn_engadir').addEventListener('click', () => {
    engadirElementoLocalStorage(
        document.getElementById('txtb_elemento').value,
        localStorage.getItem('0')
    );
    actualizarContador('++');
});

//Click no botón borrar todo
document.getElementById('btn_borrar').addEventListener('click', () => {
    localStorage.clear();
    actualizarListaElementos();
    localStorage.setItem('0', '1');
});

//Click no botón de borrar elemento
let divLista = document.getElementById('lista');
if (divLista.childElementCount > 0) {
    divLista.addEventListener('click', (event) => {
        if (event.target.tagNAme == 'SPAN') {
            console.log('a');
        }
    });
}
