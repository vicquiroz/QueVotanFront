import React, {useRef, useEffect} from 'react';
import { Container } from 'reactstrap';
import {select, symbol, symbolTriangle,brush} from 'd3';

const data = [  ["T1",100,10,"si"],
                ["T2",200,12,"si"],
                ["T3",300,5,"no"],
                ["T4",400,40,"si"],
                ["T5",500,30,"no"]];

                
function Prueba(){
    const svgRef = useRef();
    const width = 800
    const height = 600
    const margintop = 10

    useEffect(()=> {
        const svg = select(svgRef.current)
                    .style("background-color","rgb(240,240,240)")

        
        svg.append("g")
                    .attr("class", "brush")
                    .call(brush().on("brush", brushed));
                    
        svg.selectAll(".point")
        .data(data)
        .join(
            enter => enter.append("path")
                .attr("d", symbol().type(symbolTriangle))
                .attr("key", value => value[0])
                .attr("transform", function(d) {
                    if(d[3]==="si") return "translate("+d[1]+","+d[2]+")"
                    else return "translate("+d[1]+","+d[2]+") rotate(180)"})
                .attr("cx", value => value[1])
                .attr("cy", value => value[2])
                .attr("stroke", "red")
                .on("click",ClickedOn)          // Corregir funcion con paso de parametros
                .attr("fill","rgba(255,10,10,0.5)"),
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
                        style={{"marginTop":margintop}}
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
