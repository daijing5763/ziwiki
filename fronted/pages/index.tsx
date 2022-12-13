import PopNav from "../components/popnav"
import { getSession, useSession, signOut } from "next-auth/react"
import React, { useState } from 'react';
import Link from 'next/link'

import { MdDarkMode, MdLightMode ,MdLogin,MdMenu,MdClose} from "react-icons/md"
export default function Home({data}) {
  const { data: session } = useSession()
  function handleSignOut(){
    signOut()
  }
  return (
<div className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 min-h-screen">
<PopNav/>
  <div className="overflow-hidden">
    <div className='mx-3 md:mx-4 sm:px-6 md:px-8'>
      <div  className="overflow-hidden " >
        <div className="max-w-3xl mx-auto relative z-5 pt-10 xl:max-w-none ">
          <div className="mb-16 md:flex md:items-center justify-center">
                <div className="flex-auto max-w-3xl">
                  Main:{session ? User({ session, handleSignOut }) : Guest()}
          </div>
          </div>
        </div>
      </div>
    </div>
      </div>
      

</div>
  )
}


// Guest
function Guest(){
  return (
    <main className="container mx-auto text-center py-20">
          <h3 className='text-4xl font-bold'>Guest Homepage</h3>

          <div className='flex justify-center'>
            <Link href={'/auth/login'}><a className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Sign In</a></Link>
          </div>
      </main>
  )
}

// Authorize User
function User({ session, handleSignOut }){
  return(
    <main className="container mx-auto text-center py-20">
          <h3 className='text-4xl font-bold'>Authorize User Homepage</h3>

          <div className='details'>
            <h5>{session.username}</h5>
            <h5>{session.email}</h5>
          </div>

          <div className="flex justify-center">
            <button onClick={handleSignOut} className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Sign Out</button>
          </div>

          <div className='flex justify-center'>
            <Link href={'/wiki'} className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Profile Page</Link>
          </div>
      </main>
  )
}


export async function getServerSideProps({ req }){
  const session = await getSession({ req })

  if(!session){
    return {
      redirect : {
        destination: '/auth/login',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}