import NavBar from "../../../components/navbar"
import MermaidCode from "../../../mermaid"
import { MathJaxContext,MathJax } from "better-react-mathjax";
import React, { useState, useEffect } from 'react';
import { getSession, SessionContext } from 'next-auth/react'
import {MdContentCopy} from "react-icons/md"
import SideBar from "../../../components/sidebar"
import Search from "../../../components/search"
import parse, { domToReact, attributesToProps  } from 'html-react-parser';
import { authOptions } from '../../api/auth/[...nextauth]'
import { backend_base_url } from "../../../utils/env_variable"
import { unstable_getServerSession } from "next-auth/next"
import {RiMenu4Line,RiMenuLine} from  "react-icons/ri"
import { useRouter } from "next/router"
const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"]
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"]
    ]
  }
};

export default function Home({ session}) {
  const router = useRouter();
  const [layout, setlayout] = useState([]); 
  const [markdowntext, setmarkdown] = useState(''); 
  const [markdownlist, setmarkdownlist] = useState(''); 
  async function getLayout(values) {
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify(values)
    }

    await fetch(`${backend_base_url}get_markdown`, options)
      .then(res => res.json())
      .then((data) => {
        if (data && !data.error) {
          var myObject = JSON.parse(data.mdtext);
          setlayout(myObject['sublayouts'])
        }
    })
  }


  async function getMarkdown(values) {
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify(values)
    }

    await fetch(`${backend_base_url}get_markdown`, options)
      .then(res => res.json())
      .then((data) => {
        if (data && !data.error) {
          setmarkdown(data.mdtext)
        } else {
          console.log(data)
        }
    })
  }

  async function getMarkdownList(values) {
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify(values)
    }

    await fetch(`${backend_base_url}get_markdown`, options)
      .then(res => res.json())
      .then((data) => {
        if (data && !data.error) {
          setmarkdownlist(data.mdtext)
        } else {
          console.log(data)
        }
    })
  }

  
  const [SideBarIndex, setSideBarIndex] = useState(-1); 
  const [useSearch, setUseSearch] = useState(false);
  const [NavBarOpen, setNavBarOpen] = useState(false);
  useEffect(() => {
    const sideOpen = localStorage.getItem('NavBarOpen');
    if (sideOpen) {
      const data = JSON.parse(sideOpen);
      setNavBarOpen(data);
    } 
    const sideIndex = localStorage.getItem('SideOpenIndex');
    if (sideIndex) {
      const data = JSON.parse(sideIndex);
      setSideBarIndex(data);
    } 
  }, []);
  useEffect(() => {
    const slugs = router.query.slug;
    if (typeof slugs != "undefined" && Array.isArray(slugs)) {
      if (slugs.join("/") == "home"){
        setmarkdown("Repo HomePage")
      } else {
        getMarkdown({
          "mdhref":slugs.join("/"),
          "repo_id":parseInt(Array.isArray(router.query.repoid) ? router.query.repoid[0] : router.query.repoid),
        });
        getMarkdownList({
          "mdhref":slugs.join("/")+".list",
          "repo_id":parseInt(Array.isArray(router.query.repoid) ? router.query.repoid[0] : router.query.repoid),
        });
      }
    }
  }, [router.query.slug]);
  useEffect(() => {
    getLayout({
      "mdhref": "layout.json",
      "repo_id":parseInt(Array.isArray(router.query.repoid) ? router.query.repoid[0] : router.query.repoid),
    });
  },[router.query.repoid]);

  const dynamicRoute = useRouter().asPath;

  // Reset count to 0 on dynamic route change.
  useEffect(() => setUseSearch(false), [dynamicRoute]);

  
  function isContains(str, substr) {
    if (typeof str == "undefined") {
      return false
    } 
  return str.indexOf(substr) >= 0;
  }
  const options = {
    replace: ({ attribs, children }) => {
      if (!attribs) {
        return;
      }
  
      if (attribs.id === 'main') {
        return <h1 style={{ fontSize: 42 }}>{domToReact(children, options)}</h1>;
      }
      if (isContains(attribs.class,"mermaid")) {
        return (
          <MermaidCode graphDefinition={domToReact(children, options)}/>
        );
      } else if (attribs.class === 'copycontent') {
        return (
          <MdContentCopy className="w-6 h-6 cursor-pointer text-slate-600 dark:text-slate-300"/>
        );
      } else if (isContains(attribs.class,"math inline")) {
        return (
          <MathJax inline>{domToReact(children, options)}</MathJax>
        )
      }else if (isContains(attribs.class,"math display")) {
        return (
          <MathJax>{domToReact(children, options)}</MathJax>
        )
      } else if (attribs.class == "image_link") {
        const slugs = router.query.slug;
        if (slugs && !attribs.src.startsWith('http')) {
          const prefix=`${backend_base_url}static_get/1/`+router.query.repoid+"/"+slugs.slice(0,-1).join("/")+"/"+attribs.src
          return (
            <img className="px-3" src={prefix} />
          )
        } else {
          return (
            <img className="px-3" src={attribs.src} />
          )
        }
        

      }
    }
  };

  
  const options_list = {
    replace: domNode => {
      if (domNode.name === 'ul') {
        return <ul className="text-slate-700 text-sm leading-6"  >{domToReact(domNode.children, options_list)}</ul>;
      }
      if (domNode.name === 'li') {
        return <ul className="ml-4"  >{domToReact(domNode.children, options_list)}</ul>;
      }
      else if (domNode.name === 'a') {
        const props = attributesToProps(domNode.attribs);
        return <a {...props} className="group flex items-start py-1 hover:text-sky-500 dark:text-slate-400 dark:hover:text-sky-500"  >
          <svg width="3" height="24" viewBox="0 -9 3 24" className="mr-2 text-slate-400 overflow-visible group-hover:text-slate-600 dark:text-slate-600 dark:group-hover:text-slate-500">
            <path d="M0 0L3 3L0 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
          </svg>
          {domToReact(domNode.children, options_list)}</a>;
      }
    }
  };

  
  
