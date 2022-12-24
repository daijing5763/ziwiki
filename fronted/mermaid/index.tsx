import mermaid from "mermaid"
import { useEffect,useState } from 'react';
let currentId = 0;
const uuid = () => `mermaid-${(currentId++).toString()}`;

const flowchart= {
  htmlLabels: true,
  curve: "basis",
  // useMaxWidth: true,
}
const sequence= {
  diagramMarginX: 50,
  diagramMarginY: 10,
  actorMargin: 50,
  width: 150,
  height: 65,
  boxMargin: 10,
  boxTextMargin: 5,
  noteMargin: 10,
  messageMargin: 35,
  mirrorActors: true,
  bottomMarginAdj: 1,
  useMaxWidth: true,
  rightAngles: false,
  showSequenceNumbers: false,
}
const gantt= {
  titleTopMargin: 25,
  barHeight: 20,
  barGap: 4,
  topPadding: 50,
  leftPadding: 75,
  gridLineStartPadding: 35,
  fontSize: 11,
  fontFamily: '"Open-Sans", "sans-serif"',
  numberSectionStyles: 4,
  axisFormat: "%Y-%m-%d",
}


const DEFAULT_CONFIG_DARK = {
  startOnLoad: false,
  theme: "dark",
  logLevel: 1,
  securityLevel: "strict",
  arrowMarkerAbsolute: false,
  flowchart: flowchart,
  sequence: sequence,
  gantt:gantt,
}
const DEFAULT_CONFIG_LIGHT = {
  startOnLoad: false,
  theme: "default",
  logLevel: 1,
  securityLevel: "strict",
  arrowMarkerAbsolute: true,
  flowchart: flowchart,
  sequence: sequence,
  gantt:gantt,
}
function MermaidCode({ graphDefinition }) {
  const [darkhtml, setdarkHtml] = useState('');
  const [lighthtml, setlightHtml] = useState('');
  useEffect(() => {
    if (graphDefinition) {
      try {
        mermaid.mermaidAPI.initialize({
          ...DEFAULT_CONFIG_DARK
        });
        mermaid.mermaidAPI.render(uuid(), graphDefinition, svgCode =>
          setdarkHtml(svgCode)
        );
      } catch (e) {
        setdarkHtml('')
        console.error(e);
      }
      try {
        mermaid.mermaidAPI.initialize({
          ...DEFAULT_CONFIG_LIGHT
        });
        mermaid.mermaidAPI.render(uuid(), graphDefinition, svgCode =>
          setlightHtml(svgCode)
        );
      } catch (e) {
        setlightHtml('')
        console.error(e);
      }
    }
  },[])
  return graphDefinition ? <div className="flex items-center justify-center"><div className="grow hidden dark:block" dangerouslySetInnerHTML={{ __html: darkhtml }} /> <div className="grow block dark:hidden" dangerouslySetInnerHTML={{ __html: lighthtml }} /></div> : null;
}
export default MermaidCode;
