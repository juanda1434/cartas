'use strict'
const botones= [];
const getImgCarta = (carta) => {
    const img = `<img id="carta${carta.numero}" src="img/${carta.numero}.png" alt="${carta.carta}" style='width:20%'>`;
    botones[botones.length]= {boton:`carta${carta.numero}`,numero:carta.numero};
    return img;
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
        alert("Carta ya fue agregada");
    } else {
        cargarLocalStorage();
    }
}

const sumarPunto = (numero)=>{
    const cartas = getCartas()["data"];
    for (const key in cartas) {
        if (cartas[key].numero == numero ) {
            cartas[key].valor = parseInt(cartas[key].valor) +1;
            
            localStorage.setItem("cartas",JSON.stringify({data:cartas}));
            
        }
    }
}
const cargarImg = () => {
    const cartas = (getCartas())["data"];
    let divCartas = "";
    cartas.forEach(carta => {
        //console.log(carta);
        divCartas += getImgCarta(carta);
    });
    document.getElementById("cartas").innerHTML = divCartas;
    addAcciones();
}

const addAcciones = (numero)=>{

    botones.forEach(boton => addAccion(boton.boton,()=>{
        sumarPunto(boton.numero);
    }));
}
const addAccion = (idBtn,accion)=>{
    document.getElementById(idBtn).onclick = accion;
    
}

cargarLocalStorage();