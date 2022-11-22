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
                return result.user;
            }
        })
    ],
    secret: "XH6bp/TkLvnUkQiPDEZNyHc0CV+VV5RL/n+HdVHoHN0=",
    session: {
        strategy: 'jwt',
    }
})