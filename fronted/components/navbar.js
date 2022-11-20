import React, { useState, useEffect } from 'react';
import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Link from 'next/link'
import {RiMenu4Line,RiMenuLine} from  "react-icons/ri"
import { MdDarkMode, MdLightMode ,MdLogin,MdMenu,MdClose} from "react-icons/md"
import { AiFillGithub,AiOutlineSearch } from "react-icons/ai"
import { CgProfile } from "react-icons/cg"
import SubMenu from "./submenu"
export default function NavBar({ menus }) {
  const [SideBarIndex, setSideBarIndex] = useState(-1); 
  const [themeDark, setTheme] = useState(true);
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
},[]);

  return (
    <div>


    <div className="sticky top-0 z-50 w-full backdrop-blur flex-none transition-colors 
        duration-500  lg:border-b lg:border-slate-900/10 
      bg-white/95 supports-backdrop-blur:bg-white/60 dark:border-slate-50/[0.06] dark:bg-transparent">  
        <div className="flex flex-row justify-between items-center py-2 border-b border-slate-900/10 lg:px-8 lg:border-0  mx-3 md:mx-4 dark:border-slate-300/10 ">
          <div className="flex flex-row items-center">
          <RiMenuLine className={`${NavBarOpen && "hidden"} mr-2 md:mr-3 block w-5 h-6 md:w-6 md:h-6 dark:text-slate-200  hover:text-sky-500  cursor-pointer`} onClick={() => { localStorage.setItem('NavBarOpen', JSON.stringify(!NavBarOpen));setNavBarOpen(!NavBarOpen); }} />
          <RiMenu4Line className={`${!NavBarOpen && "hidden"} mr-2 md:mr-3 block w-5 h-6 md:w-6 md:h-6 dark:text-slate-200  hover:text-sky-500  cursor-pointer`} onClick={() => { localStorage.setItem('NavBarOpen', JSON.stringify(!NavBarOpen)); setNavBarOpen(!NavBarOpen); }}  />
          <div className="flex flex-row items-center pl-2  pr-1.5 md:pl-4 md:pr-3.5">
              <Link href="/">
              <a className="md:mr-1 flex-none w-[1.8rem] overflow-hidden md:w-auto" >
                <picture>
                  <img src="/logo.svg" className=" w-6 h-6 md:w-9 md:h-9" alt="LOGO"/>
                </picture>
                </a>
                </Link>
              <h1 className="font-bold text-xl md:text-2xl dark:text-slate-200 cursor-pointer">
                  AI<span className="text-blue-500">Infite</span>
              </h1>
            </div>
          </div>
          <div className="flex items-center dark:text-slate-200 ml-3 pl-3 md:ml-6 md:pl-6 ">
            <AiOutlineSearch  className='ml-3 md:ml-6  block w-6 h-6  hover:text-sky-500 cursor-pointer' />
            <MdLightMode
                className={`ml-3 md:ml-6  block w-6 h-6  hover:text-sky-500 cursor-pointer ${themeDark && "hidden"}`}
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
                    }
                }
            />
            <MdDarkMode
                className={`ml-3 md:ml-6  block w-6 h-6  hover:text-sky-500 cursor-pointer ${!themeDark && "hidden"}`}
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

                    }
                }
            />
            <Link href="https://github.com">
                <a>
                    <AiFillGithub 
                        className="ml-3 md:ml-6  block w-6 h-6  hover:text-sky-500 cursor-pointer"
                        />
                </a>
            </Link>
            <CgProfile  className='ml-3 md:ml-6 block w-6 h-6  hover:text-sky-500 cursor-pointer' />
          </div>
        </div>
      </div>


      <div  className={` ${!NavBarOpen && "hidden"} fixed z-40  lg:bg-inherit inset-0 top-0 lg:top-[3.8125rem] left-0 lg:left-[max(0px,calc(50%-45rem))] right-auto w-[20rem] lg:w-[23rem] lg:bottom-3 lg:pb-10 px-3 pt-6 lg:pt-0 lg:px-8 overflow-y-auto  
    scrollbar-thin   scrollbar-thumb-rounded-md scrollbar-track-rounded-md
    scrollbar-track-slate-100 scrollbar-thumb-slate-300 
    dark:scrollbar-track-slate-800 dark:scrollbar-thumb-slate-500
            `}>
      <div className="fixed lg:hidden inset-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80" ></div>
      <div className="fixed lg:hidden inset-0 bg-white w-[20rem] p-6 dark:bg-slate-800" ></div>
      <nav  className="px-3 pt-6 pb-3 lg:text-sm lg:leading-6 relative  duration-300   first-letter:
      ">
        <SubMenu menus={menus} layer={1} offset={0} SideBarIndex={SideBarIndex} setSideBarIndex={setSideBarIndex} />
      </nav>
    </div>
      </div>
  )
}

