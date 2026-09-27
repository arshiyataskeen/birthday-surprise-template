import 'server-only';
export function configured(){return !!(process.env.SUPABASE_URL&&process.env.SUPABASE_SERVICE_ROLE_KEY);}
export async function supabase(path:string,init:RequestInit={}){
 const url=process.env.SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key)throw Error('Configure Supabase environment variables. See README.');
 return fetch(url.replace(/\/$/,'')+path,{...init,cache:'no-store',headers:{apikey:key,Authorization:`Bearer ${key}`,...init.headers}});
}
