'use strict'

const getImgCarta = (carta) => {
    return `<img src="img/${carta.numero}.png" alt="${carta.carta}" style='width:20%'>`;
}

const getCartas = () => {
    return JSON.parse(localStorage.getItem("cartas"));
}

const cargarCartasJSON = () => {

    fetch("https://carlosreneas.github.io/endpoints/cartas.json")
        .then(r => r.json())
        .then(cartas => {
            localStorage.setItem("cartas", JSON.stringify(cartas));

        });
}

const cargarLocalStorage = () => {
    const carga = localStorage.getItem("cartas");
    if (carga == null) {
        cargarCartasJSON();
    } else {
        cargarImg();
    }
}

const agregarCarta = (...cartaAgregar) => {

    if (cartas != null) {
        cartas.forEach(carta => {

        })
    } else {
        cargarLocalStorage();
    }
}

const cargarImg = () => {
    const cartas = (getCartas())["data"];
    let divCartas = "";
    cartas.forEach(carta => {
        console.log(carta);
        divCartas += getImgCarta(carta);
    });
    document.getElementById("cartas").innerHTML = divCartas;

}

cargarLocalStorage();