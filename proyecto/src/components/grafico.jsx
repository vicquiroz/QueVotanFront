import React, { useRef, useEffect } from 'react';
import { select, symbol, symbolTriangle, symbolCircle, symbolSquare, symbolDiamond, brush, axisLeft, axisBottom, scaleLinear } from 'd3';
import partidos from './partidos.json'
import {Container} from "reactstrap";
import partidosinvertidos from './partidos-invertidos.json'
import { polygonHull } from 'd3-polygon';
import { isMobile } from "react-device-detect";
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
var strokewidth;
var vBox;

//Modo Telefono
if (window.innerHeight < 750) {
    textsize = ".5rem"
    textsize2 = ".4rem"
    hovertext = ".5rem"
    pointsize = 25
    hullSize = 2
    strokewidth = "0.5px"
}
else {
    //Modo 4k
    if (window.innerHeight > 3000) {
        strokewidth = "3px"
        textsize = "3.3rem"
        textsize2 = "3.3rem"
        hovertext = "1.5rem"
        pointsize = 1000
        hullSize = 4
    }
    else {
        //Modo 21:9
        if (window.innerHeight > 2200) {
            strokewidth = "2.5px"
            textsize = "2rem"
            textsize2 = "2rem"
            hovertext = "1.5rem"
            pointsize = 750
            hullSize = 4
        }
        else {
            //Modo 4:3
            if (window.innerHeight < 1200) {
                strokewidth = "1px"
                textsize = ".9rem"
                textsize2 = ".8rem"
                hovertext = ".9rem"
                pointsize = 125
                hullSize = 2
            }
            //Modo Estandar 16:9
            else {
                strokewidth = "2px"
                textsize = "1.3rem"
                textsize2 = "1.3rem"
                hovertext = "1.3rem"
                pointsize = 200
                hullSize = 3
            }
        }
    }
}
function GraficoPrincipal({ setId, setXY, datoswnominate, datosvot}) {
    dim = window.innerHeight;   //No cambiar
    width = dim * 0.68;
    height = dim * 0.68;
    margin = dim - 0.95 * dim;
    dCuadrado = dim - 0.97 * dim;     //No cambiar
    marginDim = margin * 2;         //No cambiar
    heightDim = height - marginDim;   //No cambiar
    widthDim = width - marginDim;     //No cambiar
    escalax = height / 2;           //No cambiar
    escalay = height / 2 - 2 * margin;  //No cambiar
    vBox = "0 " + String(margin * 1.5) + " " + String(dim * 1.1) + " " + String(height - 2.3 * margin)

    useEffect(() => {
        function Redimension() {
            if (!isMobile) {
                window.location.href = window.location.href;
            }
        }
        window.addEventListener('resize', Redimension)
    })
    const svgRef = useRef();
    useEffect(() => {
        var x = scaleLinear()
            .domain([-1, 1])
            .range([marginDim, width]);

        var y = scaleLinear()
            .domain([-1, 1])
            .range([heightDim, marginDim]);

        var makeYLines = () => axisLeft().scale(y);
        var makeXLines = () => axisBottom().scale(x);

        svg = select(svgRef.current)
        svg.append('ellipse')
            .attr('cx', height / 2 - margin)
            .attr('cy', height / 2)
            .attr('rx', height / 2 - margin)
            .attr('ry', height / 2 - 2 * margin)
            .attr("transform", "translate(" + marginDim + ",0)")
            .style('fill', "rgba(210,228,240,0.8)")

        svg.append("g")
            .attr("transform", "translate(0," + heightDim + ")")
            .style("font-size", textsize)
            .attr("fill", "white")
            .call(axisBottom(x));
        svg.append("g")
            .attr("transform", "translate(" + marginDim + ",0)")
            .style("font-size", textsize)
            .attr("fill", "white")
            .call(axisLeft(y));

        svg.append("g")
            .attr("class", "grid")
            .attr("fill", "white")
            .attr("transform", "translate(" + marginDim + ",0)")
            .call(
                makeYLines()
                    .tickSize(-widthDim)
                    .tickFormat("")
            )
            .attr("opacity", 0.25);
        svg.append("g")
            .attr("class", "grid")
            .attr("fill", "white")
            .attr("transform", "translate(0," + heightDim + ")")
            .call(
                makeXLines()
                    .tickSize(-heightDim + marginDim)
                    .tickFormat("")
            )
            .attr("opacity", 0.25);

        svg.append("g")
            .attr("class", "brush")
            .call(brush().on("end", function (event) {
                brushed(event, { setId }, { setXY }, { datoswnominate })
            }))
        var div = select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .style("position", "absolute")
            .style("text-aling", "center")
            .style("background", "#FFFFFF")
            .style("padding", ".1rem")
            .style("border", "1px solid #313639")
            .style("border-radius", "8px")
            .style("font-size", textsize)
            .style("font-family", "Lucida Sans Unicode")
            .attr("fill", "white")
        svg.selectAll(".point")
            .data(datoswnominate.wnominate)
            .join(
                enter => enter.append("path")
                    .attr("id", value => "id_" + value.ID)
                    .attr("key", value => value.Nombre)
                    .attr("transform", function (d) {
                        if (datoswnominate.votacion[0][d.ID] === 1) return "translate(" + (d.coord1D * escalay + escalax + margin) + "," + ((2 * escalax) - (d.coord2D * escalay + escalax)) + ")"
                        else {
                            return "translate(" + (d.coord1D * escalay + escalax + margin) + "," + ((2 * escalax) - (d.coord2D * escalay + escalax)) + ") rotate(180)"
                        }
                    })
                    .attr("stroke", function (d) {
                        return partidosinvertidos[d.party]
                    })
                    .attr("stroke-width", strokewidth)
                    //.attr("stroke", "black")
                    .on("click", function (event, d) {
                        ClickPoint(d, { setId }, { setXY })
                    })
                    .on('mouseover', function (event, data) {
                        div.transition().duration(100).style("opacity", 1);
                        let name = data.Nombre
                        div.html(name).style("left", (event.pageX + 10) + "px").style("top", (event.pageY - 15) + "px").style("font-size", hovertext);
                    })
                    .on('mouseout', function (event, data) {
                        div.transition().duration(0).style("opacity", 0);
                        let name = data.Nombre
                        div.html(name).style("left", (-100) + "px").style("top", (-100) + "px");
                    })
                    .attr("fill", function (d) {
                        return partidos[d.party]
                    }),
                update => update.attr("class", "updated"),
                exit => exit.remove()
            );
        for (let P in datoswnominate.votacion[0]) {
            let path = "path#id_" + P
            if (datoswnominate.votacion[0][P] === 0 || datoswnominate.votacion[0][P] === 1) {
                svg.select(path).attr("d", symbol().size(pointsize).type(symbolTriangle))
            }
            if (datoswnominate.votacion[0][P] === 2) {
                svg.select(path).attr("d", symbol().size(pointsize).type(symbolCircle))
            }
            if (datoswnominate.votacion[0][P] === 3) {
                svg.select(path).attr("d", symbol().size(pointsize).type(symbolSquare))
            }
            if (datoswnominate.votacion[0][P] === 4) {
                svg.select(path).attr("d", symbol().size(pointsize).type(symbolDiamond))
            }
        }

        var partidosAct = datoswnominate.wnominate.map(function (key) {
            return key.party
        })
        partidosAct = [...new Set(partidosAct)]
        partidosAct.sort(function (a, b) {
            return Object.keys(partidos).indexOf(a) - Object.keys(partidos).indexOf(b);
        });
        var legend = svg.selectAll("legend")
        legend.data(partidosAct)
            .enter()
            .append("rect")
            .attr("x", width + dCuadrado)
            .attr("y", function (d, i) { return 3.2 * dCuadrado + i * (heightDim - dCuadrado) / 20 })
            .attr("width", dCuadrado * 0.8)
            .attr("height", dCuadrado * 0.8)
            .style("fill", function (d) {
                return partidos[d]
            })
            .attr("fill", "white")
            .attr("id", value => value)
            .on("click", function (event, d) {
                svg.selectAll("g.brush").call(brush().clear)
                SelectParty(this, { setId }, { setXY }, { datoswnominate })
            })
        legend.data(partidosAct)
            .enter()
            .append("text")
            .attr("class", "noselect")
            .attr("x", width + 2 * dCuadrado)
            .attr("y", function (d, i) { return 3.85 * dCuadrado + i * (heightDim - dCuadrado) / 20 })
            .attr("width", dCuadrado * 0.8)
            .attr("height", dCuadrado * 0.8)
            .text(function (d) { return d })
            .style("font-size", textsize)
            .style("font-family", "Lucida Sans Unicode")
            .attr("fill", "white")
            .attr("id", value => value)
            .on("click", function (event, d) {
                svg.selectAll("g.brush").call(brush().clear)
                SelectParty(this, { setId }, { setXY }, { datoswnominate })
            })
        const vot = ["△ A favor", "▽ En contra", "○ Abstenido", "▢ Dispensado", "◇ No presente"]
        legend.data(vot)
            .enter()
            .append("text")
            .attr("class", "noselect")
            .attr("x", width + 7 * dCuadrado)
            .attr("y", function (d, i) { return 3.85 * dCuadrado + i * (heightDim - dCuadrado) / 17 })
            .attr("width", dCuadrado * 0.8)
            .attr("height", dCuadrado * 0.8)
            .text(function (d) { return d })
            .style("font-size", textsize2)
            .style("font-family", "Lucida Sans Unicode")
            .attr("fill", "white")
            .attr("id", value => value)
            .on("click", function (event, d) {
                svg.selectAll("g.brush").call(brush().clear)
                svg.selectAll("polygon").remove()
                SelectEstado(this, { setId }, { setXY }, { datoswnominate })
            })
        const años = ["Boletin: "+datosvot[0].detalle[0].numeroBoletin,"ID: "+datosvot[0].detalle_id,"Inicio: "+datosvot[0].detalle[0].fechaIngreso.split("T")[0],"Fin: "+datosvot[0].detalle[0].VotacionesAsoc[0].date.split("T")[0]]
        legend.data(años)
            .enter()
            .append("text")
            .attr("class", "noselect")
            .attr("x", width + 7 * dCuadrado)
            .attr("y", function (d, i) { return 10 * dCuadrado + i * (heightDim - dCuadrado) / 17 })
            .attr("width", dCuadrado * 0.8)
            .attr("height", dCuadrado * 0.8)
            .text(function (d) { return d })
            .style("font-size", textsize2)
            .style("font-family", "Lucida Sans Unicode")
            .attr("fill", "white")

        ClearGraph({ setId }, { setXY }, { datoswnominate })
    }, [setId, setXY, datoswnominate]);
    return (
        <div>
            <br />
            <h3 className="text-light"  style={{backgroundColor:"rgba(50,50,50,0.95)",borderRadius:"10px"}}>
                <Container>{datosvot[0].detalle[0].nombre}</Container>
            </h3>
            <svg ref={svgRef} className="chart text-light"
                width="100%"
                height="100%"
                viewBox={vBox}
                position="absolute"
                preserveAspectRatio="xMidYMid meet"
                style={{
                    "marginBottom": margin / 3,
                    backgroundColor: "rgba(50,50,50,0.95)",
                    borderRadius: "10px"
                }}
            />
        </div>
    )
}

