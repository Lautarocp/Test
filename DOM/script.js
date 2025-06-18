function llama(){
    const cuadrado = document.createElement('div')
    cuadrado.classList.add('cuadrado')
    cuadrado.classList.add('rojo')
    cuadrado.addEventListener('', (event) =>{
     if(event.target.classList[1]==='rojo'){
        event.target.classList.replace('rojo','green')
        
     }else {
        event.target.classList.replace('green','rojo')

     }
    })
    body.appendChild(cuadrado)
}
const boton = document.getElementById('agregar')
const body = document.getElementsByTagName('body')[0];
boton.addEventListener('click',llama)
