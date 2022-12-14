import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials';
// import { compare } from 'bcryptjs';
export const authOptions: NextAuthOptions  = {
    providers : [
    CredentialsProvider({
            credentials: {
                username: {label: "username", type: "text", placeholder: "username"},
                password: { label: "password ", type: "text", placeholder: "password" },
            },
            name : "Credentials",
        async authorize(credentials) {


            const https = require('https');
            
            const httpsAgent = new https.Agent({
                  rejectUnauthorized: false,
            });
            
            const options = {
                method: "POST",
                headers : { 'Content-Type': 'application/json'},
                body: JSON.stringify(credentials),
                agent: httpsAgent,
            }
            const res = await fetch('https://0.0.0.0:8080/users/login', options)
            const result = await res.json()
            if (!result) {
                throw new Error("something wrong may net work not connected")
            }
            if (result.error) {
                throw new Error(result.error)
            }
            let user = {
                id:result.user.id,
                session_id: result.session_id as string,
                access_token: result.access_token as string,
                access_token_expires_at: new Date(result.access_token_expires_at).getTime(),
                refresh_token: result.refresh_token as string,
                refresh_token_expires_at: new Date(result.refresh_token_expires_at).getTime(),
                username: result.user.username as string,
                email: result.user.email as string,
                created_at: result.user.created_at as string,
                user_id:result.user.id as string,
            }
            return user;
            }
        })
    ],
    secret: "XH6bp/TkLvnUkQiPDEZNyHc0CV+VV5RL/n+HdVHoHN0=",
    session: {
        strategy: 'jwt', // 如果这里设置的不是 jwt，那么 jwt 回调函数不会触发
    },
    callbacks: {
        
        // token 一开始没有，user 有；返回的是token
        async jwt({ token, user }) {
            // console.log("mydebug jwt callback:token:", token)
            // console.log("mydebug jwt callback:user:",user)
            // Initial sign in
            if (user) {
                return {
                    access_token: user.access_token,
                    accessTokenExpires: user.access_token_expires_at,
                    refresh_token: user.refresh_token,
                    refresh_token_expires_at:user.refresh_token_expires_at,
                    username: user.username,
                    email: user.email,
                    user_id:user.user_id,
                }
            }
            
            // Return previous token if the access token has not expired yet
            if (Date.now() < token.accessTokenExpires) {
                return token
            }
            // Access token has expired, try to update it
            return refreshAccessToken(token)
        },
            
        // 1. getsession 会调用这个，不过之前先call jwt，更新token，默认是有user{},expires
        async session({ session, token }) {
            session.access_token = token.access_token as string
            session.expires = token.refresh_token_expires_at as string
            session.username = token.username as string
            session.email = token.email as string
            session.user_id = token.user_id as string
            return session
        }
    }
}

export default NextAuth(authOptions);
async function refreshAccessToken(token) {

    const https = require('https');
            
    const httpsAgent = new https.Agent({
          rejectUnauthorized: false,
    });
    const options = {
        method: "POST",
        headers : { 'Content-Type': 'application/json'},
        body: JSON.stringify(token),
        agent:httpsAgent
    }

    const result = await fetch('https://localhost:8080/tokens/renew_access', options)
        .then(res => res.json())
    // console.log("mydebug refresh callback result:",result)

    if (!result) {
        return {
            ...token,
            error: 'RefreshAccessTokenError'
        }
    }
    token.access_token = result.access_token
    token.accessTokenExpires = new Date(result.access_token_expires_at).getTime()
    return {
        ...token,
    }

}