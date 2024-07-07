const funcion4= ()=>{
    console.log("ejucucion4")
};
const funcion3 = ()=>{
    console.log("ejucucion3")
    setTimeout(funcion4,4000);
};
const funcion2 = ()=>{
    console.log("ejucucion2")
    setTimeout(funcion3,10000)    
};
const funcion1 = ()=>{
    console.log("ejucucion1");
    setTimeout(funcion2,2000);
};

setTimeout(funcion1,3000);