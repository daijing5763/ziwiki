import React, { useState, useEffect } from 'react';
import { getIndex, acccompare, compare } from '../utils'
import SubMenu from "./submenu"
export default function SideBar({repo_id ,layout,SideBarIndex,setSideBarIndex}) {
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
              <button type="button" className="flex w-full  items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:hover:ring-slate-700 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700">
                <svg width="24" height="24" fill="none" aria-hidden="true" className="mr-3 flex-none"><path d="m19 19-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle></svg>
                Quick search...
                <span className="ml-auto pl-3 flex-none text-xs font-semibold">⌘K</span>
              </button></div>
            <div className="h-8 bg-gradient-to-b from-white dark:from-slate-900"></div>
          </div>
          <SubMenu repo_id={repo_id} menus={layout} layer={1} offset={0} SideBarIndex={SideBarIndex} setSideBarIndex={setSideBarIndex} />
        </nav>
      </div>
    </div>
  )
}
