const productos = [
    { id:`1j237n2ds6ag163h47dh21`,nombre:`Camiste`, precio: 500 },
    { id:`1fg81jmnd712bcv0-2mnfc`,nombre:`Remera`, precio: 2000 },
    { id:`1j237n2ds6g23df2dfh4g2`,nombre:`Pantalom`, precio: 1500 },   
    ];
    
    const precioDescaunto = productos.map(function(producto){
        if(producto.precio < 1000) return producto;
        return{
            ...producto,
            precio: producto.precio * 0.9
        };
    });