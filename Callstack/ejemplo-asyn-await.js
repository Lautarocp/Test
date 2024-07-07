const fabricaDePromesas = (indice) => new Promise((resolve, reject) => {
    const tiempoRejected = Math.floor(Math.random() * 10000) + 1000;
    const tiempoResolved = Math.floor(Math.random() * 10000) + 1000;
    setTimeout(() => {
        reject(`la promesa ${indice} rechazo`);
    }, tiempoRejected);

    setTimeout(() => {
        resolve(`la promesa ${indice} paso`);
    }, tiempoResolved);
});
/*let misPromesas = [];
for(let i =0; i < 10; i++){
    misPromesas = [...misPromesas,fabricaDePromesas(i)];
    
}*/
async function miAsyncFunctio() {
    try {
        const misPromesa1 = await fabricaDePromesas(1);
        //console.log("este es el valor de miPromesa1",{misPromesa1})
        return misPromesa1;
    } catch (e) {
        console.log("hubo un error")
        return e;

    }
};
function miFunctioNormal() {
    const miPromesa2 = fabricaDePromesas(2)
        .then(resultado => console.log(resultado))
        .catch(razon => console.log(razon))
    // console.log("este es el valor de miPromesa2", {miPromesa2})
};