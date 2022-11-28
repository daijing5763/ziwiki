package postrender

import "regexp"

func RenderHightLight(html string) string {
	/* Background */
	bgRegexp := regexp.MustCompile(`class="highlight-bg"`)
	bghtml := "class='dark:text-[#ffffff] bg-[#1f1f24]'"
	html = bgRegexp.ReplaceAllString(html, bghtml)

	/* PreWrapper */
	pwRegexp := regexp.MustCompile(`class="highlight-chroma"`)
	pwhtml := "class='dark:text-[#ffffff] bg-[#1f1f24]'"
	html = pwRegexp.ReplaceAllString(html, pwhtml)

	/* Error */
	erRegexp := regexp.MustCompile(`class="highlight-err"`)
	erhtml := "class='dark:text-[#FF5370] text-[#000000]'"
	html = erRegexp.ReplaceAllString(html, erhtml)

	/* LineTableTD */
	ltRegexp := regexp.MustCompile(`class="highlight-lntd"`)
	lthtml := "class='align-top'"
	html = ltRegexp.ReplaceAllString(html, lthtml)

	/* LineTable */
	ltbRegexp := regexp.MustCompile(`class="highlight-lntable"`)
	ltbhtml := "class=''"
	html = ltbRegexp.ReplaceAllString(html, ltbhtml)

	/* LineHighlight */
	lhRegexp := regexp.MustCompile(`class="highlight-hl"`)
	lhbhtml := "class='dark:bg-[#353539] bg-[#e5e5e5]'"
	html = lhRegexp.ReplaceAllString(html, lhbhtml)

	/* LineNumbersTable */
	lntRegexp := regexp.MustCompile(`class="highlight-lnt"`)
	lnthtml := "class='whitespace-pre select-none mr-1.5 px-1.5 text-[#7f7f7f]'"
	html = lntRegexp.ReplaceAllString(html, lnthtml)

	/* LineNumbers */
	lnsRegexp := regexp.MustCompile(`class="highlight-ln"`)
	lnshtml := "class='whitespace-pre select-none mr-1.5 px-1.5 text-[#7f7f7f]'"
	html = lnsRegexp.ReplaceAllString(html, lnshtml)

	/* Line */
	lnRegexp := regexp.MustCompile(`class="highlight-line"`)
	lnhtml := "class='flex'"
	html = lnRegexp.ReplaceAllString(html, lnhtml)

	/* Name */
	nRegexp := regexp.MustCompile(`class="highlight-n"`)
	nhtml := "class='dark:text-[#EEFFFF] text-[#000000]'"
	html = nRegexp.ReplaceAllString(html, nhtml)

	/* nnNamespace */
	nnRegexp := regexp.MustCompile(`class="highlight-nn"`)
	nnhtml := "class='dark:text-[#FFCB6B] text-[#000000]'"
	html = nnRegexp.ReplaceAllString(html, nnhtml)

	/* Keyword */
	kwRegexp := regexp.MustCompile(`class="highlight-k"`)
	kwhtml := "class='dark:text-[#BB80B3] text-[#a90d91]'"
	html = kwRegexp.ReplaceAllString(html, kwhtml)

	/* KeywordConstant */
	kcRegexp := regexp.MustCompile(`class="highlight-kc"`)
	kchtml := "class='dark:text-[#89DDFF] text-[#a90d91]'"
	html = kcRegexp.ReplaceAllString(html, kchtml)

	/* KeywordDeclaration */
	kdRegexp := regexp.MustCompile(`class="highlight-kd"`)
	kdhtml := "class='dark:text-[#BB80B3] text-[#a90d91]'"
	html = kdRegexp.ReplaceAllString(html, kdhtml)

	/* KeywordNamespace */
	knRegexp := regexp.MustCompile(`class="highlight-kn"`)
	knhtml := "class='dark:text-[#89DDFF] text-[#a90d91]'"
	html = knRegexp.ReplaceAllString(html, knhtml)

	/* KeywordPseudo */
	kpRegexp := regexp.MustCompile(`class="highlight-kp"`)
	kphtml := "class='dark:text-[#89DDFF] text-[#a90d91]'"
	html = kpRegexp.ReplaceAllString(html, kphtml)

	/* KeywordReserved */
	krRegexp := regexp.MustCompile(`class="highlight-kr"`)
	krhtml := "class='dark:text-[#BB80B3] text-[#a90d91]'"
	html = krRegexp.ReplaceAllString(html, krhtml)

	/* KeywordType */
	ktRegexp := regexp.MustCompile(`class="highlight-kt"`)
	kthtml := "class='dark:text-[#BB80B3] text-[#a90d91]'"
	html = ktRegexp.ReplaceAllString(html, kthtml)

	/* NameBuiltin */
	nbiRegexp := regexp.MustCompile(`class="highlight-nb"`)
	nbihtml := "class='dark:text-[#82AAFF] text-[#a90d91]'"
	html = nbiRegexp.ReplaceAllString(html, nbihtml)

	/* NameBuiltinPseudo */
	bpRegexp := regexp.MustCompile(`class="highlight-bp"`)
	bphtml := "class='dark:text-[#a167e6] text-[#5b269a]'"
	html = bpRegexp.ReplaceAllString(html, bphtml)

	/* NameClass */
	ncRegexp := regexp.MustCompile(`class="highlight-nc"`)
	nchtml := "class='dark:text-[#FFCB6B] text-[#3f6e75]'"
	html = ncRegexp.ReplaceAllString(html, nchtml)

	/* NameFunction */
	nfRegexp := regexp.MustCompile(`class="highlight-nf"`)
	nfhtml := "class='dark:text-[#82AAFF] text-[#000000]'"
	html = nfRegexp.ReplaceAllString(html, nfhtml)

	/* NameVariable */
	nvRegexp := regexp.MustCompile(`class="highlight-nv"`)
	nvhtml := "class='dark:text-[#89DDFF] text-[#000000]'"
	html = nvRegexp.ReplaceAllString(html, nvhtml)

	/* LiteralString */
	sRegexp := regexp.MustCompile(`class="highlight-s"`)
	shtml := "class='dark:text-[#fc6a5d] text-[#c41a16]'"
	html = sRegexp.ReplaceAllString(html, shtml)

	/* LiteralStringAffix */
	saRegexp := regexp.MustCompile(`class="highlight-sa"`)
	sahtml := "class='dark:text-[#BB80B3] text-[#c41a16]'"
	html = saRegexp.ReplaceAllString(html, sahtml)

	/* LiteralStringBacktick */
	sbRegexp := regexp.MustCompile(`class="highlight-sb"`)
	sbhtml := "class='dark:text-[#C3E88D] text-[#c41a16]'"
	html = sbRegexp.ReplaceAllString(html, sbhtml)

	/* LiteralStringChar */
	scRegexp := regexp.MustCompile(`class="highlight-sc"`)
	schtml := "class='dark:text-[#C3E88D] text-[#2300ce]'"
	html = scRegexp.ReplaceAllString(html, schtml)

	/* LiteralStringDelimiter */
	dlRegexp := regexp.MustCompile(`class="highlight-dl"`)
	dlhtml := "class='dark:text-[#EEFFFF] text-[#c41a16]'"
	html = dlRegexp.ReplaceAllString(html, dlhtml)

	/* LiteralStringDoc */
	sdRegexp := regexp.MustCompile(`class="highlight-sd"`)
	sdhtml := "class='dark:text-[#546E7A] text-[#c41a16] italic'"
	html = sdRegexp.ReplaceAllString(html, sdhtml)

	/* LiteralStringDouble */
	s2Regexp := regexp.MustCompile(`class="highlight-s2"`)
	s2html := "class='dark:text-[#C3E88D] text-[#c41a16]'"
	html = s2Regexp.ReplaceAllString(html, s2html)

	/* LiteralStringEscape */
	seRegexp := regexp.MustCompile(`class="highlight-se"`)
	sehtml := "class='dark:text-[#EEFFFF] text-[#c41a16]'"
	html = seRegexp.ReplaceAllString(html, sehtml)

	/* LiteralStringHeredoc */
	shRegexp := regexp.MustCompile(`class="highlight-sh"`)
	shhtml := "class='dark:text-[#C3E88D] text-[#c41a16]'"
	html = shRegexp.ReplaceAllString(html, shhtml)

	/* LiteralStringOther */
	sxRegexp := regexp.MustCompile(`class="highlight-sx"`)
	sxhtml := "class='dark:text-[#C3E88D] text-[#c41a16]'"
	html = sxRegexp.ReplaceAllString(html, sxhtml)

	/* LiteralStringRegex */
	srRegexp := regexp.MustCompile(`class="highlight-sr"`)
	srhtml := "class='dark:text-[#89DDFF] text-[#c41a16]'"
	html = srRegexp.ReplaceAllString(html, srhtml)

	/* LiteralStringSingle */
	s1Regexp := regexp.MustCompile(`class="highlight-s1"`)
	s1html := "class='dark:text-[#C3E88D] text-[#c41a16]'"
	html = s1Regexp.ReplaceAllString(html, s1html)

	/* LiteralStringSymbol */
	ssRegexp := regexp.MustCompile(`class="highlight-ss"`)
	sshtml := "class='dark:text-[#89DDFF] text-[#c41a16]'"
	html = ssRegexp.ReplaceAllString(html, sshtml)

	/* LiteralNumber */
	mRegexp := regexp.MustCompile(`class="highlight-m"`)
	mhtml := "class='dark:text-[#F78C6C] text-[#1c01ce]'"
	html = mRegexp.ReplaceAllString(html, mhtml)

	/* LiteralNumberBin */
	mbRegexp := regexp.MustCompile(`class="highlight-mb"`)
	mbhtml := "class='dark:text-[#F78C6C] text-[#1c01ce]'"
	html = mbRegexp.ReplaceAllString(html, mbhtml)

	/* LiteralNumberFloat */
	mfRegexp := regexp.MustCompile(`class="highlight-mf"`)
	mfhtml := "class='dark:text-[#F78C6C] text-[#1c01ce]'"
	html = mfRegexp.ReplaceAllString(html, mfhtml)

	/* LiteralNumberHex */
	mhRegexp := regexp.MustCompile(`class="highlight-mh"`)
	mhhtml := "class='dark:text-[#F78C6C] text-[#1c01ce]'"
	html = mhRegexp.ReplaceAllString(html, mhhtml)

	/* LiteralNumberInteger */
	miRegexp := regexp.MustCompile(`class="highlight-mi"`)
	mihtml := "class='dark:text-[#F78C6C] text-[#1c01ce]'"
	html = miRegexp.ReplaceAllString(html, mihtml)

	/* LiteralNumberIntegerLong */
	ilRegexp := regexp.MustCompile(`class="highlight-il"`)
	ilhtml := "class='dark:text-[#F78C6C] text-[#1c01ce]'"
	html = ilRegexp.ReplaceAllString(html, ilhtml)

	/* LiteralNumberOct */
	moRegexp := regexp.MustCompile(`class="highlight-mo"`)
	mohtml := "class='dark:text-[#F78C6C] text-[#1c01ce]'"
	html = moRegexp.ReplaceAllString(html, mohtml)

	/* Comment */
	cRegexp := regexp.MustCompile(`class="highlight-c"`)
	chtml := "class='dark:text-[#546E7A] text-[#177500]'"
	html = cRegexp.ReplaceAllString(html, chtml)

	/* CommentHashbang */
	chRegexp := regexp.MustCompile(`class="highlight-ch"`)
	chhtml := "class='dark:text-[#546E7A] text-[#177500]'"
	html = chRegexp.ReplaceAllString(html, chhtml)

	/* CommentMultiline */
	cmRegexp := regexp.MustCompile(`class="highlight-cm"`)
	cmhtml := "class='dark:text-[#546E7A] text-[#177500]'"
	html = cmRegexp.ReplaceAllString(html, cmhtml)

	/* CommentSingle */
	c1Regexp := regexp.MustCompile(`class="highlight-c1"`)
	c1html := "class='dark:text-[#546E7A] text-[#177500]'"
	html = c1Regexp.ReplaceAllString(html, c1html)

	/* CommentSpecial */
	csRegexp := regexp.MustCompile(`class="highlight-cs"`)
	cshtml := "class='dark:text-[#546E7A] text-[#177500] italic'"
	html = csRegexp.ReplaceAllString(html, cshtml)

	/* CommentPreproc */
	cpRegexp := regexp.MustCompile(`class="highlight-cp"`)
	cphtml := "class='dark:text-[#546E7A] text-[#633820]'"
	html = cpRegexp.ReplaceAllString(html, cphtml)

	/* CommentPreprocFile */
	cpfRegexp := regexp.MustCompile(`class="highlight-cpf"`)
	cpfhtml := "class='dark:text-[#546E7A] text-[#633820]'"
	html = cpfRegexp.ReplaceAllString(html, cpfhtml)

	/* Punctuation */
	pRegexp := regexp.MustCompile(`class="highlight-p"`)
	phtml := "class='dark:text-[#89DDFF]'"
	html = pRegexp.ReplaceAllString(html, phtml)

	/* Operator */
	oRegexp := regexp.MustCompile(`class="highlight-o"`)
	ohtml := "class='dark:text-[#89DDFF] text-[#000000]'"
	html = oRegexp.ReplaceAllString(html, ohtml)

	/* Generic */
	gRegexp := regexp.MustCompile(`class="highlight-g"`)
	ghtml := "class='dark:text-[#EEFFFF]'"
	html = gRegexp.ReplaceAllString(html, ghtml)

	/* Literal */
	lRegexp := regexp.MustCompile(`class="highlight-l"`)
	lhtml := "class='dark:text-[#C3E88D] text-[#1C01CE]'"
	html = lRegexp.ReplaceAllString(html, lhtml)

	return html
}

