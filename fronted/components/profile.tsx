
import { useSession } from "next-auth/react"
import {FaUserEdit} from "react-icons/fa"
export default function Profile({openUpdateProfile, setOpenUpdateProfile}) {
  const { data: session } = useSession()
  return (
    <section className="py-5 w-full border-collapse text-xl">
      <div className="relative flex flex-col-reverse bg-slate-100 rounded-lg px-4 md:px-16 py-6 dark:bg-slate-800 dark:highlight-white/5">
        <blockquote className="mt-6 text-slate-700 dark:text-slate-300">
            <p>I feel like an idiot for not using Tailwind CSS until now.</p>
        </blockquote>
        <div className="flex items-center space-x-4">
            <img onClick={() => { console.log("click image"); setOpenUpdateProfile(!openUpdateProfile) }} src={`http://localhost:8080/static_get/${session.user_id}/profile.png`} alt="" className="flex-none w-24 h-24 rounded-full object-cover" loading="lazy" decoding="async" />
            <div className="flex-auto">
              <div className="text-2xl text-slate-900 font-semibold dark:text-slate-300">
                {session.username} 
              </div>
              <div className="mt-0.5">
                {session.email}
              </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}