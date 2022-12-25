import Link from "next/link";
import PopNav from "../components/popnav"
import { Fragment, useRef, useState,useEffect } from 'react'
import { authOptions } from './api/auth/[...nextauth]'
import { unstable_getServerSession } from "next-auth/next"
import { toast } from "react-toastify";
import Search from "../components/search"
import {AiFillLock,AiFillUnlock} from "react-icons/ai"
import {fetch_list_users,fetch_ban_user} from "../utils/web_fetch"
export default ({ session }) => {
  const [useSearch, setUseSearch] = useState(false);
  const [userlist, setuserlist] = useState([])
  const [changeuser,setchangeuser] = useState(false)

  async function getUserList(values) {
    fetch_list_users(values, session.access_token).then(data => {
      if (data && !data.error) {
        setuserlist(data);
      }
    })
  }

  async function banUser(values) {
    const id = toast("正在更新用户状态...", { type: toast.TYPE.INFO, isLoading: true });
    fetch_ban_user(values, session.access_token).then(data => {
      if (data && data.error) {
        toast.update(id, { render: "更新失败:" + data.error, type: toast.TYPE.ERROR, isLoading: false, autoClose: 2000 });
      } else {
        toast.update(id, { render: "更新成功", type: toast.TYPE.SUCCESS, isLoading: false, autoClose: 1000 });
        setchangeuser(!changeuser)
      }
    })
  }

  useEffect(() => { 
    getUserList( { "page_id": 1, "page_size": 10 })
  },[changeuser]);
  
  
  const [open, setOpen] = useState(false)
  function  showCreateRepo() {
    setOpen(!open)
  }

return (

<div className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 min-h-screen">
  <PopNav />
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
                      <div  onClick={showCreateRepo}  className="group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 cursor-pointer shadow-sm hover:bg-blue-400">
                        <svg width="20" height="20" fill="currentColor" className="mr-2">
                          <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z">
                          </path>
                        </svg>
                        New
                      </div>
                    </div>
                    <div className="group relative rounded-md dark:bg-slate-700 dark:highlight-white/10 dark:focus-within:bg-transparent">
                    <button onClick={()=>{setUseSearch(!useSearch)}} type="button" className="flex w-full  items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:hover:ring-slate-700 dark:bg-slate-700 dark:highlight-white/5 dark:hover:bg-slate-700">
                      <svg width="24" height="24" fill="none" aria-hidden="true" className="mr-3 flex-none"><path d="m19 19-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></circle></svg>
                      Quick search...
                      <span className="ml-auto pl-3 flex-none text-xs font-semibold">⌘K</span>
                    </button>
                    </div>
                </header>
                <div className="overflow-x-auto px-1 md:px-8 pb-8 flex -mx-4 sm:-mx-6 md:mx-0">
                  <div className="flex-none min-w-full px-4 sm:px-6 md:px-0 overflow-hidden lg:overflow-auto scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 scrollbar-track:!rounded dark:scrollbar-track:!bg-slate-500/[0.16] dark:scrollbar-thumb:!bg-slate-500/50">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr>
                          <th className="sticky z-10 top-0 text-sm leading-6 font-semibold text-slate-700 bg-white p-0 dark:bg-slate-900 dark:text-slate-300">
                            <div className="py-2 pl-2 border-b border-slate-200 dark:border-slate-400/20">
                              username
                            </div>
                          </th>
                          <th className="sticky z-10 top-0 text-sm leading-6 font-semibold text-slate-700 bg-white p-0 dark:bg-slate-900 dark:text-slate-300">
                            <div className="py-2 pl-2 border-b border-slate-200 dark:border-slate-400/20">
                              email
                            </div>
                          </th>
                          <th className="sticky z-10 top-0 text-sm leading-6 font-semibold text-slate-700 bg-white p-0 dark:bg-slate-900 dark:text-slate-300">
                            <div className="py-2 pl-2 border-b border-slate-200 dark:border-slate-400/20">
                              is_locked
                            </div>
                          </th>
                          <th className="sticky z-10 top-0 text-sm leading-6 font-semibold text-slate-700 bg-white p-0 dark:bg-slate-900 dark:text-slate-300">
                            <div className="py-2 pl-2 border-b border-slate-200 dark:border-slate-400/20">
                              用户状态
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="align-baseline">
                      {userlist.map((user, index) => (
                        <tr key={index}>
                          <td translate="no" className="py-2 pr-2 font-mono font-medium text-xs leading-6 text-sky-500 whitespace-nowrap dark:text-sky-400">
                            {user.username}
                          </td>
                          <td translate="no" className="py-2 pr-2 font-mono font-medium text-xs leading-6 text-sky-500 whitespace-nowrap dark:text-sky-400">
                            {user.email}
                          </td>
                          <td translate="no" className="py-2 pr-2 font-mono font-medium text-xs leading-6 text-sky-500 whitespace-nowrap dark:text-sky-400">
                            {user.is_locked.toString()}
                          </td>
                          <td translate="no" className="py-2 pr-2 font-mono font-medium text-xs leading-6 text-sky-500 whitespace-nowrap dark:text-sky-400">
                            
                          <AiFillLock onClick={() => { banUser({ "id": user.id,"is_locked":false })}} className={`${!user.is_locked && "hidden"}`} />
                          <AiFillUnlock onClick={() => { banUser({ "id": user.id,"is_locked":true })}}  className={`${user.is_locked && "hidden"}`} />
                          </td>
                      </tr>
                    ))}
                      </tbody>
                    </table>
                    <div className="sticky bottom-0 h-px -mt-px bg-slate-200 dark:bg-slate-400/20">
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
  if (!session || session.username != "admin") {
    return {
        redirect : {
            destination : "/",
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