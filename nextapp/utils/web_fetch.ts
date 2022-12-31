import { backend_base_url,server_side_url,use_https_url,geo_key } from "./env_variable"

async function fetch_post(values, url: string, access_token: string) {
  if (use_https_url == "false"){
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
      body: JSON.stringify(values),
    }
    const response = await fetch(url, options)
    const data = await response.json();
    return data;
  } else {
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
interface mdrepo {
  plainto_tsquery: string;
  repo_id:number
}
export async function fetch_markdown_repo(values:mdrepo, access_token: string) {
  return fetch_post(values,`${backend_base_url}query_markdown_repo`,access_token)
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
export async function fetch_list_users(values: { [key: string]: string }, access_token: string) {
  return fetch_post(values,`${backend_base_url}list_users`,access_token)
}
export async function fetch_user_info(values: { [key: string]: string }, access_token: string) {
  return fetch_post(values,`${backend_base_url}user_info`,access_token)
}
export async function fetch_ban_user(values, access_token: string) {
  return fetch_post(values,`${backend_base_url}ban_user`,access_token)
}
export async function fetch_update_user(values, access_token: string) {
  return fetch_post(values,`${backend_base_url}update_user`,access_token)
}

export async function fetch_list_sessions(values: { [key: string]: string }, access_token: string) {
  return fetch_post(values,`${backend_base_url}list_sessions`,access_token)
}
export async function fetch_list_active_sessions(values: { [key: string]: string }, access_token: string) {
  return fetch_post(values,`${backend_base_url}list_active_sessions`,access_token)
}
export async function fetch_ban_session(values, access_token: string) {
  return fetch_post(values,`${backend_base_url}ban_session`,access_token)
}



export async function fetch_geo(ip) {
  const options = {
    method: "GET",
  }
  
  var url = `http://ip-api.com/json/${ip}`
  if (use_https_url != "false") {
    url = `https://api.ipgeolocation.io/ipgeo?apiKey=${geo_key}&ip=${ip}`
  }
  const response = await fetch(url, options)
  const data = await response.json();
  return data;
}

export function fetch_upload(values, access_token) {
  let formdata = new FormData()
  formdata.append("file",values.file)
  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${access_token}`
    },
    body:formdata
  }
  fetch(`${backend_base_url}upload`,options)
}