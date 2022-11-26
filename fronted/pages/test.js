import CreateRepo from '../components/createrepo'
import { Fragment, useRef, useState } from 'react'
export default function Example() {
  const [open, setOpen] = useState(false)
  function  updateOpen() {
    setOpen(!open)
  }
  return (
    <div>
      <button onClick={updateOpen}>open table</button>
      <CreateRepo open={open} setOpen={setOpen} />
    </div>
   
  )
}