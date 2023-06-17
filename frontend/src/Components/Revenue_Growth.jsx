import React, {  useRef, useEffect } from "react";
import * as d3 from "d3";

function Revenue_Growth({ data }) {
    const svgRef = useRef(null);

    useEffect(() => {
        const yearValues = Object.entries(data)
            .filter(([key]) => key.match(/^\d{4}$/))
            .map(([year, value]) => ({ year, value: parseFloat(value.replace("%", "")) }));

        const svg = d3.select(svgRef.current);
        const width = 500;
        const height = 300;
        const radius = Math.min(width, height) / 2;
        const margin = { top: 50, right: 20, bottom: 50, left: 40 };

        svg.attr("width", width);
        svg.attr("height", height);

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const arc = d3.arc().innerRadius(0).outerRadius(radius);

        const pie = d3.pie().value(({ value }) => value);

        const arcs = svg
            .selectAll("arc")
            .data(pie(yearValues))
            .enter()
            .append("g")
            .attr("class", "arc")
            .attr("transform", `translate(${width / 2},${height / 2})`);

        arcs
            .append("path")
            .attr("d", arc)
            .attr("fill", (_, i) => color(i));

        const arcLabel = d3.arc().innerRadius(radius * 0.5).outerRadius(radius * 0.8);

        arcs
            .append("text")
            .attr("transform", (d) => `translate(${arcLabel.centroid(d)})`)
            .attr("text-anchor", "middle")
            .text(({ data }) => data.year);

        svg.append("text")
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

export default Revenue_Growth;
