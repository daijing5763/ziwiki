import { domToReact, attributesToProps,DOMNode,Element,HTMLReactParserOptions, } from 'html-react-parser';
import { MdContentCopy } from "react-icons/md"
import MermaidCode from "../mermaid"
import { backend_base_url } from "./env_variable"
import { MathJax } from "better-react-mathjax";
import { BiCheckCircle, BiCircle} from "react-icons/bi"
function isContains(str, substr) {
  if (typeof str == "undefined") {
    return false
  } 
return str.indexOf(substr) >= 0;
}

export function get_html_parser_option(slugs,repo_id) {
  const html_parser_option: HTMLReactParserOptions = {
    replace: (domNode: DOMNode) => {
      if (domNode instanceof Element && domNode.attribs.id === 'main') {
        return <h1 style={{ fontSize: 42 }}>{domToReact(domNode.children, html_parser_option)}</h1>;
      }else if (domNode instanceof Element && isContains(domNode.attribs.class, "bicheckcircle") ) {
        return <BiCheckCircle className="inline-block align-middle mx-1  h-5 w-5 text-sky-400">{domToReact(domNode.children, html_parser_option)}</BiCheckCircle>;
      }else if (domNode instanceof Element && isContains(domNode.attribs.class, "bicircle") ) {
        return  <BiCircle className="inline-block align-middle mx-1 h-5 w-5 text-sky-400">{domToReact(domNode.children, html_parser_option)}</BiCircle>;
      }
      else if (domNode instanceof Element && isContains(domNode.attribs.class, "mermaid")) {
        return  <MermaidCode graphDefinition={domToReact(domNode.children, html_parser_option)} />
      } else if (domNode instanceof Element && isContains(domNode.attribs.class, "math inline") ) {
        return   <MathJax inline>{domToReact(domNode.children, html_parser_option)}</MathJax>
      } else if (domNode instanceof Element && isContains(domNode.attribs.class, "math display") ) {
        return   <MathJax >{domToReact(domNode.children, html_parser_option)}</MathJax>
      } else if (domNode instanceof Element && isContains(domNode.attribs.class, "copycontent") ) {
        return  <MdContentCopy className="w-6 h-6 cursor-pointer text-slate-600 dark:text-slate-300" />
      } else if (domNode instanceof Element && isContains(domNode.attribs.class, "image_link") ) {

        if (slugs && !domNode.attribs.src.startsWith('http')) {
          const prefix = `${backend_base_url}static_get/1/` + repo_id + "/" + slugs.slice(0, -1).join("/") + "/" + domNode.attribs.src
          return (
            <img className="px-3" src={prefix} />
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
