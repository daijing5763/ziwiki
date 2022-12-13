import Link from 'next/link'
import { useState } from 'react';
import { signIn, signOut } from "next-auth/react"
import { useFormik } from 'formik';
import login_validate from '../../utils/validate';
import { useRouter } from 'next/router';
import PopNav from "../../components/popnav"
import { toast } from "react-toastify";
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
export default function Login(){

  const [show, setShow] = useState(false)
    const router = useRouter()
    // formik hook
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validate : login_validate,
        onSubmit:onSubmit
    })

    /**
     * haleykennedy@gmail.com
     * admin123
     */

  async function onSubmit(values) {
    const id =  toast("正在登录...", {type: toast.TYPE.INFO});
      const status = await signIn('credentials', {
          redirect: false,
          username: values.username,
          password: values.password,
          callbackUrl: "/"
      })
    if (status.ok) {
      toast.update(id, { render: "登录成功" , type: toast.TYPE.SUCCESS, isLoading: false});
      router.push(status.url)
    } else {
      toast.update(id, { render: "登录失败" , type: toast.TYPE.ERROR, isLoading: false});
    }
  }

    // Google Handler function
    async function handleGoogleSignin(){
        signIn('google', { callbackUrl : "http://localhost:3000"})
    }

    // Github Login 
    async function handleGithubSignin(){
        signIn('github', { callbackUrl : "http://localhost:3000"})
    }

    return (
        <div className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 min-h-screen">
        <PopNav/>
  <div className="overflow-hidden">
    <div className='mx-3 md:mx-4 sm:px-6 md:px-8'>
      <div className="bg-gray-50 dark:bg-transparent min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 dark:bg-slate-900/70 text-[#002D74] dark:text-slate-200 dark:backdrop-blur dark:ring-1 dark:ring-inset dark:ring-white/10 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          <div className="md:w-1/2 px-8 md:px-16">
            <picture>
              <img src="/logo.svg" className="mx-auto h-12 w-auto" alt="LOGO"/>
            </picture>
            <Link href="/">
              <div className="flex justify-center  items-center flex-shrink-0">
                    <h1 className="font-bold text-xl cursor-pointer">
                      AI<span className="text-blue-500">Infite</span>
                    </h1>
                </div>
            </Link>
            <h2 className="font-bold pt-5 mt-5 text-2xl ">登录</h2>
            <p className="text-xs mt-4 ">若您已经注册，请登录</p>
            {/* <form action="" className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
    
              <input autoComplete="email" className="p-2 mt-8 rounded-xl border" type="email" name="email" placeholder="邮箱"/>
              <div className="relative">
                <input autoComplete="current-password" className="p-2 rounded-xl border w-full" type="password" name="password" placeholder="密码"/>
              </div>
              <button className="bg-[#002D74]  rounded-xl text-white py-2 hover:scale-105 duration-300">注册</button>
            </form> */}
                {/* form */}
                <form className='flex flex-col gap-4' onSubmit={formik.handleSubmit}>
                <div className="flex justify-center items-center mt-8 ">
                    <input 
                    type="text"
                    name='username'
                    placeholder='username'
                    className="rounded-md border p-2 dark:text-slate-800"
                    {...formik.getFieldProps('username')}
                    />
                    <span className='icon flex items-center px-4'>
                        <HiAtSymbol size={25} />
                    </span>
                   
                </div>
                {/* {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <></>} */}

                <div className="flex justify-center items-center">
                    <input 
                    type={`${show ? "text" : "password"}`}
                    name='password'
                    placeholder='password'
                    className="p-2 rounded-md border dark:text-slate-800"
                    {...formik.getFieldProps('password')}
                    />
                     <span className='icon flex items-center px-4' onClick={() => setShow(!show)}>
                        <HiFingerPrint size={25} />
                    </span>
                   
                </div>

                {/* {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>} */}
                {/* login buttons */}
        
                <button className="bg-[#002D74]  rounded-xl text-white py-2 mt-2 hover:scale-105 duration-300" type='submit' >
                      登录
                </button>
  
            </form>
            <div className="mt-5 text-xs border-b border-[#002D74] dark:border-slate-300 py-4 ">
            <Link href="/auth/forgetPassword"><p className="font-medium  hover:text-indigo-500">忘记密码?</p></Link>
          </div>


            <div className="mt-3 text-xs flex justify-between items-center ">
              <p>未注册账户?</p>
              <Link href="/auth/register">
                <button className="py-2 px-5 bg-white  rounded-xl hover:scale-110 duration-300 dark:bg-[#002D74]">注册</button>
              </Link>
            </div>
          </div>
          <div className="md:block hidden w-1/2">
            <picture>
              <img src="/login.svg" className=" " alt="Login"/>
            </picture>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    )
}