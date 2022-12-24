// import Plot from 'react-plotly.js';


import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })
// import {PlotParams} from 'react-plotly.js';
export default function Plotly() {
  return (
    <div className="bg-slate-700">
      <Plot  className="bg-blue-500"
      data={[
        {
          x: [1, 2, 3],
          y: [2, 6, 3],
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'red' },
          fill: { color: "#2849cc" },
          font: { color: "white", size: 20 },
  
        },
        {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
      ]}
        layout={{ width: 500, height: 500, title: 'A Fancy Plot' }}
    />
    </div>
    
  );
}
