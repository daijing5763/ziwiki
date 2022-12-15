import React, { useState, useEffect } from 'react';
import { AiOutlineSync, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import Link from "next/link";
import SubMenu from "./submenu"
import { toast } from "react-toastify";
import { backend_base_url } from "../utils/env_variable"
export default function SideBar({ repo_id,access_token, layout, SideBarIndex, setSideBarIndex,useSearch,setUseSearch }) {
  
  async function syncRepo() {
    // toast('开始同步仓库', { hideProgressBar: true, autoClose: 2000, type: 'success' })
    const id =  toast("正在同步仓库...", {toastId: "customId",type: toast.TYPE.INFO});
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
      body: JSON.stringify({ "repo_id": repo_id })
    }
    await fetch(`${backend_base_url}pull_repo`, options)
        .then(res => res.json())
      .then((data) => {
        if (data.error){
          toast.update(id, { render: "同步失败:" + data.error, type: toast.TYPE.ERROR, isLoading: false});
        } else {
          toast.update(id, { render: "同步成功", type: "success", isLoading: false });
        }
      })
  }


  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="lg:block fixed z-20 inset-0 top-[2rem] md:top-[3.8125rem] left-[max(0px,calc(50%-45rem))] right-auto w-[19.5rem] pb-10 px-8 overflow-y-auto 
          scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-rounded-md
      ">
        <nav id="nav" className="lg:text-sm lg:leading-6 relative
        ">
          <div className="sticky top-0 -ml-0.5 pointer-events-none">
            <div className="h-10 bg-white dark:bg-slate-900">
            </div>
            <div className="bg-white dark:bg-slate-900 relative pointer-events-auto">
              <button onClick={()=>{setUseSearch(!useSearch)}} type="button" className="flex w-full  items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:hover:ring-slate-700 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700">
                <svg width="24" height="24" fill="none" aria-hidden="true" className="mr-3 flex-none"><path d="m19 19-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle></svg>
                Quick search...
                <span className="ml-auto pl-3 flex-none text-xs font-semibold">⌘K</span>
              </button></div>
            <div className="h-8 bg-gradient-to-b from-white dark:from-slate-900"></div>
          </div>

          <div className="ml-4 mb-8  text-base lg:text-base font-base">
            <Link href="#" onClick={syncRepo} className="group flex items-center lg:text-sm lg:leading-6 mb-4 font-medium text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300">
              <div className="mr-4 rounded-md ring-1 ring-slate-900/5 shadow-sm group-hover:shadow group-hover:ring-slate-900/10 dark:ring-0 dark:shadow-none dark:group-hover:shadow-none dark:group-hover:highlight-white/10 
              group-hover:shadow-indigo-200 dark:group-hover:bg-indigo-500 dark:bg-slate-800 dark:highlight-white/5">
                <AiOutlineSync className={`w-6 h-6 p-1 `} />
              </div>
              同步仓库
            </Link>
            
            <Link href="https://play.tailwindcss.com" className="group flex items-center lg:text-sm lg:leading-6 mb-4 font-medium text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300">
              <div className="mr-4 rounded-md ring-1 ring-slate-900/5 shadow-sm group-hover:shadow group-hover:ring-slate-900/10 dark:ring-0 dark:shadow-none dark:group-hover:shadow-none dark:group-hover:highlight-white/10 group-hover:shadow-blue-200 dark:group-hover:bg-blue-500 dark:bg-slate-800 dark:highlight-white/5">
                    <AiOutlineDelete className={`w-6 h-6 p-1 `} />
              </div>删除仓库
            </Link>

            <Link href="https://github.com/tailwindlabs/tailwindcss/discussions" className="group flex items-center lg:text-sm lg:leading-6 mb-4 font-medium text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300">
              <div className="mr-4 rounded-md ring-1 ring-slate-900/5 shadow-sm group-hover:shadow group-hover:ring-slate-900/10 dark:ring-0 dark:shadow-none dark:group-hover:shadow-none dark:group-hover:highlight-white/10 group-hover:shadow-violet-200 dark:group-hover:bg-violet-500 dark:bg-slate-800 dark:highlight-white/5">
                    <AiOutlineEdit className={`w-6 h-6 p-1 `} />
              </div>
              编辑仓库
            </Link>
          </div>
          <SubMenu repo_id={repo_id} menus={layout} layer={1} offset={0} SideBarIndex={SideBarIndex} setSideBarIndex={setSideBarIndex} />
        </nav>
      </div>
    </div>
  )
}
