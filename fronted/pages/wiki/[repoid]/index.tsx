import NavBar from "../../../components/navbar"

import { MathJaxContext } from "better-react-mathjax";
import React, { useState, useEffect } from 'react';

import SideBar from "../../../components/sidebar"
import Search from "../../../components/search"
import parse from 'html-react-parser';
import { authOptions } from '../../api/auth/[...nextauth]'
import { unstable_getServerSession } from "next-auth/next"
import {RiMenu4Line,RiMenuLine} from  "react-icons/ri"
import { useRouter } from "next/router"
import { mathjax_config } from "../../../utils/mathjax_config"
import {fetch_repo_info,fetch_markdown} from "../../../utils/web_fetch"
import {html_parser_options_list,get_html_parser_option} from "../../../utils/json_parser_config"


export default function Home({ session }) {
  const router = useRouter();
  const slugs = router.query.slug;
  const repo_id = parseInt(Array.isArray(router.query.repoid) ? router.query.repoid[0] : router.query.repoid)
  
  const [repo_created_at, set_repo_created_at] = useState(''); 
  const [repo_describe, set_repo_describe] = useState(''); 
  const [repo_from, set_repo_from] = useState(''); 
  const [repo_git, set_repo_git] = useState(''); 
  const [repo_name, set_repo_name] = useState(''); 

  const [repo_access_token, set_repo_access_token] = useState(''); 
  const [repo_user_name, set_repo_user_name] = useState(''); 
  const [repo_access_type, set_repo_access_type] = useState(''); 

  const [ishome, set_ishome] = useState(false); 

  



  const [layout, setlayout] = useState([]); 
  const [markdowntext, setmarkdown] = useState(''); 
  const [markdownlist, setmarkdownlist] = useState(''); 

  const [SideBarIndex, setSideBarIndex] = useState(-1); 
  const [useSearch, setUseSearch] = useState(false);
  const [NavBarOpen, setNavBarOpen] = useState(false);
  const html_parser_options = get_html_parser_option(router.query.slug,router.query.repoid)
  const dynamicRoute = useRouter().asPath;
  async function getRepo(values) {
    fetch_repo_info(values, session.access_token).then(repo_info => {
      if (repo_info && !repo_info.error) {
        set_repo_created_at(repo_info.created_at)
        set_repo_describe(repo_info.repo_describe)
        set_repo_from(repo_info.repo_from)
        set_repo_git(repo_info.repo_git)
        set_repo_name(repo_info.repo_name)
      }
    })
  }

  async function getLayout(values) {
    fetch_markdown(values, session.access_token).then(data => {
      if (data && !data.error) {
        var myObject = JSON.parse(data.mdtext);
        setlayout(myObject['sublayouts'])
      }
    })
  }

  async function getMarkdown(values) {
    fetch_markdown(values, session.access_token).then(data => {
      if (data && !data.error) {
        setmarkdown(data.mdtext)
      }
    })
  }

  async function getMarkdownList(values) {
    fetch_markdown(values, session.access_token).then(data => {
      if (data && !data.error) {
        setmarkdownlist(data.mdtext)
      }
    })
  }

  useEffect(() => {
    const sideOpen = localStorage.getItem('NavBarOpen');
    if (sideOpen) {
      const data = JSON.parse(sideOpen);
      setNavBarOpen(data);
    } 
    const sideIndex = localStorage.getItem('SideOpenIndex');
    if (sideIndex) {
      const data = JSON.parse(sideIndex);
      setSideBarIndex(data);
    } 

    setmarkdown(`
    
    
    
<h1 class='text-3xl font-black text-slate-900 tracking-tight text-center dark:text-slate-200  pb-6 my-3' id="heading">双缓冲实现无锁切换</h1>
<blockquote class='border-l-8 px-2  my-3 mx-1 indent-8  py-0.5 border-sky-400 bg-slate-100 dark:bg-slate-800/50 rounded-md ring-1 ring-slate-500/10 dark:ring-slate-900/10 shadow-sm'>
<p class='my-2  text-base  text-slate-700 dark:text-slate-400'><strong>背景</strong>
对于后端开发者来说，服务稳定性第一，性能第二，二者相辅相成，缺一不可。</p>
</blockquote>
<p class='my-2  text-base  text-slate-700 dark:text-slate-400'>作为IT开发人员，秉承着一句话:只要程序正常运行，就不要随便动。所以程序优化就一直被搁置，因为没有压力，所以就没有动力嘛😁。在去年的时候，随着广告订单数量越来越多，导致服务rt上涨，光报警邮件每天都能收到上百封，于是痛定思痛，决定优化一版。</p>
<p class='my-2  text-base  text-slate-700 dark:text-slate-400'>秉承小步快跑的理念，决定从各个角度逐步优化，从简单到困难，逐个击破。所以在分析了代码之后，准备从锁这个角度入手，看看能否进行优化。</p>
<p class='my-2  text-base  text-slate-700 dark:text-slate-400'>在进行具体的问题分析以及优化之前，先看下现有召回引擎的实现方案，后面的方案是针对现有方案的优化。</p>
<h2 class='text-2xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200  py-2' id="heading-1">方案</h2>
<p class='my-2  text-base  text-slate-700 dark:text-slate-400'>在上一节中，我们提到对于多线程访问，可以使用mutex对共享变量进行加锁访问。对于一写多读的场景，使用读写锁进行优化，使用读写锁，在读的时候，是不进行加锁操作的，但是当有写操作的时候，就需要加锁，这样难免也会产生性能上的影响，在本节，我们提供终极优化版本，目的是在写少读多的场景下实现lock-free。</p>
<p class='my-2  text-base  text-slate-700 dark:text-slate-400'>如何在读写都存在的场景下实现lock-free呢？假设如果有两个共享变量，一个变量用来专供写线程来写，一个共享变量用来专供读线程来读，这样就不存在读写同步的问题了，如下所示：</p>
<p class='my-2  text-base  text-slate-700 dark:text-slate-400'><img class='image_link' src="assets/doubly1.png" alt="double"></p>
<p class='my-2  text-base  text-slate-700 dark:text-slate-400'>在上节中，我们有提到，多个线程对一个变量同时进行读操作，是线程安全的。一个线程对一个变量进行写操作也是线程安全的(这不废话么，都没人跟它竞争)，那么结合上述两点，上图就是线程安全的(多个线程读一个资源，一个线程写另外一个资源)。</p>
<p class='my-2  text-base  text-slate-700 dark:text-slate-400'>好了，截止到现在，我们lock-free的雏形已经出来了，就是_使用双变量_来实现lock-free的目标。那么reader线程是如何第一时间能够访问writer更新后的数据呢？</p>
<blockquote class='border-l-8 px-2  my-3 mx-1 indent-8  py-0.5 border-sky-500 bg-slate-100 dark:bg-slate-800/50 rounded-md ring-1 ring-slate-900/10 shadow-sm'>
<p class='my-2  text-base  text-slate-700 dark:text-slate-400'>假设有两个共享资源A和B，当前情况下，读线程正在读资源A。突然在某一个时刻，写线程需要更新资源，写线程发现资源A正在被访问，那么其更新资源B，更新完资源B后，进行切换，让读线程读资源B，然后写线程继续写资源A，这样就能完全实现了lock-free的目标，此种方案也可以成为双buffer方式。</p>
</blockquote>
<p class='my-2  text-base  text-slate-700 dark:text-slate-400'><img class='image_link' src="assets/doubly2.png" alt="double"></p>
<h2 class='text-2xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200  py-2' id="heading-2">实现</h2>
<p class='my-2  text-base  text-slate-700 dark:text-slate-400'>在上节中，我们提出了使用双buffer来实现lock-free的目标，那么如何实现读写buffer无损切换呢？</p>
<h3 class='text-xl  font-extrabold	text-slate-900 tracking-tight dark:text-slate-200  py-1.5' id="heading-3">指针互换</h3>
<p class='my-2  text-base  text-slate-700 dark:text-slate-400'>假设有两个资源，其指针分别为ptrA和ptrB，在某一时刻，ptrA所指向的资源正在被多个线程读，而ptrB所指向的资源则作为备份资源，此时，如果有写线程进行写操作，按照我们之前的思路，写完之后，马上启用ptrA作为读资源，然后写线程继续写ptrB所指向的资源，这样会有什么问题呢？</p>
<p class='my-2  text-base  text-slate-700 dark:text-slate-400'>我们就以std::vector为例，如下图所示：</p>
<p class='my-2  text-base  text-slate-700 dark:text-slate-400'><img class='image_link' src="assets/doubly3.png" alt="double"></p>
<p class='my-2  text-base  text-slate-700 dark:text-slate-400'>在上图左半部分，假设ptr指向读对象的指针，也就是说读操作只能访问ptr所指向的对象。</p>
<p class='my-2  text-base  text-slate-700 dark:text-slate-400'>某一时刻，需要对对象进行写操作(删除对象Obj4)，因为此时ptr = ptrA，因此写操作只能操作ptrB所指向的对象，在写操作执行完后，将ptr赋值为ptrB(保证后面所有的读操作都是在ptrB上)，即保证当前ptr所指向的对象永远为最新操作，然后写操作去删除ptrA中的Obj4，但是此时，有个线程正在访问ptrA的Obj4，自然而然会轻则当前线程获取的数据为非法数据，重则程序崩溃。</p>
<blockquote class='border-l-8 px-2  my-3 mx-1 indent-8  py-0.5 border-sky-500 bg-slate-100 dark:bg-slate-800/50 rounded-md ring-1 ring-slate-900/10 shadow-sm'>
<p class='my-2  text-base  text-slate-700 dark:text-slate-400'>此方案不可行，主要是因为在写操作的时候，没有判断当前是否还有读操作。</p>
</blockquote>
<h3 class='text-xl  font-extrabold	text-slate-900 tracking-tight dark:text-slate-200  py-1.5' id="heading-4">原子性</h3>
<p class='my-2  text-base  text-slate-700 dark:text-slate-400'>在上述方案中，简单的变量交换，最终仍然可能存在读写同一个变量，进而导致崩溃。那么如果保证在写的时候，没有读是不是就能解决上述问题了呢？如果是的话，那么应该如何做呢？</p>
<p class='my-2  text-base  text-slate-700 dark:text-slate-400'>显然，此问题就转换成如何判断一个对象上存在线程读操作。</p>
<p class='my-2  text-base  text-slate-700 dark:text-slate-400'>用过std::shared_ptr的都知道，其内部有个成员函数use_count()来判断当前智能指针所指向变量的访问个数，代码如下：</p>
<div class="relative z-10 mx-2 my-6 col-span-3 dark:bg-slate-800 bg-white font-base rounded-md dark:shadow-lg  ring-1 ring-slate-500/10 dark:ring-1 dark:ring-white/10 dark:ring-inset">
		<div class="relative flex text-slate-400 text-sm leading-6">
				<div class="mt-2 flex-none dark:text-sky-300 text-slate-600 border-t border-b border-t-transparent border-b-slate-500/20 dark:border-b-sky-300 px-4 py-1 flex items-center">language:c++</div>
				<div class="flex-auto flex pt-2 rounded-tr-xl overflow-hidden">
						<div class="flex-auto -mr-px bg-slate-50 dark:bg-slate-700/50 border border-slate-500/20 rounded-tl">
						</div>
				</div>
				<div class="absolute top-2 right-0 h-8 flex items-center pr-4">
						<div class="relative flex -mr-2">
						<span class="copycontent"/>
						</div>
				</div>
		</div>
		<div class="highlight p-4  text-sm  overflow-x-auto  text-slate-800 dark:text-slate-200
					scrollbar-thin  scrollbar-thumb-rounded-md scrollbar-track-rounded-md
		"><pre><code class='c++'><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700">1</span><span class="cl"><span class="dark:text-[#BB80B3] text-[#a90d91]">long</span>  <span class="dark:text-[#82AAFF] text-[#785840]">_M_get_use_count</span><span class="dark:text-[#89DDFF]">()</span> <span class="dark:text-[#BB80B3] text-[#a90d91]">const</span> <span class="dark:text-[#BB80B3] text-[#a90d91]">noexcept</span>
</span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700">2</span><span class="cl">    <span class="dark:text-[#89DDFF]">{</span>
</span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700">3</span><span class="cl">      <span class="dark:text-[#546E7A] text-[#177500]">// No memory barrier is used here so there is no synchronization
</span></span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700">4</span><span class="cl"><span class="dark:text-[#546E7A] text-[#177500]"></span>      <span class="dark:text-[#546E7A] text-[#177500]">// with other threads.
</span></span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700">5</span><span class="cl"><span class="dark:text-[#546E7A] text-[#177500]"></span>      <span class="dark:text-[#BB80B3] text-[#a90d91]">return</span> <span class="dark:text-[#EEFFFF] text-[#000000]">__atomic_load_n</span><span class="dark:text-[#89DDFF]">(</span><span class="dark:text-[#89DDFF] text-[#000000]">&amp;</span><span class="dark:text-[#EEFFFF] text-[#000000]">_M_use_count</span><span class="dark:text-[#89DDFF]">,</span> <span class="dark:text-[#EEFFFF] text-[#000000]">__ATOMIC_RELAXED</span><span class="dark:text-[#89DDFF]">);</span>
</span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700">6</span><span class="cl">    <span class="dark:text-[#89DDFF]">}</span>
</span></span></code></pre></div></div><p class='my-2  text-base  text-slate-700 dark:text-slate-400'>那么，我们可以考虑采用智能指针的方案，代码也比较简单，如下：</p>
<div class="relative z-10 mx-2 my-6 col-span-3 dark:bg-slate-800 bg-white font-base rounded-md shadow-lg  ring-1 ring-slate-700/10 dark:ring-1 dark:ring-white/10 dark:ring-inset">
		<div class="relative flex text-slate-400 text-sm leading-6">
				<div class="mt-2 flex-none dark:text-sky-300 text-slate-800 border-t border-b border-t-transparent border-b-slate-600 dark:border-b-sky-300 px-4 py-1 flex items-center">language:c++</div>
				<div class="flex-auto flex pt-2 rounded-tr-xl overflow-hidden">
						<div class="flex-auto -mr-px bg-slate-100 dark:bg-slate-700/50 border border-slate-500/30 rounded-tl">
						</div>
				</div>
				<div class="absolute top-2 right-0 h-8 flex items-center pr-4">
						<div class="relative flex -mr-2">
						<span class="copycontent"/>
						</div>
				</div>
		</div>
		<div class="highlight p-4  text-sm  overflow-x-auto  text-slate-800 dark:text-slate-200
					scrollbar-thin  scrollbar-thumb-rounded-md scrollbar-track-rounded-md
		"><pre><code class='c++'><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700"> 1</span><span class="cl"><span class="dark:text-[#EEFFFF] text-[#000000]">std</span><span class="dark:text-[#89DDFF] text-[#000000]">::</span><span class="dark:text-[#EEFFFF] text-[#000000]">atomic_size_t</span> <span class="dark:text-[#EEFFFF] text-[#000000]">curr_idx</span> <span class="dark:text-[#89DDFF] text-[#000000]">=</span> <span class="dark:text-[#F78C6C] text-[#1c01ce]">0</span><span class="dark:text-[#89DDFF]">;</span>
</span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700"> 2</span><span class="cl">
</span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700"> 3</span><span class="cl"><span class="dark:text-[#EEFFFF] text-[#000000]">std</span><span class="dark:text-[#89DDFF] text-[#000000]">::</span><span class="dark:text-[#EEFFFF] text-[#000000]">vector</span><span class="dark:text-[#89DDFF] text-[#000000]">&lt;</span><span class="dark:text-[#EEFFFF] text-[#000000]">std</span><span class="dark:text-[#89DDFF] text-[#000000]">::</span><span class="dark:text-[#EEFFFF] text-[#000000]">shared_ptr</span><span class="dark:text-[#89DDFF] text-[#000000]">&lt;</span><span class="dark:text-[#EEFFFF] text-[#000000]">Obj</span><span class="dark:text-[#89DDFF] text-[#000000]">&gt;&gt;</span> <span class="dark:text-[#EEFFFF] text-[#000000]">obj_buffers</span><span class="dark:text-[#89DDFF]">;</span>
</span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700"> 4</span><span class="cl"><span class="dark:text-[#EEFFFF] text-[#000000]">obj_buffers</span><span class="dark:text-[#89DDFF]">.</span><span class="dark:text-[#EEFFFF] text-[#000000]">emplace_back</span><span class="dark:text-[#89DDFF]">(</span><span class="dark:text-[#EEFFFF] text-[#000000]">std</span><span class="dark:text-[#89DDFF] text-[#000000]">::</span><span class="dark:text-[#EEFFFF] text-[#000000]">make_shared</span><span class="dark:text-[#89DDFF] text-[#000000]">&lt;</span><span class="dark:text-[#EEFFFF] text-[#000000]">Obj</span><span class="dark:text-[#89DDFF] text-[#000000]">&gt;</span><span class="dark:text-[#89DDFF]">(...));</span>
</span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700"> 5</span><span class="cl"><span class="dark:text-[#EEFFFF] text-[#000000]">obj_buffers</span><span class="dark:text-[#89DDFF]">.</span><span class="dark:text-[#EEFFFF] text-[#000000]">emplace_back</span><span class="dark:text-[#89DDFF]">(</span><span class="dark:text-[#EEFFFF] text-[#000000]">std</span><span class="dark:text-[#89DDFF] text-[#000000]">::</span><span class="dark:text-[#EEFFFF] text-[#000000]">make_shared</span><span class="dark:text-[#89DDFF] text-[#000000]">&lt;</span><span class="dark:text-[#EEFFFF] text-[#000000]">Obj</span><span class="dark:text-[#89DDFF] text-[#000000]">&gt;</span><span class="dark:text-[#89DDFF]">(...));</span>
</span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700"> 6</span><span class="cl">
</span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700"> 7</span><span class="cl"><span class="dark:text-[#546E7A] text-[#177500]">// write thread 
</span></span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700"> 8</span><span class="cl"><span class="dark:text-[#546E7A] text-[#177500]"></span><span class="dark:text-[#89DDFF]">{</span> 
</span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700"> 9</span><span class="cl">	<span class="dark:text-[#EEFFFF] text-[#000000]">size_t</span> <span class="dark:text-[#EEFFFF] text-[#000000]">prepare</span> <span class="dark:text-[#89DDFF] text-[#000000]">=</span> <span class="dark:text-[#F78C6C] text-[#1c01ce]">1</span> <span class="dark:text-[#89DDFF] text-[#000000]">-</span> <span class="dark:text-[#EEFFFF] text-[#000000]">curr_idx</span><span class="dark:text-[#89DDFF]">.</span><span class="dark:text-[#EEFFFF] text-[#000000]">load</span><span class="dark:text-[#89DDFF]">();</span> 
</span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700">10</span><span class="cl">	<span class="dark:text-[#BB80B3] text-[#a90d91]">while</span> <span class="dark:text-[#89DDFF]">(</span><span class="dark:text-[#EEFFFF] text-[#000000]">obj_buffers</span><span class="dark:text-[#89DDFF]">[</span><span class="dark:text-[#EEFFFF] text-[#000000]">prepare</span><span class="dark:text-[#89DDFF]">].</span><span class="dark:text-[#EEFFFF] text-[#000000]">use_count</span><span class="dark:text-[#89DDFF]">()</span> <span class="dark:text-[#89DDFF] text-[#000000]">&gt;</span> <span class="dark:text-[#F78C6C] text-[#1c01ce]">1</span><span class="dark:text-[#89DDFF]">)</span> <span class="dark:text-[#89DDFF]">{</span> 
</span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700">11</span><span class="cl">		<span class="dark:text-[#BB80B3] text-[#a90d91]">continue</span><span class="dark:text-[#89DDFF]">;</span> 
</span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700">12</span><span class="cl">	<span class="dark:text-[#89DDFF]">}</span> 
</span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700">13</span><span class="cl">	
</span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700">14</span><span class="cl">	<span class="dark:text-[#EEFFFF] text-[#000000]">obj_buffers</span><span class="dark:text-[#89DDFF]">[</span><span class="dark:text-[#EEFFFF] text-[#000000]">prepare</span><span class="dark:text-[#89DDFF]">]</span><span class="dark:text-[#89DDFF] text-[#000000]">-&gt;</span><span class="dark:text-[#EEFFFF] text-[#000000]">load</span><span class="dark:text-[#89DDFF]">();</span> 
</span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700">15</span><span class="cl">	<span class="dark:text-[#EEFFFF] text-[#000000]">curr_idx</span> <span class="dark:text-[#89DDFF] text-[#000000]">=</span> <span class="dark:text-[#EEFFFF] text-[#000000]">prepare</span><span class="dark:text-[#89DDFF]">;</span> 
</span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700">16</span><span class="cl"><span class="dark:text-[#89DDFF]">}</span> 
</span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700">17</span><span class="cl">
</span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700">18</span><span class="cl">	<span class="dark:text-[#546E7A] text-[#177500]">// read thread 
</span></span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700">19</span><span class="cl"><span class="dark:text-[#546E7A] text-[#177500]"></span>	<span class="dark:text-[#89DDFF]">{</span> 
</span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700">20</span><span class="cl">		<span class="dark:text-[#BB80B3] text-[#a90d91]">auto</span> <span class="dark:text-[#EEFFFF] text-[#000000]">tmp</span> <span class="dark:text-[#89DDFF] text-[#000000]">=</span> <span class="dark:text-[#EEFFFF] text-[#000000]">obj_buffers</span><span class="dark:text-[#89DDFF]">[</span><span class="dark:text-[#EEFFFF] text-[#000000]">curr_idx</span><span class="dark:text-[#89DDFF]">.</span><span class="dark:text-[#EEFFFF] text-[#000000]">load</span><span class="dark:text-[#89DDFF]">()];</span> 
</span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700">21</span><span class="cl">		<span class="dark:text-[#546E7A] text-[#177500]">// do sth
</span></span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700">22</span><span class="cl"><span class="dark:text-[#546E7A] text-[#177500]"></span>	<span class="dark:text-[#89DDFF]">}</span> 
</span></span></code></pre></div></div><p class='my-2  text-base  text-slate-700 dark:text-slate-400'>在上述代码中:</p>
<ul class='list-disc dark:marker:text-sky-400  text-base text-slate-700 dark:text-slate-400  pl-4'>
<li>首先创建一个vector，其内有两个Obj的智能指针，这俩智能指针所指向的Obj对象一个供读线程进行读操作，一个供写线程进行写操作</li>
<li>curr_idx代表当前可供读操作对象在obj_buffers的索引，即obj_buffers[curr_idx.load()]所指对象供读线程进行读操作</li>
<li>那么相应的，obj_buffers[1- curr_idx.load()]所指对象供写线程进行写操作</li>
<li>在读线程中
<ul class='list-disc dark:marker:text-sky-400  text-base text-slate-700 dark:text-slate-400  pl-4'>
<li>通过auto tmp = obj_buffers[curr_idx.load()];获取一个拷贝，由于obj_buffers中存储的是shared_ptr那么，该对象的引用计数+1</li>
<li>在tmp上进行读操作</li>
</ul>
</li>
<li>在写线程中
<ul class='list-disc dark:marker:text-sky-400  text-base text-slate-700 dark:text-slate-400  pl-4'>
<li>prepare = 1 - curr_idx.load();在上面我有提到curr_idx指向可读对象在obj_buffers的索引,换句话说，1 - curr_idx.load()就是另外一个对象即可写对象在obj_buffers中的索引</li>
<li>通过while循环判断另外一个对象的引用计数是否大于1(如果大于1证明还有读线程正在进行读操作)</li>
</ul>
</li>
</ul>
<p class='my-2  text-base  text-slate-700 dark:text-slate-400'>好了，截止到此，lock-free的实现目标基本已经完成。实现原理也也相对来说比较简单，重点是要保证_写的时候没有读操作_即可。</p>
<h2 class='text-2xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200  py-2' id="heading-5">扩展</h2>
<p class='my-2  text-base  text-slate-700 dark:text-slate-400'>双buffer方案在“一写多读”的场景下能够实现lock-free的目标，那么对于“多写一读”或者“多写多读”场景，是否也能够满足呢？</p>
<p class='my-2  text-base  text-slate-700 dark:text-slate-400'>答案是不太适合，主要是以下两个原因：</p>
<ul class='list-disc dark:marker:text-sky-400  text-base text-slate-700 dark:text-slate-400  pl-4'>
<li>
<p class='my-2  text-base  text-slate-700 dark:text-slate-400'>在多写的场景下，多个写之间需要通过锁来进行同步，虽然避免了对读写互斥情况加锁，但是多线程写时通常对数据的实时性要求较高，如果使用双buffer，所有新数据必须要等到索引切换时候才能使用，很可能达不到实时性要求</p>
</li>
<li>
<p class='my-2  text-base  text-slate-700 dark:text-slate-400'>多线程写时若用双buffer模式，则在索引切换时候也需要给对应的对象加锁，并且也要用类似于上面的while循环保证没有现成在执行写入操作时才能进行指针切换，而且此时也要等待读操作完成才能进行切换，这时候就对备用对象的锁定时间过长，在数据更新频繁的情况下是不合适的。</p>
</li>
</ul>
<h2 class='text-2xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200  py-2' id="heading-6">缺点</h2>
<p class='my-2  text-base  text-slate-700 dark:text-slate-400'>通过前面的章节，我们知道通过双buffer方式可以实现在一写多读场景下的lock-free，该方式要求两个对象或者buffer最终持有的数据是完全一致的，也就是说在单buffer情况下，只需要一个buffer持有数据就行，但是双buffer情况下，需要持有两份数据，所以存在内存浪费的情况。</p>
<p class='my-2  text-base  text-slate-700 dark:text-slate-400'>其实说白了，双buffer实现lock-free，就是采用的空间换时间的方式。</p>
<h2 class='text-2xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200  py-2' id="heading-7">结语</h2>
<p class='my-2  text-base  text-slate-700 dark:text-slate-400'>双buffer方案在多线程环境下能较好的解决 “一写多读” 时的数据更新问题，特别是适用于数据需要定期更新，且一次更新数据量较大的情形。</p>
<p class='my-2  text-base  text-slate-700 dark:text-slate-400'>性能优化是一个漫长的不断自我提升的过程，项目中的一点点优化往往就可以使得性能得到质的提升。</p>

    
    
    
    
    
    
    
    
    
    
    `)



  }, []);

  // only slug change,fetch new data;
  useEffect(() => {
    if (typeof slugs != "undefined" && Array.isArray(slugs)) {
      if (slugs.join("/") == "home") {
        set_ishome(true)
        setmarkdown("")
      } else {
        set_ishome(false)
        getMarkdown({"mdhref":slugs.join("/"),"repo_id":repo_id});
        getMarkdownList({"mdhref":slugs.join("/")+".list","repo_id":repo_id});
      }
    }
  }, [router.query.slug]);

  // only when repo change, fetch new data
  useEffect(() => {
    getRepo({"id":repo_id})
    getLayout({"mdhref": "layout.json","repo_id":repo_id});
  }, [router.query.repoid]);
  
  useEffect(() => setUseSearch(false), [dynamicRoute]);

return (
  <div className="antialiased  text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 min-h-screen">

  <NavBar NavBarOpen={NavBarOpen} setNavBarOpen={setNavBarOpen} useSearch={useSearch} setUseSearch={setUseSearch} />

    <div className="overflow-hidden">
    <div className={`xl:hidden fixed bottom-5 z-50 right-0 h-16 w-16 rounded-md `}>
          <RiMenuLine className={`${NavBarOpen && "hidden"} mr-2 md:mr-3 block w-10 h-10  dark:text-slate-200  hover:text-sky-500  cursor-pointer`} onClick={() => { localStorage.setItem('NavBarOpen', JSON.stringify(!NavBarOpen));setNavBarOpen(!NavBarOpen); }} />
          <RiMenu4Line className={`${!NavBarOpen && "hidden"} mr-2 md:mr-3 block w-10 h-10  dark:text-slate-200  hover:text-sky-500  cursor-pointer`} onClick={() => { localStorage.setItem('NavBarOpen', JSON.stringify(!NavBarOpen)); setNavBarOpen(!NavBarOpen); }}  />
        </div>
    <div className={` ${!NavBarOpen && "hidden"} fixed z-40   inset-0 px-3 pt-6 pr-2 overflow-y-auto w-[20rem]
        lg:bg-inherit lg:top-[3.8125rem] lg:left-[max(0px,calc(50%-40rem))] lg:w-[19.5rem] lg:bottom-3 lg:pb-10  lg:pt-0 lg:pl-8
        scrollbar-thin   scrollbar-thumb-rounded-md scrollbar-track-rounded-md
      `}>
      <div className="fixed xl:hidden inset-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80" ></div>
      <div className="fixed xl:hidden inset-0 bg-white w-[20rem] p-6 dark:bg-slate-900" ></div>

      <SideBar repo_id={parseInt(Array.isArray(router.query.repoid) ? router.query.repoid[0] : router.query.repoid)}  layout={layout} SideBarIndex={SideBarIndex} setSideBarIndex={setSideBarIndex}  useSearch={useSearch } setUseSearch={setUseSearch} />
    </div>

    <div className={`overflow-hidden ${NavBarOpen?'lg:pl-[20rem] lg:pr-[20rem]':'px-4 pb-6'}` } >
      <div className=" mx-auto relative z-5 pt-10  ">
        <div className="mb-16 md:flex items-center justify-center">
          <div className="flex-auto  max-w-3xl xl:max-w-2xl">
            <MathJaxContext version={3} config={mathjax_config}>
                {parse(markdowntext, html_parser_options)}
                

            </MathJaxContext>
          </div>
        </div>
      </div>
    </div>
      
      <div className="fixed z-20 top-[3.8125rem] bottom-0 right-[max(0px,calc(50%-45rem))] w-[19.5rem] py-10 overflow-y-auto hidden xl:block">
        <div className="px-8">
          <h5 className="text-slate-900 font-semibold mb-4 text-sm leading-6 dark:text-slate-100">
            本页目录
          </h5>
          {parse(markdownlist,html_parser_options_list)}
        </div>
      </div>

  </div>
  {useSearch && (<Search useSearch={useSearch} setUseSearch={setUseSearch}/>)}

</div>
  )
}

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)
  if(!session){
    return {
        redirect : {
            destination : "/auth/login",
            premanent: false
        }
    }
  }
  return {
    props: {
      session,
    },
  }
}