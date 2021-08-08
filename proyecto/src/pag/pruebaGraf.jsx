import React, {useRef, useEffect} from 'react';
import {select} from 'd3';

const data = [  ["T1",100,10],
                ["T2",200,12],
                ["T3",300,5],
                ["T4",400,40],
                ["T5",500,30]]

function Prueba(){
    const svgRef = useRef();
    const width = 800
    const height = 600
    const margintop = 10
    const marginleft = 10
    
    useEffect(()=> {
        const svg = select(svgRef.current)
                    .style("background-color","rgba(10,0,0,0.5)") 
                    .style("width",width)
                    .style("height",height) // Pendiente cambiar esto a porcentaje
                    .style("margin-top",margintop)
                    .style("margin-left",marginleft);

        svg.selectAll("circle")
        .data(data)
        .join(
            enter => enter.append("circle")
                .attr("class", "new")
                .attr("key", value => value[0])
                .attr("r", 5)
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
        <svg  ref={svgRef} className="chart">
        </svg>
        )
}

function ClickedOn(){
    alert("Test")
}

export default Prueba;
