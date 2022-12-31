import { Fragment, useRef, useState,useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useFormik } from 'formik';
import { toast } from "react-toastify";
import { useSession } from "next-auth/react"
import { fetch_update_user } from "../utils/web_fetch"
import { Trans } from '@lingui/macro';
import { t } from "@lingui/macro"
export default function UpdateUser({ open, setOpen, bio,updatebio,setupdatebio }) {
  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };
  
  const { data: session } = useSession()
  const cancelButtonRef = useRef(null)
  const formik = useFormik({
    initialValues: {
      bio:bio,
    },
    onSubmit:onSubmit
  })
  async function onSubmit(values) {
    const id = toast(t`bio updating ...`, { type: toast.TYPE.INFO, isLoading: true });
    fetch_update_user(values, session.access_token).then(data => {
      if (data && data.error) {
        toast.update(id, { render: t`Update Failed:` + data.error, type: toast.TYPE.ERROR, isLoading: false, autoClose: 2000 });
      } else {
        toast.update(id, { render: t`Update Succeed`, type: toast.TYPE.SUCCESS, isLoading: false, autoClose: 1000 });
        setupdatebio(!updatebio)
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
          <div className="mx-0 md:mx-[max(0px,calc(50%-25rem))]">
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
                            <Trans>Update Bio</Trans>
                          </label>
                      </div>
    
    
                    <div className="col-span-6 sm:col-span-6">
                          <label htmlFor="repo_name" className="block text-sm font-medium text-gray-700 dark:text-slate-200">
                            <Trans>Bio Text:</Trans>
                          </label>
                          <div className="flex content-center	">
                            <input
                            type="text"
                            id="bio"
                            autoComplete="bio"
                            name='bio'
                            placeholder={t`please write some bio info`}
                            
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:placeholder-slate-600 dark:text-slate-300 appearance-none dark:bg-slate-800/50  focus:outline-none  dark:border-gray-700 placeholder-slate-400"
                            {...formik.getFieldProps('bio')}
                                />
                              </div>
                    </div>
    
                    </div>
                      <div className="grid grid-cols-2 gap-x-4 sm:gap-x-6 lg:gap-x-4 xl:gap-x-6 p-4 sm:px-6 sm:py-5 lg:p-4 xl:px-6 xl:py-5">
                            <button
                              type="reset"
                            ref={cancelButtonRef}
                            className="text-base font-medium rounded-lg bg-slate-100 text-slate-900 py-3 text-center cursor-pointer dark:bg-gray-700/75 dark:text-slate-200 dark:highlight-white/10"
                            onClick={() => setOpen(false)}
                          >
                          <Trans>Decline</Trans>
                        </button>
                          <button
                          type='submit'
                          className="text-base font-medium rounded-lg bg-sky-500 dark:bg-sky-800 text-white py-3 text-center cursor-pointer dark:highlight-white/20"
                              onClick={() => setOpen(false) }
                          >
                          <Trans>Accept</Trans>
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