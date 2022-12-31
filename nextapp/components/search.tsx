import Link from 'next/link'
import React, {Fragment, useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM  from 'react-dom';

import { Trans } from '@lingui/macro';
import { t } from "@lingui/macro"
import {MdSearch, MdCancel} from "react-icons/md"
import { CgHashtag,CgSearchLoading } from "react-icons/cg"
import { BiChevronRight } from "react-icons/bi"
import { Dialog, Transition } from '@headlessui/react'
import parse, { domToReact } from 'html-react-parser';
import { fetch_markdown_user,fetch_markdown_repo } from "../utils/web_fetch"
import { useSession } from "next-auth/react"
function Search({ useSearch, setUseSearch,repo_id }) {
  const cancelButtonRef = useRef(null)
  const { data: session } = useSession()
  const [query, setquery] = useState('');
  const [loading, setloading] = useState(false);
  const [searchedDoc, setSearchedDoc] = useState([])
  async function queryMarkdownUser(values: { [key: string]: string }) {
    setloading(true)
    fetch_markdown_user(values, session.access_token).then(data => {
      setloading(false)
      if (data && !data.error) {
        setSearchedDoc(data)
      } else {
        setSearchedDoc([])
      }
    })
  }

  async function queryMarkdownRepo(values) {
    setloading(true)
    fetch_markdown_repo(values, session.access_token).then(data => {
      setloading(false)
      if (data && !data.error) {
        setSearchedDoc(data)
      } else {
        setSearchedDoc([])
      }
    })
  }

  useEffect(() => {
    if (query.length != 0) {
      if (repo_id != -1) {
        queryMarkdownRepo({ "plainto_tsquery": `${query}`,"repo_id":repo_id as number})
      } else {
        queryMarkdownUser({ "plainto_tsquery": `${query}` })
      }
    }
  }, [query]);
  
  const clearquery = async (event) => {
    event.preventDefault();
    (document.getElementById('search_query') as HTMLInputElement).value = ''
    setUseSearch(!useSearch)
  };

  const submitContact = async (event) => {
    event.preventDefault();// 阻止redirect to search query
    if (event.target.value) {
      setquery(event.target.value)
    } else {
      setquery('')
      setSearchedDoc([])
    }
  };


  const options = {
    replace: domNode => {
      if (domNode.name === 'b') {
        return <b className="underline underline-offset-2	"  >{domToReact(domNode.children, options)}</b>;
      }
    }
  };

  return ReactDOM.createPortal((
    <Transition.Root show={useSearch} as={Fragment}>
    <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setUseSearch}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        >
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm backdrop-brightness-75 bg-opacity-75 transition-opacity" />
      </Transition.Child>

      <div className="fixed overflow-auto lg:overflow-hidden inset-0 z-50 backdrop-blur-sm backdrop-brightness-75  dark:text-slate-300   px-4 pt-20  md:p-20 lg:p-28">
        <div className="mx-0 md:mx-[max(0px,calc(50%-25rem))]">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Dialog.Panel className="flex overflow-hidden  flex-col  border-slate-200/5 dark:border-slate-800/75 border rounded-md md:rounded-lg bg-white dark:bg-slate-800/75 ">
                <section>
                  <header className="px-4 py-4 relative flex text-slate-500 flex-row items-center border-b border-slate-300/75 dark:border-slate-800/75">
                    <form onChange={submitContact} onSubmit={submitContact} className="flex flex-grow flex-shrink items-center">
                      <MdSearch className={`${loading && "hidden"} w-7 h-7`} />
                      <CgSearchLoading className={`${!loading && "hidden"} w-6 h-6`} />
                      <input className="px-4 py-2 flex flex-grow flex-shrink focus:ring-0 focus-within:text-slate-900 bg-transparent placeholder-slate-400 text-gray-900 dark:text-slate-300 appearance-none w-full  border-0  focus:outline-none" id="search_query"
                        type="text"
                        name="search_query" placeholder={t`Search Document`} />
                    </form>
                    <button onClick={clearquery}><MdCancel className="w-7 h-7 px-1.5 py-1" /></button>
                  </header>

                  <div className="overflow-y-auto h-80  scrollbar-thin   scrollbar-thumb-rounded-md scrollbar-track-rounded-md">
                  <div className="">
                    {searchedDoc.length == 0 && query.length>0 && repo_id==-1 && <div className="flex h-40 text-semibold text-slate-500 dark:text-slate-400 items-center justify-center"><Trans>not found document includes:</Trans> <span className='dark:text-slate-50 text-slate-800 px-2'>{query}</span> <Trans> in current user</Trans></div>}
                    {searchedDoc.length == 0 && query.length==0 &&repo_id==-1 &&<div className="flex h-40 text-semibold text-slate-500 dark:text-slate-400 items-center justify-center"><Trans >Search all documents of current user</Trans></div>}
                    {searchedDoc.length == 0 && query.length>0 &&repo_id!=-1 && <div className="flex h-40 text-semibold text-slate-500 dark:text-slate-400 items-center justify-center"><Trans>not found document includes:</Trans> <span className='dark:text-slate-50 text-slate-800 px-2'>{query}</span> <Trans> in current repo</Trans></div>}
                    {searchedDoc.length == 0 && query.length==0 && repo_id!=-1 &&<div className="flex h-40 text-semibold text-slate-500 dark:text-slate-400 items-center justify-center"><Trans >Search all documents of current repo</Trans></div>}
                      <ul className="my-4">
                        {searchedDoc.length > 0 && searchedDoc.map((doc, index) => (
                          <Link key={index} href={"/wiki/" + doc.repo_id + "/" + doc.mdhref} className="px-4 py-3 bg-slate-100  dark:bg-slate-400/5 rounded-md hover:dark:bg-sky-700/25 hover:bg-sky-500 hover:text-slate-50 text-slate-700 dark:text-slate-400 mx-6 flex overflow-hidden items-center mb-2">
                              <div className="p-2">
                                <CgHashtag className="w-5 h-5 " />
                              </div>
                              <div className="flex-grow overflow-auto">
                                <span >{doc.mdhref}</span><br />
                                <span >{parse(doc.coalesce, options)}</span>
                              </div>
                              <div className="p-2">
                                <BiChevronRight className="w-5 h-5" />
                              </div>
                        </Link>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <footer className="px-4 py-4 relative flex justify-end text-slate-500 flex-row items-center border-t border-slate-300/5 dark:border-slate-600/25" >
                    <div className="flex flex-row items-center">
                      <h1 className="font-semibold text-sm  dark:text-slate-200 cursor-pointer pr-4">
                        <Trans>Searched By</Trans>
                      </h1>
                      <Link href="/" className="flex-none  overflow-hidden " >
                        <picture>
                          <img src="/logo.svg" className=" w-7 h-7" alt="LOGO" />
                        </picture>
                      </Link>
                    </div>
                  </footer>
                </section>





            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
  ),document.getElementById('mysearch'));
}



export default Search;