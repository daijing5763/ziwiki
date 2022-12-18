import { backend_base_url } from "./env_variable"

async function fetch_post(values: { [key: string]: string },url:string,access_token:string) {
  const options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    },
    body: JSON.stringify(values)
  }
  const response = await fetch(url, options)
  const data = await response.json();
  return data;
}

export async function fetch_repo_info(values: { [key: string]: string }, access_token: string) {
  return fetch_post(values,`${backend_base_url}get_repo`,access_token)
}

export async function fetch_markdown(values: { [key: string]: string }, access_token: string) {
  return fetch_post(values,`${backend_base_url}get_markdown`,access_token)
}

export async function fetch_markdown_user(values: { [key: string]: string }, access_token: string) {
  return fetch_post(values,`${backend_base_url}query_markdown_user`,access_token)
}