function brushed(event, { setId }, { setXY }, { datoswnominate }) {
    if (datoswnominate === undefined) {
        datoswnominate = {
            "id": 0,
            "wnominate": [{}],
            "fecha_vot": "Aca va la fecha",
            "votacion": [{}]
        }
    }
    var S = event.selection
    var NodeSelec = []
    if (S != null) {
        var Nodes = []
        let posicionX = []
        let posicionY = []
        for (let i in svg.node().childNodes) {
            if (svg.node().childNodes[i].nodeName === "path") {
                let Arr = svg.node().childNodes[i].attributes.transform.value
                    .split("translate").pop().split(' ')[0].replace('(', "")
                    .replace(')', "").split(",")
                Arr[0] = parseFloat(Arr[0])
                Arr[1] = parseFloat(Arr[1])
                Nodes.push([Arr, svg.node().childNodes[i].__data__.ID])
            }
        }
        for (let P in Nodes) {
            if ((Nodes[P][0][0] >= S[0][0] && Nodes[P][0][0] <= S[1][0]) && (Nodes[P][0][1] >= S[0][1] && Nodes[P][0][1] <= S[1][1])) {
                NodeSelec.push(Nodes[P][1])
                let envio = datoswnominate.wnominate.find((dat) => { return dat.ID === Nodes[P][1] });
                posicionX.push(Number(envio.coord1D));
                posicionY.push(Number(envio.coord2D));
            }
        }
        if (NodeSelec.length > 0) {
            svg.selectAll("path").transition().duration('50').attr('opacity', transpPuntos)
                .transition()
                .duration(200)
            for (let P in NodeSelec) {
                let path = "path#id_" + NodeSelec[P]
                svg.selectAll(path).transition().duration('50').attr('opacity', '0.6')
            }
        }
        else {
            svg.selectAll("path").transition().duration('50').attr('opacity', '0.8')
            for (let P in Nodes) {
                NodeSelec.push(Nodes[P][1])
                let envio = datoswnominate.wnominate.find((dat) => { return dat.ID === Nodes[P][1] });
                posicionX.push(Number(envio.coord1D));
                posicionY.push(Number(envio.coord2D));
            }
        }
        setId(NodeSelec);
        setXY([posicionX, posicionY]);
        svg.selectAll("polygon").remove()
    }
    else {
        ClearGraph({ setId }, { setXY }, { datoswnominate })
    }
}

