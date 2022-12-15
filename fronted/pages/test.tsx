import { backend_base_url } from "../utils/env_variable"
export default function name() {
  return (
    <div>
      hello::{backend_base_url}
    </div>
  )
}

export async function getStaticProps() {
  // Using the variables below in the browser will return `undefined`. Next.js doesn't
  // expose environment variables unless they start with `NEXT_PUBLIC_`
  console.log('[Node.js only] ENV_VARIABLE:', process.env.ENV_VARIABLE)
  console.log(
    '[Node.js only] ENV_LOCAL_VARIABLE:',
    process.env.ENV_LOCAL_VARIABLE
  )
  return { props: {} }
}