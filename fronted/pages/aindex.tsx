import { getSession, useSession, signOut } from "next-auth/react"
export default function Home() {
  
  return (
    <div className="bg-slate-700">
      <div className="text-slate-200">
        yoy you
      </div>
      hello homepage
    </div>



  )
}

export async function getServerSideProps({ req }){
  const session = await getSession({ req })
  console.log("mydebug:===:session:",session)
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