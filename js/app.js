'use strict'
const botones = [];
const getImgCarta = (carta) => {
    const img = `<img class="container__cartas__carta" id="carta${carta.numero}" src="img/${carta.numero}.png" alt="${carta.carta}" style=''>`;
    botones[botones.length] = { boton: `carta${carta.numero}`, numero: carta.numero };
    return img;
}
const validarUsuario=()=>{
    if (localStorage.getItem("usuario")==null || localStorage.getItem("usuario")!="admin") {
        document.location = "index.html";
    }
}
const getTr= (carta)=>{
    const tr = `<tr>
    <td>${carta.numero}</td>
    <td>${carta.carta}</td>
    <td>${carta.valor}</td>
</tr>`;
    return tr;
}

const getCartas = () => {
    return JSON.parse(localStorage.getItem("cartas"));
}

const cargarCartasJSON = () => {

    fetch("https://carlosreneas.github.io/endpoints/cartas.json")
        .then(r => r.json())
        .then(cartas => {
            localStorage.setItem("cartas", JSON.stringify(cartas));
            cargarImg();
            cargarTabla();
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

const agregarCarta = (carta) => {
let exito=false;
    if (getCartas() != null) {
        const cartas = getCartas()["data"];
        cartas[cartas.length] = carta;
        localStorage.setItem("cartas",JSON.stringify({data:cartas}));        
        exito=true;
    }
    return exito;
}

const sumarPunto = (numero) => {
    const cartas = getCartas()["data"];
    for (const key in cartas) {
        if (cartas[key].numero == numero) {
            cartas[key].valor = parseInt(cartas[key].valor) + 1;

            localStorage.setItem("cartas", JSON.stringify({ data: cartas }));
            cargarTabla();
        }
    }
}
const cargarImg = () => {
    
    if(getCartas()!=null){
        const cartas = (getCartas())["data"];
        const imgs= cartas.reduce((img,carta)=> img+getImgCarta(carta) , "" );
        document.getElementById("cartas").innerHTML = imgs;
        addAcciones();
    }    
 
}

const cargarTabla = ()=>{
    if (getCartas()!=null) {
        const cartas= getCartas()["data"];
        const cartasOrdenadas= cartas.sort((a,b)=>parseInt(b.valor)-parseInt(a.valor));
        console.log(cartasOrdenadas);
        const trs= cartasOrdenadas.reduce((trs,carta)=> trs+getTr(carta),"");
        document.getElementById("infoTabla").innerHTML=trs;
    }
}

const addAcciones = (numero) => {

    botones.forEach(boton => addAccion(boton.boton, () => {
        sumarPunto(boton.numero);
        
    }));
}

const addAccion = (idBtn, accion) => {
    document.getElementById(idBtn).onclick = accion;

}

const buscarCarta = (cartaBuscada) => {
    let exito = false;
    if ((getCartas()) != null) {
        const cartas = (getCartas()["data"]);
        for (let key in cartas) {
            const carta = cartas[key];
            if (carta.numero == cartaBuscada.numero) {
                carta.carta = cartaBuscada.carta;
                cartas[key] = carta;
                localStorage.setItem("cartas", JSON.stringify({ data: cartas }))
                exito = true;
                break;
            }
        }
    }
    return exito;
}

addAccion("btnSave", () => {
    const numero = document.getElementById("numero").value;
    const carta = document.getElementById("carta").value;
    if (numero.length <= 0 || carta.length <= 0) {
        alert("numero y carta deben tener un valor");
        return;
    }
    if (isNaN(numero)) {
        alert("Numero debe ser numerico");
        return;
    }
    if(numero<0 || numero >13){
        alert("Solo puede ingresar numeros entre 1 y 13");
        return;
    }
    const cartaNueva = { numero: numero, carta: carta,valor:0 };
    if (!buscarCarta(cartaNueva)) {
       const exito= agregarCarta(cartaNueva);    
       if(exito){
           alert("Se agrego carta");
           cargarImg();
           cargarTabla();
       }else{
           alert("No se agrego carta");
       }                     
    }else{
        alert("Se actualizo la carta");
        cargarTabla();
    }

});


cargarLocalStorage();
cargarTabla();
validarUsuario();