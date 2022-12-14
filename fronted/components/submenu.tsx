
import React, { useState, useEffect } from 'react';
import { getIndex, acccompare, compare } from '../utils/compare_index'
import { BiChevronLeft, BiChevronDown } from "react-icons/bi"
import Link from 'next/link'
export default function SubMenu({repo_id, menus, layer, offset, SideBarIndex, setSideBarIndex }) {
  const [open, setOpen] = useState(Array(menus.length).fill(false));
  const [SideBarMaxWidth, setSideBarMaxWidth] = useState(100);
  function setOpenWrap(index) {
    let newOpen = [...open];
    newOpen[index] = !newOpen[index];
    setOpen(newOpen);
  }
  function setIndex(index) {
    localStorage.setItem('SideOpenIndex', JSON.stringify(index));
    setSideBarIndex(index);
  }
  return (
    <ul className="ml-4  text-base lg:text-base font-base  border-l border-slate-100 dark:border-slate-700  ">



      {menus.map((menu, index) => (
        menu.isdir ? (
          <li key={index}>
            <div className="">
              <div className="flex justify-between items-center py-2 ">
                  <a onClick={() => {setIndex(getIndex(layer, offset*SideBarMaxWidth+index, SideBarMaxWidth)) }}
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
                      <BiChevronLeft  className='hover:text-sky-500 duration-300 cursor-pointer h-4 w-4'/>
                    </div>
                    <div className={`${(!open[index] ||!menu.sublayouts ) && 'hidden'}`} onClick={() => { setOpenWrap(index) }}>
                      <BiChevronDown  className='hover:text-sky-500 duration-300 cursor-pointer h-4 w-4'/>
                    </div>
              </div>
              {open[index] && (
                <div >
                <SubMenu repo_id={repo_id} menus={menu.sublayouts} layer={layer + 1} offset={offset * SideBarMaxWidth + index} SideBarIndex={SideBarIndex} setSideBarIndex={setSideBarIndex} />
                </div>
              )}

            </div>
          </li>
        ) : (
          <li key={index}>
          <div>
            <div className="flex justify-between items-center py-2 ">
              <Link href={"/wiki/"+repo_id+"/"+menu.href}
                onClick={() => {setIndex(getIndex(layer, offset*SideBarMaxWidth+index, SideBarMaxWidth)) }}
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


