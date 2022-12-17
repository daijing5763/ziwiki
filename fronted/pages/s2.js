import NavBar from "../components/navbar"
import MermaidCode from "../mermaid"
import { MathJaxContext,MathJax } from "better-react-mathjax";
import React, { useState, useEffect } from 'react';
import { getSession, SessionContext } from 'next-auth/react'
import {MdContentCopy} from "react-icons/md"
import SideBar from "../components/sidebar"
import Search from "../components/search"
import parse, { domToReact, attributesToProps  } from 'html-react-parser';
import { authOptions } from './api/auth/[...nextauth]'
import { backend_base_url } from "../utils/env_variable"
import { unstable_getServerSession } from "next-auth/next"

import { useRouter } from "next/router"
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

export default function Home({ session}) {
  const router = useRouter();
  const [layout, setlayout] = useState([]); 
  const [markdowntext, setmarkdown] = useState(''); 
  const [markdownlist, setmarkdownlist] = useState(''); 
  async function getLayout(values) {
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify(values)
    }

    await fetch(`${backend_base_url}get_markdown`, options)
      .then(res => res.json())
      .then((data) => {
        if (data && !data.error) {
          var myObject = JSON.parse(data.mdtext);
          setlayout(myObject['sublayouts'])
        }
    })
  }


  async function getMarkdown(values) {
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify(values)
    }

    await fetch(`${backend_base_url}get_markdown`, options)
      .then(res => res.json())
      .then((data) => {
        if (data && !data.error) {
          setmarkdown(data.mdtext)
        } else {
          console.log(data)
        }
    })
  }

  async function getMarkdownList(values) {
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify(values)
    }

    await fetch(`${backend_base_url}get_markdown`, options)
      .then(res => res.json())
      .then((data) => {
        if (data && !data.error) {
          setmarkdownlist(data.mdtext)
        } else {
          console.log(data)
        }
    })
  }

  
  const [SideBarIndex, setSideBarIndex] = useState(-1); 
  const [useSearch, setUseSearch] = useState(false);
  const [NavBarOpen, setNavBarOpen] = useState(false);
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
  }, []);
  // useEffect(() => {
  //   const slugs = router.query.slug;
  //   if (typeof slugs != "undefined" && Array.isArray(slugs)) {
  //     if (slugs.join("/") == "home"){
  //       setmarkdown("Repo HomePage")
  //     } else {
  //       getMarkdown({
  //         "mdhref":slugs.join("/"),
  //         "repo_id":parseInt(Array.isArray(router.query.repoid) ? router.query.repoid[0] : router.query.repoid),
  //       });
  //       getMarkdownList({
  //         "mdhref":slugs.join("/")+".list",
  //         "repo_id":parseInt(Array.isArray(router.query.repoid) ? router.query.repoid[0] : router.query.repoid),
  //       });
  //     }
  //   }
  // }, [router.query.slug]);
  // useEffect(() => {
  //   getLayout({
  //     "mdhref": "layout.json",
  //     "repo_id":parseInt(Array.isArray(router.query.repoid) ? router.query.repoid[0] : router.query.repoid),
  //   });
  // },[router.query.repoid]);

  const dynamicRoute = useRouter().asPath;

  // Reset count to 0 on dynamic route change.
  useEffect(() => setUseSearch(false), [dynamicRoute]);

  
  function isContains(str, substr) {
    if (typeof str == "undefined") {
      return false
    } 
  return str.indexOf(substr) >= 0;
  }
  const options = {
    replace: ({ attribs, children }) => {
      if (!attribs) {
        return;
      }
  
      if (attribs.id === 'main') {
        return <h1 style={{ fontSize: 42 }}>{domToReact(children, options)}</h1>;
      }
      if (isContains(attribs.class,"mermaid")) {
        return (
          <MermaidCode graphDefinition={domToReact(children, options)}/>
        );
      } else if (attribs.class === 'copycontent') {
        return (
          <MdContentCopy className="w-6 h-6 cursor-pointer text-slate-600 dark:text-slate-300"/>
        );
      } else if (isContains(attribs.class,"math inline")) {
        return (
          <MathJax inline>{domToReact(children, options)}</MathJax>
        )
      }else if (isContains(attribs.class,"math display")) {
        return (
          <MathJax>{domToReact(children, options)}</MathJax>
        )
      } else if (attribs.class == "image_link") {
        const slugs = router.query.slug;
        if (slugs && !attribs.src.startsWith('http')) {
          const prefix=`${backend_base_url}static_get/1/`+router.query.repoid+"/"+slugs.slice(0,-1).join("/")+"/"+attribs.src
          return (
            <img className="px-3" src={prefix} />
          )
        } else {
          return (
            <img className="px-3" src={attribs.src} />
          )
        }
        

      }
    }
  };

  
  const options_list = {
    replace: domNode => {
      if (domNode.name === 'ul') {
        return <ul className="text-slate-700 text-sm leading-6"  >{domToReact(domNode.children, options_list)}</ul>;
      }
      if (domNode.name === 'li') {
        return <ul className="ml-4"  >{domToReact(domNode.children, options_list)}</ul>;
      }
      else if (domNode.name === 'a') {
        const props = attributesToProps(domNode.attribs);
        return <a {...props} className="group flex items-start py-1 hover:text-sky-500 dark:text-slate-400 dark:hover:text-sky-500"  >
          <svg width="3" height="24" viewBox="0 -9 3 24" className="mr-2 text-slate-400 overflow-visible group-hover:text-slate-600 dark:text-slate-600 dark:group-hover:text-slate-500">
            <path d="M0 0L3 3L0 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
          </svg>
          {domToReact(domNode.children, options_list)}</a>;
      }
    }
  };

  
  
