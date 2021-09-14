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
    const height = window.innerWidth*0.03
    const width = window.innerWidth*0.25
    const margin = 0.15*window.innerWidth*0.2
    useEffect(()=> {
        svg = select(svgRef.current).style("background-color","rgb(240,240,240)")
        var x = scaleLinear().range([0, width-margin]);
        var y = scaleBand().range([height, 0]).padding(0.1);
        x.domain([0, max(data, function(d){ return d.Valor; })])
        y.domain(data.map(function(d) { return d.Voto; }));

        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("width", function(d) {return x(d.Valor); } )
            .attr("y", function(d) { return y(d.Voto); })
            .attr("height", y.bandwidth())
            .attr("transform", "translate("+margin+","+margin/4+")");
    
        svg.append("g")
            .attr("transform", "translate("+margin+","+(height+(margin/4))+")")
            .call(axisBottom(x));
    
        svg.append("g")
            .attr("transform", "translate("+margin+","+margin/4+")")
            .call(axisLeft(y));
    });
    return(
                <svg    ref={svgRef} className="chart"
                        width={width+margin}
                        height={height+margin}
                        style={{"marginTop":margin,
                                "marginBottom":margin}}
                />
        )
}

export default GraficoBarra;