import React, {useRef, useEffect} from 'react';
import { Container} from 'reactstrap';
import {select, symbol, symbolTriangle, brush, axisLeft, axisBottom, scaleLinear} from 'd3';
import datos from '../Coord.json'

const partidos = {
    "RN"    :"rgb(120,28,129)",
    "PPD"   :"rgb(64,67,253)",
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
    "S/I"   :"rgb(50,255,50)",
    "DC"    :"rgb(255,255,255)"
}
var svg;  
const dim = window.innerWidth*0.8;
const width = dim*0.85;
const height = dim*0.85;
const margin = dim-0.95*dim;
const dCuadrado = dim-0.97*dim;
const marginDim = margin*2;         //No cambiar
const heightDim=height-marginDim;   //No cambiar
const widthDim=width-marginDim;     //No cambiar
const escalax = height/2;           //No cambiar
const escalay = height/2-2*margin;  //No cambiar

var textsize;
var pointsize;
if(window.innerWidth<600){
    textsize=".5rem"
    pointsize=50
}
else{
    textsize="1.3rem"
    pointsize=200
} 
const vBox="0 0 "+String(dim)+" "+String(height)
function GraficoPrincipal({setId,setXY}){
    const svgRef = useRef();
    useEffect(()=> {
        var x = scaleLinear()
            .domain([-1, 1])         
            .range([marginDim, width]);

        var y = scaleLinear()
            .domain([-1,1])
            .range([heightDim,marginDim]);

        var makeYLines = () => axisLeft().scale(y);
        var makeXLines = () => axisBottom().scale(x);

        svg = select(svgRef.current)
        svg.append('ellipse')
            .attr('cx', height/2-margin)  
            .attr('cy', height/2) 
            .attr('rx', height/2-margin)
            .attr('ry', height/2-2*margin)
            .attr("transform","translate("+marginDim+",0)")
            .style('fill', "rgb(210,228,240)")
        
        svg.append("g")
            .attr("transform","translate(0,"+heightDim+")")
            .call(axisBottom(x));
        svg.append("g")
            .attr("transform","translate("+marginDim+",0)")
            .call(axisLeft(y));

        svg.append("g")
            .attr("class", "grid")
            .attr("transform","translate("+marginDim+",0)")
            .call(
                makeYLines()
                    .tickSize(-widthDim)
                    .tickFormat("")
                )
            .attr("opacity", 0.25);
        svg.append("g")
            .attr("class", "grid")
            .attr("transform","translate(0,"+heightDim+")")
            .call(
                makeXLines()
                    .tickSize(-heightDim+marginDim)
                    .tickFormat("")
                )
            .attr("opacity", 0.25);

        svg.append("g")
        .attr("class", "brush")
        .call(brush().on("start end", function(event){
            brushed(event,{setId},{setXY})
        }))
        

        var div = select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("position","absolute")
        .style("text-aling","center")
        .style("background","#FFFFFF")
        .style("padding",".1rem")
        .style("border","1px solid #313639")
        .style("border-radius","8px")
        .style("font-size",textsize)
        .style("font-family","Lucida Sans Unicode")
        svg.selectAll(".point")
        .data(datos["Legislatura"])
        .join(
            enter => enter.append("path")
                .attr("d", symbol().size(pointsize).type(symbolTriangle))
                .attr("id",value => "id_"+value["Id_P"])
                .attr("key", value => value["Nombre"])
                .attr("transform", function(d) {
                    /*if(d["voto"]==="Si")*/ return "translate("+(d["X"]*escalay+escalax+margin)+","+((2*escalax)-(d["Y"]*escalay+escalax))+")"})
                    //else return "translate("+(d["x"]*escalax+escalax)+","+(d["y"]*escalay+escalay)+") rotate(180)"})
                .attr("stroke", "black")
                .on("click",function(event,d){
                    ClickPoint(d,{setId},{setXY})
                })
                .on('mouseover', function (event,data){
                    div.transition().duration(100).style("opacity", 1);
                    let name=data["Nombre"]
                    div.html(name).style("left",(event.pageX+10)+"px").style("top",(event.pageY-15)+"px");
                })
                .on('mouseout', function (event,data){
                    div.transition().duration(0).style("opacity", 0);
                    let name=data["Nombre"]
                    div.html(name).style("left",(-100)+"px").style("top",(-100)+"px");
                })
                .attr("fill",function(d){
                    return partidos[d["Partido"]]
                }),
            update => update.attr("class", "updated"),
            exit => exit.remove()
        );
        var legend=svg.selectAll("legend")
        legend.data(Object.keys(partidos))
            .enter()
            .append("rect")
            .attr("x",width+dCuadrado)
            .attr("y",function(d,i){ return 3.2*dCuadrado+i*(heightDim-dCuadrado)/17})
            .attr("width",dCuadrado*0.8)
            .attr("height",dCuadrado*0.8)
            .style("fill",function(d){
                return partidos[d]})
            .attr("stroke", "black")
            .attr("id", value => value)
            .on("click",function(event,d){
                svg.selectAll("g.brush").call(brush().clear)
                SelectParty(this,{setId},{setXY})
            })
        
        legend.data(Object.keys(partidos))
            .enter()
            .append("text")
            .attr("x",width+2.5*dCuadrado)
            .attr("y",function(d,i){ return 3.7*dCuadrado+i*(heightDim-dCuadrado)/17})
            .attr("width",dCuadrado*0.8)
            .attr("height",dCuadrado*0.8)
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .style("font-size",textsize)
            .style("font-family","Lucida Sans Unicode")
            .attr("id", value => value)
            .on("click",function(event,d){
                svg.selectAll("g.brush").call(brush().clear)
                SelectParty(this,{setId},{setXY})
            })

        ClearGraph({setId},{setXY})
    },[setId,setXY]);
    return(
                    <svg    ref={svgRef} className="chart"
                            width="90%"
                            height="90%"
                            viewBox={vBox}
                            position="absolute"
                            preserveAspectRatio="xMidYMid meet"
                    />
        )
}

