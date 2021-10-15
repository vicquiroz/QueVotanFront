import React, {useRef, useEffect} from 'react';
import {select, max,min, scaleLinear, scaleBand, axisLeft, axisBottom} from 'd3';

var svg;  
var dim 
var width 
var height 
var margin 
var vBox;
var textsize;
var hovertext;
//Modo Telefono
dim= window.innerWidth*0.8;   //No cambiar
margin = dim*0.25;
height=dim*0.4
if(window.innerWidth<600){
    textsize=".4rem"
    width=dim-1.1*margin
    hovertext=".5rem"
}
else{
    width=dim-margin
    //Modo 4k
    if(window.innerWidth>2000){
        textsize="3.3rem"
        hovertext="1.5rem"
    }
    else{
        //Modo 4:3
        if(window.innerWidth<900){
            textsize=".7rem"
            hovertext=".9rem"
        }
        //Modo Estandar
        else{
            textsize="1.8rem"
            hovertext="1.3rem"
        }
        
    }
}

function GraficoCong({idDip,datoswnominate}){
    var data=[]
    for(let i in datoswnominate.wnominate){
        data.push({
            "Valor":datoswnominate.wnominate[i].coord1D,
            "TipoDato":datoswnominate.wnominate[i].ID
        })
    }
    vBox="0 "+String(margin-10)+" "+String(dim-20)+" "+String(height*0.65)
    const svgRef = useRef();
    useEffect(()=> {
        svg = select(svgRef.current)
        var x = scaleLinear().range([width-0.2*margin,0]);
        var y = scaleBand().range([height-margin, 0]).padding(0.1);
        x.domain([max(data, function(d){ return d.Valor; }), min(data, function(d){ return d.Valor; })])
        y.domain(data.map(function(d) { return d.TipoDato; }));
        svg.selectAll(".bar").remove()
        svg.selectAll("g").remove()
        
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
        
        if(x.domain()[1]!=0){
            svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("transform", "translate("+margin+","+margin+")")
            .attr("height", y.bandwidth())
            .attr("y", function(d) { return y(d.TipoDato); })
            .attr("id",value => "idBar_"+value.TipoDato)
            .on('mouseover', function (event,data){
                div.transition().duration(100).style("opacity", 1);
                let name=data.Valor
                div.html(name).style("left",(event.pageX+10)+"px").style("top",(event.pageY-15)+"px").style("font-size",hovertext);
            })
            .on('mouseout', function (event,data){
                div.transition().duration(0).style("opacity", 0);
                let name=data.Valor
                div.html(name).style("left",(-100)+"px").style("top",(-100)+"px");
            })
            .attr("fill","white")
            .attr("width", function(d) {return x(d.Valor); } );
            svg.select("#idBar_"+String(idDip)).attr("fill","red")
        }
        
        svg.append("g")
            .attr("transform", "translate("+margin+","+(height)+")")
            .style("font-size",textsize)
            .attr("class","noselect")
            .call(axisBottom(x).tickValues([]))
    
        svg.append("g")
            .attr("transform", "translate("+margin+","+margin+")")
            .style("font-size",textsize)
            .attr("class","noselect")
            .call(axisLeft(y).tickValues([]))

        
    });
    return(
                <svg    ref={svgRef} className="chart text-light"
                        width="100%"
                        height="100%"
                        viewBox={vBox}
                        position="absolute"
                        preserveAspectRatio="xMidYMid meet"
                        style={{backgroundColor:"rgba(50,50,50,0.95)",borderRadius:"10px"}}
                />
        )
}

export default GraficoCong;