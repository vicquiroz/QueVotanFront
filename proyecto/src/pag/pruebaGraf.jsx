import React, {useRef, useEffect} from 'react';
import { Container } from 'reactstrap';
import {select, symbol, symbolTriangle,brush} from 'd3';
import datos from '../datos.json'

const partidos = {
    "RN"    :"rgb(120,28,129)",
    "PPD"   :"rgb(64,67,153)",
    "UDI"   :"rgb(72,139,194)",
    "PRSD"  :"rgb(107,178,140)",
    "AMP"   :"rgb(159,190,87)",
    "PDC"   :"rgb(210,179,63)",
    "IC"    :"rgb(231,126,49)",
    "PS"    :"rgb(217,33,32)",
    "IND"   :"rgb(10,120,0)",
    "PC"    :"rgb(255,215,0)",
    "EV"    :"rgb(10,10,146)",
    "PL"    :"rgb(140,0,120)",
    "RD"    :"rgb(100,100,100)"
}                  
function Prueba(){
    const svgRef = useRef();
    const width = 800
    const height = 600
    const margin = 10
    const escalax = width/2
    const escalay = height/2
    useEffect(()=> {
        const svg = select(svgRef.current)
                    .style("background-color","rgb(240,240,240)")

        
        svg.append("g")
                    .attr("class", "brush")
                    .call(brush().on("brush", brushed));
                    
        svg.selectAll(".point")
        .data(datos)
        .join(
            enter => enter.append("path")
                .attr("d", symbol().type(symbolTriangle))
                .attr("key", value => value["nombre"])
                .attr("transform", function(d) {
                    if(d["voto"]==="Si") return "translate("+(d["x"]*escalax+escalax)+","+(d["y"]*escalay+escalay)+")"
                    else return "translate("+(d["x"]*escalax+escalax)+","+(d["y"]*escalay+escalay)+") rotate(180)"})
                .attr("stroke", "black")
                .on("click",ClickedOn)          // Corregir funcion con paso de parametros
                .attr("fill",function(d){
                    return partidos[d["partido"]]
                }),
            update => update.attr("class", "updated"),
            exit => exit.remove()
        );
        
    },[]);

    return(
        <Container>
            <div className="d-flex justify-content-center">
                <svg    ref={svgRef} className="chart"
                        width={width}
                        height={height}
                        style={{"marginTop":margin,
                                "marginBottom":margin}}
                />
            </div>
        </Container>
        )
}

function ClickedOn(){
    alert("TEST")
}

function brushed(){
    // En esta funcion, cuando se deje de seleccionar se debe de producir un evento que seleccione
    // los elementos que se encuentran dentro del brush
}

export default Prueba;