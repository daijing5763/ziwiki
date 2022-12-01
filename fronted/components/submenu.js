
import React, { useState, useEffect } from 'react';
import { getIndex, acccompare, compare } from '../utils'
import { BiChevronLeft, BiChevronDown } from "react-icons/bi"
import Link from 'next/link'
export default function SubMenu({ menus, layer, offset, SideBarIndex, setSideBarIndex }) {
  const [open, setOpen] = useState(Array(menus.length).fill(false));
  const [SideBarMaxWidth, setSideBarMaxWidth] = useState(100);
  function setOpenWrap(index) {
    let newOpen = [...open];
    newOpen[index] = !newOpen[index];
    setOpen(newOpen);

  }
  return (
    <ul className="ml-2 mt-4 text-xl lg:text-lg font-semibold lg:mt-1 space-y-4 lg:space-y-2 border-l border-slate-100 dark:border-slate-700  ">
      {menus.map((menu, index) => (
        menu.isdir ? (
          <li key={index}>
            <div>
              <div className="flex justify-between items-center ">
                  <a onClick={() => {setSideBarIndex(getIndex(layer, offset*SideBarMaxWidth+index, SideBarMaxWidth),menu.href) }}
                        className={` block border-l pl-4 -ml-px cursor-pointer 
                          ${acccompare(SideBarIndex, getIndex(layer, offset * SideBarMaxWidth + index,SideBarMaxWidth), SideBarMaxWidth)
                          ? 'text-sky-500 dark:text-sky-400 font-semibold'
                          :'text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hover:border-slate-500' }
                            ${compare(SideBarIndex, getIndex(layer, offset * SideBarMaxWidth + index, SideBarMaxWidth), SideBarMaxWidth)
                          ? 'border-sky-500 dark:border-sky-400'
                            : 'border-transparent hover:border-slate-400'}
                        `}> {menu.title} 
                  </a>


                    <div className={`${(open[index] || !menu.sublayouts) && 'hidden'}`} onClick={() => { setOpenWrap(index) }}>
                      <BiChevronLeft  className='hover:text-sky-500 duration-300 cursor-pointer h-9 w-9'/>
                    </div>
                    <div className={`${(!open[index] ||!menu.sublayouts ) && 'hidden'}`} onClick={() => { setOpenWrap(index) }}>
                      <BiChevronDown  className='hover:text-sky-500 duration-300 cursor-pointer h-9 w-9'/>
                    </div>
              </div>
                {open[index] && (
                  <div >
                    <SubMenu menus={menu.sublayouts} layer={layer + 1} offset={offset * SideBarMaxWidth + index} SideBarIndex={SideBarIndex} setSideBarIndex={setSideBarIndex} />
                  </div>
                )}

            </div>
          </li>
        ) : (
          <li key={index}>
          <div>
            <div className="flex justify-between items-center ">
              <Link href={"/wiki/"+menu.href.substring(10)}
                onClick={() => {setSideBarIndex(getIndex(layer, offset*SideBarMaxWidth+index, SideBarMaxWidth),menu.href) }}
                      className={` block border-l pl-4 -ml-px cursor-pointer 
                        ${acccompare(SideBarIndex, getIndex(layer, offset * SideBarMaxWidth + index,SideBarMaxWidth), SideBarMaxWidth)
                        ? 'text-sky-500 dark:text-sky-400 font-semibold'
                        :'text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hover:border-slate-500' }
                          ${compare(SideBarIndex, getIndex(layer, offset * SideBarMaxWidth + index, SideBarMaxWidth), SideBarMaxWidth)
                        ? 'border-sky-500 dark:border-sky-400'
                          : 'border-transparent hover:border-slate-400'}
                      `}> {menu.title} 
              </Link>


                  <div className={`${(open[index] || !menu.submenu) && 'hidden'}`} onClick={() => { setOpenWrap(index) }}>
                    <BiChevronLeft  className='hover:text-sky-500 duration-300 cursor-pointer h-9 w-9'/>
                  </div>
                  <div className={`${(!open[index] ||!menu.submenu ) && 'hidden'}`} onClick={() => { setOpenWrap(index) }}>
                    <BiChevronDown  className='hover:text-sky-500 duration-300 cursor-pointer h-9 w-9'/>
                  </div>
            </div>


          </div>
        </li>
        )
        ))
        }
    </ul>

  
    )
}