function brushed(event,{setId},{setXY}){
    var S = event.selection
    var NodeSelec = []
    if(S!=null){
        var Nodes = []
        let posicionX = []
        let posicionY = []
        for(let i in svg.node().childNodes){
            if(svg.node().childNodes[i].nodeName==="path"){
                let Arr = svg.node().childNodes[i].attributes.transform.value
                .split("translate").pop().split(' ')[0].replace('(',"")
                .replace(')',"").split(",")
                Arr[0] = parseFloat(Arr[0])
                Arr[1] = parseFloat(Arr[1])
                Nodes.push([Arr,svg.node().childNodes[i].__data__.Id_P])
            }
        }
        for(let P in Nodes){
            if((Nodes[P][0][0]>=S[0][0] && Nodes[P][0][0] <=S[1][0]) && (Nodes[P][0][1]>=S[0][1] && Nodes[P][0][1] <=S[1][1])){
                NodeSelec.push(Nodes[P][1])
                let envio = datos.Legislatura.find((dat)=> {return dat.Id_P===Nodes[P][1]});
                posicionX.push(Number(envio.X));
                posicionY.push(Number(envio.Y));
            }
        }
        if(NodeSelec.length>0){
            svg.selectAll("path").transition().duration('50').attr('opacity', '0.5')
            for(let P in NodeSelec){
                let path = "path#id_"+NodeSelec[P]
                svg.selectAll(path).transition().duration('50').attr('opacity', '1')
            }
        }
        else{
            svg.selectAll("path").transition().duration('50').attr('opacity', '1')
            for(let P in Nodes){
                NodeSelec.push(Nodes[P][1])
                let envio = datos.Legislatura.find((dat)=> {return dat.Id_P===Nodes[P][1]});
                posicionX.push(Number(envio.X));
                posicionY.push(Number(envio.Y));
            }
        }
        setId(NodeSelec);
        setXY([posicionX,posicionY]);
    }
    else{
        ClearGraph({setId},{setXY})
    }
}

function SelectParty(event,{setId},{setXY}){
    let party=event.id
    let Nodes=datos.Legislatura.filter((dat)=> {return dat.Partido===party});
    let NodeSelec = []
    let posicionX = []
    let posicionY = []
    svg.selectAll("path").transition().duration('50').attr('opacity', '0.5')
    for(let P in Nodes){
        let path = "path#id_"+Nodes[P].Id_P
        NodeSelec.push(Nodes[P].Id_P)
        svg.selectAll(path).transition().duration('50').attr('opacity', '1')
        posicionX.push(Number(Nodes[P].X));
        posicionY.push(Number(Nodes[P].Y));
    }
    setId(NodeSelec);
    setXY([posicionX,posicionY]);
}

function ClickPoint(d,{setId},{setXY}){
    let path = "path#id_"+d.Id_P
    let posicionX = []
    let posicionY = []
    svg.selectAll("path").transition().duration('50').attr('opacity', '0.5')
    svg.selectAll("g.brush").call(brush().clear)
    svg.selectAll(path).transition().duration('50').attr('opacity', '1')
    posicionX.push(Number(d.X));
    posicionY.push(Number(d.Y));
    setId(Number(d.Id_P))
    setXY([posicionX,posicionY]);
}

function ClearGraph({setId},{setXY}){
    svg.selectAll("path").transition().duration('50').attr('opacity', '1')
    var Nodes = []
    var NodeSelec = []
    let posicionX = []
    let posicionY = []
    for(let i in svg.node().childNodes){
        if(svg.node().childNodes[i].nodeName==="path"){
            let Arr = svg.node().childNodes[i].attributes.transform.value
            .split("translate").pop().split(' ')[0].replace('(',"")
            .replace(')',"").split(",")
            Arr[0] = parseFloat(Arr[0])
            Arr[1] = parseFloat(Arr[1])
            Nodes.push([Arr,svg.node().childNodes[i].__data__.Id_P])
        }
    }
    for(let P in Nodes){
        NodeSelec.push(Nodes[P][1])
        let envio = datos.Legislatura.find((dat)=> {return dat.Id_P===Nodes[P][1]});
        posicionX.push(Number(envio.X));
        posicionY.push(Number(envio.Y));
    }
    setId(NodeSelec);
    setXY([posicionX,posicionY]);
}
export default GraficoPrincipal;