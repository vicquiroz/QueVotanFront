import React, {useRef, useEffect} from 'react';
import { Container } from 'reactstrap';
import {select, max, scaleLinear, scaleBand, axisLeft, axisBottom} from 'd3';

var data =[
    {"Voto":"Si",
    "Valor":100},
    {"Voto":"No",
    "Valor":50}
];
var svg;   
function GraficoBarra(){
    const svgRef = useRef();
    const width = 260
    const height = 100
    const margin = 10
    const widthDim = width+margin*2
    const heightDim = height+margin*2
    useEffect(()=> {
        svg = select(svgRef.current).style("background-color","rgb(240,240,240)")
        var x = scaleLinear().range([0, width]);
        var y = scaleBand().range([height, 0]).padding(0.1);
                  
        
        x.domain([0, max(data, function(d){ return d.Valor; })])
        y.domain(data.map(function(d) { return d.Voto; }));

        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("width", function(d) {return x(d.Valor); } )
            .attr("y", function(d) { return y(d.Voto); })
            .attr("height", y.bandwidth());
    
        svg.append("g")
            .attr("transform", "translate(0,"+height+")")
            .call(axisBottom(x));
    
        svg.append("g")
            .call(axisLeft(y));
    });
    console.log()
    return(
        <Container>
            <div className="d-flex justify-content-left">
                <svg    ref={svgRef} className="chart"
                        width={widthDim}
                        height={heightDim}
                        style={{"marginTop":margin,
                                "marginBottom":margin}}
                />
            </div>
        </Container>
        )
}


export default GraficoBarra;