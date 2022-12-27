import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { MdDarkMode, MdLightMode,MdOutlineAdminPanelSettings} from "react-icons/md"
import { AiFillGithub, AiOutlineUser } from "react-icons/ai"
import {RiLogoutBoxLine,RiLoginBoxLine} from "react-icons/ri"
import {useSession, signOut } from "next-auth/react"
import { useRouter } from 'next/router'
function handleSignOut(){
    signOut({ callbackUrl: `/` })
}

export default function PopNav() {
    const [themeDark, setTheme] = useState(true);
    const [signinPage, setsigninPage] = useState(false);
    const [userpage, setuserpage] = useState(false);
    const [adminPage, setadminPage] = useState(false);
    const { locale, locales, route } = useRouter()
    const otherLocale = locales?.find((cur) => cur !== locale)
    const { data: session } = useSession()
    useEffect(() => {
        const themeDarkItem = localStorage.getItem('themeDark');
        if (themeDarkItem) {
            const data = JSON.parse(themeDarkItem);
            if (data == true) {
                document.documentElement.classList.add('dark')
                document.body.style.backgroundColor = "#0B1120";
            } else {
                document.documentElement.classList.remove('dark')
                document.body.style.backgroundColor = "white";
            }
            setTheme(data);
        } else {
            document.documentElement.classList.add('dark')
            document.body.style.backgroundColor = "#0B1120";
        }
        if (session && session.access_token) {
            setuserpage(true)
            if (session.username == "admin" && route == "/wiki") {
                setadminPage(true)
            } else {
                setadminPage(false)
            }
        } else {
            setuserpage(false)
            if (route == "/" || route == "/auth/register") {
                setsigninPage(true)
            } else {
                setsigninPage(false)
            }
        }
    },[]);

return (
    <div className="sticky top-0 z-50 w-full backdrop-blur flex-none 
        lg:border-b lg:border-slate-900/10 
        supports-backdrop-blur:bg-white/60
        dark:border-slate-50/[0.06] bg-transparent text-slate-500 dark:text-slate-200">  
        <div className="flex flex-row justify-between items-center py-2 
                border-b border-slate-900/10 lg:px-8 lg:border-0
                mx-3 md:mx-4 dark:border-slate-300/10 ">
                <div className="flex flex-row items-center"> 
                    <div className="flex flex-row items-center pl-2  pr-1.5 md:pl-4 md:pr-3.5">
                        <Link href="/" className="md:mr-1 flex-none w-[1.8rem] overflow-hidden md:w-auto" >
                            <Image
                                    src="/logo.svg"
                                    alt="LOGO"
                                    width={500}
                                    height={500}
                                    className=" w-6 h-6 md:w-9 md:h-9"
                                />
                        </Link>
                        <Link href="/">
                            <h1 className="font-bold text-xl md:text-2xl cursor-pointer">
                                AI<span className="text-blue-500 dark:text-blue-400">Infite</span>
                            </h1>
                        </Link>
                    </div>
                </div>
                <div className="flex  gap-x-3	 justify-center items-center px-3 md:px-6	 mx-3  md:mx-6  md:border-l border-slate-300 dark:border-slate-400 ">
                    <Link href={route} locale={otherLocale} >
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className={`block w-6 h-6  hover:text-sky-500 cursor-pointer false  ${otherLocale=="en" && "hidden"}`} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M580 477.7h-9.8l37.6 209.1c24.8-8.8 47.4-22.2 67.5-39.6-20.6-24.8-37.1-52.5-50-81.9l39.6-5.2c10.8 22.2 23.2 42.2 37.6 59.3 29.3-35.5 51.5-82.9 67.5-142.2l-190 0.5z m149.9 169.5c22.7 19.6 48.4 34 77.2 42.7l18.1 5.7-10.8 38.6-18.1-5.7c-34.5-10.8-66.5-28.8-93.7-53.1-25.3 22.7-55.1 40.2-87.5 51l25.3 141.1H489.8l-20.1 92.2h472.4c22.2 0 40.2-18.1 40.2-40.2v-683c0-22.2-18.1-40.2-40.2-40.2H520.3l31.4 175.2-1-0.5 3.6 19.1 0.5-2.6 8.8 50H661v-40.2h75.3v40.2H862v40.2h-52.5c-17.7 70.6-44.6 127.3-79.6 169.5z m-281.3 220H82.3C38 867.2 2 831.1 2 786.8V104.2c0-44.8 36-80.3 80.3-80.3h401.8l24.8 132.4h432.8c44.3 0 80.3 36 80.3 80.3v683.1c0 44.3-36 80.3-80.3 80.3H419.8l28.8-132.8zM259.1 558.1v-42.2h-79.3v-62.4h73.7v-41.7h-73.7v-53.1h79.3V317H133.3v241.1h125.8z m193.6 0V437.5c0-21.7-5.2-38.6-15-50.5s-24.8-17.5-44.3-17.5c-11.4 0-21.7 2.1-30.4 6.7s-16 11.9-20.6 20.6h-2.6l-6.2-23.7h-35V558h45.3v-87c0-21.7 3.1-37.1 8.8-46.9 5.7-9.3 15-13.9 27.8-13.9 9.3 0 16 3.1 20.6 9.8 4.1 6.7 6.7 16.5 6.7 29.8V558l44.9 0.1z"
                                p-id="4274"
                            />
                        </svg>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1070 1024" className={`block w-6 h-6  hover:text-sky-500 cursor-pointer false ${otherLocale!="en" && "hidden"}`} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M232.58156522 358.13286957C244.86956522 394.4626087 265.17147826 425.984 293.48730435 453.76556522c24.04173913-26.17878261 42.2066087-58.23443478 53.96034782-95.63269565H232.58156522z" p-id="5669"></path>
                            <path d="M981.61530435 143.36h-448.77913044L507.19165217 6.05495652h-416.72347826c-45.94643478 0-83.34469565 37.39826087-83.34469565 83.34469565v708.42991305c0 45.94643478 37.39826087 83.34469565 83.34469565 83.34469565h379.85947826l-30.45286956 137.30504348h541.74052174c45.94643478 0 83.34469565-37.39826087 83.34469565-83.34469565V226.70469565c0-45.94643478-37.39826087-83.34469565-83.34469565-83.34469565zM415.83304348 564.35756522c-49.152-18.16486957-89.75582609-41.13808696-122.34573913-67.85113044-34.19269565 30.45286957-76.93356522 52.89182609-126.61982609 66.7826087l-17.09634783-28.31582609c48.61773913-12.82226087 89.22156522-32.05565217 121.2772174-59.30295652-33.12417391-33.65843478-56.0973913-72.65947826-68.91965218-117.00313044h-46.48069565v-32.05565217H276.92521739c-7.47965217-13.89078261-17.09634783-27.24730435-28.31582609-40.06956522l32.05565218-11.75373913c11.21947826 14.42504348 21.37043478 31.5213913 30.45286956 51.28904348h115.9346087v32.05565218h-46.48069565c-14.95930435 45.94643478-36.32973913 84.41321739-64.64556522 115.40034782 31.5213913 25.11026087 71.05669565 45.94643478 117.5373913 63.04278261l-17.63060869 27.78156522z m607.45460869 370.24278261c0 22.97321739-18.69913043 41.67234783-41.67234782 41.67234782H492.23234783l20.83617391-95.63269565h156.53843478l-89.22156522-497.39686957-0.53426087 2.67130435-3.73982608-19.76765217 1.06852174 0.53426087-32.58991305-181.64869565H982.14956522c22.97321739 0 41.67234783 18.69913043 41.67234782 41.67234782v707.89565218z" p-id="5670"></path>
                            <path d="M684.56626087 541.38434783h114.86608696v-30.45286957h-114.86608696V450.02573913h122.34573913v-30.45286956h-158.14121739v219.04695652h162.94956522V608.16695652h-127.15408696v-66.78260869z m239.88313043-65.71408696c-9.61669565 0-18.16486957 1.60278261-26.1787826 5.87686956-7.47965217 3.73982609-14.95930435 9.61669565-20.83617392 17.09634783V479.94434783h-34.72695652v158.67547826h34.72695652v-95.63269566c1.06852174-12.82226087 5.3426087-22.43895652 12.82226087-29.38434782 6.41113043-5.87686957 13.89078261-9.08243478 22.43895652-9.08243478 24.04173913 0 35.79547826 12.82226087 35.79547826 39.00104347v94.56417392h34.72695653v-97.76973913c1.06852174-43.27513043-19.2333913-64.64556522-58.76869566-64.64556522z" p-id="5671"></path>
                        </svg>
                    </Link>
                    <MdLightMode
                        className={`  block w-6 h-6  hover:text-sky-500 cursor-pointer ${themeDark && "hidden"}`}
                        onClick={() => {
                            localStorage.setItem('themeDark', JSON.stringify(!themeDark));
                            if (!themeDark == true) {
                                document.documentElement.classList.add('dark')
                                document.body.style.backgroundColor = "#0B1120";
                            } else {
                                document.documentElement.classList.remove('dark')
                                document.body.style.backgroundColor = "white";
                            }
                            setTheme(!themeDark);
                            }
                        }
                    />
                    <MdDarkMode
                        className={`  block w-6 h-6  hover:text-sky-500 cursor-pointer ${!themeDark && "hidden"}`}
                        onClick={() => {
                            localStorage.setItem('themeDark', JSON.stringify(!themeDark));
                            if (!themeDark == true) {
                                document.documentElement.classList.add('dark')
                                document.body.style.backgroundColor = "#0B1120";
                            } else {
                                document.documentElement.classList.remove('dark')
                                document.body.style.backgroundColor = "white";
                            }
                            setTheme(!themeDark);
                            }
                        }
                    />
                    <Link href="https://github.com/zdlpsina/ziwiki">
                        <AiFillGithub 
                            className="  block w-6 h-6  hover:text-sky-500 cursor-pointer"
                            />
                    </Link>
                    <RiLogoutBoxLine className={`block w-6 h-6  hover:text-sky-500 cursor-pointer ${signinPage && "hidden"}` } onClick={handleSignOut}  />
                    <Link href="/auth/login" className={`flex items-center ${!signinPage  && "hidden"}`}>
                        <RiLoginBoxLine className={`block w-6 h-6  hover:text-sky-500 cursor-pointer` } />
                    </Link>
                    <Link href="/admin" className={`flex items-center  ${!adminPage  && "hidden"}  `}>
                        <MdOutlineAdminPanelSettings className={`block w-6 h-6  hover:text-sky-500 cursor-pointer` } />
                    </Link>
                    <Link href="/wiki" className={`flex items-center ${(!userpage || route=="/wiki")  && "hidden"}`}>
                        <AiOutlineUser className={`block w-6 h-6  hover:text-sky-500 cursor-pointer` } />
                    </Link>
                </div>
            </div>
    </div>
)
}
