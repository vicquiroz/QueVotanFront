import React, {useRef, useEffect} from 'react';
import {select} from 'd3';

const tup = [[1,10],[2,12],[3,5],[4,40],[5,30]]

function Prueba(){
    const svgRef = useRef();

    useEffect(()=> {
        const svg = select(svgRef.current);
        svg.selectAll("circle")
        .data(tup)
        .join(
            enter => enter.append("circle")
                .attr("class", "new")
                .attr("r", 5)
                .attr("cx", value => value[0]*50)
                .attr("cy", value => value[1])
                .attr("stroke", "red"),
            update => update.attr("class", "updated"),
            exit => exit.remove()
        );
    },[]);
    return <svg ref={svgRef}></svg>
}

export default Prueba;
