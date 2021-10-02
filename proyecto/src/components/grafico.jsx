import React, {useRef, useEffect, useState} from 'react';
import { Container} from 'reactstrap';
import {select, symbol, symbolTriangle,symbolCircle,symbolSquare,symbolDiamond, brush, axisLeft, axisBottom, scaleLinear} from 'd3';
import datos from '../Coord.json'
import datoswnominate from '../WNominate/Wnominate_export29151.json';
import {polygonHull} from 'd3-polygon';
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
var dim 
var width 
var height 
var margin 
var dCuadrado 
var marginDim 
var heightDim
var widthDim
var escalax
var escalay
var transpPuntos = "0.2"
var textsize;
var textsize2;
var pointsize;
var hovertext;
var hullSize;
var vBox;

//Modo Telefono
if(window.innerWidth<600){
    textsize=".5rem"
    textsize2=".4rem"
    hovertext=".5rem"
    pointsize=50
    hullSize=2
}
else{
    //Modo 4k
    if(window.innerWidth>2000){
        textsize="3.3rem"
        textsize2="3.3rem"
        hovertext="1.5rem"
        pointsize=1000
        hullSize=4
    }
    else{
        //Modo 4:3
        if(window.innerWidth<900){
            textsize=".9rem"
            textsize2=".8rem"
            hovertext=".9rem"
            pointsize=125
            hullSize=2
        }
        //Modo Estandar
        else{
            textsize="1.3rem"
            textsize2="1.3rem"
            hovertext="1.3rem"
            pointsize=200
            hullSize=3
        }
        
    }
}

//Filtrar partidos contenidos en var partidos
datoswnominate.wnominate=datoswnominate.wnominate.filter((dat)=> {return dat.party!==partidos.key});

function GraficoPrincipal({setId,setXY}){
    dim= window.innerWidth*0.8;   //No cambiar
    width = dim*0.75;
    height = dim*0.75;
    margin = dim-0.95*dim;
    dCuadrado = dim-0.97*dim;     //No cambiar
    marginDim = margin*2;         //No cambiar
    heightDim=height-marginDim;   //No cambiar
    widthDim=width-marginDim;     //No cambiar
    escalax = height/2;           //No cambiar
    escalay = height/2-2*margin;  //No cambiar
    
    vBox="0 "+String(margin*1.5)+" "+String(dim)+" "+String(height-2.5*margin)
    

    useEffect(()=>{
        function Redimension(){
            window.location.href = window.location.href;
        }
        if(window.innerWidth>=600){
            window.addEventListener('resize', Redimension)
        }
    })
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
            .style("font-size",textsize)
            .call(axisBottom(x));
        svg.append("g")
            .attr("transform","translate("+marginDim+",0)")
            .style("font-size",textsize)
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
        .data(datoswnominate.wnominate)
        .join(
            enter => enter.append("path")
                .attr("id",value => "id_"+value.ID)
                .attr("key", value => value.Nombre)
                .attr("transform", function(d) {
                    if(datoswnominate.votacion[0][d.ID]===1) return "translate("+(d.coord1D*escalay+escalax+margin)+","+((2*escalax)-(d.coord2D*escalay+escalax))+")"
                    else{
                        return "translate("+(d.coord1D*escalay+escalax+margin)+","+((2*escalax)-(d.coord2D*escalay+escalax))+") rotate(180)"
                    }
                })
                .attr("stroke", "black")
                .on("click",function(event,d){
                    ClickPoint(d,{setId},{setXY})
                })
                .on('mouseover', function (event,data){
                    div.transition().duration(100).style("opacity", 1);
                    let name=data.Nombre
                    div.html(name).style("left",(event.pageX+10)+"px").style("top",(event.pageY-15)+"px").style("font-size",hovertext);
                })
                .on('mouseout', function (event,data){
                    div.transition().duration(0).style("opacity", 0);
                    let name=data.Nombre
                    div.html(name).style("left",(-100)+"px").style("top",(-100)+"px");
                })
                .attr("fill",function(d){
                    return partidos[d.party]
                }),
            update => update.attr("class", "updated"),
            exit => exit.remove()
        );
        for(let P in datoswnominate.votacion[0]){
            let path = "path#id_"+P
            if(datoswnominate.votacion[0][P]===0 || datoswnominate.votacion[0][P]===1){
                svg.select(path).attr("d", symbol().size(pointsize).type(symbolTriangle))
            }
            if(datoswnominate.votacion[0][P]===2){
                svg.select(path).attr("d", symbol().size(pointsize).type(symbolCircle))
            }
            if(datoswnominate.votacion[0][P]===3){
                svg.select(path).attr("d", symbol().size(pointsize).type(symbolSquare))
            }
            if(datoswnominate.votacion[0][P]===4){
                svg.select(path).attr("d", symbol().size(pointsize).type(symbolDiamond))
            }
        }

        var partidosAct=datoswnominate.wnominate.map(function(key){
            return key.party
        })
        partidosAct=[...new Set(partidosAct)].sort()
        const vot=["△: A favor","▽: En contra","○: Abstenido","▢: Dispensado","◇: No presente"]
        var legend=svg.selectAll("legend")
        legend.data(partidosAct)
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
        
        legend.data(partidosAct)
            .enter()
            .append("text")
            .attr("x",width+2*dCuadrado)
            .attr("y",function(d,i){ return 3.85*dCuadrado+i*(heightDim-dCuadrado)/17})
            .attr("width",dCuadrado*0.8)
            .attr("height",dCuadrado*0.8)
            .text(function(d){ return d})
            .style("font-size",textsize)
            .style("font-family","Lucida Sans Unicode")
            .attr("id", value => value)
            .on("click",function(event,d){
                svg.selectAll("g.brush").call(brush().clear)
                SelectParty(this,{setId},{setXY})
            })

        legend.data(vot)
            .enter()
            .append("text")
            .attr("x",width+4*dCuadrado)
            .attr("y",function(d,i){ return 3.85*dCuadrado+i*(heightDim-dCuadrado)/17})
            .attr("width",dCuadrado*0.8)
            .attr("height",dCuadrado*0.8)
            .text(function(d){ return d})
            .style("font-size",textsize2)
            .style("font-family","Lucida Sans Unicode")
            .attr("id", value => value)

        ClearGraph({setId},{setXY})
    },[setId,setXY]);
    return(
                    <svg    ref={svgRef} className="chart"
                            width="100%"
                            height="100%"
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
                Nodes.push([Arr,svg.node().childNodes[i].__data__.ID])
            }
        }
        for(let P in Nodes){
            if((Nodes[P][0][0]>=S[0][0] && Nodes[P][0][0] <=S[1][0]) && (Nodes[P][0][1]>=S[0][1] && Nodes[P][0][1] <=S[1][1])){
                NodeSelec.push(Nodes[P][1])
                let envio = datoswnominate.wnominate.find((dat)=> {return dat.ID===Nodes[P][1]});
                posicionX.push(Number(envio.coord1D));
                posicionY.push(Number(envio.coord2D));
            }
        }
        if(NodeSelec.length>0){
            svg.selectAll("path").transition().duration('50').attr('opacity',transpPuntos)
            for(let P in NodeSelec){
                let path = "path#id_"+NodeSelec[P]
                svg.selectAll(path).transition().duration('50').attr('opacity', '1')
            }
        }
        else{
            svg.selectAll("path").transition().duration('50').attr('opacity', '1')
            for(let P in Nodes){
                NodeSelec.push(Nodes[P][1])
                let envio = datoswnominate.wnominate.find((dat)=> {return dat.ID===Nodes[P][1]});
                posicionX.push(Number(envio.coord1D));
                posicionY.push(Number(envio.coord2D));
            }
        }
        setId(NodeSelec);
        setXY([posicionX,posicionY]);
        svg.selectAll("polygon").remove()
    }
    else{
        ClearGraph({setId},{setXY})
    }
}

