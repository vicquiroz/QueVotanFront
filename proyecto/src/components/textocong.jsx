import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";

function Texto({infoDip,datoswnominate}){
    var data=[]
    var ejex=[]
    var Dip = datoswnominate.wnominate.filter(dat => dat.ID===Number(infoDip.id))[0]
    datoswnominate.wnominate = datoswnominate.wnominate.filter((dat)=>{return dat.party===Dip.party})
    for(let i in datoswnominate.wnominate){
        ejex.push(Number(datoswnominate.wnominate[i].coord1D.toFixed(1)))
    }
    var Coord= Dip.coord1D.toFixed(1)
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
    return(
        <Container>
            <p>
                El diputado(a) {infoDip.Nombre + " " + infoDip["Apellido Paterno"] + " " + infoDip["Apellido Materno"]}
                que actualmente pertenece a {infoDip.MilitanciaActual} se encuentra en el punto {Coord} en la dimensión 1.
                Su partido se encuentra dividido en:
                {data.map((post,index)=>(
                    <li key={index}>{post.TipoDato} con {post.Valor} personas</li>
                ))}
            </p>
        </Container>
    )
}

export default Texto;