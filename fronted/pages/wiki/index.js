import Link from "next/link";
import { getSession } from 'next-auth/react'
import PopNav from "../../components/popnav"
import CreateRepo from '../../components/createrepo'
import { Fragment, useRef, useState,useEffect } from 'react'
import { AiFillGithub, AiFillGitlab ,AiFillDelete,AiOutlineDelete,AiOutlineSync,AiOutlineEdit} from "react-icons/ai"
import { SiGitee } from "react-icons/si"

export default ({ session }) => {

  const [repolist, setrepolist] = useState([])

  async function getRepoList(values) {
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify(values)
    }
    
    await fetch('http://0.0.0.0:8080/get_repo_list', options)
        .then(res => res.json())
      .then((data) => {
          console.log("mydebug:repolist is:",data)
          setrepolist(data);
        })
  }

  async function syncRepo(values) {
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify(values)
    }
    await fetch('http://0.0.0.0:8080/pull_repo', options)
        .then(res => res.json())
      .then((data) => {
          console.log(data)
        })
  }

  useEffect(() => { 
    getRepoList( { "page_id": 1, "page_size": 10 })
  },[]);
  
  const [open, setOpen] = useState(false)
  function  showCreateRepo() {
    setOpen(!open)
  }

return (

<div className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 min-h-screen">
  <PopNav />
  <CreateRepo open={open} setOpen={setOpen} token={session.access_token} />
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
              <div className="lg:col-span-5 xl:col-span-6 flex flex-col">
                <div className="relative z-10 rounded-xl bg-white shadow-xl ring-1 ring-slate-900/5 overflow-hidden my-auto xl:mt-18 dark:bg-slate-800">
                <section>
                  <header className="rounded-t-xl text-lg h-36 space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6 dark:highlight-white/10">
                    <div className="flex items-center justify-between">
                      <h2 className="font-semibold text-slate-900 dark:text-white">
                        Projects
                      </h2>
                      <div className="group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 cursor-pointer shadow-sm hover:bg-blue-400">
                        <svg width="20" height="20" fill="currentColor" className="mr-2">
                          <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z">
                          </path>
                        </svg>
                        New
                      </div>
                    </div>
                    <div className="group relative rounded-md dark:bg-slate-700 dark:highlight-white/10 dark:focus-within:bg-transparent">
                      <svg width="20" height="20" fill="currentColor" className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500 dark:text-slate-500">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
                      </svg>
                      <input type="text" aria-label="Filter projects" placeholder="Filter projects..." className="appearance-none w-full text-sm leading-6 bg-transparent text-slate-900 placeholder:text-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-100 dark:placeholder:text-slate-500 dark:ring-0 dark:focus:ring-2"/>
                    </div>
                  </header>
                  <ul className="bg-slate-50 p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-5 xl:grid-cols-5 gap-4 text-sm leading-6 dark:bg-slate-900/40 dark:ring-1 dark:ring-white/5">
                      {repolist.map((repo,index) => (
                          <li key={index} className="group cursor-pointer rounded-md p-3 bg-white ring-1 ring-slate-200
                          shadow-sm hover:bg-sky-500 hover:ring-sky-500 hover:shadow-md
                        dark:bg-slate-700 dark:ring-0 dark:highlight-white/10 dark:hover:bg-slate-800">

                          <dl className="grid sm:block lg:grid xl:block grid-cols-1 grid-rows-4 items-center">
                          <Link href={"/wiki/"+repo.id+"/home"}>
                            <div className="flex items-center">
                              <AiFillGithub className={`w-12 h-12 p-2 ${repo.repo_from!="github" && "hidden"}` } />
                              <AiFillGitlab className={`w-12 h-12 p-2 ${repo.repo_from!="gitlab" && "hidden"}` } />
                              <SiGitee className={`w-12 h-12 p-2 ${repo.repo_from!="gitee" && "hidden"}` }/>
                              <dd className="font-semibold text-xl text-slate-900 group-hover:text-white dark:text-slate-100">
                                {repo.repo_name}
                              </dd>
                            </div>
                            <div>
                                <dd className="group-hover:text-blue-200 text-base">{repo.repo_describe}</dd>
                              </div>
                          </Link>
                            <div className="col-start-2 row-start-1 row-end-3">
                                <dd className="flex justify-end sm:justify-end lg:justify-end xl:justify-end -space-x-1.5">
                                <AiOutlineDelete className={`w-9 h-9 p-2 `} />
                                <Link href="#" onClick={()=>syncRepo( { "repo_id": repo.id  })}>
                                  <AiOutlineSync className={`w-9 h-9 p-2 `} />
                                </Link>
                                  <AiOutlineEdit className={`w-9 h-9 p-2 ` } />
                                </dd>
                            </div>
                            
                          </dl>
                        
    
                          </li>
                      ))}

                      <li className="flex">
                        <div onClick={showCreateRepo} className="group w-full  flex flex-col items-center justify-center rounded-md border-2 border-dashed 
                        border-slate-300 text-sm leading-6 text-slate-900 font-medium py-3 cursor-pointer
                          hover:border-blue-500 hover:border-solid hover:bg-white hover:text-blue-500
                          dark:border-slate-700 dark:text-slate-100 dark:hover:border-blue-500 dark:hover:bg-transparent
                          dark:hover:text-blue-500">
                        <svg width="20" height="20" fill="currentColor" className="mb-1 text-slate-400 group-hover:text-blue-500">
                          <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z">
                          </path>
                        </svg>
                          New project
                        </div>
                      </li>
                  </ul>
                </section>
      </div>
    </div>
  </div>
  </div>
  </div>
</div>

    )
}

export async function getServerSideProps({ req }){
    const session = await getSession({ req })
    if(!session){
        return {
            redirect : {
                destination : "/auth/login",
                premanent: false
            }
        }
    }
  
    // authorize user return session
    return {
        props: { session }
    }
}