function SelectParty(event,{setId},{setXY}){
    let Nodes=datoswnominate.wnominate.filter((dat)=> {return dat.party===event.id});
    let NodeSelec = []
    let posicionX = []
    let posicionY = []
    let posicionC = []
    svg.selectAll("path").transition().duration('50').attr('opacity',transpPuntos)
    for(let P in Nodes){
        NodeSelec.push(Nodes[P].ID)
        let path = "path#id_"+Nodes[P].ID
        svg.selectAll(path).transition().duration('50').attr('opacity', '1')
        posicionX.push(Number(Nodes[P].coord1D));
        posicionY.push(Number(Nodes[P].coord2D));
        posicionC.push([Number(Nodes[P].coord1D),Number(Nodes[P].coord2D)])
    }
    setId(NodeSelec);
    setXY([posicionX,posicionY]);

    if(posicionC.length>1){
        var hull = polygonHull(posicionC)
        var hullJson=[]
        for(let i in hull){
            hullJson.push({
                "x":hull[i][0],
                "y":hull[i][1]})
        }
        svg.selectAll("polygon").remove()
        svg.selectAll("polygon")
        .data([hullJson])
        .enter().append("polygon")
        .attr("points",function(d){
            return d.map(function(d) { return [d.x*escalay+escalax+margin,(2*escalax)-(d.y*escalay+escalax)].join(","); });})
        .attr("stroke", partidos[event.id])
        .attr("stroke-width",hullSize)
        .attr("fill","none")
    }
    else{
        svg.selectAll("polygon").remove()
    }
    
}

function ClickPoint(d,{setId},{setXY}){
    let path = "path#id_"+d.ID
    let posicionX = []
    let posicionY = []
    svg.selectAll("path").transition().duration('50').attr('opacity',transpPuntos)
    svg.selectAll("g.brush").call(brush().clear)
    svg.selectAll(path).transition().duration('50').attr('opacity', '1')
    posicionX.push(Number(d.coord1D));
    posicionY.push(Number(d.coord2D));
    setId(Number(d.ID))
    setXY([posicionX,posicionY]);
    svg.selectAll("polygon").remove()
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
            Nodes.push([Arr,svg.node().childNodes[i].__data__.ID])
        }
    }
    for(let P in Nodes){
        NodeSelec.push(Nodes[P][1])
        let envio = datoswnominate.wnominate.find((dat)=> {return dat.ID===Nodes[P][1]});
        posicionX.push(Number(envio.coord1D));
        posicionY.push(Number(envio.coord2D));
    }
    svg.selectAll("polygon").remove()
    setId(NodeSelec);
    setXY([posicionX,posicionY]);
}
export default GraficoPrincipal;