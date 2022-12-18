import { Fragment, useRef, useState,useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useFormik } from 'formik';
import { backend_base_url } from "../utils/env_variable"
import { toast } from "react-toastify";
import { createrepo_validate } from '../utils/validate';
import { useSession } from "next-auth/react"
export default function CreateRepo({ repolistcount,setrepolistcount,open, setOpen }) {
  const { data: session } = useSession()
  const cancelButtonRef = useRef(null)
  const formik = useFormik({
    initialValues: {
      repo_name: "",
      repo_git: "",
      repo_describe: "",
      repo_from: "",
      access_type: "",
      repo_user_name:"",
      repo_access_token: "",
    },
    validate: createrepo_validate,
    onSubmit:onSubmit
  })

  async function onSubmit(values) {
    const id = toast("正在创建仓库...", { type: toast.TYPE.INFO,isLoading: true });
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify(values)
    }
  await fetch(`${backend_base_url}create_repo`, options)
      .then(res => res.json())
      .then((data) => {
        if (data && data.error) {
          toast.update(id, { render: "创建失败:"+data.error, type: toast.TYPE.ERROR, isLoading: false ,autoClose:2000 });
        } else {
          toast.update(id, { render: "创建成功", type: toast.TYPE.SUCCESS, isLoading: false,autoClose:1000 });
          setrepolistcount(repolistcount+1)
        }
        
      })
}
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm backdrop-brightness-75 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed overflow-auto inset-0 z-50 backdrop-blur-sm backdrop-brightness-75  dark:text-slate-300  xs:px-4 pt-20  md:p-20 lg:p-28">
          <div className="mx-0 md:mx-[max(0px,calc(50%-20rem))]">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="flex overflow-auto flex-col  border-slate-200/5 dark:border-slate-800/75 border md:rounded-lg bg-white dark:bg-slate-800/75">
              
          <header className=' justify-center px-4 py-4 overflow-auto relative flex text-slate-500 flex-row items-center border-b border-slate-300/75 dark:border-slate-800/75'>
                
            <form  className="flex grow  justify-center overflow-auto  items-center " onSubmit={formik.handleSubmit}>
              <div className="sm:overflow-hidden sm:rounded-md">
                <div className="grid grid-cols-6 gap-4 gap-x-8 p-2">
                  <div className="col-span-6 justify-center flex-center">
                      <label htmlFor="repo_name" className="block text-center pt-2 pb-6 text-2xl font-bold text-gray-700 dark:text-slate-50">
                        创建仓库
                      </label>
                  </div>


                <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="repo_name" className="block text-sm font-medium text-gray-700 dark:text-slate-200">
                        仓库名称
                      </label>
                      <div className="flex content-center	">
                        <input
                        type="text"
                        id="repo_name"
                        autoComplete="repo_name"
                        name='repo_name'
                        placeholder='repo_name'
                        
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:placeholder-slate-600 dark:text-slate-300 appearance-none dark:bg-slate-800/50  focus:outline-none  dark:border-gray-700 placeholder-slate-400"
                        {...formik.getFieldProps('repo_name')}
                            />
                          </div>
                      
                        {formik.errors.repo_name && formik.touched.repo_name ? <span className='text-pink-600 text-sm'>{formik.errors.repo_name as string}</span> : <></>}
                  </div>


                  <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="repo_git" className="block text-sm font-medium text-gray-700  dark:text-slate-200">
                        仓库git
                      </label>
                      <div className="flex rounded-md shadow-sm">
                        <span className="inline-flex mt-1 items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500 dark:bg-slate-800/50 dark:text-slate-200 dark:border-gray-700">
                          https://
                        </span>
                        <input
                          type="text"
                          name='repo_git'
                          id='repo_git'
                          className="mt-1 block w-full rounded-r-md  border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-800/50 dark:text-slate-200 dark:border-gray-700"
                          placeholder="https://github.com/zdlpsina/ziwiki.git"
                          {...formik.getFieldProps('repo_git')}
                              />
                          
                      </div>
                      {formik.errors.repo_git && formik.touched.repo_git ? <span className='text-pink-600 text-sm flex justify-center items-center pl-1'>{formik.errors.repo_git as string}</span> : <></>}
                  </div>

                  <div className="col-span-6 sm:col-span-6">
                    <label htmlFor="repo_describe" className="block text-sm font-medium text-gray-700  dark:text-slate-200 ">
                      仓库描述
                    </label>
                    <div className="mt-1">
                      <textarea
                        id='repo_describe'
                        name='repo_describe'
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-800/50 dark:text-slate-200 dark:border-gray-700"
                        placeholder="这个仓库主要是C++相关的知识汇总"
                        {...formik.getFieldProps('repo_describe')}
                            />
                      {formik.errors.repo_describe && formik.touched.repo_describe ? <span className='text-pink-600 text-sm'>{formik.errors.repo_describe as string}</span> : <></>}
                    </div>
                    <p className="mt-2 text-sm text-gray-500  dark:text-slate-500 ">
                      简单描述下仓库是做啥的
                    </p>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="repo_from" className="block text-sm font-medium text-gray-700  dark:text-slate-200 ">
                        GIT来源
                      </label>
                        <select
                            
                        id='repo_from'
                        name='repo_from'
                        autoComplete="repo_from"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:bg-slate-800/50 dark:text-slate-200 dark:border-gray-700"
                        value={formik.values.repo_from}
                        onChange={formik.handleChange}
                          >
                        <option value=""  label="Select a type"/>
                        <option value="github" label="GitHub"/>
                        <option value="gitlab" label="GitLab"/>
                        <option value="gitee" label="Gitee"/>
                          </select>
                          {formik.errors.repo_from &&  <span className='text-pink-600 text-sm'>{formik.errors.repo_from as string}</span> }
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="access_type" className="block text-sm font-medium text-gray-700  dark:text-slate-200">
                        GIT访问方式
                      </label>
                      <select
                            
                        id="access_type"
                        name="access_type"
                        autoComplete="access_type"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:bg-slate-800/50 dark:text-slate-200 dark:border-gray-700"
                        value={formik.values.access_type}
                        onChange={formik.handleChange}
                          >
                        <option value=""  label="Select a type">选择授权类型...</option>
                        <option value="public" label="public">公开</option>
                        <option value="access_token" label="access_token">授权码 </option>
                        <option value="password" label="password">密码</option>
                          </select>
                          {formik.errors.access_type &&  <span className='text-pink-600 text-sm'>{formik.errors.access_type as string}</span> }
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="repo_user_name" className="block text-sm font-medium text-gray-700  dark:text-slate-200">
                      GIT访问用户名
                    </label>
                    <input
                      type="text"
                      name="repo_user_name"
                      id="repo_user_name"
                      autoComplete="repo_user_name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-800/50 dark:text-slate-200 dark:border-gray-700"
                    
                            {...formik.getFieldProps('repo_user_name')}
                          />
                    </div>
                        
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="repo_access_token" className="block text-sm font-medium text-gray-700  dark:text-slate-200 ">
                      GIT访问密码/授权码
                    </label>
                    <input
                      type="text"
                      name="repo_access_token"
                      id="repo_access_token"
                      autoComplete="repo_access_token"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-800/50 dark:text-slate-200 dark:border-gray-700"
                    
                            {...formik.getFieldProps('repo_access_token')}
                          />
                  </div>
                </div>
                  <div className="grid grid-cols-2 gap-x-4 sm:gap-x-6 lg:gap-x-4 xl:gap-x-6 p-4 sm:px-6 sm:py-5 lg:p-4 xl:px-6 xl:py-5">
                        <button
                          type="reset"
                        ref={cancelButtonRef}
                        className="text-base font-medium rounded-lg bg-slate-100 text-slate-900 py-3 text-center cursor-pointer dark:bg-gray-700/75 dark:text-slate-200 dark:highlight-white/10"
                        onClick={() => setOpen(false)}
                      >
                      Decline
                    </button>
                      <button
                      type='submit'
                      className="text-base font-medium rounded-lg bg-sky-500 dark:bg-sky-800 text-white py-3 text-center cursor-pointer dark:highlight-white/20"
                          onClick={() => setOpen(false) }
                      >
                      Accept
                    </button>
                  </div>
              </div>
            </form> 
                </header>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}