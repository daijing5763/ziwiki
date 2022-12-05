import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
// import { compare } from 'bcryptjs';

export default NextAuth({
    providers : [
        // Google Provider
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        CredentialsProvider({
            name : "Credentials",
            async authorize(credentials, req) {
                const options = {
                    method: "POST",
                    headers : { 'Content-Type': 'application/json'},
                    body: JSON.stringify(credentials)
                }

                const result = await fetch('http://0.0.0.0:8080/users/login', options).then(res=>res.json())
                if (!result) {
                    throw new Error("something wrong may net work not connected")
                }
                if (result.error) {
                    throw new Error(result.error)
                }

                const user = {
                    "session_id": result.session_id,
                    "access_token": result.access_token,
                    "access_token_expires_at": result.access_token_expires_at,
                    "refresh_token": result.refresh_token,
                    "refresh_token_expires_at": result.refresh_token_expires_at,
                    "username": result.user.username,
                    "email": result.user.email,
                    "created_at": result.user.created_at,
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
            console.log("token:",token)
            // Initial sign in
            if (user) {
                return {
                    access_token: user.access_token,
                    accessTokenExpires: user.access_token_expires_at,
                    refresh_token: user.refresh_token,
                    refresh_token_expires_at:user.refresh_token_expires_at,
                    username: user.username,
                    email: user.email,
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
            console.log("session called")
            session.access_token = token.access_token
            session.error = token.error
            session.expires = token.refresh_token_expires_at
            session.username = token.username
            session.email = token.email
            return session
        }
    }
})
async function refreshAccessToken(token) {
    const options = {
        method: "POST",
        headers : { 'Content-Type': 'application/json'},
        body: JSON.stringify(token)
    }

    const result = await fetch('http://0.0.0.0:8080/tokens/renew_access', options)
        .then(res => res.json())
    console.log("result is:",result)

    if (!result) {
        return {
            ...token,
            error: 'RefreshAccessTokenError'
        }
    }
    token.access_token = result.access_token
    token.accessTokenExpires = result.access_token_expires_at
    return {
        ...token,
    }
    
}