
import { useRef,useEffect } from 'react'
import * as d3 from 'd3';
export default function Map() {
  
  const ref = useRef()

  useEffect(() => {
    var svg = d3.select(ref.current),
    width = +svg.attr("width"),
    height = +svg.attr("height");

          // Map and projection
          var projection = d3.geoMercator()
              .center([0,20])                // GPS of location to zoom on
              .scale(99)                       // This is like the zoom
              .translate([ width/2, height/2 ])


          // Create data for circles:
          var markers = [
            {long: 9.083, lat: 42.149}, // corsica
            {long: 7.26, lat: 43.71}, // nice
            {long: 2.349, lat: 48.864}, // Paris
            {long: -1.397, lat: 43.664}, // Hossegor
            {long: 3.075, lat: 50.640}, // Lille
            {long: -3.83, lat: 58}, // Morlaix
          ];

          // Load external data and boot
          d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then((data) => {
              
              // Draw the map
              svg.append("g")
              .selectAll("path")
              .data(data.features)
              .enter()
              .append("path")
                .attr("fill", "#b8b8b8")
                .attr("d", d3.geoPath()
                    .projection(projection)
                )
              .style("stroke", "none")
              .style("opacity", .3)
              // Add circles:
              svg
                .selectAll("myCircles")
                .data(markers)
                .enter()
                .append("circle")
                  .attr("cx", function(d){ return projection([d.long, d.lat])[0] })
                  .attr("cy", function(d){ return projection([d.long, d.lat])[1] })
                  .attr("r", 3)
                  .style("fill", "69b3a2")
                  .attr("stroke", "#")
                  .attr("stroke-width", 3)
                .attr("fill-opacity", .4)
            
                svg
                .append("text")
                  .attr("text-anchor", "end")
                 
                  .attr("x", width - 10)
                  .attr("y", height - 30)
                  .attr("width", 90)
                  .html("当前活跃用户")
                  .style("font-size", 14)
          })
  }, [])
  return (
    <div className="dark:bg-slate-800 bg-white flex items-center justify-center mx-auto ">
      <svg ref={ref} className="dark:fill-sky-400 fill-slate-700" width="630" height="350" id="my_dataviz"></svg>
    </div>

  )
}


