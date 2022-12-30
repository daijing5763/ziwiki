import {FaLockOpen,FaLock} from "react-icons/fa"
import PageBar from './pagebar'
export default function SessionTable({sessionlist,banSession,currentPage,setCurrentPage,type }) {
  return (
    <section>
      <header id="header" className="py-6 px-4 md:py-10  md:px-8 relative z-20">
        <div>
          <p className="mb-2 text-sm leading-6 font-semibold text-sky-500 dark:text-sky-400">会话</p>
          <div className="flex items-center">
            <h1 className={`${type!="session" && "hidden"} inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200`}>
              会话统计
            </h1>
            <h1 className={`${type=="session" && "hidden"} inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200`}>
              在线会话统计
            </h1>
          </div>
        </div>
        <p className={`${type=="session" && "hidden"} mt-2 text-lg text-slate-700 dark:text-slate-400`}>
          所有当前在线用户会话及其状态是否禁用,若禁用,则视为停止当前用户会话。
        </p>
        <p className={`${type!="session" && "hidden"} mt-2 text-lg text-slate-700 dark:text-slate-400`}>
          所有用户会话及其状态是否禁用,若禁用,则视为停止当前用户会话。
        </p>
      </header>
    <div className="overflow-x-auto px-1 md:px-8 flex -mx-4 sm:-mx-6 md:mx-0">
                  <div className="flex-none min-w-full px-4 sm:px-6 md:px-0 overflow-hidden lg:overflow-auto scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-thumb:!bg-slate-300 scrollbar-track:!rounded dark:scrollbar-track:!bg-slate-500/[0.16] dark:scrollbar-thumb:!bg-slate-500/50">
                    <table className="w-full text-left border-collapse">
            <thead>
              
            <tr className="border-t border-t-1 border-slate-200 dark:border-slate-400/20">
                <th className="sticky z-10 top-0 text-base leading-6 font-semibold text-slate-700 bg-transparent p-0 dark:bg-slate-800 dark:text-slate-300">
                  <div className="py-2 pl-2 border-b border-slate-200 dark:border-slate-400/20">
                  user_id
                  </div>
                </th>
                <th className="sticky z-10 top-0 text-base leading-6 font-semibold text-slate-700  bg-transparent p-0 dark:bg-slate-800 dark:text-slate-300">
                  <div className="py-2 pl-2 border-b border-slate-200 dark:border-slate-400/20">
                  client_ip
                  </div>
                </th>
                <th className="sticky z-10 top-0 text-base leading-6 font-semibold text-slate-700  bg-transparent p-0 dark:bg-slate-800 dark:text-slate-300">
                  <div className="py-2 pl-2 border-b border-slate-200 dark:border-slate-400/20">
                  is_blocked
                  </div>
                </th>
                <th className="sticky z-10 top-0 text-base leading-6 font-semibold text-slate-700  bg-transparent p-0 dark:bg-slate-800 dark:text-slate-300">
                  <div className="py-2 pl-2 border-b border-slate-200 dark:border-slate-400/20">
                  用户状态
                  </div>
                </th>
              </tr>



                      </thead>
                      <tbody className="align-baseline">
                      {sessionlist.map((session, index) => (
                        <tr key={index} className=" border-b border-b-1 border-slate-200 dark:border-slate-400/20">
                          <td translate="no" className="py-2 pr-2 font-mono font-medium text-sm leading-6 text-slate-600 whitespace-nowrap dark:text-sky-400">
                            {session.user_id}
                          </td>
                          <td translate="no" className="py-2 pr-2 font-mono font-medium text-sm leading-6 text-slate-600 whitespace-nowrap dark:text-sky-400">
                          {session.client_ip} 
                          </td>
                          <td translate="no" className="py-2 pr-2 font-mono font-medium text-sm leading-6 text-slate-600 whitespace-nowrap dark:text-sky-400">
                          {session.is_blocked.toString()}
                          </td>
                          <td translate="no" className="py-2 pl-2 flex items-center  font-mono font-medium text-sm  text-slate-600 dark:text-sky-400">
                  <FaLock onClick={() => { banSession({ "id": session.id,"is_locked":false })}} className={`${!session.is_blocked && "hidden"} w-4 h-4 `} />
                  <FaLockOpen onClick={() => { banSession({ "id": session.id,"is_locked":true })}}  className={`${session.is_blocked && "hidden"} w-4 h-4 `} />
                </td>
                      </tr>
                    ))}
                      </tbody>
                    </table>
                    <div className="sticky bottom-0 h-px -mt-px bg-slate-200 dark:bg-slate-400/20">
                    </div>
                  </div>
                </div>

                <PageBar currentPage={currentPage} setCurrentPage={setCurrentPage}  />

</section>

  )
}