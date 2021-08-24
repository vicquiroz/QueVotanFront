import React, {useRef, useEffect} from 'react';
import { Container } from 'reactstrap';
import {select, symbol, symbolTriangle, brush, axisLeft, axisBottom, scaleLinear} from 'd3';
import datos from '../Coord.json'

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
    "RD"    :"rgb(100,100,100)",
    "EVOP"  :"rgb(200,100,100)",
    "S/I"   :"rgb(100,200,100)",
    "DC"    :"rgb(100,200,200)"
}               
var svg;   
function Prueba({setId}){
    const svgRef = useRef();
    const width = 830
    const height = 630
    const margin = 15

    useEffect(()=> {
        const maeginDim = margin*2;
        const heightDim=height-maeginDim;

        var x = scaleLinear()
            .domain([-1, 1])         
            .range([maeginDim, width]);

        var y = scaleLinear()
            .domain([-1,1])
            .range([heightDim,margin]);

        const escalax = width/2
        const escalay = height/2
        svg = select(svgRef.current)
        svg.append('ellipse')
            .attr('cx', 400)  
            .attr('cy', 300) 
            .attr('rx', 400)
            .attr('ry', 300)
            .attr("transform","translate("+maeginDim+",0)")
            .style('fill', "rgb(210,228,240)")
        
        svg.append("g")
            .attr("transform","translate(0,"+heightDim+")")
            .call(axisBottom(x));
        svg.append("g")
            .attr("transform","translate("+maeginDim+",0)")
            .call(axisLeft(y));

        svg.append("g")
        .attr("class", "brush")
        .call(brush().on("brush", function(event){
            brushed(event,{setId})
        }))
        svg.selectAll(".point")
        .data(datos)
        .join(
            enter => enter.append("path")
                .attr("d", symbol().type(symbolTriangle))
                .attr("key", value => value["Nombre"])
                .attr("transform", function(d) {
                    /*if(d["voto"]==="Si")*/ return "translate("+(d["x"]*escalax+escalax)+","+(d["y"]*escalay+escalay)+")"})
                    //else return "translate("+(d["x"]*escalax+escalax)+","+(d["y"]*escalay+escalay)+") rotate(180)"})
                .attr("stroke", "black")
                .on("click",function(event,d){  //Mejorar la eficiencia de esta llamada a la función
                    setId(d["Id_P"])
                })
                .attr("fill",function(d){
                    return partidos[d["Partido"]]
                }),
            update => update.attr("class", "updated"),
            exit => exit.remove()
        );
        
    },[setId]);

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

function brushed(event,{setId}){
    // En esta funcion, cuando se deje de seleccionar se debe de producir un evento que seleccione
    // los elementos que se encuentran dentro del brush
    var S = event["selection"]
    var NodeSelec = []
    if(S!=null){
        var Nodes = []
        for(var i in datos){
            if(svg.node().childNodes[i].nodeName!=="g"){
                let Arr = svg.node().childNodes[i].attributes.transform.value
                .split("translate").pop().split(' ')[0].replace('(',"")
                .replace(')',"").split(",")
                Arr[0] = parseFloat(Arr[0])
                Arr[1] = parseFloat(Arr[1])
                Nodes.push([Arr,svg.node().childNodes[i].__data__.Id_P])
            }
        }
        for(var P in Nodes){
            if((Nodes[P][0][0]>=S[0][0] && Nodes[P][0][0] <=S[1][0]) && (Nodes[P][0][1]>=S[0][1] && Nodes[P][0][1] <=S[1][1])){
                NodeSelec.push(Nodes[P][1])
                setId(NodeSelec)
            }
        }
    }
    
}

export default Prueba;