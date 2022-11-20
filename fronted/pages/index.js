import PopNav from "../components/popnav"
import { MathJax, MathJaxContext } from "better-react-mathjax";
import React, { useState } from 'react';
const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"]
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"]
    ]
  }
};
import { MdDarkMode, MdLightMode ,MdLogin,MdMenu,MdClose} from "react-icons/md"
export default function Home({data}) {
  return (

<div className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 min-h-screen">
<PopNav/>
  <div className="overflow-hidden">
    <div className='mx-3 md:mx-4 sm:px-6 md:px-8'>
      <div  className="overflow-hidden " >
        <div className="max-w-3xl mx-auto relative z-5 pt-10 xl:max-w-none ">
          <div className="mb-16 md:flex md:items-center justify-center">
                <div className="flex-auto max-w-3xl">
                  Main
          </div>
          </div>
        </div>
      </div>
    </div>
      </div>
      

</div>



  )
}
