import React, { useState, useEffect } from 'react';
import { getIndex, acccompare, compare } from '../utils'
import SubMenu from "./submenu"
export default function SideBar() {

  const [NavBarOpen, setNavBarOpen] = useState(false);
  useEffect(() => {
    const NaVBarOpenItem = localStorage.getItem('NavBarOpen');
    if (NaVBarOpenItem) {
        const data = JSON.parse(NaVBarOpenItem);
        setNavBarOpen(data);
    }
    console.log(NavBarOpen)
  }, []);
  useEffect(()=>{},[NavBarOpen])


  const menus = [
  
    {
      "submenu": true, "submenuItems": [{
        "submenu": true, "submenuItems":
          [{ "href": "1.md", "submenu": false, "title": "1" }, { "href": "2.md", "submenu": false, "title": "2" }, { "href": "3.md", "submenu": false, "title": "3" }, { "href": "4.md", "submenu": false, "title": "4" }], "title": "1.1"
      },
      {
        "submenu": true, "submenuItems":
          [{ "href": "1.md", "submenu": false, "title": "1" }, { "href": "2.md", "submenu": false, "title": "2" }, { "href": "3.md", "submenu": false, "title": "3" }, { "href": "4.md", "submenu": false, "title": "4" }], "title": "1.1"
      }], "title": "abc"
    },
  
    {"href":"a.md","submenu":false,"title":"a"},
    { "href": "b.md", "submenu": false, "title": "b" },
    {"href":"c.md","submenu":false,"title":"c"},

]

  return (
    <div  className={` ${!NavBarOpen && "hidden"} fixed z-40  lg:bg-inherit inset-0 top-0 lg:top-[3.8125rem] left-0 lg:left-[max(0px,calc(50%-45rem))] right-auto w-[20rem] lg:w-[23rem] lg:bottom-3 lg:pb-10 px-3 pt-6 lg:pt-0 lg:px-8 overflow-y-auto  
    scrollbar scrollbar-w-1 scrollbar-h-1  scrollbar-thumb-rounded-md scrollbar-track-rounded-md
    scrollbar-track-slate-100 scrollbar-thumb-slate-300 
    dark:scrollbar-track-slate-800 dark:scrollbar-thumb-slate-500
            `}>
      <div className="fixed lg:hidden inset-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80" ></div>
      <div className="fixed lg:hidden inset-0 bg-white w-[20rem] p-6 dark:bg-slate-800" ></div>
      <nav  className="px-3 pt-6 pb-3 lg:text-sm lg:leading-6 relative  duration-300   first-letter:
      ">
        <ul>
          {menus.map((menu, index) => (
            menu.submenu ? (
              <li key={index} className="space-y-6 lg:space-y-3">
                <h5 className="mb-2  lg:mb-3 font-semibold mt-5 lg:mt-6 text-slate-900 dark:text-slate-200 ">
                  {menu.title}
                </h5>
                <SubMenu menus={menu.submenuItems} layer={2} offset={index} />
              </li>
            ): (
              <li key={index} className="space-y-6 lg:space-y-3">
              <h5 className="mb-2  lg:mb-3 font-semibold mt-5 lg:mt-6 text-slate-900 dark:text-slate-200 ">
                {menu.title}
              </h5>
            </li>
            )
          ))}
        </ul>
      </nav>
    </div>
  )

}
