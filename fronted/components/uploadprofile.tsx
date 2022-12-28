import { useFormik } from 'formik';
import { fetch_upload } from "../utils/web_fetch"
import { useSession } from "next-auth/react"



export default function UploadProfile() {
  const { data: session } = useSession()
  function handleSubmit(values) {
    console.log({ 
      fileName: values.file.name, 
      type: values.file.type,
      size: `${values.file.size} bytes`
    })
    let formdata = new FormData()
    formdata.append("file",values.file)
    fetch_upload(formdata,session.access_token)
  }
  const formik = useFormik({
    initialValues: {
    },
    onSubmit:handleSubmit
  })
  return (
  <div className="relative rounded-xl overflow-auto">
    <div className="px-6">
      <div className="max-w-sm mx-auto bg-white shadow py-8 px-6">
        <form onSubmit={formik.handleSubmit} className="flex items-center space-x-6">
          <div className="shrink-0">
            <img className="h-16 w-16 object-cover rounded-full" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1361&amp;q=80" alt="Current profile photo"/>
            </div>
          <label className="block">
            <span className="sr-only">Choose profile photo</span>
              <input 
                type="file" onChange={(event) => {
                  formik.setFieldValue("file", event.currentTarget.files[0]);
                }} className="block w-full text-sm text-slate-500 file:text-sm file:font-semibold file:py-2 file:px-4 file:bg-violet-50 file:text-violet-700 file:rounded-full file:border-0 file:mr-4 hover:file:bg-violet-100" />
            </label>
            <button
              type='submit'
              className="text-base font-medium rounded-lg bg-sky-500 dark:bg-sky-800 text-white py-3 text-center cursor-pointer dark:highlight-white/20"
              >
              Accept
            </button>
        </form>
      </div>
    </div>
</div>
  )
}
