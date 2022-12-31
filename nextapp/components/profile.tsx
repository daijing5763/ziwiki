
import { useSession } from "next-auth/react"
import { backend_base_url } from "../utils/env_variable"
import UpdateUser from "./updateuser"
import { useState, useEffect } from 'react'
import { fetch_user_info } from "../utils/web_fetch"

export default function Profile({ openUpdateProfile, setOpenUpdateProfile, imagekey }) {
  const [openUpdateUser, setOpenUpdateUser] = useState(false); 
  const { data: session } = useSession()
  const [userid, setuserid] = useState(''); 
  const [username, setusername] = useState(''); 
  const [email, setemail] = useState(''); 
  const [bio, setbio] = useState(''); 
  const [updatebio,setupdatebio]=useState(false)
  async function getUserInfo(values) {
    fetch_user_info(values, session.access_token).then(data => {
      if (data && !data.error) {
        setusername(data.username)
        setuserid(data.id)
        setemail(data.email)
        setbio(data.bio)
      }
    })
  }
  useEffect(() => {
    getUserInfo({ "username": session.username })
  }, [])
  useEffect(() => {
    getUserInfo({ "username": session.username })
  }, [updatebio])
  
  return (
    <section className="py-5 w-full border-collapse text-xl">
      <UpdateUser open={openUpdateUser} setOpen={setOpenUpdateUser} bio={bio} updatebio={updatebio} setupdatebio={setupdatebio} />
      <div className="relative flex flex-col-reverse bg-slate-100 rounded-lg px-4 md:px-16 py-6 dark:bg-slate-800 dark:highlight-white/5">
        <blockquote onClick={() => {  setOpenUpdateUser(!openUpdateUser) }}  className="mt-6 text-slate-700 dark:text-slate-300">
          <p>{bio}</p>
        </blockquote>
        <div className="flex items-center space-x-4">
            <img onClick={() => {  setOpenUpdateProfile(!openUpdateProfile) }} src={`${backend_base_url}static_get/${userid}/profile.png`} alt="" className="flex-none w-24 h-24 rounded-full object-cover cursor-pointer" key={imagekey} />
            <div className="flex-auto">
              <div className="text-2xl text-slate-900 font-semibold dark:text-slate-300">
                {username} 
              </div>
              <div className="mt-0.5">
                {email}
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}