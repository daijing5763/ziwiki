import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { registerValidate } from '../../utils/validate'
import PopNav from "../../components/popnav"
import { toast } from "react-toastify";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from '../api/auth/[...nextauth]'
import { fetch_register } from '../../utils/web_fetch';
import { t } from "@lingui/macro"
import { Trans } from '@lingui/macro';
export default function Register() {
  const [show, setShow] = useState({ password: false, cpassword: false })
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      cpassword: ''
    },
    validate: registerValidate,
    onSubmit: onSubmit
  })
  async function onSubmit(values) {
    const id = toast(t`Register...`, { type: toast.TYPE.INFO, isLoading: true });
    fetch_register(values, '').then(data => {
      if (data.error) {
        toast.update(id, { render: t`Register Failed:` + data.error, type: toast.TYPE.ERROR, isLoading: false, autoClose: 2000 });
      } else {
        toast.update(id, { render: t`Register Success`, type: toast.TYPE.SUCCESS, isLoading: false, autoClose: 1000 });
        router.push(`/`)
      }
    })
  }

  return (
    <div className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 min-h-screen">
      <PopNav />
      <div className="overflow-hidden">
        <div className='mx-3 md:mx-4 sm:px-6 md:px-8'>
          <div className="p-5 flex items-center justify-center">
            <div className="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
              <div className="w-[108rem] flex-none flex justify-end">
                <img src="/bg.avif" alt="" className="w-[90rem] flex-none max-w-none  block" decoding="async" />
              </div>
            </div>


            <div className=" text-[#002D74] dark:text-slate-200 dark:backdrop-blur  flex  max-w-3xl p-5 items-center">
              <div className="md:w-1/2 px-8 md:px-16">
                <Image
                    src="/logo.svg"
                    alt="LOGO"
                    width={500}
                    height={500}
                    className="mx-auto h-12 w-auto"
                />
                <Link href="/">
                  <div className="flex justify-center  items-center flex-shrink-0">
                    <h1 className="font-bold text-xl cursor-pointer">
                      AI<span className="text-blue-500">Infite</span>
                    </h1>
                  </div>
                </Link>
                <h2 className="font-bold  mt-5 text-2xl "><Trans>Register</Trans></h2>
                <form className='flex flex-col gap-4' onSubmit={formik.handleSubmit}>
                  <div>
                    <div className="flex justify-center items-center mt-8 " >
                      <input
                        className={`p-2 rounded-md border dark:text-slate-800 ${formik.errors.username && "border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500"} focus:ring-1 `}
                        type="text"
                        name='Username'
                        placeholder={t`Username`}
                        {...formik.getFieldProps('username')}
                      />
                      <span className='icon flex items-center px-4'>
                        <HiOutlineUser size={25} />
                      </span>
                    </div>
                    {formik.errors.username && formik.touched.username ? <span className='text-pink-600 text-sm'>{formik.errors.username as string}</span> : <></>}
                  </div>
                  <div>
                    <div className="flex justify-center items-center">
                      <input
                        className={`p-2 rounded-md border dark:text-slate-800 ${formik.errors.email && "border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500"} focus:ring-1 `}
                        type="email"
                        name='email'
                        placeholder={t`Email`}
                        {...formik.getFieldProps('email')}
                      />
                      <span className='icon flex items-center px-4'>
                        <HiAtSymbol size={25} />
                      </span>
                    </div>
                    {formik.errors.email && formik.touched.email ? <span className='text-pink-600 text-sm'>{formik.errors.email as string}</span> : <></>}
                  </div>
                  <div>
                    <div className="flex justify-center items-center">
                      <input
                        className={`p-2 rounded-md border dark:text-slate-800 ${formik.errors.password && "border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500"} focus:ring-1 `}
                        type={`${show.password ? "text" : "password"}`}
                        name='password'
                        placeholder={t`password`}
                        autoComplete="on"
                        {...formik.getFieldProps('password')}
                      />
                      <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, password: !show.password })}>
                        <HiFingerPrint size={25} />
                      </span>
                    </div>
                    {formik.errors.password && formik.touched.password ? <span className='text-pink-600 text-sm'>{formik.errors.password as string}</span> : <></>}
                  </div>
                  <div>
                    <div className="flex justify-center items-center">
                      <input
                        className={`p-2 rounded-md border dark:text-slate-800 ${formik.errors.cpassword && "border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500"} focus:ring-1 `}
                        type={`${show.cpassword ? "text" : "password"}`}
                        name='cpassword'
                        autoComplete="on"
                        placeholder={t`Confirm Password`}
                        {...formik.getFieldProps('cpassword')}
                      />
                      <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, cpassword: !show.cpassword })}>
                        <HiFingerPrint size={25} />
                      </span>
                    </div>
                    {formik.errors.cpassword && formik.touched.cpassword ? <span className='text-pink-600 text-sm'>{formik.errors.cpassword as string}</span> : <></>}
                  </div>
                  <button className="bg-[#002D74]  rounded-xl text-white py-2 mt-2 hover:scale-105 duration-300" type='submit' >
                  <Trans>Register</Trans>
                  </button>
                </form>
                <div className="mt-5 text-xs border-b border-[#002D74] dark:border-slate-300 py-4 ">
                  <Link href="/auth/forgetPassword"><p className="font-medium  hover:text-indigo-500"><Trans>Forget Password?</Trans></p></Link>
                </div>
                <div className="mt-3 text-xs flex justify-between items-center ">
                  <p><Trans>Already have one account?</Trans></p>
                  <Link href="/auth/login">
                    <button className="py-2 px-5 text-white rounded-xl hover:scale-110 duration-300 bg-[#002D74]"><Trans>Log In</Trans></button>
                  </Link>
                </div>
              </div>
              <div className="md:block hidden w-1/2">
                <Image
                    src="/login.svg"
                    alt="Login"
                    width={500}
                    height={500}
                />
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
  if (session) {
    return {
      redirect: {
        destination: "/wiki",
        premanent: false
      }
    }
  }
  return {
    props: {
    },
  }
}