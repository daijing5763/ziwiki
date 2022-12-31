import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials';
import {fetch_renew_access,fetch_login} from "../../../utils/web_fetch"
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                id: { label: "id", type: "text",  },
                session_id: { label: "session_id", type: "text", },
                access_token: { label: "access_token", type: "text", },
                access_token_expires_at: { label: "access_token_expires_at", type: "text",  },
                refresh_token: { label: "refresh_token", type: "text", },
                refresh_token_expires_at: { label: "refresh_token_expires_at", type: "text", },
                username: { label: "username", type: "text", },
                email: { label: "email", type: "text",  },
                created_at: { label: "created_at", type: "text",  },
                user_id: { label: "user_id", type: "text",  },
            },
            name: "Credentials",
            async authorize(credentials) {
                let user = {
                    id: credentials.id,
                    session_id: credentials.session_id as string,
                    access_token: credentials.access_token as string,
                    access_token_expires_at: new Date(credentials.access_token_expires_at).getTime(),
                    refresh_token: credentials.refresh_token as string,
                    refresh_token_expires_at: new Date(credentials.refresh_token_expires_at).getTime(),
                    username: credentials.username as string,
                    email: credentials.email as string,
                    created_at: credentials.created_at as string,
                    user_id: credentials.id as string,
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
                    refresh_token_expires_at: user.refresh_token_expires_at,
                    username: user.username,
                    email: user.email,
                    user_id: user.user_id,
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
    const result = await fetch_renew_access(token, '')
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