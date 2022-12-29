import React, { useState, useEffect } from 'react';
import {RiMenu4Line,RiMenuLine} from  "react-icons/ri"
import { MdDarkMode, MdLightMode ,MdLogin,MdMenu,MdClose,MdContentCopy} from "react-icons/md"
import { AiFillGithub,AiOutlineSearch,AiOutlineUser,AiFillGitlab } from "react-icons/ai"
import { CgProfile } from "react-icons/cg"
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getSession, useSession, signOut } from "next-auth/react"
import {fetch_repo_info,fetch_markdown} from "../utils/web_fetch"
import { RiLogoutBoxFill, RiLoginBoxFill, RiLogoutBoxLine, RiLoginBoxLine } from "react-icons/ri"
import { SiGitee } from "react-icons/si"
function handleSignOut(){
  signOut({ callbackUrl: `/` })
}

export default function NavBar({ NavBarOpen, setNavBarOpen, useSearch, setUseSearch }) {
  const [themeDark, setTheme] = useState(true);
  const [repo_from, set_repo_from] = useState(''); 
  const [repo_git, set_repo_git] = useState(''); 
  const router = useRouter();
  const { data: session } = useSession()
  const repo_id = parseInt(Array.isArray(router.query.repoid) ? router.query.repoid[0] : router.query.repoid)
  
  useEffect(() => {
    const themeDarkItem = localStorage.getItem('themeDark');
    const sideOpen = localStorage.getItem('NavBarOpen');
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
      
    // 根据已有存储的open信息设置
    if (sideOpen) {
      const data = JSON.parse(sideOpen);
      setNavBarOpen(data);
    } 

  }, []);
  async function getRepo(values) {
    fetch_repo_info(values, session.access_token).then(repo_info => {
      if (repo_info && !repo_info.error) {
        set_repo_from(repo_info.repo_from)
        set_repo_git(repo_info.repo_git)
      }
    })
  }

  useEffect(() => {
    getRepo({"id":repo_id})
  }, [router.query.repoid]);
  

return (
<div  className="	sticky top-0 z-50 w-full backdrop-blur flex-none transition-colors 
  duration-500  lg:border-b lg:border-slate-900/10 
bg-white/95 supports-backdrop-blur:bg-white/60 dark:border-slate-50/[0.06] dark:bg-transparent">  
  <div className="flex flex-row justify-between items-center py-2 lg:py-3 border-b border-slate-900/10 lg:px-8 lg:border-0  mx-3 md:mx-4 dark:border-slate-300/10 ">
    <div className="flex flex-row items-center ">
      <RiMenuLine className={`${NavBarOpen && "hidden"} mr-2 md:mr-3 block w-7 h-7  dark:text-slate-200  hover:text-sky-500  cursor-pointer`} onClick={() => { localStorage.setItem('NavBarOpen', JSON.stringify(!NavBarOpen));setNavBarOpen(!NavBarOpen); }} />
      <RiMenu4Line className={`${!NavBarOpen && "hidden"} mr-2 md:mr-3 block w-7 h-7  dark:text-slate-200  hover:text-sky-500  cursor-pointer`} onClick={() => { localStorage.setItem('NavBarOpen', JSON.stringify(!NavBarOpen)); setNavBarOpen(!NavBarOpen); }}  />
      <div className="flex flex-row items-center pl-2  pr-1.5 md:pl-4 md:pr-3.5">
        <Link href="/" className="md:mr-1 flex-none w-[1.8rem] overflow-hidden md:w-auto">
          <picture>
            <img src="/logo.svg" className=" w-7 h-7  md:w-9 md:h-9" alt="LOGO"/>
          </picture>
        </Link>
        <h1 className="font-bold text-2xl lg:text-3xl dark:text-slate-200 cursor-pointer">
            AI<span className="text-blue-500">Infite</span>
        </h1>
      </div>
    </div>
    
    <div className="flex items-center gap-x-2 md:gap-x-3	 justify-center  dark:text-slate-200 ">
      <AiOutlineSearch  className='block w-7 h-7  hover:text-sky-500 cursor-pointer' onClick={()=>{setUseSearch(!useSearch)}} />
      <MdLightMode
          className={` block w-7 h-7  hover:text-sky-500 cursor-pointer ${themeDark && "hidden"}`}
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
          className={`block w-7 h-7 hover:text-sky-500 cursor-pointer ${!themeDark && "hidden"}`}
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
      <Link href={repo_git}>
          <AiFillGithub className={`block w-7 h-7  hover:text-sky-500 cursor-pointer ${(repo_from!="github") && "hidden"}`} />
          <AiFillGitlab className={`block w-7 h-7  hover:text-sky-500 cursor-pointer ${(repo_from!="gitlab") && "hidden"}`} />
          <SiGitee className={`block w-7 h-7  hover:text-sky-500 cursor-pointer ${(repo_from!="gitee") && "hidden"}`} />
      </Link>
      <RiLogoutBoxLine className={`block w-7 h-7  hover:text-sky-500 cursor-pointer` } onClick={handleSignOut}  />
      <Link href="/wiki">
        <AiOutlineUser className='block w-7 h-7  hover:text-sky-500 cursor-pointer' />
      </Link>
    </div>
  </div>
</div>
  )
}