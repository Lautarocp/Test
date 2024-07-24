const funcionDeCallback = () => {
    console.log("me ejecute mas tarde");
}

  const ejecutarMasTarde = ()=>{  
    setTimeout(funcionDeCallback,3000)    
};

ejecutarMasTarde();