return (
<div className="antialiased  text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 min-h-screen">
  <NavBar NavBarOpen={NavBarOpen} setNavBarOpen={setNavBarOpen} useSearch={useSearch} setUseSearch={setUseSearch} />
  
  <div className="overflow-hidden">
    <div className={` ${!NavBarOpen && "hidden"} fixed z-40   inset-0 px-3 pt-6 pr-2 overflow-y-auto w-[20rem]
        lg:bg-inherit lg:top-[3.8125rem] lg:left-[max(0px,calc(50%-40rem))] lg:w-[19.5rem] lg:bottom-3 lg:pb-10  lg:pt-0 lg:pl-8
        scrollbar-thin   scrollbar-thumb-rounded-md scrollbar-track-rounded-md
      `}>
      <div className="fixed lg:hidden inset-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80" ></div>
      <div className="fixed lg:hidden inset-0 bg-white w-[20rem] p-6 dark:bg-slate-900" ></div>
        <SideBar repo_id={parseInt(Array.isArray(router.query.repoid) ? router.query.repoid[0] : router.query.repoid)} access_token={session.access_token} layout={layout} SideBarIndex={SideBarIndex} setSideBarIndex={setSideBarIndex}  useSearch={useSearch } setUseSearch={setUseSearch} />
    </div>

    <div className={`overflow-hidden ${NavBarOpen?'lg:pl-[20rem] lg:pr-[20rem]':'px-4 pb-6'}` } >
      <div className=" mx-auto relative z-5 pt-10  ">
        <div className="mb-16 md:flex items-center justify-center">
          <div className="flex-auto max-w-2xl">
            <MathJaxContext version={3} config={config}>

            <h1 class='text-3xl font-black text-slate-900 tracking-tight text-center dark:text-slate-200  pb-6 my-3' id="heading">这是一篇示范文</h1>
<blockquote class='border-l-8 px-2  my-3 mx-1 indent-8  py-0.5 border-sky-500 bg-slate-100/5 dark:bg-slate-800/50 rounded-md ring-1 ring-slate-900/10 shadow-sm'>
<p class='my-2 indent-8 text-base  text-slate-700 dark:text-slate-400'><strong>摘要</strong>：战城南，死郭北，野死不葬乌可食。为我谓乌：且为客豪！野死谅不葬，俯腐肉安能去子逃？水深激激，蒲苇冥冥；枭骑战斗死，驽马徘徊鸣。
梁筑室，何以南？何以北？禾黍不获君何食？愿为忠臣安可得？思子良臣，良臣诚可思：朝行出攻，暮不夜归！?</p>
</blockquote>
<h2 class='text-2xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200  py-2' id="heading-1">第一章</h2>
<h3 class='text-xl  font-extrabold	text-slate-900 tracking-tight dark:text-slate-200  py-1.5' id="heading-2">史记</h3>
<p class='my-2 indent-8 text-base  text-slate-700 dark:text-slate-400'>司马迁著《史记》，其史学观念在于“究天人之际，通古今之变，成一家之言”。司马迁探求的天人之际，并非承认天的神秘力量反而重视天人之间关系的演变，从而了解“古今之变”的关键，探求出历史动态发展变化的层面，最终完成“一家之言”。而他的撰述动机，主要有以下三方面：</p>
<h4 class='text-lg  font-bold	    text-slate-900 tracking-tight  dark:text-slate-200  py-1.5' id="heading-3">第一节：遗志</h4>
<p class='my-2 indent-8 text-base  text-slate-700 dark:text-slate-400'>司马迁为了继承其父司马谈编订史书的遗志，完成撰述《史记》的宏愿。司马氏在周朝时世为史官，春秋时期虽然失去官职，司马谈却把修撰史书视为自己的神圣职责，一心继承先人久绝的世业—太史令，重现孔子撰述《春秋》的精神，整理和论述上代历史。《隋书·经籍志》说：“谈乃据《左氏春秋》、《国语》、《世本》、《战国策》、《楚汉春秋》，接其后事，成一家之言。”可见司马谈有意继续编订《春秋》以后的史事。汉武帝元封元年，武帝进行封禅大典，司马谈身为太史令，却无缘参与当世盛事，引为终生之憾，忧愤而死。他死前将遗志嘱咐儿子司马迁说：“今天子接千岁之统，封泰山，而余不得从行，是命也夫！余死，汝必为太史，无忘吾所欲论著矣……”司马迁则回答道：“小子不敏，请悉论先人所次旧闻。”可知司马迁乃秉承父亲的遗志完成史著。而《史记》以“封禅书”为其八书之一，即见其秉先父之意。</p>
<h4 class='text-lg  font-bold	    text-slate-900 tracking-tight  dark:text-slate-200  py-1.5' id="heading-4">第二节：春秋精神</h4>
<p class='my-2 indent-8 text-base  text-slate-700 dark:text-slate-400'>司马迁想继承《春秋》精神。司马迁在《太史公自序》说：“先人有言，自周公卒，五百岁而有孔子，孔子卒后，至于今五百岁，有能绍明世，正《易传》、继《春秋》、本《诗》、《书》、《礼》、《乐》之际，意在斯乎？意在斯乎？小子何敢让焉？”此正暗示其有明道义，显扬志业人物的使命。《春秋》的下限，到鲁哀公获麟之年，此后的史事就没有完整的史籍记载。司马迁是绍继《春秋》，并以汉武帝元狩元年“获麟”及太初元年改历下限，撰写史记。然而，司马迁继承《春秋》，不仅是要形式上承继周公以来的道统，反而是重视《春秋》的性质，他在《太史公自序》说：“夫《春秋》，上明三王之道，下辨人事之纪，别嫌疑，明是非，定犹豫，善善恶恶，贤贤贱不肖，存亡国，继绝世，补敝起废，王道之大者也……《春秋》以道义，拨乱世，反之正，莫近于《春秋》。”可见司马迁对“春秋之义”和“春秋笔法”心仪已久，这是他要承孔子的真意、秉承《春秋》褒贬精神，撰述《史记》。</p>
<h4 class='text-lg  font-bold	    text-slate-900 tracking-tight  dark:text-slate-200  py-1.5' id="heading-5">第三节：史家职责</h4>
<p class='my-2 indent-8 text-base  text-slate-700 dark:text-slate-400'>司马迁要肩负史家职责。据《后汉书·百官志》载，“太史令”只是俸禄六百石的小官，职责仅在于管理图籍，掌管星象天文，最多也只是记录上代及当代事情，并无著述的责任。然而，司马谈和司马迁明显不满足于“拾遗补蓺”。司马谈早有整理上代历史的计划，可惜却“发愤而卒”，临终前叮嘱司马迁，认为“自获麟以来，史记放绝。今汉兴，海内一统，明主、贤君、忠臣、死义之士”甚多，身为太史令，有完成论载上代历史的任务。司马迁在《太史公自序》也指出身为太史的职责说：“且余尝掌其官，废明圣盛德不载，灭功臣、世家、贤大夫之不述，隳先人之言，罪莫大焉。”因此，司马迁一心秉承先人世传及“述往事以思来者”的责任感，决意撰述《史记》。在《报任安书》中亦透露著述《史记》的目的，他说“凡百三十篇，亦欲以究天人之际，通古今之变，成一家之言。”可见他不但要完成太史令的责任，更要尽史学家的职责。</p>
<h5 class='text-base font-bold 	  text-slate-900 tracking-tight  dark:text-slate-200  py-1' id="heading-6">孙子吴起列传</h5>
<p class='my-2 indent-8 text-base  text-slate-700 dark:text-slate-400'>孙子武者，齐人也。以兵法见于吴王阖庐。阖庐曰：“子之十三篇，吾尽观之矣，可以小试勒兵乎<sup id="footnote-fnref:1"><a href="#footnote-fn:1" class="text-sky-400 px-0.5 hover:decoration-sky-500 hover:text-sky-500 hover:decoration-2	hover:underline underline-offset-4" title="跳转至脚注1" role="doc-noteref">[1]</a></sup>  ？”对曰：“可。”阖庐曰：“可试以妇人乎？”曰：“可。”于是许之，出宫中美女，得百八十人。孙子分为二队，以王之宠姬二人各为队长，皆令持戟。令之曰：“汝知而心与左右手背乎？”妇人曰：“知之。”孙子曰：“前，则视心；左，视左手；右，视右手；后，即视背。”妇人曰：“诺。”约束既布，乃设鈇钺，即三令五申之。于是鼓之右，妇人大笑。孙子曰：“约束不明，申令不熟，将之罪也。”复三令五申而鼓之左，妇人复大笑。孙子曰：“约束不明，申令不熟，将之罪也；既已明而不如法者，吏士之罪也。”乃欲斩左右队长。吴王从台上观，见且斩爱姬，大骇。趣使使下令曰：“寡人已知将军能用兵矣。寡人非此二姬，食不甘味，愿勿斩也。”孙子曰：“臣既已受命为将，将在军，君命有所不受。”遂斩队长二人以徇。用其次为队长，于是复鼓之。妇人左右前后跪起皆中规矩绳墨，无敢出声。于是孙子使使报王曰：“兵既整齐，王可试下观之，唯王所欲用之，虽赴水火犹可也。”吴王曰：“将军罢休就舍，寡人不愿下观。”孙子曰：“王徒好其言，不能用其实。”于是阖庐知孙子能用兵，卒以为将。西破强楚，入郢，北威齐晋，显名诸侯，孙子与有力焉。</p>
<h5 class='text-base font-bold 	  text-slate-900 tracking-tight  dark:text-slate-200  py-1' id="heading-7">项羽本纪</h5>
<p class='my-2 indent-8 text-base  text-slate-700 dark:text-slate-400'>项籍者，下相人也，字羽。初起时，年二十四。其季父项梁，梁父即楚将项燕，为秦将王翦所戮者也。项氏世世为楚将，封于项，故姓项氏。
项籍少时，学书不成，去学剑，又不成。项梁怒之。籍曰：“书足以记名姓而已。剑一人敌，不足学，学万人敌。”于是项梁乃教籍兵法，籍大喜，略知其意，又不肯竟学。项梁尝有栎阳逮，乃请蕲狱掾曹咎书抵栎阳狱掾司马欣，以故事得已。项梁杀人，与籍避仇于吴中。吴中贤士大夫皆出项梁下。每吴中有大繇役及丧，项梁常为主办，阴以兵法部勒宾客及子弟，以是知其能。秦始皇帝游会稽，渡浙江，梁与籍俱观。籍曰：“彼可取而代也。”梁掩其口，曰：“毋妄言，族矣。”梁以此奇籍。籍长八尺余，力能扛鼎，才气过人，虽吴中子弟皆已惮籍矣。</p>
<p class='my-2 indent-8 text-base  text-slate-700 dark:text-slate-400'>太史公曰：吾闻之周生曰“舜目盖重瞳子”，又闻项羽亦重瞳子。羽岂其苗裔邪？何兴之暴也！夫秦失其政，陈涉首难，豪杰蜂起，相与并争，不可胜数。然羽非有尺寸，乘势起陇亩之中，三年，遂将五诸侯灭秦，分裂天下，而封王侯，政由羽出，号为“霸王”，位虽不终，近古以来未尝有也，及羽背关怀楚，放逐义帝而自立，怨王侯叛己，难矣。自矜功伐，奋其私智而不师古。谓霸王之业，欲以力征经营天下。五年卒亡其国，身死东城，尚不觉寤而不自责，过矣。乃引“天亡我，非用兵之罪也”，岂不谬哉！<sup id="footnote-fnref:2"><a href="#footnote-fn:2" class="text-sky-400 px-0.5 hover:decoration-sky-500 hover:text-sky-500 hover:decoration-2	hover:underline underline-offset-4" title="跳转至脚注2" role="doc-noteref">[2]</a></sup></p>
<h2 class='text-2xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200  py-2' id="heading-8">第二章</h2>
<h3 class='text-xl  font-extrabold	text-slate-900 tracking-tight dark:text-slate-200  py-1.5' id="heading-9">代码</h3>
<h3 class='text-xl  font-extrabold	text-slate-900 tracking-tight dark:text-slate-200  py-1.5' id="python-">Python 代码</h3>
<div class="relative z-10 mx-2 my-6 col-span-3 dark:bg-slate-800 bg-white font-base rounded-md shadow-lg  ring-1 ring-slate-700/10 dark:ring-1 dark:ring-white/10 dark:ring-inset">
				<div class="relative flex text-slate-400 text-sm leading-6">
						<div class="mt-2 flex-none dark:text-sky-300 text-slate-800 border-t border-b border-t-transparent border-b-slate-600 dark:border-b-sky-300 px-4 py-1 flex items-center">
								language:code
						</div>
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
	"><pre><code><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700"> 1</span><span class="cl"><span class="dark:text-[#89DDFF] text-[#a90d91]">import</span> <span class="dark:text-[#FFCB6B] text-[#289870]">pandas</span> <span class="dark:text-[#BB80B3] text-[#a90d91]">as</span> <span class="dark:text-[#FFCB6B] text-[#289870]">pd</span>
</span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700"> 2</span><span class="cl"><span class="dark:text-[#89DDFF] text-[#a90d91]">import</span> <span class="dark:text-[#FFCB6B] text-[#289870]">numpy</span> <span class="dark:text-[#BB80B3] text-[#a90d91]">as</span> <span class="dark:text-[#FFCB6B] text-[#289870]">np</span>
</span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700"> 3</span><span class="cl">
</span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700"> 4</span><span class="cl"><span class="dark:text-[#BB80B3] text-[#a90d91]">def</span> <span class="dark:text-[#82AAFF] text-[#785840]">func</span><span class="dark:text-[#89DDFF]">(</span><span class="dark:text-[#EEFFFF] text-[#000000]">a</span><span class="dark:text-[#89DDFF]">,</span><span class="dark:text-[#EEFFFF] text-[#000000]">b</span><span class="dark:text-[#89DDFF]">):</span>
</span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700"> 5</span><span class="cl">  <span class="dark:text-[#EEFFFF] text-[#000000]">c</span><span class="dark:text-[#89DDFF] text-[#000000]">=</span><span class="dark:text-[#EEFFFF] text-[#000000]">np</span><span class="dark:text-[#89DDFF] text-[#000000]">.</span><span class="dark:text-[#EEFFFF] text-[#000000]">array</span><span class="dark:text-[#89DDFF]">([</span><span class="dark:text-[#F78C6C] text-[#1c01ce]">1</span><span class="dark:text-[#89DDFF]">,</span><span class="dark:text-[#F78C6C] text-[#1c01ce]">2</span><span class="dark:text-[#89DDFF]">,</span><span class="dark:text-[#F78C6C] text-[#1c01ce]">3</span><span class="dark:text-[#89DDFF]">,</span><span class="dark:text-[#F78C6C] text-[#1c01ce]">4</span><span class="dark:text-[#89DDFF]">,</span><span class="dark:text-[#F78C6C] text-[#1c01ce]">5</span><span class="dark:text-[#89DDFF]">,</span><span class="dark:text-[#F78C6C] text-[#1c01ce]">6.8</span><span class="dark:text-[#89DDFF]">])</span>
</span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700"> 6</span><span class="cl">  <span class="dark:text-[#EEFFFF] text-[#000000]">a</span><span class="dark:text-[#89DDFF] text-[#000000]">=</span><span class="dark:text-[#EEFFFF] text-[#000000]">b</span><span class="dark:text-[#89DDFF] text-[#000000]">+</span><span class="dark:text-[#EEFFFF] text-[#000000]">c</span>
</span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700"> 7</span><span class="cl">  <span class="dark:text-[#BB80B3] text-[#a90d91]">return</span> <span class="dark:text-[#EEFFFF] text-[#000000]">a</span>
</span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700"> 8</span><span class="cl">
</span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700"> 9</span><span class="cl"><span class="dark:text-[#BB80B3] text-[#a90d91]">if</span> <span class="vm">__name__</span> <span class="dark:text-[#89DDFF] text-[#000000]">==</span> <span class="dark:text-[#C3E88D] text-[#c41a16]">&#34;__main__&#34;</span><span class="dark:text-[#89DDFF]">:</span>
</span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700">10</span><span class="cl">  <span class="dark:text-[#EEFFFF] text-[#000000]">a</span><span class="dark:text-[#89DDFF] text-[#000000]">=</span> <span class="dark:text-[#EEFFFF] text-[#000000]">np</span><span class="dark:text-[#89DDFF] text-[#000000]">.</span><span class="dark:text-[#EEFFFF] text-[#000000]">array</span><span class="dark:text-[#89DDFF]">([</span><span class="dark:text-[#F78C6C] text-[#1c01ce]">2</span><span class="dark:text-[#89DDFF]">,</span><span class="dark:text-[#F78C6C] text-[#1c01ce]">3</span><span class="dark:text-[#89DDFF]">,</span><span class="dark:text-[#F78C6C] text-[#1c01ce]">4</span><span class="dark:text-[#89DDFF]">])</span>
</span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700">11</span><span class="cl">  <span class="dark:text-[#EEFFFF] text-[#000000]">b</span><span class="dark:text-[#89DDFF] text-[#000000]">=</span><span class="dark:text-[#EEFFFF] text-[#000000]">np</span><span class="dark:text-[#89DDFF] text-[#000000]">.</span><span class="dark:text-[#EEFFFF] text-[#000000]">array</span><span class="dark:text-[#89DDFF]">([</span><span class="dark:text-[#F78C6C] text-[#1c01ce]">5</span><span class="dark:text-[#89DDFF]">,</span><span class="dark:text-[#F78C6C] text-[#1c01ce]">6</span><span class="dark:text-[#89DDFF]">,</span><span class="dark:text-[#F78C6C] text-[#1c01ce]">7</span><span class="dark:text-[#89DDFF]">])</span>
</span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700">12</span><span class="cl">  <span class="dark:text-[#EEFFFF] text-[#000000]">e</span><span class="dark:text-[#89DDFF] text-[#000000]">=</span><span class="dark:text-[#EEFFFF] text-[#000000]">func</span><span class="dark:text-[#89DDFF]">(</span><span class="dark:text-[#EEFFFF] text-[#000000]">a</span><span class="dark:text-[#89DDFF]">,</span><span class="dark:text-[#EEFFFF] text-[#000000]">b</span><span class="dark:text-[#89DDFF]">)</span>
</span></span><span class="flex"><span class="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700">13</span><span class="cl">  <span class="dark:text-[#82AAFF] text-[#a90d91]">print</span><span class="dark:text-[#89DDFF]">(</span><span class="dark:text-[#EEFFFF] text-[#000000]">e</span><span class="dark:text-[#89DDFF]">)</span>
</span></span></code></pre></div></div><h2 class='text-2xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200  py-2' id="heading-10">第三章</h2>



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
          {parse(markdownlist,options_list)}
        </div>
      </div>

  </div>
  {useSearch && (<Search useSearch={useSearch} setUseSearch={setUseSearch} access_token={session.access_token} />)}

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