function primero (fn){
    setTimeout(function(){
               console.log("primero");
                fn();
                  },5000)
              
  }
  function segundo(){
    console.log("segundo")
  }
  primero(segundo)
  