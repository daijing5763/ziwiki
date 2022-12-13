import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    session_id: string 
    access_token: string,
    access_token_expires_at : number,
    refresh_token: string
    refresh_token_expires_at: number,
    username:string,
    email:string,
    created_at: string,
    user_id:string,
  }
}


declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    access_token: string
    username: string
    email: string
    user_id:string
    user: {
      /** The user's postal address. */
      address: string
    }
  }
}

