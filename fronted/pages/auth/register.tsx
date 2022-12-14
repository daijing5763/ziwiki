import Link from 'next/link'
import { useState } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { registerValidate } from '../../utils/validate'
import PopNav from "../../components/popnav"
import { toast } from "react-toastify";
export default function Register() {
  const [show, setShow] = useState({ password: false, cpassword: false })
  const router = useRouter()
  const formik = useFormik({
      initialValues: {
          username : '',
          email: '',
          password: '',
          cpassword: ''
      },
      validate:registerValidate,
      onSubmit:onSubmit
  })
  async function onSubmit(values) {
    console.log("mydebug: onSubmit:", values)
    const id =  toast("正在注册...", {type: toast.TYPE.INFO});
    const options = {
        method: "POST",
        headers : { 'Content-Type': 'application/json'},
        body: JSON.stringify(values)
    }

    await fetch('https://localhost/backend/users', options)
        .then(res => res.json())
      .then((data) => {
        console.log(data)
        if (data.error) {
          toast.update(id, { render: "注册失败:" + data.error, type: toast.TYPE.ERROR, isLoading: false });
        } else {
          
          toast.update(id, { render: "注册成功:" , type: toast.TYPE.SUCCESS, isLoading: false});
          router.push('https://localhost')
        }
        })
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
            <h2 className="font-bold pt-5 mt-5 text-2xl ">注册</h2>
            <p className="text-xs mt-4 ">若您未注册，请注册</p>
            {/* <form action="" className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
    
              <input autoComplete="email" className="p-2 mt-8 rounded-xl border" type="email" name="email" placeholder="邮箱"/>
              <div className="relative">
                <input autoComplete="current-password" className="p-2 rounded-xl border w-full" type="password" name="password" placeholder="密码"/>
              </div>
              <button className="bg-[#002D74]  rounded-xl text-white py-2 hover:scale-105 duration-300">注册</button>
            </form> */}
                {/* form */}
            <form className='flex flex-col gap-4' onSubmit={formik.handleSubmit}>
              <div className="flex justify-center items-center mt-8 " >
                <input
                className="rounded-md border p-2 dark:text-slate-800"
                type="text"
                name='Username'
                placeholder='Username'
                {...formik.getFieldProps('username')}
                />
                <span className='icon flex items-center px-4'>
                    <HiOutlineUser size={25} />
                </span>
              </div>
                {/* {formik.errors.username && formik.touched.username ? <span className='text-rose-500'>{formik.errors.username}</span> : <></>} */}
                <div className="flex justify-center items-center">
                    <input 
                       className="p-2 rounded-md border dark:text-slate-800"
                    type="email"
                    name='email'
                    placeholder='Email'
                    {...formik.getFieldProps('email')}
                    />
                    <span className='icon flex items-center px-4'>
                        <HiAtSymbol size={25} />
                    </span>
                </div>
                {/* {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <></>} */}
                <div className="flex justify-center items-center">
                    <input 
                       className="p-2 rounded-md border dark:text-slate-800"
                    type={`password`}
                    name='password'
                    placeholder='password'
                    {...formik.getFieldProps('password')}
                    />
                     <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, password: !show.password})}>
                        <HiFingerPrint size={25} />
                    </span>
                </div>
                {/* {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>} */}

                <div className="flex justify-center items-center">
                    <input 
                       className="p-2  rounded-md border dark:text-slate-800"
                    type={`${show.cpassword ? "text" : "password"}`}
                    name='cpassword'
                    placeholder='Confirm Password'
                    {...formik.getFieldProps('cpassword')}
                    />
                     <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, cpassword: !show.cpassword})}>
                        <HiFingerPrint size={25} />
                    </span>
                </div>
                {/* {formik.errors.cpassword && formik.touched.cpassword ? <span className='text-rose-500'>{formik.errors.cpassword}</span> : <></>} */}

                {/* login buttons */}
                {/* <div className="flex w-full"> */}
                <button className="bg-[#002D74]  rounded-xl text-white py-2 mt-2 hover:scale-105 duration-300" type='submit' >
                        Sign Up
                    </button>
                {/* </div> */}
            </form>
            <div className="mt-5 text-xs border-b border-[#002D74] dark:border-slate-300 py-4 ">
            <Link href="/auth/forgetPassword"><p className="font-medium  hover:text-indigo-500">忘记密码?</p></Link>
          </div>


            <div className="mt-3 text-xs flex justify-between items-center ">
              <p>已经注册账户?</p>
              <Link href="/auth/login">
                <button className="py-2 px-5 bg-white  rounded-xl hover:scale-110 duration-300 dark:bg-[#002D74]">登录</button>
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