func Render(html string) string {
	h1Regexp := regexp.MustCompile(`<h1>`)
	h2Regexp := regexp.MustCompile(`<h2>`)
	h3Regexp := regexp.MustCompile(`<h3>`)
	h4Regexp := regexp.MustCompile(`<h4>`)
	h5Regexp := regexp.MustCompile(`<h5>`)
	h6Regexp := regexp.MustCompile(`<h6>`)
	pRegexp := regexp.MustCompile(`<p>`)
	ulRegexp := regexp.MustCompile(`<ul>`)
	olRegexp := regexp.MustCompile(`<ol>`)
	blockRegexp := regexp.MustCompile(`<blockquote>`)
	brRegexp := regexp.MustCompile(`<br />`)
	aRegexp := regexp.MustCompile(`(<a )(href="[^>]*">)`)
	spanmathRegexp := regexp.MustCompile(`(<span class="language-math">)(.*?)(</span>)`)
	blockmathRegexp := regexp.MustCompile(`(<div class="language-math">)(.*?)(</div>)`)
	codeRegexp := regexp.MustCompile(`(<pre.*><code class="language-)([a-zA-Z0-9]*)(.*?)">`)
	codeendRegexp := regexp.MustCompile(`</code></pre.*>`)

	h1html := "<h1 class='text-3xl font-black     text-slate-900 tracking-tight text-center dark:text-slate-200  pb-6 my-3'>"
	h2html := "<h2 class='text-2xl font-extrabold text-slate-900 tracking-tight             dark:text-slate-200  py-2'     >"
	h3html := "<h3 class='text-xl  font-extrabold	text-slate-900 tracking-tight             dark:text-slate-200  py-1.5'   >"
	h4html := "<h4 class='text-lg  font-bold	    text-slate-900 tracking-tight             dark:text-slate-200  py-1.5'   >"
	h5html := "<h5 class='text-base font-bold 	  text-slate-900 tracking-tight             dark:text-slate-200  py-1'     >"
	h6html := "<h6 class='text-base font-semibold	text-slate-900 tracking-tight             dark:text-slate-200  py-0.5'   >"
	phtml := "<p class='my-2 indent-8 text-base  text-slate-900 dark:text-slate-200'>"
	ulhtml := "<ul class='list-disc    list-inside mt-1 text-base text-slate-800 dark:text-slate-300 py-2 pl-4'>"
	olhtml := "<ol class='list-decimal list-inside mt-1 text-base text-slate-800 dark:text-slate-300 py-2 pl-4'>"
	blockhtml := "<blockquote class='border-l-8 px-2  my-3 mx-1 indent-8  py-0.5 border-sky-500 bg-slate-100 dark:bg-slate-800 rounded-md'>"
	ahtml := "<a class='text-sky-400 px-0.5 hover:decoration-sky-500 hover:text-sky-500 hover:decoration-2	hover:underline underline-offset-4' $2"
	brhtml := ""
	spanmathhtml := "<span class='overflow-x-auto  scrollbar-thin  scrollbar-thumb-rounded-md scrollbar-track-rounded-md  scrollbar-track-white scrollbar-thumb-slate-200 dark:scrollbar-track-slate-800 dark:scrollbar-thumb-slate-500'><span class='mathcode_inline'>$ $2 $</span></span>"
	blockmathhtml := "<div class='mathcode'><div class='overflow-x-auto overflow-y-hidden scrollbar-thin  scrollbar-thumb-rounded-md scrollbar-track-rounded-md scrollbar-track-white scrollbar-thumb-slate-200 dark:scrollbar-track-slate-800 dark:scrollbar-thumb-slate-500'> $$$ $2  $$$ </div></div>"

	codehtml := `
	<div class="relative z-10 mx-2 my-6 col-span-3 dark:bg-slate-800 bg-white font-semibold rounded-md shadow-lg  ring-1 ring-black/10 dark:ring-1 dark:ring-white/10 dark:ring-inset">
		<div class="relative flex text-slate-400 text-sm leading-6">
				<div class="mt-2 flex-none dark:text-sky-300 text-slate-800 border-t border-b border-t-transparent border-b-slate-600 dark:border-b-sky-300 px-4 py-1 flex items-center">
						language:$2
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
								scrollbar-track-white scrollbar-thumb-slate-200 
								dark:scrollbar-track-slate-800 dark:scrollbar-thumb-slate-500
		"><pre><code class="">`
	codeendhtml := "</code></pre></div></div>"
	html = h1Regexp.ReplaceAllString(html, h1html)
	html = h2Regexp.ReplaceAllString(html, h2html)
	html = h3Regexp.ReplaceAllString(html, h3html)
	html = h4Regexp.ReplaceAllString(html, h4html)
	html = h5Regexp.ReplaceAllString(html, h5html)
	html = h6Regexp.ReplaceAllString(html, h6html)
	html = pRegexp.ReplaceAllString(html, phtml)
	html = ulRegexp.ReplaceAllString(html, ulhtml)
	html = olRegexp.ReplaceAllString(html, olhtml)
	html = blockRegexp.ReplaceAllString(html, blockhtml)
	html = aRegexp.ReplaceAllString(html, ahtml)
	html = brRegexp.ReplaceAllString(html, brhtml)
	html = spanmathRegexp.ReplaceAllString(html, spanmathhtml)
	html = blockmathRegexp.ReplaceAllString(html, blockmathhtml)
	html = codeRegexp.ReplaceAllString(html, codehtml)
	html = codeendRegexp.ReplaceAllString(html, codeendhtml)

	html = RenderHightLight(html)
	return html
}
