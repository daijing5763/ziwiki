import { backend_base_url,server_side_url } from "./env_variable"


async function fetch_post(values: { [key: string]: string }, url: string, access_token: string) {
  const https = require('https');
  const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
  });
  const options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    },
    body: JSON.stringify(values),
    agent: httpsAgent
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

export async function fetch_repo_list(values: { [key: string]: string }, access_token: string) {
  return fetch_post(values,`${backend_base_url}get_repo_list`,access_token)
}
export async function fetch_sync_repo(values: { [key: string]: string }, access_token: string) {
  return fetch_post(values,`${backend_base_url}pull_repo`,access_token)
}

export async function fetch_delete_repo(values: { [key: string]: string }, access_token: string) {
  return fetch_post(values,`${backend_base_url}delete_repo`,access_token)
}
export async function fetch_update_repo(values: { [key: string]: string }, access_token: string) {
  return fetch_post(values,`${backend_base_url}update_repo`,access_token)
}
export async function fetch_renew_access(values: { [key: string]: string }, access_token: string) {
  return fetch_post(values,`${server_side_url}tokens/renew_access`,access_token)
}
export async function fetch_login(values: { [key: string]: string }, access_token: string) {
  return fetch_post(values,`${server_side_url}users/login`,access_token)
}
export async function fetch_create_repo(values: { [key: string]: string }, access_token: string) {
  return fetch_post(values,`${backend_base_url}create_repo`,access_token)
}

export async function fetch_pull_repo(values: { [key: string]: string }, access_token: string) {
  return fetch_post(values,`${backend_base_url}pull_repo`,access_token)
}

export async function fetch_register(values: { [key: string]: string }, access_token: string) {
  return fetch_post(values,`${backend_base_url}users`,access_token)
}