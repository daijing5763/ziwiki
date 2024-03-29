import NavBar from '../../../components/navbar'
import SideBar from '../../../components/sidebar'
import Search from '../../../components/search'
import { MathJaxContext } from "better-react-mathjax";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { Trans } from '@lingui/macro';
import { t } from "@lingui/macro"
import { SiGitee } from "react-icons/si"
import { AiFillGithub, AiFillGitlab,AiOutlineDelete,AiOutlineSync,AiOutlineEdit} from "react-icons/ai"
import parse from 'html-react-parser';
import { authOptions } from '../../api/auth/[...nextauth]'
import { unstable_getServerSession } from "next-auth/next"
import {RiMenu4Line,RiMenuLine} from  "react-icons/ri"
import { useRouter } from "next/router"
import { mathjax_config } from "../../../utils/mathjax_config"
import {fetch_repo_info,fetch_markdown} from "../../../utils/web_fetch"
import {html_parser_options_list,get_html_parser_option} from "../../../utils/json_parser_config"
import UpdateRepo from '../../../components/updaterepo';

export default function Home({ session }) {
  const router = useRouter();
  const slugs = router.query.slug;
  const repo_id = parseInt(Array.isArray(router.query.repoid) ? router.query.repoid[0] : router.query.repoid)
  const [openUpdateRepo, setOpenUpdateRepo] = useState(false); 
  const [repo_created_at, set_repo_created_at] = useState(''); 
  const [repo_describe, set_repo_describe] = useState(''); 
  const [repo_from, set_repo_from] = useState(''); 
  const [repo_git, set_repo_git] = useState(''); 
  const [repo_name, set_repo_name] = useState(''); 

  const [repo_access_token, set_repo_access_token] = useState(''); 
  const [repo_user_name, set_repo_user_name] = useState(''); 
  const [repo_access_type, set_repo_access_type] = useState(''); 

  const [ishome, set_ishome] = useState(false); 

  
  const [layout, setlayout] = useState([]); 
  const [markdowntext, setmarkdown] = useState(''); 
  const [markdownlist, setmarkdownlist] = useState(''); 

  const [SideBarIndex, setSideBarIndex] = useState(-1); 
  const [useSearch, setUseSearch] = useState(false);
  const [NavBarOpen, setNavBarOpen] = useState(true);
  const html_parser_options = get_html_parser_option(router.query.slug,router.query.repoid)
  const dynamicRoute = useRouter().asPath;
  async function getRepo(values) {
    fetch_repo_info(values, session.access_token).then(repo_info => {
      if (repo_info && !repo_info.error) {
        set_repo_created_at(repo_info.created_at)
        set_repo_describe(repo_info.repo_describe)
        set_repo_from(repo_info.repo_from)
        set_repo_git(repo_info.repo_git)
        set_repo_name(repo_info.repo_name)
      }
    })
  }

  async function getLayout(values) {
    fetch_markdown(values, session.access_token).then(data => {
      if (data && !data.error) {
        var myObject = JSON.parse(data.mdtext);
        setlayout(myObject['sublayouts'])
      }
    })
  }
  function showUpdateRepo(repo_name, repo_git, repo_describe, repo_from, repo_access_type, repo_user_name, repo_access_token) {
    set_repo_name(repo_name)
    set_repo_git(repo_git)
    set_repo_describe(repo_describe)
    set_repo_from(repo_from)
    set_repo_access_token(repo_access_token)
    set_repo_access_type(repo_access_type)
    set_repo_user_name(repo_user_name)
    setOpenUpdateRepo(!openUpdateRepo)
  }
  async function getMarkdown(values) {
    fetch_markdown(values, session.access_token).then(data => {
      if (data && !data.error) {
        setmarkdown(data.mdtext)
      }
    })
  }

  async function getMarkdownList(values) {
    fetch_markdown(values, session.access_token).then(data => {
      if (data && !data.error) {
        setmarkdownlist(data.mdtext)
      }
    })
  }

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

  // only slug change,fetch new data;
  useEffect(() => {
    if (typeof slugs != "undefined" && Array.isArray(slugs)) {
      if (slugs.join("/") == "home") {
        set_ishome(true)
        setmarkdown("")
      } else {
        set_ishome(false)
        getMarkdown({"mdhref":slugs.join("/"),"repo_id":repo_id});
        getMarkdownList({"mdhref":slugs.join("/")+".list","repo_id":repo_id});
      }
    }
  }, [router.query.slug]);

  // only when repo change, fetch new data
  useEffect(() => {
    getRepo({"id":repo_id})
    getLayout({"mdhref": "layout.json","repo_id":repo_id});
  }, [router.query.repoid]);
  
  useEffect(() => setUseSearch(false), [dynamicRoute]);

return (
  <div className="antialiased  text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 min-h-screen">

  <NavBar NavBarOpen={NavBarOpen} setNavBarOpen={setNavBarOpen} useSearch={useSearch} setUseSearch={setUseSearch} />
  <UpdateRepo open={openUpdateRepo} setOpen={setOpenUpdateRepo} repo_id={repo_id}  repo_name={repo_name} repo_git={repo_git} repo_describe={repo_describe} repo_from={repo_from} repo_access_type={repo_access_type} repo_user_name={repo_user_name} repo_access_token={repo_access_token} />
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

      <SideBar repo_id={parseInt(Array.isArray(router.query.repoid) ? router.query.repoid[0] : router.query.repoid)}  layout={layout} SideBarIndex={SideBarIndex} setSideBarIndex={setSideBarIndex}  useSearch={useSearch } setUseSearch={setUseSearch} />
    </div>

    <div className={`overflow-hidden ${NavBarOpen?'lg:pl-[20rem] lg:pr-[20rem]':'px-4 pb-6'}` } >
      <div className=" mx-auto relative z-5 pt-10  ">
        <div className="mb-16 md:flex items-center justify-center">
          <div className="flex-auto  max-w-3xl xl:max-w-2xl">
            <MathJaxContext version={3} config={mathjax_config}>
                {parse(markdowntext, html_parser_options)}
                {
                  ishome &&

      <section className="py-5 w-full border-collapse text-xl">
        <div className="relative flex flex-col-reverse bg-slate-100 rounded-lg px-4 md:px-16 py-6 dark:bg-slate-800 dark:highlight-white/5">
          <blockquote className="mt-6 pl-4 text-slate-700 dark:text-slate-300">
            <p><Trans><span className='font-bold'>Describe:</span></Trans> {repo_describe}</p>
          </blockquote>
          <blockquote className="mt-6 pl-4 text-slate-700 dark:text-slate-300">
            <p><Trans><span className='font-bold'>Git:</span></Trans> {repo_git}</p>
          </blockquote>
        <div className="flex items-center space-x-4">
          <AiFillGithub className={`w-24 h-24 ${repo_from!="github" &&"hidden"}  `} />
          <AiFillGitlab className={`w-24 h-24 ${repo_from!="gitlab" &&"hidden"} `} />
          <SiGitee className={`w-24 h-24  ${repo_from!="gitee" &&"hidden"} ` }/>
          <div className="flex-auto">
            <div className="text-2xl text-slate-900 font-semibold dark:text-slate-300">
              {repo_name}
            </div>
            <Link href="#" onClick={()=>showUpdateRepo(repo_name,repo_git,repo_describe,"d","e",repo_user_name,repo_access_token )}>
                <AiOutlineEdit className={`w-10 h-10 p-2 `} />
              </Link>
          </div>
        </div>
      </div>
    </section>
                













                }

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
          {parse(markdownlist,html_parser_options_list)}
        </div>
      </div>

  </div>
    {useSearch && (<Search useSearch={useSearch} setUseSearch={setUseSearch} repo_id={repo_id as number} />)}

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