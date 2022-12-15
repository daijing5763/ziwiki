import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useFormik } from 'formik';
import { backend_base_url } from "../utils/env_variable"
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
export default function CreateRepo({ open, setOpen,token }) {

  const cancelButtonRef = useRef(null)
  const formik = useFormik({
    initialValues: {
        username: '',
        password: ''
    },
    onSubmit:onSubmit
  })
  async function onSubmit(values) {
    console.log("onsubmit:",values)
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(values)
  }
  console.log("options:",options)
  await fetch(`${backend_base_url}create_repo`, options)
      .then(res => res.json())
      .then((data) => {
        console.log(data);
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <header className="relative z-10 bg-white rounded-xl shadow-xl ring-1 ring-slate-900/5 dark:bg-slate-800 dark:highlight-white/10">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold p-4 text-slate-900 dark:text-white">
                    新建仓库
                  </h2>
                </div>
                
                <form className='' onSubmit={formik.handleSubmit}>
                  <div className="flex flex-wrap divide-y divide-slate-200 border-b border-slate-200 text-sm sm:text-base lg:text-sm xl:text-base dark:divide-slate-200/5 dark:border-slate-200/5">
                  <div className="w-full flex-none flex items-center p-4 sm:p-6 lg:p-4 xl:p-6">
                    
                      <input 
                    type="text"
                    name='repo_name'
                    placeholder='repo_name'
                    className=" px-4 py-2 flex flex-grow flex-shrink focus:ring-0 focus-within:text-gray-600 bg-white dark:bg-slate-800 placeholder-slate-400 dark:placeholder-slate-600 text-gray-900 dark:text-slate-300 appearance-none w-full  focus:outline-none"
                    {...formik.getFieldProps('repo_name')}
                    />
                      
                    </div>





                  <div className="w-full flex-none flex items-center p-4 sm:p-6 lg:p-4 xl:p-6">
                        <input 
                      type="text"
                      name='repo_git'
                      placeholder='repo_git'
                      className=" px-4 py-2 flex flex-grow flex-shrink focus:ring-0 focus-within:text-gray-600 bg-white dark:bg-slate-800 placeholder-slate-400 dark:placeholder-slate-600 text-gray-900 dark:text-slate-300 appearance-none w-full  focus:outline-none"
                      {...formik.getFieldProps('repo_git')}
                          />
                          
                    </div>

                    

                  <div className="w-full flex-none flex items-center p-4 sm:p-6 lg:p-4 xl:p-6">
  

                          <input 
                        type="text"
                        name='repo_user_name'
                        placeholder='repo_user_name'
                        className=" px-4 py-2 flex flex-grow flex-shrink focus:ring-0 focus-within:text-gray-600 bg-white dark:bg-slate-800 placeholder-slate-400 dark:placeholder-slate-600 text-gray-900 dark:text-slate-300 appearance-none w-full  focus:outline-none"
                        {...formik.getFieldProps('repo_user_name')}
                        />

                    </div>

                        
                    

                    <div className="w-full flex-none flex items-center p-4 sm:p-6 lg:p-4 xl:p-6">
                    
                            <input 
                              type="text"
                              name='repo_access_token'
                              placeholder='repo_access_token'
                              className=" px-4 py-2 flex flex-grow flex-shrink focus:ring-0 focus-within:text-gray-600 bg-white dark:bg-slate-800 placeholder-slate-400 dark:placeholder-slate-600 text-gray-900 dark:text-slate-300 appearance-none w-full  focus:outline-none"
                              {...formik.getFieldProps('repo_access_token')}
                              />

                    </div>

                    <div className="w-full flex-none flex items-center p-4 sm:p-6 lg:p-4 xl:p-6">
                    
                      <input 
                    type="text"
                    name='repo_from'
                    placeholder='repo_from'
                    className=" px-4 py-2 flex flex-grow flex-shrink focus:ring-0 focus-within:text-gray-600 bg-white dark:bg-slate-800 placeholder-slate-400 dark:placeholder-slate-600 text-gray-900 dark:text-slate-300 appearance-none w-full  focus:outline-none"
                    {...formik.getFieldProps('repo_from')}
                    />
                    
                    </div>

                        
                    <div className="w-full flex-none flex items-center p-4 sm:p-6 lg:p-4 xl:p-6">
                      
                      <input 
                    type="text"
                    name='repo_describe'
                    placeholder='repo_describe'
                    className=" px-4 py-2 flex flex-grow flex-shrink focus:ring-0 focus-within:text-gray-600 bg-white dark:bg-slate-800 placeholder-slate-400 dark:placeholder-slate-600 text-gray-900 dark:text-slate-300 appearance-none w-full  focus:outline-none"
                    {...formik.getFieldProps('repo_describe')}
                    />
                  
                    </div>

                    </div>
                        
                        
                  <div className="grid grid-cols-2 gap-x-4 sm:gap-x-6 lg:gap-x-4 xl:gap-x-6 p-4 sm:px-6 sm:py-5 lg:p-4 xl:px-6 xl:py-5">
                    <button
                        type='submit'
                        className="text-base font-medium rounded-lg bg-slate-100 text-slate-900 py-3 text-center cursor-pointer dark:bg-slate-600 dark:text-slate-400 dark:highlight-white/10"
                        onClick={() => setOpen(false)}
                      >
                        Decline
                    </button>
                    <button
                      className="text-base font-medium rounded-lg bg-sky-500 text-white py-3 text-center cursor-pointer dark:highlight-white/20"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}>
                      Accept
                    </button>
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