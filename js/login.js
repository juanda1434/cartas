"use strict"


const logear= ()=>{
    const usuario = document.getElementById("usuario").value;
    const contrasenia= document.getElementById("contrasenia").value;
    if (usuario=="admin" && contrasenia=="1234") {
        localStorage.setItem("usuario", usuario);
        document.location = "juego.html";        
    }else{
        alert("Error usuario o contraseña incorrectos");

    }
    
}


document.getElementById("btnLogin").onclick = r=>logear();