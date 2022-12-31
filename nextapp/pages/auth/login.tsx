import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react';
import { signIn } from "next-auth/react"
import { useFormik } from 'formik';
import { login_validate } from '../../utils/validate';
import { useRouter } from 'next/router';
import PopNav from '../../components/popnav';
import { toast } from "react-toastify";
import { authOptions } from '../api/auth/[...nextauth]'
import { HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { Trans } from '@lingui/macro';
import { unstable_getServerSession } from "next-auth/next"
import { t } from "@lingui/macro"
import {fetch_renew_access,fetch_login} from "../../utils/web_fetch"
export default function Login() {

  const [show, setShow] = useState(false)
  const router = useRouter()
  // formik hook
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validate: login_validate,
    onSubmit: onSubmit
  })


  async function onSubmit(values) {
    const id = toast(t`Log in...`, { type: toast.TYPE.INFO, isLoading: true });
    const result = await fetch_login(values, '')
    if (result.error) {
      toast.update(id, { render: t`Log In Fail:` + result.error, type: toast.TYPE.ERROR, isLoading: false, autoClose: 1000 });
      return
    }
    const status = await signIn('credentials', {
      redirect: false,
      id: result.user.id,
      session_id: result.session_id as string,
      access_token: result.access_token as string,
      access_token_expires_at: result.access_token_expires_at,
      refresh_token: result.refresh_token as string,
      refresh_token_expires_at: result.refresh_token_expires_at,
      username: result.user.username as string,
      email: result.user.email as string,
      created_at: result.user.created_at as string,
      user_id: result.user.id as string,
      callbackUrl: "/wiki"
    })
    if (status && status.error) {
      toast.update(id, { render: t`Log In Fail:` + status.error, type: toast.TYPE.ERROR, isLoading: false, autoClose: 1000 });
    } else if (status && status.error == null) {
      toast.update(id, { render: t`Log In Success`, type: toast.TYPE.SUCCESS, isLoading: false, autoClose: 500 });
      router.push(`/wiki`)
    }
  }

  return (
    <div className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 min-h-screen">
      <PopNav />
      <div className="overflow-hidden">
        <div className='mx-3 md:mx-4 sm:px-6 md:px-8'>
          <div className="bg-white dark:bg-transparent pt-10 flex items-center justify-center">
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
                <h2 className="font-bold pt-5 mt-5 text-2xl "><Trans id="login_1">Log In</Trans></h2>
                <p className="text-xs mt-4 "><Trans id="login_2">sign in if you own an account</Trans></p>

                <form className='flex flex-col gap-4' onSubmit={formik.handleSubmit}>
                  <div>
                    <div className="flex justify-center items-center mt-8 ">
                      <input
                        type="text"
                        name='username'
                        placeholder={t`username`}
                        className={`p-2 rounded-md border dark:text-slate-800 ${formik.errors.username && "border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500"} focus:ring-1 `}
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
                        type={`${show ? "text" : "password"}`}
                        name='password'
                        placeholder={t`password`}
                        autoComplete="on"
                        className={`p-2 rounded-md border dark:text-slate-800 ${formik.errors.password && "border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500"} focus:ring-1 `}
                        {...formik.getFieldProps('password')}
                      />
                      <span className='icon flex items-center px-4' onClick={() => setShow(!show)}>
                        <HiFingerPrint size={25} />
                      </span>
                    </div>
                    {formik.errors.password && formik.touched.password ? <span className='text-pink-600 text-sm'>{formik.errors.password as string}</span> : <></>}
                  </div>

                  <button className="bg-[#002D74]  rounded-xl text-white py-2 mt-2 hover:scale-105 duration-300" type='submit' >
                  <Trans id="login_3">Log In</Trans>
                  </button>

                </form>
                <div className="mt-5 text-xs border-b border-[#002D74] dark:border-slate-300 py-4 ">
                  <Link href="/auth/forgetPassword"><p className="font-medium  hover:text-indigo-500"><Trans id="login_4">Forget Password?</Trans></p></Link>
                </div>
                <div className="mt-3 text-xs flex justify-between items-center ">
                  <p><Trans id="login_5">need an account?</Trans></p>
                  <Link href="/auth/register">
                    <button className="py-2 px-5  text-white  rounded-xl hover:scale-110 duration-300 bg-[#002D74]"><Trans id="login_6">Register</Trans></button>
                  </Link>
                </div>
              </div>
              <div className="md:block hidden w-1/2">
                <Image
                      src="/login.svg"
                      alt="LOGO"
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
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  return {
    props: {
    },
  }
}