import React, {useRef, useEffect} from 'react';
import {select, max, scaleLinear, scaleBand, axisLeft, axisBottom} from 'd3';
import datoswnominate from '../WNominate/Wnominate_export29151.json';
import { $CombinedState } from 'redux';

var svg;  
var dim 
var width 
var height 
var margin 
var vBox;
var textsize;
//Modo Telefono
if(window.innerWidth<600){
    textsize=".5rem"
}
else{
    //Modo 4k
    if(window.innerWidth>2000){
        textsize="3.3rem"
    }
    else{
        //Modo 4:3
        if(window.innerWidth<900){
            textsize=".9rem"
        }
        //Modo Estandar
        else{
            textsize="2.3rem"
        }
        
    }
}

function GraficoBarra(){
    console.log(datoswnominate.votacion[0])
    let CNo=datoswnominate.wnominate.filter((data)=> {return datoswnominate.votacion[0][data.ID]===0}).length
    let CSi=datoswnominate.wnominate.filter((data)=> {return datoswnominate.votacion[0][data.ID]===1}).length
    let CA= datoswnominate.wnominate.filter((data)=> {return datoswnominate.votacion[0][data.ID]===2}).length
    let CD= datoswnominate.wnominate.filter((data)=> {return datoswnominate.votacion[0][data.ID]===3}).length
    let CNV=datoswnominate.wnominate.filter((data)=> {return datoswnominate.votacion[0][data.ID]===4}).length
    var data =[
        {"TipoDato":"No","Valor":CNo},
        {"TipoDato":"Si","Valor":CSi},
        {"TipoDato":"Abstencion","Valor":CA},
        {"TipoDato":"Dispensado","Valor":CD},
        {"TipoDato":"No Vota","Valor":CNV}
    ];
    var colores = {
        "No":"rgb(255,0,0)",
        "Si":"rgb(0,255,0)",
        "Abstencion":"rgb(0,0,255)",
        "Dispensado":"rgb(0,0,0)",
        "No Vota":"rgb(255,255,255)"
    }
    dim= window.innerWidth*0.8;   //No cambiar
    height=dim*0.5
    width=dim-margin
    margin = dim*0.15;
    
    vBox="0 "+String(margin)+" "+String(dim)+" "+String(height-0.7*margin)
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
        svg = select(svgRef.current)
        var x = scaleLinear().range([0, width-0.2*margin]);
        var y = scaleBand().range([height-margin, 0]).padding(0.1);
        x.domain([0, max(data, function(d){ return d.Valor; })])
        y.domain(data.map(function(d) { return d.TipoDato; }));

        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("width", function(d) {return x(d.Valor); } )
            .attr("y", function(d) { return y(d.TipoDato); })
            .attr("fill",function(d){
                return colores[d.TipoDato]
            })
            .attr("height", y.bandwidth())
            .attr("transform", "translate("+margin+","+margin+")");


        svg.append("g")
            .attr("transform", "translate("+margin+","+(height)+")")
            .style("font-size",textsize)
            .call(axisBottom(x));
    
        svg.append("g")
            .attr("transform", "translate("+margin+","+margin+")")
            .style("font-size",textsize)
            .call(axisLeft(y));
    });
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

export default GraficoBarra;