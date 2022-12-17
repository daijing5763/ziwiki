import React, { useState, useEffect } from 'react';
import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Link from 'next/link'

import { MdDarkMode, MdLightMode ,MdLogin,MdMenu,MdClose} from "react-icons/md"
import { AiFillGithub } from "react-icons/ai"
import { getSession, useSession, signOut } from "next-auth/react"
function handleSignOut(){
    signOut()
  }

export default function PopNav() {
    const [themeDark, setTheme] = useState(true);
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

    const navigation = [
        { name: 'Wiki', href: '/wiki' },
        { name: 'Docs', href: '#' },
        { name: 'AIINFITE', href: '#' },
        { name: 'GITHUB', href: '#' },
    ]



return (
    <div className="sticky top-0 z-50 w-full backdrop-blur flex-none transition-colors 
        duration-500  lg:border-b lg:border-slate-900/10 
        supports-backdrop-blur:bg-white/60
        dark:border-slate-50/[0.06] bg-transparent text-slate-500 dark:text-slate-200">  
        <Popover>
            <div className="flex flex-row justify-between items-center py-2 
                border-b border-slate-900/10 lg:px-8 lg:border-0
                mx-3 md:mx-4 dark:border-slate-300/10 ">
                
                <div className="flex flex-row items-center"> 
                    <div className="flex flex-row items-center pl-2  pr-1.5 md:pl-4 md:pr-3.5">
                        <Link href="/" className="md:mr-1 flex-none w-[1.8rem] overflow-hidden md:w-auto" >
           
                                <picture>
                                    <img src="/logo.svg" className=" w-6 h-6 md:w-9 md:h-9" alt="LOGO"/>
                                </picture>
         
                        </Link>
                        <Link href="/">
                            <h1 className="font-bold text-xl md:text-2xl cursor-pointer">
                                AI<span className="text-blue-500 dark:text-blue-400">Infite</span>
                            </h1>
                        </Link>
                    </div>
                </div>

                <div className="relative hidden md:flex items-center ml-auto ">
                    <nav className="text-sm leading-6 font-semibold  ">
                        <ul className="flex space-x-8">
                            {navigation.map((value,index) => (<li key={index}>
                                <Link href={value.href} className="hover:text-sky-500">
                                 {value.name}
                                </Link>
                            </li>))
                            }
                        </ul>
                    </nav>
                </div>

                <div className="flex items-center ml-3  md:ml-6  md:border-l border-slate-200 ">
                
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
              
                            <AiFillGithub 
                                className="ml-3 md:ml-6  block w-6 h-6  hover:text-sky-500 cursor-pointer"
                                />
            
                    </Link>

                    <div className="hidden md:flex" >
                        <MdLogin className='ml-3 md:ml-6 block w-6 h-6  hover:text-sky-500 cursor-pointer' onClick={handleSignOut}   />
            
                    </div>
                    <div className="md:hidden inline-flex items-center justify-center rounded-md p-2 ml-3  cursor-pointer">
                        <Popover.Button className="focus:outline-none focus:ring-0">
                            <MdMenu className="block w-6 h-6 rounded-md" />
                        </Popover.Button>
                    </div>
                </div>
            </div>
            
            <Transition
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
            <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-0 transition md:hidden"
            >
            <div className="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
                <div className="w-[108rem] flex-none flex justify-end">
                    <img src="/bg.avif" alt="" className="w-[90rem] flex-none max-w-none  block" decoding="async" />
                </div>
            </div>
            <div className="overflow-hidden 
                bg-white supports-backdrop-blur:bg-white/60
                dark:border-slate-50/[0.06] dark:bg-slate-900 text-slate-500 dark:text-slate-200
                shadow-md ring-1 ring-black ring-opacity-5">
                <div className="flex items-center justify-between px-5 pt-4">
                <div>
                    <img
                    className="h-8 w-auto"
                    src="/logo.svg"
                    alt=""
                    />
                </div>
                <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md
                    dark:bg-transparent p-2 text-gray-400 hover:bg-gray-100
                    hover:text-gray-500 focus:outline-none  focus:ring-inset
                    dark:hover:bg-slate-900/[10] ring-0 ring-text-slate-500 focus:ring-0
                    ">
                    <span className="sr-only">Close main menu</span>
                        <MdClose className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                </div>
                </div>
                <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                    <a
                    key={item.name}
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-slate-500
                        dark:text-slate-200 hover:bg-gray-100
                        dark:hover:bg-slate-900/[10] hover:text-gray-900"
                    >
                    {item.name}
                    </a>
                ))}
                </div>
                <a
                onClick={handleSignOut} 
                className="block w-full bg-gray-100 dark:bg-slate-700 px-5 py-3 text-center 
                    font-medium  dark:text-slate-100 hover:bg-sky-100/[10]
                    dark:hover:bg-slate-600"
                >
                Sign Out
                </a>
            </div>
            </Popover.Panel>
        </Transition>
        </Popover>
    </div>
)
}