function SelectParty(event, { setId }, { setXY }, { datoswnominate }) {
    let Nodes = datoswnominate.wnominate.filter((dat) => { return dat.party === event.id });
    let NodeSelec = []
    let posicionX = []
    let posicionY = []
    let posicionC = []
    svg.selectAll("path").transition().duration('50').attr('opacity', transpPuntos)
    for (let P in Nodes) {
        NodeSelec.push(Nodes[P].ID)
        let path = "path#id_" + Nodes[P].ID
        svg.selectAll(path).transition().duration('50').attr('opacity', '0.6')
        posicionX.push(Number(Nodes[P].coord1D));
        posicionY.push(Number(Nodes[P].coord2D));
        posicionC.push([Number(Nodes[P].coord1D), Number(Nodes[P].coord2D)])
    }
    setId(NodeSelec);
    setXY([posicionX, posicionY]);

    if (posicionC.length > 1) {
        var hull = polygonHull(posicionC)
        var hullJson = []
        for (let i in hull) {
            hullJson.push({
                "x": hull[i][0],
                "y": hull[i][1]
            })
        }
        svg.selectAll("polygon").remove()

        svg.selectAll("body")
            .data([hullJson])
            .enter()
            .append("polygon")
            .attr("points", function (d) {
                return d.map(function (d) { return [d.x * escalay + escalax + margin, (2 * escalax) - (d.y * escalay + escalax)].join(","); });
            })
            .attr("stroke", partidosinvertidos[event.id])
            .transition()
            .duration(200)
            .attr("stroke-width", hullSize * 2)
            .attr("fill", 'none')
            .attr('opacity', '0.6')

        svg.selectAll("body")
            .data([hullJson])
            .enter()
            .append("polygon")
            .attr("points", function (d) {
                return d.map(function (d) { return [d.x * escalay + escalax + margin, (2 * escalax) - (d.y * escalay + escalax)].join(","); });
            })
            .attr("stroke", partidos[event.id])
            .transition()
            .duration(200)
            .attr("stroke-width", hullSize)
            .attr("fill", 'none')
            .attr('opacity', '0.6')



    }
    else {
        svg.selectAll("polygon").remove()
    }

}

