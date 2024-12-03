'use strict';

function actualizarListaElementos(divLista) {
    [...divLista.childNodes].map((node) => {
        divLista.removeChild(node);
    });
}

function engadirElementoHTML(productoEngadir) {
    let divLista = document.getElementById('lista');
    let divElemento = document.createElement('div');

    let span1 = document.createElement('span');
    let span2 = document.createElement('span');

    span1.innerText = productoEngadir + ' ';
    span2.innerText = '\u2715';

    divElemento.append(span1);
    divElemento.append(span2);

    divLista.append(divElemento);
}

function engadirElementoLocalStorage(producto) {
    let lista = localStorage.getItem();
    let listaParseada = JSON.parse(lista);
    listaParseada.push(producto);
    localStorage.setItem('lista', JSON.stringify(listaParseada));
}

function eliminarElementoHTML(divLista, divElemento) {
    divLista.removeChild(divElemento);
}

function eliminarElementoLocalStorage(posicion) {
    console.log(localStorage.key(posicion));

    localStorage.removeItem(posicion);
}

function filtro(divLista, contenido) {
    [...divLista.childNodes].map(elemento, () => {});
    // let index = [...divLista.childNodes].findIndex((elemento) => {
    //     return elemento == event.target.closest('div');
    // });
}

// Object.assign({}, localStorage)
// *************************************************************

const divLista = document.getElementById('lista');

if (localStorage.getItem('lista') == null) {
    let listaVacia = [];
    localStorage.setItem('lista', JSON.stringify(listaVacia));
}

actualizarListaElementos();

//Click no botón engadir
document.getElementById('btn_engadir').addEventListener('click', () => {
    let productoEngadir = document.getElementById('txtb_elemento').value;
    engadirElementoLocalStorage(productoEngadir);
    engadirElementoHTML(productoEngadir);
});

//Click no botón borrar todo
document.getElementById('btn_borrar').addEventListener('click', () => {
    localStorage.clear();
    actualizarListaElementos();
});

//Click no botón de borrar elemento
divLista.addEventListener('click', (event) => {
    if (event.target.tagName == 'SPAN' && event.target.innerText == '\u2715') {
        if (confirm('¿Quiere borrar el artículo?')) {
            let index = [...divLista.childNodes].findIndex((elemento) => {
                return elemento == event.target.closest('div');
            });

            eliminarElementoLocalStorage(index + 1);
            eliminarElementoHTML(divLista, [...divLista.childNodes][index]);
        }
    }
});

//Filtro
document.getElementById('txtb_filter').addEventListener('input', () => {
    filtro(divLista);
});
