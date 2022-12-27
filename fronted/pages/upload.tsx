export default function upload() {
  
  return (
  <div className="relative rounded-xl overflow-auto">
    <div className="px-6">
      <div className="max-w-sm mx-auto bg-white shadow py-8 px-6">
        <form className="flex items-center space-x-6">
          <div className="shrink-0">
            <img className="h-16 w-16 object-cover rounded-full" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1361&amp;q=80" alt="Current profile photo"/>
          </div>
          <label className="block">
            <span className="sr-only">Choose profile photo</span>
            <input type="file" className="block w-full text-sm text-slate-500 file:text-sm file:font-semibold file:py-2 file:px-4 file:bg-violet-50 file:text-violet-700 file:rounded-full file:border-0 file:mr-4 hover:file:bg-violet-100"/>
          </label>
        </form>
      </div>
    </div>
</div>
  )
}