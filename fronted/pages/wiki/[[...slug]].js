import NavBar from "../../components/navbar"
import { MathJaxContext,MathJax } from "better-react-mathjax";
import React, { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react'
import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Link from 'next/link'
import {RiMenu4Line,RiMenuLine} from  "react-icons/ri"
import { MdDarkMode, MdLightMode ,MdLogin,MdMenu,MdClose,MdContentCopy} from "react-icons/md"
import { AiFillGithub,AiOutlineSearch } from "react-icons/ai"
import { CgProfile } from "react-icons/cg"
import SubMenu from "../../components/submenu"
import Search from "../../components/search"
import parse, { domToReact } from 'html-react-parser';
import Mermaid from "../../Mermaid";
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

export default function Home({ session }) {
  const [layout, setlayout] = useState([]); 
  const [markdowntext, setmarkdown] = useState(''); 
  function refreshPage() {
    window.location.reload(false);
  }
  async function getLayout(values) {
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify(values)
  }
  await fetch('http://0.0.0.0:8080/get_markdown', options)
      .then(res => res.json())
    .then((data) => {
      var myObject = JSON.parse(data.mdtext);
      setlayout(myObject['sublayouts'])
      // console.log("obj:",obj)
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
  await fetch('http://0.0.0.0:8080/get_markdown', options)
      .then(res => res.json())
    .then((data) => {
      // const obj = JSON.parse(data);
      console.log("markdown:", data)
      setmarkdown(data['mdtext'])
      // console.log("obj:",obj)
      })
  }
  
  const [SideBarIndex, setSideBarIndex] = useState(-1); 
  const [themeDark, setTheme] = useState(true);
  const [useSearch, setUseSearch] = useState(false);
  const [NavBarOpen, setNavBarOpen] = useState(false);
  useEffect(() => {
    const themeDarkItem = localStorage.getItem('themeDark');
    if (themeDarkItem) {
        const data = JSON.parse(themeDarkItem);
        if (data == true) {
            document.documentElement.classList.add('dark')
            document.body.style.backgroundColor = "#0B1120";
        } else {
            document.documentElement.classList.remove('dark')
            document.body.style.backgroundColor = "white";
        }
        setTheme(data);
    } else {
        document.documentElement.classList.add('dark')
        document.body.style.backgroundColor = "#0B1120";
    }
    getLayout({ "mdhref": "/tmp/wiki/1/4/layout.json" });
    getMarkdown({"mdhref":"/tmp/wiki/1/1/README.en.md"});
},[]);

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
        <Mermaid graphDefinition={domToReact(children, options)}/>
      );
    } else if (attribs.class === 'copycontent') {
      return (
        <MdContentCopy className="w-6 h-6 cursor-pointer text-slate-600 dark:text-slate-300"/>
      );
    } else if (isContains(attribs.class,"mathcode_inline")) {
      return (
        <MathJax inline>{domToReact(children, options)}</MathJax>
      )
    }else if (isContains(attribs.class,"mathcode")) {
      return (
        <MathJax>{domToReact(children, options)}</MathJax>
      )
    }
  }
};

  
  
  return (

    <div className="antialiased  text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 min-h-screen"           
     >
  <div  className="	sticky top-0 z-50 w-full backdrop-blur flex-none transition-colors 
        duration-500  lg:border-b lg:border-slate-900/10 
      bg-white/95 supports-backdrop-blur:bg-white/60 dark:border-slate-50/[0.06] dark:bg-transparent">  
        <div className="flex flex-row justify-between items-center py-3 lg:py-4 border-b border-slate-900/10 lg:px-8 lg:border-0  mx-3 md:mx-4 dark:border-slate-300/10 ">
          <div className="flex flex-row items-center ">
          <RiMenuLine className={`${NavBarOpen && "hidden"} mr-2 md:mr-3 block w-7 h-7  dark:text-slate-200  hover:text-sky-500  cursor-pointer`} onClick={() => { localStorage.setItem('NavBarOpen', JSON.stringify(!NavBarOpen));setNavBarOpen(!NavBarOpen); }} />
          <RiMenu4Line className={`${!NavBarOpen && "hidden"} mr-2 md:mr-3 block w-7 h-7  dark:text-slate-200  hover:text-sky-500  cursor-pointer`} onClick={() => { localStorage.setItem('NavBarOpen', JSON.stringify(!NavBarOpen)); setNavBarOpen(!NavBarOpen); }}  />
            <div className="flex flex-row items-center pl-2  pr-1.5 md:pl-4 md:pr-3.5">
              <Link href="/" className="md:mr-1 flex-none w-[1.8rem] overflow-hidden md:w-auto">
                  <picture>
                    <img src="/logo.svg" className=" w-7 h-7 rounded-full md:w-9 md:h-9" alt="LOGO"/>
                  </picture>
    
              </Link>
              <h1 className="font-bold text-2xl lg:text-3xl dark:text-slate-200 cursor-pointer">
                  AI<span className="text-blue-500">Infite</span>
              </h1>
            </div>
          </div>
          <div className="flex items-center dark:text-slate-200 ml-3 pl-3 md:ml-6 md:pl-6 ">
            <AiOutlineSearch  className='ml-3 md:ml-6  block w-7 h-7  hover:text-sky-500 cursor-pointer' onClick={()=>{setUseSearch(!useSearch)}} />
            <MdLightMode
                className={`ml-3 md:ml-6  block w-7 h-7  hover:text-sky-500 cursor-pointer ${themeDark && "hidden"}`}
                onClick={() => {
                    localStorage.setItem('themeDark', JSON.stringify(!themeDark));
                    if (!themeDark == true) {
                        document.documentElement.classList.add('dark')
                        document.body.style.backgroundColor = "#0B1120";
                    } else {
                        document.documentElement.classList.remove('dark')
                        document.body.style.backgroundColor = "white";
                    }
                  setTheme(!themeDark);
                  // refreshPage();
                    }
                }
            />
            <MdDarkMode
                className={`ml-3 md:ml-6  block w-7 h-7  hover:text-sky-500 cursor-pointer ${!themeDark && "hidden"}`}
                onClick={() => {
                    
                    localStorage.setItem('themeDark', JSON.stringify(!themeDark));
                    if (!themeDark == true) {
                        document.documentElement.classList.add('dark')
                        document.body.style.backgroundColor = "#0B1120";
                    } else {
                        document.documentElement.classList.remove('dark')
                        document.body.style.backgroundColor = "white";
                    }
                    setTheme(!themeDark);
                  // refreshPage();
                    }
                }
            />
            <Link href="https://github.com">

                    <AiFillGithub 
                        className="ml-3 md:ml-6  block w-7 h-7  hover:text-sky-500 cursor-pointer"
                        />

            </Link>
            <CgProfile  className='ml-3 md:ml-6 block w-7 h-7  hover:text-sky-500 cursor-pointer' />
          </div>
        </div>
  </div>
      
  <div className="overflow-hidden">
          
        <div className={` ${!NavBarOpen && "hidden"} fixed z-40   inset-0 px-3 pt-6 pr-2 overflow-y-auto w-[20rem]
        lg:bg-inherit lg:top-[3.8125rem] lg:left-[max(0px,calc(50%-40rem))] lg:w-[19.5rem] lg:bottom-3 lg:pb-10  lg:pt-0 lg:pl-8
        scrollbar-thin   scrollbar-thumb-rounded-md scrollbar-track-rounded-md
      scrollbar-track-slate-100 scrollbar-thumb-slate-300
      dark:scrollbar-track-slate-800 dark:scrollbar-thumb-slate-500
        `}>

        <div className="fixed lg:hidden inset-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80" ></div>
        <div className="fixed lg:hidden inset-0 bg-white w-[20rem] p-6 dark:bg-slate-900" ></div>
        <nav  className="lg:px-3 pt-8 lg:pt-8 pb-3 lg:text-sm lg:leading-6 relative  duration-300  first-letter:
        ">
            <ul>
              {layout.map((menu, index) => (<li key={index}>{menu['title']}</li>))}
            </ul>
            {/* {layout} */}
          <SubMenu menus={layout} layer={1} offset={0} SideBarIndex={SideBarIndex} setSideBarIndex={setSideBarIndex} />
        </nav>
      </div>

      <div className={`overflow-hidden ${NavBarOpen?'lg:pl-[22.5rem]':'px-4 pb-6'}` } >
        <div className=" mx-auto relative z-5 pt-10  ">
          <div className="mb-16 lg:flex lg:items-center justify-center">
            <div className="flex-auto max-w-4xl">
              <MathJaxContext version={3} config={config}>
                {parse(markdowntext,options)}
              </MathJaxContext>
            </div>
          </div>
        </div>
      </div>
      </div>
      {useSearch && <Search useSearch={useSearch} setUseSearch={setUseSearch} /> }
</div>
  )
}
// export async function getStaticPaths() {
//   return {
//     paths: [
//     ],
//     fallback:'blocking'
//   }
// }

// export async function getStaticProps( context ) {
//   const { params } = context;
//   const slugs = params.slug
//   if (typeof slugs == 'undefined') {
//     const [operationsRes, incidentsRes] = await Promise.all([
//       fetch(`http://0.0.0.0:8000/api/wiki/layout?href=layout.json`),
//     ]);
//     const [menus] = await Promise.all([
//       operationsRes.json(), 
//     ]);
//     const data={'data':''}
//     return { props: { menus, data } };
//   }
//   const [operationsRes, incidentsRes] = await Promise.all([
//     fetch(`http://0.0.0.0:8000/api/wiki/layout?href=layout.json`),
//     fetch(`http://0.0.0.0:8000/api/wiki/postcontent`, {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({"href": `${slugs.join("/")}`})
//     }),

//     console.log(slugs.join("/"))
//   ]);
//   const [menus, data] = await Promise.all([
//     operationsRes.json(), 
//     incidentsRes.json()
//   ]);
//   return { props: { menus, data } };
// }
export async function getServerSideProps({ req }){
  const session = await getSession({ req })
  if(!session){
      return {
          redirect : {
              destination : "/auth/login",
              premanent: false
          }
      }
  }

  // authorize user return session
  return {
      props: { session }
  }
}
