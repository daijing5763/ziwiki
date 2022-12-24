import { domToReact, attributesToProps, DOMNode, Element, HTMLReactParserOptions, } from 'html-react-parser';
import { MdContentCopy,MdOutlineContentCopy } from "react-icons/md"
import MermaidCode from "../mermaid"
import { backend_base_url } from "./env_variable"
import { MathJax } from "better-react-mathjax";
import { BiCheckCircle, BiCircle } from "react-icons/bi"
import { toast } from "react-toastify";
function isContains(str, substr) {
  if (typeof str == "undefined") {
    return false
  }
  return str.indexOf(substr) >= 0;
}
function myfunction(id:string) {
  var element = document.getElementById(id);
  var lines = element.querySelectorAll('.cl');
  let buffer = []
  for (let i = 0; i < lines.length; i++) {
    buffer.push(lines[i].textContent)
  }
   // Copy the text inside the text field
  //navigator.clipboard.writeText(buffer.join(""));
  navigator.clipboard.writeText(buffer.join("")).then(() => {
    /* Resolved - text copied to clipboard */
    toast("Copied to clipboard", { type: toast.TYPE.SUCCESS, autoClose:500  });
  },() => {
    /* Rejected - clipboard failed */
    toast("Copy to clipboard failed", { type: toast.TYPE.ERROR, autoClose:500  });
  });

}
export function get_html_parser_option(slugs, repo_id) {
  var id=0
  const html_parser_option: HTMLReactParserOptions = {
    replace: (domNode: DOMNode) => {
      
      if (domNode instanceof Element && domNode.name === 'pre' && domNode.attribs.class !="mermaid" ) {
        const props = attributesToProps(domNode.attribs);
        let cur_id =id
        id += 1
        return <pre id={`code_id_${cur_id}`} {...props}>{domToReact(domNode.children, html_parser_option)}</pre>;
      }
      if (domNode instanceof Element && domNode.attribs.id === 'main') {
        return <h1 style={{ fontSize: 42 }}>{domToReact(domNode.children, html_parser_option)}</h1>;
      } else if (domNode instanceof Element && isContains(domNode.attribs.class, "bicheckcircle")) {
        return <BiCheckCircle className="inline-block align-middle mx-1 h-5 w-5 text-sky-400">{domToReact(domNode.children, html_parser_option)}</BiCheckCircle>;
      } else if (domNode instanceof Element && isContains(domNode.attribs.class, "bicircle")) {
        return <BiCircle className="inline-block align-middle mx-1 h-5 w-5 text-sky-400">{domToReact(domNode.children, html_parser_option)}</BiCircle>;
      }
      else if (domNode instanceof Element && isContains(domNode.attribs.class, "mermaid")) {
        return <div className='container mx-auto'><MermaidCode graphDefinition={domToReact(domNode.children, html_parser_option)} /></div>
      } else if (domNode instanceof Element && isContains(domNode.attribs.class, "math inline")) {
        return <MathJax inline>{domToReact(domNode.children, html_parser_option)}</MathJax>
      } else if (domNode instanceof Element && isContains(domNode.attribs.class, "math display")) {
        return <MathJax >{domToReact(domNode.children, html_parser_option)}</MathJax>
      } else if (domNode instanceof Element && isContains(domNode.attribs.class, "copycontent")) {
        let cur_id =id
        return <MdOutlineContentCopy className="w-6 h-6 cursor-pointer text-slate-500 dark:text-slate-300" onClick={() => { myfunction("code_id_" + cur_id) }} />
      } else if (domNode instanceof Element && isContains(domNode.attribs.class, "image_link")) {

        if (slugs && !domNode.attribs.src.startsWith('http')) {
          const prefix = `${backend_base_url}static_get/1/` + repo_id + "/" + slugs.slice(0, -1).join("/") + "/" + domNode.attribs.src
          return (
            <span className='flex items-center'><img className="px-3 mx-auto" src={prefix} /></span>
          )
        } else {
          return (
            <img className="px-3" src={domNode.attribs.src} />
          )
        }
      }
    }
  };
  return html_parser_option;
}





export const html_parser_options_list: HTMLReactParserOptions = {
  replace: (domNode: DOMNode) => {
    if (domNode instanceof Element && domNode.name === 'ul') {
      return <ul className="text-slate-700 text-sm leading-6"  >{domToReact(domNode.children, html_parser_options_list)}</ul>;
    }
    if (domNode instanceof Element && domNode.name === 'li') {
      return <ul className="ml-4"  >{domToReact(domNode.children, html_parser_options_list)}</ul>;
    }
    else if (domNode instanceof Element && domNode.name === 'a') {
      const props = attributesToProps(domNode.attribs);
      return <a {...props} className="group flex items-start py-1 hover:text-sky-500 dark:text-slate-400 dark:hover:text-sky-500"  >
        <svg width="3" height="24" viewBox="0 -9 3 24" className="mr-2 text-slate-400 overflow-visible group-hover:text-slate-600 dark:text-slate-600 dark:group-hover:text-slate-500">
          <path d="M0 0L3 3L0 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
        </svg>
        {domToReact(domNode.children, html_parser_options_list)}</a>;
    }
  }
};