return (
  <div className="antialiased  text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 min-h-screen">

  <NavBar NavBarOpen={NavBarOpen} setNavBarOpen={setNavBarOpen} useSearch={useSearch} setUseSearch={setUseSearch} />
  
    <div className="overflow-hidden">
    <div className={`xl:hidden fixed bottom-5 z-50 right-0 h-16 w-16 rounded-md `}>
          <RiMenuLine className={`${NavBarOpen && "hidden"} mr-2 md:mr-3 block w-10 h-10  dark:text-slate-200  hover:text-sky-500  cursor-pointer`} onClick={() => { localStorage.setItem('NavBarOpen', JSON.stringify(!NavBarOpen));setNavBarOpen(!NavBarOpen); }} />
          <RiMenu4Line className={`${!NavBarOpen && "hidden"} mr-2 md:mr-3 block w-10 h-10  dark:text-slate-200  hover:text-sky-500  cursor-pointer`} onClick={() => { localStorage.setItem('NavBarOpen', JSON.stringify(!NavBarOpen)); setNavBarOpen(!NavBarOpen); }}  />
        </div>
    <div className={` ${!NavBarOpen && "hidden"} fixed z-40   inset-0 px-3 pt-6 pr-2 overflow-y-auto w-[20rem]
        lg:bg-inherit lg:top-[3.8125rem] lg:left-[max(0px,calc(50%-40rem))] lg:w-[19.5rem] lg:bottom-3 lg:pb-10  lg:pt-0 lg:pl-8
        scrollbar-thin   scrollbar-thumb-rounded-md scrollbar-track-rounded-md
      `}>
      <div className="fixed xl:hidden inset-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80" ></div>
      <div className="fixed xl:hidden inset-0 bg-white w-[20rem] p-6 dark:bg-slate-900" ></div>

      <SideBar repo_id={parseInt(Array.isArray(router.query.repoid) ? router.query.repoid[0] : router.query.repoid)} access_token={session.access_token} layout={layout} SideBarIndex={SideBarIndex} setSideBarIndex={setSideBarIndex}  useSearch={useSearch } setUseSearch={setUseSearch} />
    </div>

    <div className={`overflow-hidden ${NavBarOpen?'lg:pl-[20rem] lg:pr-[20rem]':'px-4 pb-6'}` } >
      <div className=" mx-auto relative z-5 pt-10  ">
        <div className="mb-16 md:flex items-center justify-center">
          <div className="flex-auto  max-w-3xl xl:max-w-2xl">
            <MathJaxContext version={3} config={config}>
              {parse(markdowntext,options)}
            </MathJaxContext>
          </div>
        </div>
      </div>
    </div>
      
      <div className="fixed z-20 top-[3.8125rem] bottom-0 right-[max(0px,calc(50%-45rem))] w-[19.5rem] py-10 overflow-y-auto hidden xl:block">
        <div className="px-8">
          <h5 className="text-slate-900 font-semibold mb-4 text-sm leading-6 dark:text-slate-100">
            本页目录
          </h5>
          {parse(markdownlist,options_list)}
        </div>
      </div>

  </div>
  {useSearch && (<Search useSearch={useSearch} setUseSearch={setUseSearch} access_token={session.access_token} />)}

</div>
  )
}

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)
  if(!session){
    return {
        redirect : {
            destination : "/auth/login",
            premanent: false
        }
    }
  }
  return {
    props: {
      session,
    },
  }
}