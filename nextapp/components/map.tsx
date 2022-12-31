
import { useRef,useEffect } from 'react'
import * as d3 from 'd3';
import data from "../json/world.json"
import { useState } from 'react'
import { fetch_geo } from "../utils/web_fetch"
import {use_https_url} from "../utils/env_variable"
export default function Map({fetch_iplist}) {
  const iplist=["152.104.187.203"]
  const [geolist, setgeolist] = useState([])
  const ref = useRef()
  useEffect(() => {
    iplist.map((ip, index) => {
      fetch_geo(ip).then(data => {
        if (use_https_url != "false") {
          if (data && data.longitude) {
            console.log("location:",data)
            setgeolist((geolist) => [...geolist, { "lat": data.latitude, "long": data.longitude }])
          }
        }
        else if (data && data.status && data.status == "success") {
          setgeolist((geolist) => [...geolist, { "lat": data.lat, "long": data.lon }])
        }
      })
    })
  }, [])
  useEffect(() => {
    fetch_iplist.map((obj) => {
      let ip=obj.client_ip
      fetch_geo(ip).then(data => {
        if (use_https_url != "false") {
          if (data && data.longitude) {
            console.log("location:",data)
            setgeolist((geolist) => [...geolist, { "lat": data.latitude, "long": data.longitude }])
          }
        }
        else if (data && data.status && data.status == "success") {
          setgeolist((geolist) => [...geolist, { "lat": data.lat, "long": data.lon }])
        }
      })
    })
  },[fetch_iplist])
  useEffect(() => {
        var svg = d3.select(ref.current),
        width = +svg.attr("width"),
        height = +svg.attr("height");

          // Map and projection
          var projection = d3.geoMercator()
              .center([0,20])                // GPS of location to zoom on
              .scale(120)                       // This is like the zoom
            .translate([width / 2, height / 2])
    
    // map
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
      .data(geolist)
      .enter()
      .append("circle")
        .attr("cx", function(d){ return projection([d.long, d.lat])[0] })
        .attr("cy", function(d){ return projection([d.long, d.lat])[1] })
        .attr("r", 3)
        .style("fill", "69b3a2")
        .attr("stroke", "#")
        .attr("stroke-width", 3)
      .attr("fill-opacity", .4)
   // legend
      // svg
      // .append("text")
      //   .attr("text-anchor", "end")
      //   .attr("x", width/2 )
      //   .attr("y", height - 30)
      //   .attr("width", 90)
      //   .html("当前活跃用户")
      //   .style("font-size", 14)
  }, [geolist])
  return (
    <div className=" bg-transparent flex items-center justify-center mx-auto ">
      <svg ref={ref} className="dark:fill-rose-600 fill-slate-700" width="1000" height="450" id="my_dataviz"></svg>
    </div>

  )
}


