import Link from 'next/link'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM  from 'react-dom';
import {MdSearch, MdCancel} from "react-icons/md"
import { CgHashtag } from "react-icons/cg"
import { BiChevronRight } from "react-icons/bi"
import parse, { domToReact } from 'html-react-parser';
export default function Search({useSearch,setUseSearch,access_token}) {
  const [query, setquery] = useState('');
  
  const [searchedDoc, setSearchedDoc] = useState([{ "mdhref": "a.md", "coalesce": "a" }, { "mdhref": "b.md", "coalesce": "b"}])
  
  async function queryMarkdownUser(values) {
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
      body: JSON.stringify(values)
    }

    await fetch('http://0.0.0.0:8080/query_markdown_user', options)
      .then(res => res.json())
      .then((data) => {
        if (data && !data.error) {
          setSearchedDoc(data)
          console.log("mydebug query:", data)
        }
    })
  }


    useEffect(() => {
      queryMarkdownUser({"plainto_tsquery":`${query}`})
  },[query]);
const clearquery = async (event) => {
  event.preventDefault();
  document.getElementById('search_query').value = ''
  setUseSearch(!useSearch)
};
  const submitContact = async (event) => {
    event.preventDefault();
    setquery(event.target.search_query.value)
    setSearchedDoc([])
  };
  useEffect(() => {  document.addEventListener('click', onClickOutsideHandler);},[])
  const bodyBox = useRef(null);
  
  const onClickOutsideHandler = useCallback(
    (e) => {
      if (useSearch) {
        if(bodyBox.current){
          if (!bodyBox.current.contains(e.target)) {
            if (typeof e.target.id !== "undefined" && e.target.id == "outersearch") {
              setUseSearch(false)
            }
          } 
        }
      }
    },[]
  );


  const options = {
    replace: domNode => {
      if (domNode.name === 'b') {
        return <b className="dark:text-slate-200 text-yellow-700 text-base"  >{domToReact(domNode.children, options)}</b>;
      }
    }
  };

  return ReactDOM.createPortal((
      <div id="outersearch" className="fixed inset-0 z-50 backdrop-blur-sm  dark:text-slate-400 overflow-hidden p-4 sm:p-6 md:p-20 lg:p-28"
      ><div className='lg:mx-[max(0px,calc(50%-25rem))]'>
      
          <div ref={bodyBox} className="flex flex-col  border-slate-200 dark:border-slate-800 border rounded-lg bg-white dark:bg-slate-800" >
            <header className="px-4 py-4 relative flex text-slate-500 flex-row items-center border-b border-slate-300 dark:border-slate-600">
              <form onSubmit={submitContact} className="flex flex-grow flex-shrink items-center">
                <button type="submit">
                  <MdSearch className="w-7 h-7" />
                </button>
                <input className="px-4 py-2 flex flex-grow flex-shrink focus:ring-0 focus-within:text-gray-600 bg-white dark:bg-slate-800 placeholder-slate-400 text-gray-900 dark:text-slate-300 appearance-none w-full  focus:outline-none" id="search_query"
                  type="text"
                  name="search_query" placeholder="搜索文档" />
              </form>
              <button onClick={clearquery}><MdCancel className="w-7 h-7 px-1.5 py-1" /></button>
            </header>

            <div className="overflow-y-auto h-80  scrollbar-thin   scrollbar-thumb-rounded-md scrollbar-track-rounded-md">
              <div className="">
                {searchedDoc.length == 0 && <div className="flex h-40 text-semibold text-slate-700 dark:text-slate-200 items-center justify-center">无历史搜索</div>}
                <ul className="my-4">
                  {searchedDoc.length > 0 && searchedDoc.map((doc, index) => (
                    <li key={index} className=" flex items-center mb-2">
                      <Link href={"/wiki/" + doc.repo_id + "/" + doc.mdhref} onClick={console.log("mydebug click==")} className="px-4 py-3 bg-slate-100 dark:bg-slate-900 rounded-md hover:dark:bg-sky-900 hover:bg-sky-400 mx-6 w-full">
                        <div className="flex items-center">
                          <div className="p-2">
                            <CgHashtag className="w-5 h-5" />
                          </div>
                          <div className="flex-grow  flex-shrink">
                            <span className="DocSearch-Hit-path">{doc.mdhref}</span><br />
                            <span className="DocSearch-Hit-title">{parse(doc.coalesce, options)}
                            </span>
                          
                          </div>
                          <div className="p-2">
                            <BiChevronRight className="w-5 h-5" />
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>

              </div>
            </div>

            <footer className="px-4 py-4 relative flex justify-end text-slate-500 flex-row items-center border-t border-slate-300 dark:border-slate-600" >
              <div className="flex flex-row items-center">
                <h1 className="font-semibold text-sm  dark:text-slate-200 cursor-pointer pr-2">
                  Searched By
                </h1>
                <Link href="/" className="flex-none  overflow-hidden " >
                  <picture>
                    <img src="/logo.svg" className=" w-6 h-6" alt="LOGO" />
                  </picture>
                </Link>
              </div>
            </footer>
          </div>
        </div>

    
      
      </div>

  ),document.getElementById('mysearch'));
}