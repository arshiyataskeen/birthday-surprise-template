import 'server-only';
import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import {supabase,configured} from './supabase';
export const SESSION_COOKIE='birthday-admin';
export async function getAdminUser(){
 if(!configured()||!process.env.ADMIN_EMAIL)return null;
 const token=(await cookies()).get(SESSION_COOKIE)?.value;if(!token)return null;
 try{const r=await supabase('/auth/v1/user',{headers:{Authorization:`Bearer ${token}`}});if(!r.ok)return null;const u=await r.json();if(u.email?.toLowerCase()!==process.env.ADMIN_EMAIL.toLowerCase())return null;return {userId:u.id,email:u.email};}catch{return null;}
}
export async function requireAdmin(){if(!await getAdminUser())redirect('/admin/login');}
export function sameOrigin(req:Request){return req.headers.get('origin')===new URL(req.url).origin;}
