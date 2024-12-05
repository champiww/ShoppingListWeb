'use strict';

const divLista = document.getElementById('lista');
const btn_engadir = document.getElementById('btn_engadir');
const btn_borrar = document.getElementById('btn_borrar');
const txtb_filter = document.getElementById('txtb_filter');

function actualizarListaElementos() {
    [...divLista.childNodes].map((node) => {
        divLista.removeChild(node);
    });

    let listaParseada = JSON.parse(localStorage.getItem('lista'));
    listaParseada.map((elemento) => {
        engadirElementoHTML(elemento);
    });
}

function engadirElementoHTML(productoEngadir) {
    let divElemento = document.createElement('div');
    divElemento.setAttribute('class', 'divProducto');
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');

    span1.innerText = productoEngadir + ' ';
    span2.innerText = '\u2715';

    divElemento.append(span1);
    divElemento.append(span2);

    divLista.append(divElemento);
}

function engadirElementoLocalStorage(producto) {
    let listaParseada = JSON.parse(localStorage.getItem('lista'));
    listaParseada.push(producto);
    localStorage.setItem('lista', JSON.stringify(listaParseada));
}

function eliminarElementoHTML(divElemento) {
    divLista.removeChild(divElemento);
}

function eliminarElementoLocalStorage(producto) {
    let listaParseada = JSON.parse(localStorage.getItem('lista'));
    let index = listaParseada.indexOf(producto);
    if (index > -1) {
        listaParseada.splice(index, 1);
    }
    localStorage.setItem('lista', JSON.stringify(listaParseada));
}

//**************************

function btn_engadirOnClickListener() {
    if (document.getElementById('txtb_elemento').value != '') {
        let listaParseada = JSON.parse(localStorage.getItem('lista'));
        let productoEngadir = document.getElementById('txtb_elemento').value;

        if ([...listaParseada].indexOf(productoEngadir) == -1) {
            engadirElementoLocalStorage(productoEngadir);
            engadirElementoHTML(productoEngadir);
        } else {
            alert('O producto xa está na lista!');
        }
    }
}

function btn_borrarOnClickListener() {
    localStorage.clear();
    let listaVacia = [];
    localStorage.setItem('lista', JSON.stringify(listaVacia));
    actualizarListaElementos();
}

function btn_borrar_elementoOnClickListener(event) {
    if (event.target.tagName == 'SPAN' && event.target.innerText == '\u2715') {
        if (confirm('¿Quiere borrar el artículo?')) {
            let divPadre = event.target.closest('div');
            eliminarElementoLocalStorage(divPadre.childNodes[0].innerText);
            eliminarElementoHTML(divPadre);
        }
    }
}

function txtb_filterOnTextChangedListener() {
    let contenido = txtb_filter.value;
    const filtro = new RegExp(contenido, 'i');

    for (const element of divLista.children) {
        if (element.querySelector('span').innerText.match(filtro)) {
            element.classList.remove('ocultar');
        } else {
            element.classList.add('ocultar');
        }
    }
}

function main() {
    if (localStorage.getItem('lista') == null) {
        let listaVacia = [];
        localStorage.setItem('lista', JSON.stringify(listaVacia));
    }

    actualizarListaElementos();

    btn_engadir.addEventListener('click', btn_engadirOnClickListener);
    btn_borrar.addEventListener('click', btn_borrarOnClickListener);
    divLista.addEventListener('click', btn_borrar_elementoOnClickListener);

    txtb_filter.addEventListener('input', txtb_filterOnTextChangedListener);
}

main();
