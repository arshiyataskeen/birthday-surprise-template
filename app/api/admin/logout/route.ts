import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import {sameOrigin,SESSION_COOKIE} from '@/lib/auth';
import {supabase} from '@/lib/supabase';
export async function POST(req:Request){if(!sameOrigin(req))return new Response('Invalid origin',{status:403});const jar=await cookies(),token=jar.get(SESSION_COOKIE)?.value;if(token)try{await supabase('/auth/v1/logout',{method:'POST',headers:{Authorization:`Bearer ${token}`}});}catch{}const response=NextResponse.redirect(new URL('/admin/login',req.url),303);response.cookies.set(SESSION_COOKIE,'',{path:'/',maxAge:0});return response;}
