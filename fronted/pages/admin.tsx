import Link from "next/link";
import dynamic from 'next/dynamic'

import PopNav from "../components/popnav";
const SessionTable = dynamic(() => import('../components/sessiontable'))
const UserTable = dynamic(() => import('../components/usertable'))
const Map = dynamic(() => import('../components/map'))


import { useState,useEffect } from 'react'
import { authOptions } from './api/auth/[...nextauth]'
import { unstable_getServerSession } from "next-auth/next"
import { toast } from "react-toastify";
import {GiEgyptianProfile} from "react-icons/gi"
import { fetch_list_users, fetch_ban_user,fetch_list_sessions,fetch_list_active_sessions,fetch_ban_session } from "../utils/web_fetch"
export default ({ session }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentsessionPage, setsessionpage] = useState(1);
  const [currentactivesessionPage, setactivesessionpage] = useState(1);
  const [userlist, setuserlist] = useState([])
  const [sessionlist, setsessionlist] = useState([])
  const [activesessionlist, setactivesessionlist] = useState([])
  const [changeuser, setchangeuser] = useState(false)
  const [changesession, setchangesession] = useState(false)
  const [changeactivesession,setchangeactivesession] = useState(false)
  async function getUserList(values) {
    fetch_list_users(values, session.access_token).then(data => {
      if (data && !data.error) {
        setuserlist(data);
      }
    })
  }

  async function getSessionList(values) {
    fetch_list_sessions(values, session.access_token).then(data => {
      if (data && !data.error) {
        setsessionlist(data);
      }
    })
  }

  async function getActiveSessionList(values) {
    fetch_list_active_sessions(values, session.access_token).then(data => {
      if (data && !data.error) {
        setactivesessionlist(data);
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

  async function banSession(values) {
    const id = toast("正在更新会话状态...", { type: toast.TYPE.INFO, isLoading: true });
    fetch_ban_session(values, session.access_token).then(data => {
      if (data && data.error) {
        toast.update(id, { render: "更新失败:" + data.error, type: toast.TYPE.ERROR, isLoading: false, autoClose: 2000 });
      } else {
        toast.update(id, { render: "更新成功", type: toast.TYPE.SUCCESS, isLoading: false, autoClose: 1000 });
        setchangesession(!changesession)
        setchangeactivesession(!changeactivesession)
      }
    })
  }

  useEffect(() => { 
    getUserList({ "page_id": currentPage, "page_size": 10 })
  }, [changeuser, currentPage]);
  useEffect(() => { 
    getSessionList({ "page_id": currentsessionPage, "page_size": 10 })
  }, [changesession,changeactivesession, currentsessionPage]);
  useEffect(() => { 
    getActiveSessionList( { "page_id": currentactivesessionPage, "page_size": 10 })
  },[changesession,changeactivesession,currentactivesessionPage]);
  
  
  const [open, setOpen] = useState(false)
  function  showCreateRepo() {
    setOpen(!open)
  }

return (

<div className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 min-h-screen">
  <PopNav />
  <div className="overflow-hidden">
    <div className='mx-3 md:mx-4 sm:px-6 md:px-8'>
            <div className="overflow-hidden  my-5" >
              <div className="w-full h-56 border-collapse pt-5 text-xl" >
                  <figure className="relative flex flex-col-reverse bg-slate-100 rounded-lg px-4 mx:px-16 py-6 dark:bg-slate-800 dark:highlight-white/5">
                    <blockquote className="mt-6 text-slate-700 dark:text-slate-300">
                      <p>I feel like an idiot for not using Tailwind CSS until now.</p>
                    </blockquote>
                    <figcaption className="flex items-center space-x-4">
                    <img src={`http://localhost:8080/static_get/${session.user_id}/profile.png`} alt="" className="flex-none w-24 h-24 rounded-full object-cover" loading="lazy" decoding="async"/>
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
              <div className="lg:col-span-5 xl:col-span-6 flex flex-col pb-10 pt-10">
                <div className="relative z-10 rounded-xl bg-slate-100 shadow-xl ring-1 ring-slate-900/5 overflow-hidden my-auto xl:mt-18 dark:bg-slate-800">

              <UserTable userlist={userlist} banUser={banUser} currentPage={currentPage} setCurrentPage={setCurrentPage} />
              <SessionTable sessionlist={sessionlist} banSession={banSession} currentPage={currentsessionPage} setCurrentPage={setsessionpage} type="session" />
              <SessionTable sessionlist={activesessionlist} banSession={banSession} currentPage={currentactivesessionPage} setCurrentPage={setactivesessionpage}type="activesession"  />
            <section className="hidden md:block pt-4 pb-14">
              <header id="header" className="py-6 px-4 md:py-10  md:px-8 relative z-20">
                <div>
                  <p className="mb-2 text-sm leading-6 font-semibold text-sky-500 dark:text-sky-400">定位</p>
                  <div className="flex items-center">
                    <h1 className={` inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200`}>
                      在线会话统计定位
                    </h1>
                  </div>
                </div>
                <p className={` mt-2 text-lg text-slate-700 dark:text-slate-400`}>
                  所有当前在线用户会话地址
                </p>
              </header>
              <div className="hidden md:flex pt-4 ">
                  <Map fetch_iplist={activesessionlist} />
              </div>
            </section>
            </div>
    </div>
  </div>
  </div>
    </div>
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