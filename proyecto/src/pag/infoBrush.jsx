import React, {useRef, useEffect} from 'react';

function Inform({pos}){
    if (pos!=undefined){
        var maxX = Math.max(...pos[0]);
        var maxY = Math.max(...pos[1]);
        var minX = Math.min(...pos[0]);
        var minY = Math.min(...pos[1]);
        var promX = pos[0].reduce((a,b)=> a+b,0);
        var promY = pos[1].reduce((a,b)=> a+b,0);
        promX = promX/pos[0].length;
        promY = promY/pos[1].length;
    }
    return(
        <div>
            <div>el centroide de los puntos es: {promX},{promY}</div>
            <div>maximo en X: {maxX}</div>
            <div>maximo en Y: {maxY}</div>
            <div>minimo en X: {minX}</div>
            <div>minimo en Y: {minY}</div>
        </div>
    );
}

export default Inform;
