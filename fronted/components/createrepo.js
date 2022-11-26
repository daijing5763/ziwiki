import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useFormik } from 'formik';
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
  await fetch('http://0.0.0.0:8080/create_repo', options)
      .then(res => res.json())
      .then((data) => {
        console.log(data);
      })
}
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <header className="rounded-t-xl text-lg space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6 dark:highlight-white/10">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-slate-900 dark:text-white">
                    新建仓库
                  </h2>
                </div>
                  
                <form className='flex flex-col gap-4' onSubmit={formik.handleSubmit}>
                  <div className="flex justify-center items-center mt-8 ">
                    <input 
                    type="text"
                    name='repo_name'
                    placeholder='repo_name'
                    className="rounded-md border p-2 dark:text-slate-800"
                    {...formik.getFieldProps('repo_name')}
                    />
                  </div>

                  <div className="flex justify-center items-center">
                    <input 
                    type="text"
                    name='repo_git'
                    placeholder='repo_git'
                    className="p-2 rounded-md border dark:text-slate-800"
                    {...formik.getFieldProps('repo_git')}
                    />
                  </div>
                    
                  <div className="flex justify-center items-center">
                    <input 
                    type="text"
                    name='repo_user_name'
                    placeholder='repo_user_name'
                    className="p-2 rounded-md border dark:text-slate-800"
                    {...formik.getFieldProps('repo_user_name')}
                    />
                  </div>
                    
                  <div className="flex justify-center items-center">
                    <input 
                    type="text"
                    name='repo_access_token'
                    placeholder='repo_access_token'
                    className="p-2 rounded-md border dark:text-slate-800"
                    {...formik.getFieldProps('repo_access_token')}
                    />
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                          type='submit'
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                    >
                      创建仓库
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      取消
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