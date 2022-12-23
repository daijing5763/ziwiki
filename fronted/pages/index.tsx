import PopNav from "../components/popnav"
import React, { useState } from 'react';
import Link from 'next/link'
import { CgPerformance } from "react-icons/cg"
import { BsSpeedometer, BsSpeedometer2 } from "react-icons/bs"
import { AiOutlineMobile } from "react-icons/ai"
import { MdDarkMode } from "react-icons/md"
import { Trans } from '@lingui/macro';
export default function Home() {
  return (
<div className="antialiased text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 min-h-screen">
  <PopNav />
  <div className="overflow-hidden">
    <div className='mx-3 md:mx-4 sm:px-6 md:px-8'>
          <header className="overflow-hidden pt-8 pb-24 text-slate-600 dark:text-slate-400 lg:py-16">
          <div className="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none">
            <div className="w-[108rem] flex-none flex justify-end">
                <img src="bg.avif" alt="" className="w-[90rem] flex-none max-w-none  block" decoding="async" />
            </div>
          </div>
              <div className="flex items-center justify-center text-sm font-medium uppercase tracking-[0.16em]">
                <p className="hidden lg:block"><Trans id="index_0">From the creators of</Trans> <span className="dark:text-white text-black font-bold">Tailwind CSS</span></p>
                <div className="mx-6 hidden h-[0.1875rem] w-[0.1875rem] rounded-full bg-white/30 lg:block xl:mx-16"></div>
                
                <p><Trans id="index_1">Over</Trans> <span className="dark:text-white text-black font-bold ">20,000</span><Trans id="index_2">copies sold</Trans> </p>
                <div className="mx-6 hidden h-[0.1875rem] w-[0.1875rem] rounded-full bg-white/30 lg:block xl:mx-16"></div>

                <p className="hidden lg:block"><Trans id="index_3">Over</Trans>  <span className="dark:text-white text-black font-bold ">200</span><Trans id="index_4"> github stars</Trans> </p>
                <div className="mx-6 hidden h-[0.1875rem] w-[0.1875rem] rounded-full bg-white/30 lg:block xl:mx-16"></div>
              </div>


              <div className="px-4 sm:px-6 md:max-w-2xl md:px-4 lg:max-w-7xl lg:px-8 mx-auto mt-24 lg:mt-56">
                <div className="lg:flex">
                  <div className="flex-auto">
                    <h1 className="bg-black dark:bg-[radial-gradient(138.06%_1036.51%_at_95.25%_-2.54%,_#7ED4FD_14.06%,#709DF7_51.02%,#4D78EF_79.09%)] bg-clip-text text-5xl leading-[1.2] tracking-tighter text-transparent sm:text-center sm:text-[4rem] sm:leading-[4.75rem] lg:text-left">
                    <Trans id="index_5"> Make your ideas look awesome, without relying on a designer.</Trans>
                    </h1>
                    <p className="mt-6 text-slate-700 dark:text-slate-400 max-w-3xl text-2xl leading-[2.5rem] tracking-tight sm:text-center lg:text-left">
                    <Trans id="index_6"> Learn how to design beautiful user interfaces by yourself using specific tactics explained from a developer's point-of-view.</Trans>  
                    </p>
                    <div className="mt-12 hidden lg:flex">
                      <Link href="/auth/register"  className="rounded-full  py-2 px-6 font-semibold focus:outline-none focus:ring-2 bg-sky-500 text-slate-50 hover:bg-sky-400 scale-100 hover:scale-110  dark:bg-sky-300 dark:text-slate-900 dark:hover:bg-sky-200 dark:hover:text-slate-900 dark:focus:ring-slate-500">
                      <Trans id="index_8"> Try it by Register Now</Trans>
                      </Link>
                      <Link href="/auth/login" className="ml-6 rounded-full   py-2 px-6 font-semibold  focus:outline-none focus:ring-2  bg-slate-900 text-slate-50 hover:bg-slate-700 scale-100 hover:scale-110   dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-500">
                      <Trans id="index_9"> Sign In</Trans>
                      </Link>
                    </div>
                  </div>
                  <div className="relative mt-24 flex-none lg:mt-0 lg:w-80">
                    <div className="top-1/2 left-8 mx-auto w-[19.25rem] rotate-12 lg:absolute lg:w-[23.75rem] lg:-translate-y-1/2">
                      <div className="pointer-events-none">
                        <div className="absolute -right-14 top-16 h-px w-[400%] bg-gradient-to-l from-slate-400 opacity-20">
                        </div>
                        <div className="absolute left-full top-16 ml-14 h-px w-screen bg-slate-400 opacity-20">
                        </div>
                        <div className="absolute top-[-135%] bottom-[-65%] right-11 w-px opacity-20" ></div>
                        <div className="absolute -right-24 -bottom-16 h-px w-[400%] opacity-30" ></div>
                        <div className="absolute top-[-120%] bottom-[-80%] -left-12 w-px opacity-20" ></div>
                        <div className="absolute top-16 -left-80 mt-[-0.5px] h-[2px] w-28 rounded-full bg-gradient-to-r from-blue-500"></div>
                        <div className="absolute -left-12 bottom-8 ml-[-0.5px] h-28 w-[2px] rounded-full bg-gradient-to-t from-violet-400"></div>
                      </div>
                      

                      </div>
                    <div className="relative mt-16 flex flex-col sm:flex-row sm:justify-center lg:hidden">
                      <Link href="/auth/register" className="rounded-full  py-2 px-6 text-center font-semibold focus:outline-none focus:ring-2 scale-100 hover:scale-110  bg-sky-500 text-slate-50 hover:bg-sky-400  dark:bg-sky-300 dark:text-slate-900 dark:hover:bg-sky-200 dark:hover:text-slate-900 dark:focus:ring-slate-500">
                      <Trans id="index_10">Try it by Register Now</Trans> 
                      </Link>
                      <Link href="/auth/login" className="mt-6 rounded-full  py-2 px-6 text-center focus:outline-none focus:ring-2 bg-slate-900 scale-100 hover:scale-110  text-slate-50 hover:bg-slate-700  dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-500 font-semibold  sm:ml-6 sm:mt-0">
                      <Trans id="index_11"> Sign In</Trans>  
                      </Link>
                    </div>
                  </div>
                </div>
                <ul className="relative mx-auto mt-24 max-w-sm text-white lg:mt-56 lg:grid lg:max-w-none lg:grid-cols-3 lg:gap-8">
                  <li className="">
                    <figure>
                      <div className="flex justify-center space-x-2 text-slate-500">
                        <svg width="24" height="24" fill="currentColor"><path d="M11.055 2.717c.312-.895 1.578-.895 1.89 0l1.648 4.742a1 1 0 0 0 .924.672l5.02.102c.947.02 1.339 1.224.583 1.797l-4 3.033a1 1 0 0 0-.353 1.086l1.453 4.806c.275.907-.75 1.652-1.528 1.11l-4.12-2.867a1 1 0 0 0-1.143 0l-4.121 2.867c-.778.541-1.803-.203-1.528-1.11l1.453-4.806a1 1 0 0 0-.353-1.086l-4-3.033c-.756-.573-.364-1.777.584-1.797l5.019-.102a1 1 0 0 0 .924-.672l1.648-4.742Z"></path>
                        </svg>
                        <svg width="24" height="24" fill="currentColor"><path d="M11.055 2.717c.312-.895 1.578-.895 1.89 0l1.648 4.742a1 1 0 0 0 .924.672l5.02.102c.947.02 1.339 1.224.583 1.797l-4 3.033a1 1 0 0 0-.353 1.086l1.453 4.806c.275.907-.75 1.652-1.528 1.11l-4.12-2.867a1 1 0 0 0-1.143 0l-4.121 2.867c-.778.541-1.803-.203-1.528-1.11l1.453-4.806a1 1 0 0 0-.353-1.086l-4-3.033c-.756-.573-.364-1.777.584-1.797l5.019-.102a1 1 0 0 0 .924-.672l1.648-4.742Z"></path>
                        </svg>
                        <svg width="24" height="24" fill="currentColor"><path d="M11.055 2.717c.312-.895 1.578-.895 1.89 0l1.648 4.742a1 1 0 0 0 .924.672l5.02.102c.947.02 1.339 1.224.583 1.797l-4 3.033a1 1 0 0 0-.353 1.086l1.453 4.806c.275.907-.75 1.652-1.528 1.11l-4.12-2.867a1 1 0 0 0-1.143 0l-4.121 2.867c-.778.541-1.803-.203-1.528-1.11l1.453-4.806a1 1 0 0 0-.353-1.086l-4-3.033c-.756-.573-.364-1.777.584-1.797l5.019-.102a1 1 0 0 0 .924-.672l1.648-4.742Z"></path>
                        </svg>
                        <svg width="24" height="24" fill="currentColor"><path d="M11.055 2.717c.312-.895 1.578-.895 1.89 0l1.648 4.742a1 1 0 0 0 .924.672l5.02.102c.947.02 1.339 1.224.583 1.797l-4 3.033a1 1 0 0 0-.353 1.086l1.453 4.806c.275.907-.75 1.652-1.528 1.11l-4.12-2.867a1 1 0 0 0-1.143 0l-4.121 2.867c-.778.541-1.803-.203-1.528-1.11l1.453-4.806a1 1 0 0 0-.353-1.086l-4-3.033c-.756-.573-.364-1.777.584-1.797l5.019-.102a1 1 0 0 0 .924-.672l1.648-4.742Z"></path>
                        </svg>
                        <svg width="24" height="24" fill="currentColor"><path d="M11.055 2.717c.312-.895 1.578-.895 1.89 0l1.648 4.742a1 1 0 0 0 .924.672l5.02.102c.947.02 1.339 1.224.583 1.797l-4 3.033a1 1 0 0 0-.353 1.086l1.453 4.806c.275.907-.75 1.652-1.528 1.11l-4.12-2.867a1 1 0 0 0-1.143 0l-4.121 2.867c-.778.541-1.803-.203-1.528-1.11l1.453-4.806a1 1 0 0 0-.353-1.086l-4-3.033c-.756-.573-.364-1.777.584-1.797l5.019-.102a1 1 0 0 0 .924-.672l1.648-4.742Z"></path></svg>
                      </div>
                      <blockquote className="mt-6 text-center text-slate-500 dark:text-slate-200 text-xl leading-[2rem] tracking-tight before:content-['“'] after:content-['”']">This is the survival kit I wish I had when I was starting out building apps.</blockquote>
                      <figcaption className="mt-6 flex justify-center">
                        <img src="profile.png" alt="" className="h-12 w-12 rounded-full"/><div className="ml-4">
                          <p className="font-semibold text-slate-500 dark:text-slate-200">Derrick Reimer</p>
                          <p className="text-sm text-slate-500">Founder of <a href="https://savvycal.com/">SavvyCal</a></p>
                        </div>
                      </figcaption>
                    </figure>
                  </li>
                  <li className="hidden lg:block">
                    <figure><div className="flex justify-center space-x-2 text-slate-500"><svg width="24" height="24" fill="currentColor"><path d="M11.055 2.717c.312-.895 1.578-.895 1.89 0l1.648 4.742a1 1 0 0 0 .924.672l5.02.102c.947.02 1.339 1.224.583 1.797l-4 3.033a1 1 0 0 0-.353 1.086l1.453 4.806c.275.907-.75 1.652-1.528 1.11l-4.12-2.867a1 1 0 0 0-1.143 0l-4.121 2.867c-.778.541-1.803-.203-1.528-1.11l1.453-4.806a1 1 0 0 0-.353-1.086l-4-3.033c-.756-.573-.364-1.777.584-1.797l5.019-.102a1 1 0 0 0 .924-.672l1.648-4.742Z"></path></svg>
                    <svg width="24" height="24" fill="currentColor"><path d="M11.055 2.717c.312-.895 1.578-.895 1.89 0l1.648 4.742a1 1 0 0 0 .924.672l5.02.102c.947.02 1.339 1.224.583 1.797l-4 3.033a1 1 0 0 0-.353 1.086l1.453 4.806c.275.907-.75 1.652-1.528 1.11l-4.12-2.867a1 1 0 0 0-1.143 0l-4.121 2.867c-.778.541-1.803-.203-1.528-1.11l1.453-4.806a1 1 0 0 0-.353-1.086l-4-3.033c-.756-.573-.364-1.777.584-1.797l5.019-.102a1 1 0 0 0 .924-.672l1.648-4.742Z"></path></svg>
                    <svg width="24" height="24" fill="currentColor"><path d="M11.055 2.717c.312-.895 1.578-.895 1.89 0l1.648 4.742a1 1 0 0 0 .924.672l5.02.102c.947.02 1.339 1.224.583 1.797l-4 3.033a1 1 0 0 0-.353 1.086l1.453 4.806c.275.907-.75 1.652-1.528 1.11l-4.12-2.867a1 1 0 0 0-1.143 0l-4.121 2.867c-.778.541-1.803-.203-1.528-1.11l1.453-4.806a1 1 0 0 0-.353-1.086l-4-3.033c-.756-.573-.364-1.777.584-1.797l5.019-.102a1 1 0 0 0 .924-.672l1.648-4.742Z"></path></svg><svg width="24" height="24" fill="currentColor"><path d="M11.055 2.717c.312-.895 1.578-.895 1.89 0l1.648 4.742a1 1 0 0 0 .924.672l5.02.102c.947.02 1.339 1.224.583 1.797l-4 3.033a1 1 0 0 0-.353 1.086l1.453 4.806c.275.907-.75 1.652-1.528 1.11l-4.12-2.867a1 1 0 0 0-1.143 0l-4.121 2.867c-.778.541-1.803-.203-1.528-1.11l1.453-4.806a1 1 0 0 0-.353-1.086l-4-3.033c-.756-.573-.364-1.777.584-1.797l5.019-.102a1 1 0 0 0 .924-.672l1.648-4.742Z"></path></svg>
                      <svg width="24" height="24" fill="currentColor"><path d="M11.055 2.717c.312-.895 1.578-.895 1.89 0l1.648 4.742a1 1 0 0 0 .924.672l5.02.102c.947.02 1.339 1.224.583 1.797l-4 3.033a1 1 0 0 0-.353 1.086l1.453 4.806c.275.907-.75 1.652-1.528 1.11l-4.12-2.867a1 1 0 0 0-1.143 0l-4.121 2.867c-.778.541-1.803-.203-1.528-1.11l1.453-4.806a1 1 0 0 0-.353-1.086l-4-3.033c-.756-.573-.364-1.777.584-1.797l5.019-.102a1 1 0 0 0 .924-.672l1.648-4.742Z"></path></svg>
                    </div>
                      <blockquote className="mt-6 text-center  text-slate-500 dark:text-slate-200 text-xl leading-[2rem] tracking-tight before:content-['“'] after:content-['”']">This book is fantastic for engineers learning how to design.</blockquote>
                      <figcaption className="mt-6 flex justify-center">
                        <img src="profile.png" alt="" className="h-12 w-12 rounded-full" />
                        <div className="ml-4"><p className="font-semibold text-slate-500 dark:text-slate-200">Alex MacCaw</p><p className="text-sm text-slate-500">Founder of <a href="https://clearbit.com/">Clearbit</a></p></div>
                      </figcaption>
                    </figure>
                  </li>
                  <li className="hidden lg:block"><figure><div className="flex justify-center space-x-2 text-slate-500">
                    <svg width="24" height="24" fill="currentColor"><path d="M11.055 2.717c.312-.895 1.578-.895 1.89 0l1.648 4.742a1 1 0 0 0 .924.672l5.02.102c.947.02 1.339 1.224.583 1.797l-4 3.033a1 1 0 0 0-.353 1.086l1.453 4.806c.275.907-.75 1.652-1.528 1.11l-4.12-2.867a1 1 0 0 0-1.143 0l-4.121 2.867c-.778.541-1.803-.203-1.528-1.11l1.453-4.806a1 1 0 0 0-.353-1.086l-4-3.033c-.756-.573-.364-1.777.584-1.797l5.019-.102a1 1 0 0 0 .924-.672l1.648-4.742Z"></path></svg>
                    <svg width="24" height="24" fill="currentColor"><path d="M11.055 2.717c.312-.895 1.578-.895 1.89 0l1.648 4.742a1 1 0 0 0 .924.672l5.02.102c.947.02 1.339 1.224.583 1.797l-4 3.033a1 1 0 0 0-.353 1.086l1.453 4.806c.275.907-.75 1.652-1.528 1.11l-4.12-2.867a1 1 0 0 0-1.143 0l-4.121 2.867c-.778.541-1.803-.203-1.528-1.11l1.453-4.806a1 1 0 0 0-.353-1.086l-4-3.033c-.756-.573-.364-1.777.584-1.797l5.019-.102a1 1 0 0 0 .924-.672l1.648-4.742Z"></path></svg>
                    <svg width="24" height="24" fill="currentColor"><path d="M11.055 2.717c.312-.895 1.578-.895 1.89 0l1.648 4.742a1 1 0 0 0 .924.672l5.02.102c.947.02 1.339 1.224.583 1.797l-4 3.033a1 1 0 0 0-.353 1.086l1.453 4.806c.275.907-.75 1.652-1.528 1.11l-4.12-2.867a1 1 0 0 0-1.143 0l-4.121 2.867c-.778.541-1.803-.203-1.528-1.11l1.453-4.806a1 1 0 0 0-.353-1.086l-4-3.033c-.756-.573-.364-1.777.584-1.797l5.019-.102a1 1 0 0 0 .924-.672l1.648-4.742Z"></path></svg>
                    <svg width="24" height="24" fill="currentColor"><path d="M11.055 2.717c.312-.895 1.578-.895 1.89 0l1.648 4.742a1 1 0 0 0 .924.672l5.02.102c.947.02 1.339 1.224.583 1.797l-4 3.033a1 1 0 0 0-.353 1.086l1.453 4.806c.275.907-.75 1.652-1.528 1.11l-4.12-2.867a1 1 0 0 0-1.143 0l-4.121 2.867c-.778.541-1.803-.203-1.528-1.11l1.453-4.806a1 1 0 0 0-.353-1.086l-4-3.033c-.756-.573-.364-1.777.584-1.797l5.019-.102a1 1 0 0 0 .924-.672l1.648-4.742Z"></path></svg>
                    <svg width="24" height="24" fill="currentColor"><path d="M11.055 2.717c.312-.895 1.578-.895 1.89 0l1.648 4.742a1 1 0 0 0 .924.672l5.02.102c.947.02 1.339 1.224.583 1.797l-4 3.033a1 1 0 0 0-.353 1.086l1.453 4.806c.275.907-.75 1.652-1.528 1.11l-4.12-2.867a1 1 0 0 0-1.143 0l-4.121 2.867c-.778.541-1.803-.203-1.528-1.11l1.453-4.806a1 1 0 0 0-.353-1.086l-4-3.033c-.756-.573-.364-1.777.584-1.797l5.019-.102a1 1 0 0 0 .924-.672l1.648-4.742Z"></path></svg>
                  </div>
                    <blockquote className="mt-6 text-center text-slate-500 dark:text-slate-200 text-xl leading-[2rem] tracking-tight before:content-['“'] after:content-['”']">This book Refactoring UI is a no-brainer for anyone in the web industry.</blockquote>
                    <figcaption className="mt-6 flex justify-center">
                      <img src="profile.png" alt="" className="h-12 w-12 rounded-full"/>
                        <div className="ml-4">
                          <p className="font-semibold text-slate-500 dark:text-slate-200">Justin Jackson</p>
                          <p className="text-sm text-slate-500">Co-founder of <a href="https://transistor.fm/">Transistor</a></p>
                        </div>
                    </figcaption>
                  </figure>
                  </li>
                </ul>
              </div>
            </header>














                  <section id="performance" className="my-14">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                      <div className="w-16 h-16 flex items-center justify-center  rounded-full ring-1 ring-slate-900/10 shadow overflow-hidden dark:bg-sky-500 dark:highlight-white/20">
                        <div className="aspect-w-1 aspect-h-1 bg-[length:100%] dark:hidden">
                        </div>
                        <div className="hidden aspect-w-1 aspect-h-1 bg-[length:100%] dark:block" >
                        </div>
                        <BsSpeedometer className="w-12 h-12  dark:text-slate-200 text-sky-500"/>
                      </div>
                      <h2 className="mt-8 font-semibold text-sky-500">
                        Performance
                      </h2>
                      <p className="mt-4 text-3xl sm:text-4xl text-slate-900 font-extrabold tracking-tight dark:text-slate-50 ">
                        It's tiny — never ship unused CSS again.
                      </p>
                      <p className="mt-4 max-w-3xl space-y-6 ">
                        Tailwind automatically removes all unused CSS when building for production, which means your final CSS bundle is the smallest it could possibly be. In fact, most Tailwind projects ship less than 10kB of CSS to the client.
                      </p>
                      <a className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-sky-50 text-sky-600 hover:bg-sky-100 hover:text-sky-700 focus:ring-sky-600 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-500 mt-8" href="/docs/optimizing-for-production">
                        Learn more<span className="sr-only">, optimizing for production</span>
                        <svg className="overflow-visible ml-3 text-sky-300 group-hover:text-sky-400 dark:text-slate-500 dark:group-hover:text-slate-400" width="3" height="6" viewBox="0 0 3 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M0 0L3 3L0 6"></path>
                        </svg>
                      </a>
                    </div>
            </section>
            


            <section id="mobile-first" className="overflow-hidden my-14">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="w-16 h-16 flex justify-center items-center rounded-full ring-1 ring-slate-900/10 shadow overflow-hidden dark:bg-indigo-500 dark:highlight-white/20">
                  <div className="aspect-w-1 aspect-h-1 bg-[length:100%] dark:hidden" >
                  </div>
                  <div className="hidden aspect-w-1 aspect-h-1 bg-[length:100%] dark:block" >
                  </div>
                  <AiOutlineMobile className="w-12 h-12  dark:text-slate-200 text-violet-400"/>
                </div>
                <h2 className="mt-8 font-semibold text-indigo-500 dark:text-indigo-400">
                  Mobile-first
                </h2>
                <p className="mt-4 text-3xl sm:text-4xl text-slate-900 font-extrabold tracking-tight dark:text-slate-50 ">
                  Responsive everything.
                </p>
                <div className="mt-4 max-w-3xl space-y-6 ">
                  <p>
                    Wrestling with a bunch of complex media queries in your CSS sucks, so Tailwind lets you build responsive designs right in your HTML instead.</p><p>Throw a screen size in front of literally any utility class and watch it magically apply at a specific breakpoint.
                  </p>
                </div>
                <a className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-200 hover:text-indigo-700 focus:ring-indigo-500 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-500 mt-8" href="/docs/responsive-design">
                  Learn more
                  <span className="sr-only">, responsive design</span>
                  <svg className="overflow-visible ml-3 text-indigo-300 group-hover:text-indigo-400 dark:text-slate-500 dark:group-hover:text-slate-400" width="3" height="6" viewBox="0 0 3 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M0 0L3 3L0 6"></path>
                  </svg>
                </a>
              </div>
             </section>

            <section id="dark-mode" className="my-14">
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="w-16 h-16 flex items-center justify-center rounded-full ring-1 ring-slate-900/10 shadow overflow-hidden dark:bg-slate-600 dark:highlight-white/20">
                  <div className="aspect-w-1 aspect-h-1 bg-[length:100%] dark:hidden" >
                  </div>
                  <div className="hidden aspect-w-1 aspect-h-1 bg-[length:100%] dark:block" >
                  </div>
                  <MdDarkMode className="w-12 h-12  dark:text-slate-200 text-violet-400"/>
                </div>
                <h2 className="mt-8 font-semibold text-slate-500">
                  Dark mode
                </h2>
                <p className="mt-4 text-3xl sm:text-4xl text-slate-900 font-extrabold tracking-tight dark:text-slate-50 ">Now with Dark&nbsp;Mode.</p>
                <p className="mt-4 max-w-3xl space-y-6 ">Don’t want to be one of those websites that blinds people when they open it on their phone at 2am? Enable dark mode in your configuration file then throw
                  <code className="font-mono text-slate-900 font-medium dark:text-slate-200 ">dark:</code>
                  in front of any color utility to apply it when dark mode is active. Works for background colors, text colors, border colors, and even gradients.
                </p><a className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:ring-slate-500 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-white dark:focus:ring-slate-500 mt-8" href="/docs/dark-mode">
                  Learn more<span className="sr-only">, dark mode</span>
                  <svg className="overflow-visible ml-3 text-slate-300 group-hover:text-slate-400 dark:text-slate-500 dark:group-hover:text-slate-400" width="3" height="6" viewBox="0 0 3 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M0 0L3 3L0 6"></path></svg>
                </a>
              </div>

            





            
             </section>

            
          <footer className="pb-16 text-sm leading-6">
            <div className="max-w-7xl mx-auto divide-y divide-slate-200 px-4 sm:px-6 md:px-8 dark:divide-slate-700">
              <div className="flex">
                <div className="flex-none w-1/2 space-y-10 sm:space-y-8 lg:flex lg:space-y-0">
                  <div className="lg:flex-none lg:w-1/2">
                    <h2 className="font-semibold text-slate-900 dark:text-slate-100">Getting Started</h2>
                    <ul className="mt-3 space-y-2">
                      <li>
                        <a className="hover:text-slate-900 dark:hover:text-slate-300" href="/docs/installation">Prerequisite</a>
                      </li>
                      <li>
                        <a className="hover:text-slate-900 dark:hover:text-slate-300" href="/docs/installation">Installation</a>
                      </li>
                      <li>
                        <a className="hover:text-slate-900 dark:hover:text-slate-300" href="/docs/editor-setup">
                          Editor Setup
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="lg:flex-none lg:w-1/2">
                    <h2 className="font-semibold text-slate-900 dark:text-slate-100">
                      Core Concepts
                    </h2>
                    <ul className="mt-3 space-y-2">
                      <li>
                        <a className="hover:text-slate-900 dark:hover:text-slate-300" href="/docs/responsive-design">
                          Responsive Design
                        </a>
                      </li>
                      <li>
                        <a className="hover:text-slate-900 dark:hover:text-slate-300" href="/docs/responsive-design">
                          Fast active
                        </a>
                      </li>
                      <li>
                        <a className="hover:text-slate-900 dark:hover:text-slate-300" href="/docs/dark-mode">
                          Dark Mode
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex-none w-1/2 space-y-10 sm:space-y-8 lg:flex lg:space-y-0">
                <div className="lg:flex-none lg:w-1/2">
                    <h2 className="font-semibold text-slate-900 dark:text-slate-100">
                      Community
                    </h2>
                    <ul className="mt-3 space-y-2">
                      <li>
                        <a className="hover:text-slate-900 dark:hover:text-slate-300" href="https://github.com/tailwindlabs/tailwindcss">
                          GitHub
                        </a>
                      </li>
                      <li>
                        <a className="hover:text-slate-900 dark:hover:text-slate-300" href="https://twitter.com/tailwindcss">
                          Bilibili
                        </a>
                      </li>
                      <li>
                        <a className="hover:text-slate-900 dark:hover:text-slate-300" href="https://www.youtube.com/tailwindlabs">
                          YouTube
                        </a>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="lg:flex-none lg:w-1/2">
                    <h2 className="font-semibold text-slate-900 dark:text-slate-100">
                      Friends Link
                    </h2>
                    <ul className="mt-3 space-y-2">
                      <li>
                        <a className="hover:text-slate-900 dark:hover:text-slate-300" href="https://github.com/tailwindlabs/tailwindcss">
                          ZIWIKI
                        </a>
                      </li>
                      <li>
                        <a className="hover:text-slate-900 dark:hover:text-slate-300" href="https://twitter.com/tailwindcss">
                          AIINFITE
                        </a>
                      </li>
                      <li>
                        <a className="hover:text-slate-900 dark:hover:text-slate-300" href="https://www.youtube.com/tailwindlabs">
                          ALLINONE
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mt-16 pt-10 flex items-center justify-start">
              <Link href="/" className="md:mr-1 flex-none w-[1.8rem] overflow-hidden md:w-auto" >
                  <picture>
                      <img src="/logo.svg" className=" w-10 h-10 " alt="LOGO"/>
                  </picture>
              </Link>
              <Link href="/">
                  <h1 className="font-bold text-xl md:text-2xl dark:text-slate-50 cursor-pointer px-4">
                      AI<span className="text-blue-500 dark:text-blue-400">Infite </span>Co. Limited.
                  </h1>
              </Link>
              </div>
            </div>
          </footer>


            


    </div>
      </div>
      

</div>
  )
}



