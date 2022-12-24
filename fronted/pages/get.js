export default function js() {
  // function get(ctrl) {
  //   // var element = document.getElementById('txt');
  //   // var text = element.innerText || element.textContent;
  //   // console.log(text)
  //   console.log("ctrl:", ctrl)
  //   // var TextInsideLi = ctrl.getElementsByTagName('span')
  //   // console.log(TextInsideLi)

  //   var TextInsideLi = ctrl.getElementsByTagName('p')[0].innerHTML;

  // }
  function myfunction(ctrl) {
    var text = ctrl.target.innerText || ctrl.target.textContent;
    console.log(text)
    // var TextInsideLi = ctrl.getElementsByTagName('p')[0].innerHTML;
  }
  return (
    <div>
      {/* <div onClick={myfunction}> click it
      
      <p id='txt' >
      <span className="A">I am</span>
      <span className="B">working in </span>
      <span className="C">ABC company.</span>
      </p>
      
      </div>
<ul>
        <li onClick={myfunction}>
    <span></span>
    <p>This Text</p>
  </li>
      </ul>
       */}
<div onClick={myfunction}>click it

      <code className='c++' ><span className="flex"><span className="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700"> 1</span><span className="cl"><span className="dark:text-[#EEFFFF] text-[#000000]">std</span><span className="dark:text-[#89DDFF] text-[#000000]">::</span><span className="dark:text-[#EEFFFF] text-[#000000]">atomic_size_t</span> <span className="dark:text-[#EEFFFF] text-[#000000]">curr_idx</span> <span className="dark:text-[#89DDFF] text-[#000000]">=</span> <span className="dark:text-[#F78C6C] text-[#1c01ce]">0</span><span className="dark:text-[#89DDFF]">;</span>
</span></span><span className="flex"><span className="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700"> 2</span><span className="cl">
</span></span><span className="flex"><span className="whitespace-pre select-none mr-1.5 px-1.5 dark:text-slate-400 text-slate-700"> 3</span><span className="cl"><span className="dark:text-[#EEFFFF] text-[#000000]">std</span><span className="dark:text-[#89DDFF] text-[#000000]">::</span><span className="dark:text-[#EEFFFF] text-[#000000]">vector</span><span className="dark:text-[#89DDFF] text-[#000000]">&lt;</span><span className="dark:text-[#EEFFFF] text-[#000000]">std</span><span className="dark:text-[#89DDFF] text-[#000000]">::</span><span className="dark:text-[#EEFFFF] text-[#000000]">shared_ptr</span><span className="dark:text-[#89DDFF] text-[#000000]">&lt;</span><span className="dark:text-[#EEFFFF] text-[#000000]">Obj</span><span className="dark:text-[#89DDFF] text-[#000000]">&gt;&gt;</span> <span className="dark:text-[#EEFFFF] text-[#000000]">obj_buffers</span><span className="dark:text-[#89DDFF]">;</span>
</span></span></code>
</div>



    </div>

  )
}





