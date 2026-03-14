const fabricaDePromesas = indice => new Promise((resolve,reject)=>{
    const tiempoRejected = Math.floor(Math.random() * 10000) +1000;
    const tiempoResolved = Math.floor(Math.random() * 10000) +1000;
setTimeout( ()=> {
    reject(`la promesa ${indice} rechazo`);
    }, tiempoRejected);

setTimeout( ()=> {
    resolve(`la promesa ${indice} paso`);
    }, tiempoResolved);
});
let misPromesas = [];
for(let i =0; i < 10; i++){
    misPromesas = [...misPromesas,fabricaDePromesas(i)];
    
}
Promise.race(misPromesas)
    .then((respuesta)=>console.log(respuesta))
    .catch((razon)=>console.log(razon));