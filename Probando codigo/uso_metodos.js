const productos = [
    { id:`1j237n2ds6ag163h47dh21`,nombre:`Camiste`, precio: 500 },
    { id:`1fg81jmnd712bcv0-2mnfc`,nombre:`Remera`, precio: 2000 },
    { id:`1j237n2ds6g23df2dfh4g2`,nombre:`Pantalom`, precio: 1500 }, 
    { id:`1j237n2ds6g23df2dfh4g2`,nombre:`Pantalom`, precio: 150 },
    { id:`1j237n2ds6g23df2dfh4g2`,nombre:`Pantalom`, precio: 5000 },
    ];
    
    const precioDescaunto = productos.map(function(item){
        if(item.precio < 1000) return item; // itera sobre cada item, si le paso productos.precio <1000 el codigo funciona
        console.log(`paso`);       return{  // pero productos.precio no esta definido y siempre va a ser falso
            ...item,
            precio: item.precio * 0.9
        };
    });