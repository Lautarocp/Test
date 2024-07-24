function comenzar(){
    var boton=document.getElementById("resolver")
    
     boton.addEventListener("click", calculaPor , false)
}

function calculaPor() {
    const Numero = document.getElementById("texto").value;
    const porcenta = document.getElementById("valor").value;
    const lado = document.getElementById("lado").value
    const nombre = document.getElementById("Nombre").value
    const apellido = document.getElementById("Apellido").value
    Porcentaje(Numero,porcenta);
    calcuAre(lado);
    saludo(nombre, apellido);
    }
function Porcentaje(Nume,porce){
    var resultado = Nume*(porce/100);
    var datos=document.getElementById("datos");
    datos.innerHTML="<div>"+ resultado + "</div>" ;

}
function calcuAre(lado){
    const Area = lado*lado;
    const peri = (lado*2)+(lado*2);
    var datos=document.getElementById("daTos");
    datos.innerHTML="<div>" + "Area = " + Area + "</br>" + "Perimetro = "+ peri + "</div>" ;
    
    
}

function saludo(Nombre, apellido) {
    if ( Nombre)  {
        alert(`Hola ${Nombre} ${apellido}`);
    } 
}
    
   

window.addEventListener("load", comenzar ,false);//crea un escuchador cuando la pagina esta totalmenete "load"
