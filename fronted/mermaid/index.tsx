import mermaid from "mermaid"
import { useEffect,useState } from 'react';
let currentId = 0;
const uuid = () => `mermaid-${(currentId++).toString()}`;
const DEFAULT_CONFIG = {
  startOnLoad: false,
  theme: "dark",
  logLevel: 1,
  securityLevel: "strict",
  arrowMarkerAbsolute: false,
  flowchart: {
    htmlLabels: true,
    curve: "linear",
  },
  sequence: {
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
  },
  gantt: {
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
  },
}
const DEFAULT_CONFIG_BASE = {
  startOnLoad: false,
  theme: "default",
  logLevel: 1,
  securityLevel: "strict",
  arrowMarkerAbsolute: true,
  flowchart: {
    htmlLabels: true,
    curve: "linear",
  },
  sequence: {
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
  },
  gantt: {
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
  },
}
function MermaidCode({ graphDefinition}) {
  const [html, setHtml] = useState('');
  useEffect(() => {
    var themeDark = localStorage.getItem("themeDark");
    if (themeDark){
        const data = JSON.parse(themeDark);
        if (data == true) {
          if (graphDefinition) {
            try {
              mermaid.mermaidAPI.initialize({
                ...DEFAULT_CONFIG
              });
              mermaid.mermaidAPI.render(uuid(), graphDefinition, svgCode =>
                setHtml(svgCode)
              );
            } catch (e) {
              setHtml('')
              console.error(e);
            }
          }
        }else{
          if (graphDefinition) {
            try {
              mermaid.mermaidAPI.initialize({
                ...DEFAULT_CONFIG_BASE
              });
              mermaid.mermaidAPI.render(uuid(), graphDefinition, svgCode =>
                setHtml(svgCode)
              );
            } catch (e) {
              setHtml('')
              console.error(e);
            }
          }
        }
    }else{
      if (graphDefinition) {
        try {
          mermaid.mermaidAPI.initialize({
            ...DEFAULT_CONFIG
          });
          mermaid.mermaidAPI.render(uuid(), graphDefinition, svgCode =>
            setHtml(svgCode)
          );
        } catch (e) {
          setHtml('')
          console.error(e);
        }
      }
    }
  }, [graphDefinition]);
  return graphDefinition ? <div dangerouslySetInnerHTML={{ __html: html }} /> : null;
}
export default MermaidCode;
