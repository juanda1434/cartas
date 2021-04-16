    'use strict'

    const cargarCartas = ()=>{
         fetch("https://carlosreneas.github.io/endpoints/cartas.json")
        .then(r=>r.json())
        .then(cartas=>{
            carga.setItem("cartas",cartas);
        });
    }

    const cargarLocalStorage= ()=>{
        const carga = localStorage.getItem("cartas");
        if(carga == null){
            cargarCartas();            
        }else{
            
        }
    }

