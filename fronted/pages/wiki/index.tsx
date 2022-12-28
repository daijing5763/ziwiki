import Link from "next/link";
import dynamic from 'next/dynamic'
import { useState,useEffect } from 'react'
import PopNav from "../../components/popnav";
import CreateRepo from "../../components/createrepo";
import UploadProfile from "../../components/uploadprofile";
const Search = dynamic(() => import('../../components/search'))
const UpdateRepo = dynamic(() => import('../../components/updaterepo'))

import { AiFillGithub, AiFillGitlab,AiOutlineDelete,AiOutlineSync,AiOutlineEdit} from "react-icons/ai"
import { SiGitee } from "react-icons/si"
import { authOptions } from '../api/auth/[...nextauth]'
import { unstable_getServerSession } from "next-auth/next"
import { toast } from "react-toastify";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import {fetch_repo_list,fetch_sync_repo,fetch_delete_repo,fetch_update_repo} from "../../utils/web_fetch"
export default ({ session }) => {
  const [useSearch, setUseSearch] = useState(false);
  const [repolist, setrepolist] = useState([])
  const [repolistcount, setrepolistcount] = useState(0)
  const [openUpdateRepo, setOpenUpdateRepo] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1);
  const [repo_id_, set_repo_id] = useState(0); 
  const [repo_describe_, set_repo_describe] = useState(''); 
  const [repo_from_, set_repo_from] = useState(''); 
  const [repo_git_, set_repo_git] = useState(''); 
  const [repo_name_, set_repo_name] = useState(''); 

  const [repo_access_token_, set_repo_access_token] = useState(''); 
  const [repo_user_name_, set_repo_user_name] = useState(''); 
  const [repo_access_type_, set_repo_access_type] = useState(''); 



  async function getRepoList(values) {
    fetch_repo_list(values, session.access_token).then(data => {
      if (data && !data.error) {
        setrepolist(data);
      }
    })
  }

  async function syncRepo(values) {
    const id = toast("正在同步仓库...", { type: toast.TYPE.INFO, isLoading: true });
    fetch_sync_repo(values, session.access_token).then(data => {
      if (data && data.error) {
        toast.update(id, { render: "同步失败:"+data.error, type: toast.TYPE.ERROR, isLoading: false,autoClose:2000 });
      } else {
        toast.update(id, { render: "同步成功", type: toast.TYPE.SUCCESS, isLoading: false,autoClose:1000 });
      }
    })
  }

  async function deleteRepo(values) {
    const id = toast("正在删除仓库...", { type: toast.TYPE.INFO, isLoading: true });
    fetch_delete_repo(values, session.access_token).then(data => {
      if (data && data.error) {
        toast.update(id, { render: "删除失败:"+data.error, type: toast.TYPE.ERROR, isLoading: false,autoClose:2000 });
      } else {
        toast.update(id, { render: "删除成功", type: toast.TYPE.SUCCESS, isLoading: false,autoClose:1000 });
      }
    })
  }

  async function updateRepo(values) {
    const id = toast("正在更新仓库...", { type: toast.TYPE.INFO, isLoading: true });
    fetch_update_repo(values, session.access_token).then(data => {
      if (data && data.error) {
        toast.update(id, { render: "更新失败:"+data.error, type: toast.TYPE.ERROR, isLoading: false,autoClose:2000 });
      } else {
        toast.update(id, { render: "更新成功", type: toast.TYPE.SUCCESS, isLoading: false,autoClose:1000 });
      }
    })
  }

  useEffect(() => { 
    getRepoList( { "page_id": currentPage, "page_size": 10 })
  },[]);
  

  useEffect(() => { 
    getRepoList( { "page_id": currentPage, "page_size": 10 })
  },[repolistcount,currentPage]);
  
  const [open, setOpen] = useState(false)
  function  showCreateRepo() {
    setOpen(!open)
  }
  function showUpdateRepo(repo_id,repo_name, repo_git, repo_describe, repo_from, repo_access_type, repo_user_name, repo_access_token) {
    set_repo_id(repo_id)
    set_repo_name(repo_name)
    set_repo_git(repo_git)
    set_repo_describe(repo_describe)
    set_repo_from(repo_from)
    set_repo_access_token(repo_access_token)
    set_repo_access_type(repo_access_type)
    set_repo_user_name(repo_user_name)
    setOpenUpdateRepo(!openUpdateRepo)
  }
