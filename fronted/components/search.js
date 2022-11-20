import Link from 'next/link'
import React, { useState, useEffect,useRef,useCallback } from 'react';
import {MdSearch, MdCancel} from "react-icons/md"
import { CgHashtag } from "react-icons/cg"
import { BiChevronRight } from "react-icons/bi"
import parse, { domToReact } from 'html-react-parser';
export default function Search({useSearch,setUseSearch}) {
  const [query, setquery] = useState('');
  const [searchedDoc, setSearchedDoc] = useState([{ "href": "a.md", "title": "a","content":"content" }, { "href": "b.md", "title": "b","content":"content" }])
  useEffect(() => {
    fetch(`http://0.0.0.0:8000/api/wiki/search?query=${query}`).then((res) => res.json()).then(
      (data) => {
        if (typeof data != 'undefined') {
          if (data['data'].length > 0) {
            data['data'].map((doc, index) => { console.log(index, doc); console.log("href is:",doc['href'])})
            setSearchedDoc(data['data'])
          } else {
            setSearchedDoc([])
          }
        }
      }
    )
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
  useEffect(() => { console.log("8899"); document.addEventListener('click', onClickOutsideHandler);},[])
const onPanEnd = e => {
  console.log("over touch")
};
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


  return (
    <div className="">
      <div id="outersearch" className="fixed inset-0 z-50 backdrop-blur-sm overflow-hidden p-4 sm:p-6 md:p-20 lg:p-28" 
        ><div className='lg:mx-[max(0px,calc(50%-25rem))]'>
      
      <div ref={bodyBox} className="flex flex-col  border-slate-200 dark:border-slate-800 border rounded-lg bg-white dark:bg-slate-800" >
        <header className="px-4 py-4 relative flex text-slate-500 flex-row items-center border-b border-slate-300 dark:border-slate-600">
          <form onSubmit={submitContact} className="flex flex-grow flex-shrink items-center">
              <button type="submit">
                <MdSearch className="w-7 h-7" />
              </button>
            <input className="px-4 py-2 flex flex-grow flex-shrink focus:ring-0 focus-within:text-gray-600 bg-white dark:bg-slate-800 placeholder-slate-400 text-gray-900 dark:text-slate-300 appearance-none w-full  focus:outline-none"   id="search_query"
                      type="text"
                      name="search_query" placeholder="搜索文档"/>
          </form>
          <button onClick={clearquery}><MdCancel className="w-7 h-7 px-1.5 py-1" /></button>
        </header>

        <div className="">
            <div className="">
              {searchedDoc.length==0 && <div className="flex h-40 text-semibold text-slate-700 dark:text-slate-200 items-center justify-center">无历史搜索</div>}
              <ul className="my-4">
                { searchedDoc.length>0 && searchedDoc.map((doc, index) => (
                  <li key={index} className=" flex items-center mb-2">
                    <Link href={"/wiki/"+doc.href}>
                    
                    <a className="px-4 py-3 bg-slate-100 dark:bg-slate-900 rounded-md hover:dark:bg-sky-900 hover:bg-sky-400 mx-6 w-full" href="/docs/plugins#prefix-and-important-1">
                      <div className="flex items-center">
                        <div className="p-2">
                          <CgHashtag className="w-5 h-5" />
                        </div>
                        <div className="flex-grow  flex-shrink">
                          <span className="DocSearch-Hit-path">{doc.title}</span><br/>
                          <span className="DocSearch-Hit-title">{parse(doc.content)}
                          </span>
                          
                        </div>
                        <div className="p-2">
                          <BiChevronRight className="w-5 h-5"/>
                        </div>
                      </div>
                    </a>
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
              <Link href="/">
                <a className="flex-none  overflow-hidden " >
                  <picture>
                    <img src="/logo.svg" className=" w-6 h-6" alt="LOGO"/>
                  </picture>
                </a>
              </Link>
            </div>
        </footer>
          </div>
          </div>

    
      
</div>
    </div>
  )
}