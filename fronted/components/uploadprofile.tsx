import { useFormik } from 'formik';
import { Fragment, useRef, useState,useEffect } from 'react'
import { fetch_upload } from "../utils/web_fetch"
import { useSession } from "next-auth/react"
import { Dialog, Transition } from '@headlessui/react'
export default function UploadProfile({ open, setOpen }) {
  const { data: session } = useSession()
  function handleSubmit(values) {
    fetch_upload(values,session.access_token)
  }
  const formik = useFormik({
    initialValues: {
    },
    onSubmit:handleSubmit
  })
  const cancelButtonRef = useRef(null)
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
          <div className="mx-2 md:mx-[max(0px,calc(50%-25rem))]">
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
              
          <header className='justify-center px-2 md:px-8 py-4 overflow-auto relative flex text-slate-500 flex-row items-center border-b border-slate-300/75 dark:border-slate-800/75'>
                
            <form  className="flex grow justify-center overflow-auto  items-center " onSubmit={formik.handleSubmit}>
              <div className="sm:overflow-hidden sm:rounded-md">
                <div className="grid grid-cols-6 gap-2 gap-x-8 p-2">
                  <div className="col-span-6 justify-center flex-center">
                      <label htmlFor="repo_name" className="block text-center pt-2 pb-6 text-2xl font-bold text-gray-700 dark:text-slate-50">
                        更新肖像
                      </label>
                  </div>
                <div className="col-span-6 sm:col-span-6">
                      <div className="flex content-center	">
                      <input 
                        type="file" onChange={(event) => {
                          formik.setFieldValue("file", event.currentTarget.files[0]);
                        }} className="block w-full text-sm text-slate-500 file:text-sm file:font-semibold file:py-2 file:px-4 file:bg-sky-50 dark:file:bg-slate-700 file:text-sky-700 dark:file:text-slate-200 file:rounded-full file:border-0 file:mr-4 hover:file:bg-sky-100 focus:none focus:outline-sky-200 focus:rounded-full dark:focus:outline-1 dark:focus:outline-slate-700	focus:outline-dashed" />
                          </div>
                          </div>
                </div>
                  <div className="grid grid-cols-2 gap-x-2 sm:gap-x-6 lg:gap-x-4 xl:gap-x-6 px-1 py-4 sm:px-6 sm:py-5 lg:p-4 xl:px-6 xl:py-5">
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


//   <div className="relative rounded-xl overflow-auto">
//     <div className="px-6">
//       <div className="max-w-sm mx-auto bg-white shadow py-8 px-6">
//         <form onSubmit={formik.handleSubmit} className="flex items-center space-x-6">
//           <div className="shrink-0">
//             <img className="h-16 w-16 object-cover rounded-full" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1361&amp;q=80" alt="Current profile photo"/>
//             </div>
//           <label className="block">
//             <span className="sr-only">Choose profile photo</span>
//               <input 
//                 type="file" onChange={(event) => {
//                   formik.setFieldValue("file", event.currentTarget.files[0]);
//                 }} className="block w-full text-sm text-slate-500 file:text-sm file:font-semibold file:py-2 file:px-4 file:bg-violet-50 file:text-violet-700 file:rounded-full file:border-0 file:mr-4 hover:file:bg-violet-100" />
//             </label>
//             <button
//               type='submit'
//               className="text-base font-medium rounded-lg bg-sky-500 dark:bg-sky-800 text-white py-3 text-center cursor-pointer dark:highlight-white/20"
//               >
//               Accept
//             </button>
//         </form>
//       </div>
//     </div>
// </div>
  )
}
