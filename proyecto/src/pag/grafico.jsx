import React,{Component} from 'react';
import * as d3 from 'd3'

class BarChart extends Component {
  componentDidMount() {
    this.drawChart();
  }
    
  drawChart() {
    const data = [12, 5, 6, 6, 9, 10]
    const width = 700
    const height = 500

    const svg = d3.select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("margin-left", 100);
   
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => height - 10 * d)
      .attr("width", 65)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "green")
    
      svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((d) => d)
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => height - (10 * d) - 3)
  }
  render(){
    return <div id={"#" + this.props.id}></div>
  }
}
export default BarChart;

export function Graficar(){
    return (
      <div className="Grafico">
        <BarChart/>
      </div>
    );
}