function SelectEstado(event, { setId }, { setXY }, { datoswnominate }) {
    const estados = { "△ A favor": 1, "▽ En contra": 0, "○ Abstenido": 2, "▢ Dispensado": 3, "◇ No presente": 4 }
    let Nodes = datoswnominate.wnominate.filter((dat) => { return datoswnominate.votacion[0][dat.ID] === estados[event.id] });
    let NodeSelec = []
    let posicionX = []
    let posicionY = []
    let posicionC = []
    svg.selectAll("path").transition().duration('50').attr('opacity', transpPuntos)
    for (let P in Nodes) {
        NodeSelec.push(Nodes[P].ID)
        let path = "path#id_" + Nodes[P].ID
        svg.selectAll(path).transition().duration('50').attr('opacity', '0.6')
        posicionX.push(Number(Nodes[P].coord1D));
        posicionY.push(Number(Nodes[P].coord2D));
        posicionC.push([Number(Nodes[P].coord1D), Number(Nodes[P].coord2D)])
    }
    setId(NodeSelec);
    setXY([posicionX, posicionY]);
}

function ClickPoint(d, { setId }, { setXY }) {
    let path = "path#id_" + d.ID
    let posicionX = []
    let posicionY = []
    svg.selectAll("path").transition().duration('50').attr('opacity', transpPuntos)
    svg.selectAll("g.brush").call(brush().clear)
    svg.selectAll(path).transition().duration('50').attr('opacity', '0.6')
    posicionX.push(Number(d.coord1D));
    posicionY.push(Number(d.coord2D));
    setId(Number(d.ID))
    setXY([posicionX, posicionY]);
    svg.selectAll("polygon").remove()
}

function ClearGraph({ setId }, { setXY }, { datoswnominate }) {
    svg.selectAll("path").transition().duration('50').attr('opacity', '0.6')
        .transition()
        .duration(200)
    var Nodes = []
    var NodeSelec = []
    let posicionX = []
    let posicionY = []

    for (let i in svg.node().childNodes) {
        if (svg.node().childNodes[i].nodeName === "path") {
            let Arr = svg.node().childNodes[i].attributes.transform.value
                .split("translate").pop().split(' ')[0].replace('(', "")
                .replace(')', "").split(",")
            Arr[0] = parseFloat(Arr[0])
            Arr[1] = parseFloat(Arr[1])
            Nodes.push([Arr, svg.node().childNodes[i].__data__.ID])
        }
    }
    for (let P in Nodes) {
        NodeSelec.push(Nodes[P][1])
        let envio = datoswnominate.wnominate.find((dat) => { return dat.ID === Nodes[P][1] });
        posicionX.push(Number(envio.coord1D));
        posicionY.push(Number(envio.coord2D));
    }
    svg.selectAll("polygon").remove()
    setId(NodeSelec);
    setXY([posicionX, posicionY]);
}
export default GraficoPrincipal;