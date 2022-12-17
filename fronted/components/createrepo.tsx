import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useFormik } from 'formik';
import { backend_base_url } from "../utils/env_variable"
import { toast } from "react-toastify";

export default function CreateRepo({ repolistcount,setrepolistcount,open, setOpen,token }) {

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
    onSubmit:onSubmit
  })
  async function onSubmit(values) {
    const id = toast("正在创建仓库...", { type: toast.TYPE.INFO,isLoading: true });
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(values)
  }
  await fetch(`${backend_base_url}create_repo`, options)
      .then(res => res.json())
      .then((data) => {
        if (data && data.error) {
          toast.update(id, { render: "创建失败:"+data.error, type: toast.TYPE.ERROR, isLoading: false ,autoClose:3000 });
        } else {
          toast.update(id, { render: "创建成功", type: toast.TYPE.SUCCESS, isLoading: false,autoClose:3000 });
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
          <div className="fixed inset-0 bg-gray-500 backdrop-blur-sm backdrop-brightness-75 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end md:items-center justify-center md:p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="place-content-stretch grow h-full md:relative transform overflow-hidden md:rounded-xl bg-white text-left shadow-xl transition-all md:my-8 md:w-full md:max-w-lg">
              
                <header className='bg-white dark:bg-slate-900'>
                  



           <form  className="md:py-5" onSubmit={formik.handleSubmit}>
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6  px-4 py-5 sm:p-6">
                <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="repo_name" className="block text-sm font-medium text-gray-700 dark:text-slate-200">
                      仓库名称
                    </label>
                    <input
                      type="text"
                      id="repo_name"
                      autoComplete="repo_name"
                      name='repo_name'
                    placeholder='repo_name'
                      // className="mt-1 block rounded-md focus:ring-0 border-gray-300 dark:border-gray-700 focus-within:text-gray-600 bg-white dark:bg-slate-800 placeholder-slate-400 dark:placeholder-slate-600 text-gray-900 dark:text-slate-300 appearance-none w-full  focus:outline-none"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:placeholder-slate-600 dark:text-slate-300 appearance-none dark:bg-slate-800  focus:outline-none  dark:border-gray-700 placeholder-slate-400"
                      {...formik.getFieldProps('repo_name')}
                          />
                  </div>


                  <div className="">
                    <div className="">
                      <label htmlFor="repo_git" className="block text-sm font-medium text-gray-700  dark:text-slate-200">
                        仓库git
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500 dark:bg-slate-800 dark:text-slate-200 dark:border-gray-700">
                          https://
                        </span>
                        <input
                          type="text"
                          name='repo_git'
                          id='repo_git'
                          className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-800 dark:text-slate-200 dark:border-gray-700"
                          placeholder="https://github.com/zdlpsina/ziwiki.git"
                          {...formik.getFieldProps('repo_git')}
                              />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="repo_describe" className="block text-sm font-medium text-gray-700  dark:text-slate-200 ">
                      仓库描述
                    </label>
                    <div className="mt-1">
                      <textarea
                        id='repo_describe'
                        name='repo_describe'
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-800 dark:text-slate-200 dark:border-gray-700"
                        placeholder="这个仓库主要是C++相关的知识汇总"
                        {...formik.getFieldProps('repo_describe')}
                            />
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
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:bg-slate-800 dark:text-slate-200 dark:border-gray-700"
                        value={formik.values.repo_from}
                        onChange={formik.handleChange}
                          >
                        <option value=""  label="Select a type"/>
                        <option value="github" label="GitHub"/>
                        <option value="gitlab" label="GitLab"/>
                        <option value="gitee" label="Gitee"/>
                      </select>
                    </div>


                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="access_type" className="block text-sm font-medium text-gray-700  dark:text-slate-200">
                        GIT访问方式
                      </label>
                      <select
                            
                        id="access_type"
                        name="access_type"
                        autoComplete="access_type"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:bg-slate-800 dark:text-slate-200 dark:border-gray-700"
                        value={formik.values.access_type}
                        onChange={formik.handleChange}
                          >
                        <option value=""  label="Select a type"/>
                        <option value="public" label="public"/>
                        <option value="access_token" label="access_token"/>
                        <option value="password" label="password"/>
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="repo_user_name" className="block text-sm font-medium text-gray-700  dark:text-slate-200">
                      GIT访问用户名
                    </label>
                    <input
                      type="text"
                      name="repo_user_name"
                      id="repo_user_name"
                      autoComplete="repo_user_name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-800 dark:text-slate-200 dark:border-gray-700"
                    
                            {...formik.getFieldProps('repo_user_name')}
                          />
                    </div>
                        
                  <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="repo_access_token" className="block text-sm font-medium text-gray-700  dark:text-slate-200 ">
                      GIT访问密码/授权码
                    </label>
                    <input
                      type="text"
                      name="repo_access_token"
                      id="repo_access_token"
                      autoComplete="repo_access_token"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-800 dark:text-slate-200 dark:border-gray-700"
                    
                            {...formik.getFieldProps('repo_access_token')}
                          />
                  </div>
                </div>
                  <div className="grid grid-cols-2 gap-x-4 sm:gap-x-6 lg:gap-x-4 xl:gap-x-6 p-4 sm:px-6 sm:py-5 lg:p-4 xl:px-6 xl:py-5">
                        <button
                          type="reset"
                        ref={cancelButtonRef}
                        className="text-base font-medium rounded-lg bg-slate-100 text-slate-900 py-3 text-center cursor-pointer dark:bg-slate-600 dark:text-slate-400 dark:highlight-white/10"
                        onClick={() => setOpen(false)}
                      >
                      Decline
                    </button>
                      <button
                      type='submit'
                      className="text-base font-medium rounded-lg bg-sky-500 text-white py-3 text-center cursor-pointer dark:highlight-white/20"
                      onClick={() => setOpen(false)}
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