return (

<div className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 min-h-screen">
  <PopNav />
    <CreateRepo repolistcount={repolistcount} setrepolistcount={setrepolistcount} open={open} setOpen={setOpen} />
    <UpdateRepo open={openUpdateRepo} setOpen={setOpenUpdateRepo} repo_id={repo_id_} repo_name={repo_name_} repo_git={repo_git_} repo_describe={repo_describe_} repo_from={repo_from_} repo_access_type={repo_access_type_ } repo_user_name={repo_user_name_} repo_access_token={repo_access_token_} />
  <div className="overflow-hidden">
    <div className='mx-3 md:mx-4 sm:px-6 md:px-8'>
            <div className="overflow-hidden " >
              <div className="w-full h-56 border-collapse pt-5 text-xl" >
                  <figure className="relative flex flex-col-reverse bg-slate-50 rounded-lg px-16 py-6 dark:bg-slate-800 dark:highlight-white/5">
                    <blockquote className="mt-6 text-slate-700 dark:text-slate-300">
                      <p>I feel like an idiot for not using Tailwind CSS until now.</p>
                    </blockquote>
                    <figcaption className="flex items-center space-x-4">
                      <img src="/profile.png" alt="" className="flex-none w-24 h-24 rounded-full object-cover" loading="lazy" decoding="async"/>
                        <div className="flex-auto">
                          <div className="text-2xl text-slate-900 font-semibold dark:text-slate-300">
                              <span className="absolute inset-0"></span>{session.username}
                          </div>
                          <div className="mt-0.5">
                            {session.email}
                          </div>
                        </div>
                    </figcaption>
                </figure>
                
          </div>
          <UploadProfile/>
              <div className="lg:col-span-5 xl:col-span-6 flex flex-col">
                <div className="relative z-10 rounded-xl bg-white shadow-xl ring-1 ring-slate-900/5 overflow-hidden my-auto xl:mt-18 dark:bg-slate-800">
                <section>
                  <header className="rounded-t-xl text-lg h-36 space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6 dark:highlight-white/10">
                    <div className="flex items-center justify-between">
                      <h2 className="font-semibold text-slate-900 dark:text-white">
                        Projects
                      </h2>
                      <div  onClick={showCreateRepo}  className="group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 cursor-pointer shadow-sm hover:bg-blue-400">
                        <svg width="20" height="20" fill="currentColor" className="mr-2">
                          <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z">
                          </path>
                        </svg>
                        New
                      </div>
                    </div>
                    <div className="group relative rounded-md dark:bg-slate-700 dark:highlight-white/10 dark:focus-within:bg-transparent">
                      {/* <svg width="20" height="20" fill="currentColor" className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500 dark:text-slate-500">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
                    </svg> */}
                    <button onClick={()=>{setUseSearch(!useSearch)}} type="button" className="flex w-full  items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:hover:ring-slate-700 dark:bg-slate-700 dark:highlight-white/5 dark:hover:bg-slate-700">
                      <svg width="24" height="24" fill="none" aria-hidden="true" className="mr-3 flex-none"><path d="m19 19-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle></svg>
                      Quick search...
                      <span className="ml-auto pl-3 flex-none text-xs font-semibold">⌘K</span>
                    </button>
                      {/* <button onClick={()=>{setUseSearch(!useSearch)}} aria-label="Filter projects" placeholder="Filter projects..." className="appearance-none w-full text-sm leading-6 bg-transparent text-slate-900 placeholder:text-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-100 dark:placeholder:text-slate-500 dark:ring-0 dark:focus:ring-2"/> */}
                    </div>
                  </header>
                  <ul className="bg-slate-50 p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 3xl:grid-cols-5 gap-4 text-sm leading-6 dark:bg-slate-900/40 dark:ring-1 dark:ring-white/5">
                      {repolist.map((repo,index) => (
                          <li key={index} className="group cursor-pointer rounded-md p-3 bg-white ring-1 ring-slate-200
                          shadow-sm hover:ring-2 hover:ring-blue-500 hover:shadow-md
                        dark:bg-slate-700 dark:ring-0 dark:highlight-white/10 dark:hover:bg-slate-800">


                          <dl className="sm:block lg:grid xl:block grid-cols-1 grid-rows-4 items-center">
                          
                            <div className="flex items-center justify-between">
                              <Link href={"/wiki/"+repo.id+"/home"} className={` ${repo.repo_from != "github" && "hidden"}`}>
                                <AiFillGithub className={`w-11 h-11  `} />
                              </Link>
                              <Link href={"/wiki/"+repo.id+"/home"} className={` ${repo.repo_from != "gitlab" && "hidden"}`}>
                                <AiFillGitlab className={`w-11 h-11 `} />
                              </Link>
                              <Link href={"/wiki/"+repo.id+"/home"} className={` ${repo.repo_from != "gitee" && "hidden"}`} >
                                <SiGitee className={`w-11 h-11  ` }/>
                              </Link>
                              <div className="col-start-2 row-start-1 row-end-3">
                                <dd className="flex justify-end sm:justify-end lg:justify-end xl:justify-end -space-x-1.5">
                                  <Link href="#" onClick={()=>deleteRepo( { "repo_id": repo.id  })}>
                                    <AiOutlineDelete className={`w-10 h-10 p-2 `} />
                                  </Link>
                                  <Link href="#" onClick={()=>syncRepo( { "repo_id": repo.id  })}>
                                    <AiOutlineSync className={`w-10 h-10 p-2 `} />
                                  </Link>

                                  <Link href="#" onClick={()=>showUpdateRepo(repo.id,repo.repo_name,repo.repo_git,repo.repo_describe,"d","e",repo.repo_user_name,repo.repo_access_token )}>
                                    <AiOutlineEdit className={`w-10 h-10 p-2 `} />
                                    </Link>
                                </dd>
                              </div>
                            </div>
                            <Link href={"/wiki/"+repo.id+"/home"}>
                              <div className="font-extrabold text-2xl py-4 text-slate-900  dark:text-slate-100">
                                {repo.repo_name}
                              </div>
                            </Link>
                              
                            <Link href={"/wiki/"+repo.id+"/home"}>
                              <div>
                                  <p className=" text-base">{repo.repo_describe}</p>
                              </div>
                            </Link>
                          </dl>
                          </li>
                      ))}

                      <li className="flex">
                        <div onClick={showCreateRepo} className="group w-full  flex flex-col items-center justify-center rounded-md border-2 border-dashed 
                        border-slate-300 text-sm leading-6 text-slate-900 font-medium py-10 cursor-pointer
                        hover:border-blue-500 hover:border-solid hover:bg-white hover:text-blue-500
                          dark:border-slate-700 dark:text-slate-100 dark:hover:border-blue-500 dark:hover:bg-transparent
                          dark:hover:text-blue-500">
                        <svg width="24" height="24" fill="currentColor" className="mb-1 text-slate-400 group-hover:text-blue-500">
                          <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z">
                          </path>
                        </svg>
                          新建仓库
                        </div>
                      </li>
                </ul>
                
                <div className="flex items-center justify-between  bg-transparent px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
      <div
          onClick={()=>{ if(currentPage>1){setCurrentPage(currentPage-1)} }}
          className="relative inline-flex items-center rounded-md border dark:border-slate-800 dark:bg-slate-900/50 border-gray-300 bg-white dark:bg-slate-500 px-4 py-2 text-sm font-medium text-gray-700 dark:text-slate-300 hover:bg-gray-50"
        >
          Previous
                    </div>
        <div
          
          className="relative inline-flex items-center rounded-md border dark:border-slate-800 dark:bg-slate-900/50 border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 dark:text-slate-300 hover:bg-gray-50"
        >
          {currentPage}
                    </div>      
        <div
          onClick={() => { setCurrentPage(currentPage + 1) }}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 dark:border-slate-800 dark:bg-slate-900/50 bg-white px-4 py-2 text-sm font-medium text-gray-700 dark:text-slate-300 hover:bg-gray-50"
        >
          Next
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <div onClick={()=>{ if(currentPage>1){setCurrentPage(currentPage-1)} }}
              className="relative inline-flex items-center rounded-l-md border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-900/50 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div
              aria-current="page"
              className="relative z-10 inline-flex items-center border border-indigo-500 dark:border-slate-800 bg-indigo-50 dark:bg-slate-900/50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
            >
              {currentPage}
            </div>
            <div onClick={() => { setCurrentPage(currentPage + 1) }}
              className="relative inline-flex items-center rounded-r-md border dark:border-slate-800 dark:bg-slate-900/50 border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>




                </section>
      </div>
    </div>
  </div>
  </div>
    </div>
    {useSearch && (<Search useSearch={useSearch} setUseSearch={setUseSearch}/>)}

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
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  return {
    props: {
      session,
    },
  }
}