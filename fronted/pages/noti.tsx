import React from 'react';
import { toast } from 'react-toastify';

export default function Example(){
  const toastId = React.useRef(null);

  const notify = () => {
    toastId.current = toast("Hello", {
      autoClose: false,
      closeButton: false // Remove the closeButton
    });
  }

  const update = () => {
    toast.update(toastId.current, {
      type: toast.TYPE.INFO,
      autoClose: 5000,
      closeButton: null // The closeButton defined on ToastContainer will be used
    });
  }

  return (
    <div>
      <button onClick={notify}>Notify</button>
      <button onClick={update}>Update</button>
    </div>
  );
}