import React, { useRef, useEffect } from "react";
import * as d3 from "d3";


function Cost_of_Revenue({data}) {
  const svgRef = useRef(null);

  useEffect(() => {
    const yearValues = Object.entries(data)
      .filter(([key]) => key.match(/^\d{4}$/))
      .map(([year, value]) => ({ year, value }));

    const svg = d3.select(svgRef.current);
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    svg.attr("width", width);
    svg.attr("height", height);

    const xScale = d3
      .scaleBand()
      .domain(yearValues.map(({ year }) => year))
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(yearValues, ({ value }) => value)])
      .range([innerHeight, 0]);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.selectAll("rect")
      .data(yearValues)
      .enter()
      .append("rect")
      .attr("x", ({ year }) => xScale(year))
      .attr("y", ({ value }) => yScale(value))
      .attr("width", xScale.bandwidth())
      .attr("height", ({ value }) => innerHeight - yScale(value))
      .attr("fill", "steelblue");

    const xAxis = d3
      .axisBottom(xScale)
      .tickValues(yearValues.map(({ year }) => year));
    const yAxis = d3.axisLeft(yScale);

    g.append("g").attr("transform", `translate(0,${innerHeight})`).call(xAxis);

    g.append("g").call(yAxis);

    g.append("text")
      .attr("class", "x-label")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + margin.bottom)
      .attr("text-anchor", "middle")
      .text("Year");

    svg
      .append("text")
      .attr("class", "chart-title")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text(data.FB);
  }, [data]);

  return (
      <svg ref={svgRef}></svg>
  );
}

export default Cost_of_Revenue;
