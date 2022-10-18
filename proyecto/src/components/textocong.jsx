import React from "react";
import { Container } from "reactstrap";
import nombres from "./nombres-partidos-invertidos.json"
import partidos from "./partidos.json"
import partidosInvertidos from "./partidos-invertidos.json"
/**
 * Function in charge of delivering information about the deputy on his profile page.
 * @param {*} infoDip deputy information.
 * @param {*} datoswnominate information of all the deputies.
 * @returns
 */
function Text({infoDip,datoswnominate}){
    var data=[]
    var ejex=[]
    var Dip = datoswnominate.diputados.filter(dat => dat.id===infoDip.id)
    datoswnominate.diputados = datoswnominate.diputados.filter((dat)=>{return dat.party===Dip.party})
    for(let i in datoswnominate.diputados){
        ejex.push(Number(datoswnominate.diputados[i].coordX))
    }
    var Coord= Dip[0].coordX.toFixed(2)
    var Promedio =((ejex.reduce((a,b)=> a+b,0))/ejex.length).toFixed(2)
    /*
    var repetidos={}
    ejex.forEach(function(numero){
        repetidos[numero] = (repetidos[numero] || 0) + 1;
      });
    const dataArr = new Set(ejex);
    ejex = [...dataArr].sort();
    for(let i in ejex){
        data.push({
            "Valor":repetidos[ejex[i]],
            "TipoDato":String(ejex[i])
        })
    }
    */
    return(
        <Container  style={{marginTop:"22px"}}>
            <p>
                {infoDip.nombre + " " + infoDip.apellidoP + " " + infoDip.apellidoM} actualmente pertenece a 
                <span style={{backgroundColor: partidos[nombres[infoDip.distrito[0].partidoActual]], borderRadius: "5px", color:partidosInvertidos[nombres[infoDip.distrito[0].partidoActual]] }}>
                     {nombres[infoDip.distrito[0].partidoActual]} 
                </span> y
                tiene un indice de polaridad de {Coord}.  Mientras que su partido tiene un índice de polaridad de {Promedio}.
            </p>
        </Container>
    )
}

export default Text;