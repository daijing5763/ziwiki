import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { Trans } from '@lingui/macro';
export default function PageBar({ currentPage, setCurrentPage }) {
  return (
    <div className="flex items-center justify-between  bg-transparent px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          onClick={()=>{ if(currentPage>1){setCurrentPage(currentPage-1)} }}
          className="relative inline-flex items-center rounded-md border dark:border-slate-800 dark:bg-slate-900/50 border-gray-300 bg-white  px-4 py-2 text-sm font-medium text-gray-700 dark:text-slate-300 hover:bg-gray-50"
        >
          <Trans>Previous</Trans>
        </div>

        <div className="relative inline-flex items-center rounded-md border dark:border-slate-800 dark:bg-slate-900/50 border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 dark:text-slate-300 hover:bg-gray-50">
          {currentPage}
        </div>   
        
        <div
          onClick={() => { setCurrentPage(currentPage + 1) }}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 dark:border-slate-800 dark:bg-slate-900/50 bg-white px-4 py-2 text-sm font-medium text-gray-700 dark:text-slate-300 hover:bg-gray-50"
        >
          <Trans>Next</Trans>
        </div>
      </div>

      <div className="hidden sm:flex sm:flex-1 pt-4 sm:items-center sm:justify-center">
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <div onClick={()=>{ if(currentPage>1){setCurrentPage(currentPage-1)} }}
              className="relative inline-flex items-center rounded-l-md border border-gray-300 dark:border-slate-800 bg-white dark:bg-slate-900/50 px-2 py-2 text-sm font-medium text-gray-500 dark:text-slate-400 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            
            <div
              aria-current="page"
              className="relative z-10 inline-flex items-center border  dark:border-slate-800  border-gray-300 bg-white dark:bg-slate-900/50 px-4 py-2 text-sm font-medium  dark:text-slate-400 focus:z-20"
            >
              {currentPage}
            </div>
            <div onClick={() => { setCurrentPage(currentPage + 1) }}
              className="relative inline-flex items-center rounded-r-md border dark:border-slate-800 dark:bg-slate-900/50 border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 dark:text-slate-400 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}