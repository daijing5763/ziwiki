import Link from "next/link";
import { useState,useEffect } from 'react'
import PopNav from "../../components/popnav";
import DeleteRepo from "../../components/deleterepo";
import CreateRepo from "../../components/createrepo";
import UploadProfile from "../../components/uploadprofile";
import Search from '../../components/search'
import UpdateRepo from '../../components/updaterepo'
import Profile from "../../components/profile"
import PageBar from "../../components/pagebar";
import { AiFillGithub, AiFillGitlab,AiOutlineDelete,AiOutlineSync,AiOutlineEdit} from "react-icons/ai"
import { SiGitee } from "react-icons/si"
import { authOptions } from '../api/auth/[...nextauth]'
import { unstable_getServerSession } from "next-auth/next"
import { toast } from "react-toastify";
import { Trans } from '@lingui/macro';
import { t } from "@lingui/macro"
import {fetch_repo_list,fetch_sync_repo,fetch_delete_repo} from "../../utils/web_fetch"
export default ({ session }) => {
  const [deleteopen, setdeleteopen] = useState(false);
  const [imagekey, setimagekey] = useState(1);
  const [useSearch, setUseSearch] = useState(false);
  const [repolist, setrepolist] = useState([])
  const [repolistcount, setrepolistcount] = useState(0)
  const [openUpdateRepo, setOpenUpdateRepo] = useState(false); 
  const [openUpdateProfile, setOpenUpdateProfile] = useState(false); 
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
    const id = toast(t`Sync Repo...`, { type: toast.TYPE.INFO, isLoading: true });
    fetch_sync_repo(values, session.access_token).then(data => {
      if (data && data.error) {
        toast.update(id, { render: t`Sync Failed:`+data.error, type: toast.TYPE.ERROR, isLoading: false,autoClose:2000 });
      } else {
        toast.update(id, { render: t`Sync Succeed`, type: toast.TYPE.SUCCESS, isLoading: false,autoClose:1000 });
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
    <DeleteRepo  open={deleteopen} setOpen={setdeleteopen} repo_id={repo_id_} /> 
    <CreateRepo repolistcount={repolistcount} setrepolistcount={setrepolistcount} open={open} setOpen={setOpen} />
    <UpdateRepo open={openUpdateRepo} setOpen={setOpenUpdateRepo} repo_id={repo_id_} repo_name={repo_name_} repo_git={repo_git_} repo_describe={repo_describe_} repo_from={repo_from_} repo_access_type={repo_access_type_} repo_user_name={repo_user_name_} repo_access_token={repo_access_token_} />
    <UploadProfile open={openUpdateProfile} setOpen={setOpenUpdateProfile} imagekey={imagekey} setimagekey={setimagekey} />
  <div className="overflow-hidden">
    <div className='mx-3 md:mx-4 sm:px-6 md:px-8'>
            <div className="overflow-hidden " >
            <Profile openUpdateProfile={openUpdateProfile} setOpenUpdateProfile={setOpenUpdateProfile} imagekey={imagekey} />
          
                <section className="mb-5 rounded-xl bg-slate-100 shadow-xl ring-1 ring-slate-900/5 overflow-hidden xl:mt-18 dark:bg-slate-800">
                  <header className="rounded-t-xl  text-lg h-36 space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6  dark:highlight-white/10">
                    <div className="flex items-center justify-between">
                      <h2 className="font-semibold text-slate-900 dark:text-white">
                        <Trans>Projects</Trans>
                      </h2>
                      <div  onClick={showCreateRepo}  className="group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 cursor-pointer shadow-sm hover:bg-blue-400">
                        <svg width="20" height="20" fill="currentColor" className="mr-2">
                          <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z">
                          </path>
                        </svg>
                        <Trans>New</Trans>
                      </div>
                    </div>
                    <div className="group relative rounded-md dark:bg-slate-700 dark:highlight-white/10 dark:focus-within:bg-transparent">

                    <button onClick={()=>{setUseSearch(!useSearch)}} type="button" className="flex w-full  items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 bg-white hover:ring-slate-300 dark:hover:ring-slate-700 dark:bg-slate-700 dark:highlight-white/5 dark:hover:bg-slate-700">
                      <svg width="24" height="24" fill="none" aria-hidden="true" className="mr-3 flex-none"><path d="m19 19-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle></svg>
                      <Trans>Quick search...</Trans>
                      <span className="ml-auto pl-3 flex-none text-xs font-semibold">⌘K</span>
                    </button>
                      
                    </div>
                  </header>
                  <ul className=" p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 3xl:grid-cols-5 gap-4 text-sm leading-6 dark:bg-slate-900/40 dark:ring-1 dark:ring-white/5 ">
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
                                  <Link href="#" onClick={() => { set_repo_id(repo.id); setdeleteopen(true);getRepoList( { "page_id": currentPage, "page_size": 10 }) }}>
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
                          <Trans>Create Repo</Trans>
                        </div>
                      </li>
                </ul>
                <PageBar currentPage={currentPage} setCurrentPage={setCurrentPage}  />
  </section>

  </div>
  </div>
    </div>
    {useSearch && (<Search useSearch={useSearch} setUseSearch={setUseSearch} repo_id={-1} />)}

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