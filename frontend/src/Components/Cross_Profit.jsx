import React, {  useRef, useEffect } from "react";
import * as d3 from "d3";


function Cross_Profit({ data }) {
    const svgRef = useRef(null);

    useEffect(() => {
        const yearValues = Object.entries(data)
            .filter(([key]) => key.match(/^\d{4}$/))
            .map(([year, value]) => ({ year: parseInt(year), value }));

        const svg = d3.select(svgRef.current);
        const width = 500;
        const height = 300;
        const margin = { top: 50, right: 20, bottom: 50, left: 40 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        svg.attr("width", width);
        svg.attr("height", height);

        const xScale = d3
            .scaleLinear()
            .domain(d3.extent(yearValues, ({ year }) => year))
            .range([0, innerWidth]);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(yearValues, ({ value }) => value)])
            .range([innerHeight, 0]);

        const line = d3
            .line()
            .x(({ year }) => xScale(year))
            .y(({ value }) => yScale(value));

        const g = svg
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        g.append("path")
            .datum(yearValues)
            .attr("class", "line")
            .attr("d", line)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2);

        g.selectAll("circle")
            .data(yearValues)
            .enter()
            .append("circle")
            .attr("cx", ({ year }) => xScale(year))
            .attr("cy", ({ value }) => yScale(value))
            .attr("r", 4)
            .attr("fill", "steelblue");

        const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
        const yAxis = d3.axisLeft(yScale);

        g.append("g")
            .attr("transform", `translate(0,${innerHeight})`)
            .call(xAxis);

        g.append("g").call(yAxis);

        g.append("text")
            .attr("class", "x-label")
            .attr("x", innerWidth / 2)
            .attr("y", innerHeight + margin.bottom)
            .attr("text-anchor", "middle")
            .text("Year");

        g.append("text")
            .attr("class", "y-label")
            .attr("x", -innerHeight / 2)
            .attr("y", -margin.left + 10)
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .text(data.FB);

    }, [data]);

    return (
            <svg ref={svgRef}></svg>
    );
}

export default Cross_Profit;
