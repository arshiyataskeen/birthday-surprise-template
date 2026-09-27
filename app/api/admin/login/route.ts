import {NextResponse} from 'next/server';
import {sameOrigin,SESSION_COOKIE} from '@/lib/auth';
import {supabase,configured} from '@/lib/supabase';
export async function POST(req:Request){
 if(!sameOrigin(req))return NextResponse.json({error:'Invalid origin'},{status:403});
 if(!configured()||!process.env.ADMIN_EMAIL)return NextResponse.json({error:'Admin setup is incomplete. Follow README.'},{status:503});
 try{const {email,password}=await req.json();if(typeof email!=='string'||typeof password!=='string'||email.length>254||password.length>1024)return NextResponse.json({error:'Invalid credentials'},{status:400});
 const r=await supabase('/auth/v1/token?grant_type=password',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})});const data=await r.json();
 if(!r.ok||data.user?.email?.toLowerCase()!==process.env.ADMIN_EMAIL.toLowerCase())return NextResponse.json({error:'Invalid admin credentials. Please try again.'},{status:r.status===429?429:401});
 const response=NextResponse.json({ok:true});response.cookies.set(SESSION_COOKIE,data.access_token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/',maxAge:Math.min(data.expires_in||3600,3600)});return response;
 }catch{return NextResponse.json({error:'Could not sign in. Try again.'},{status:503});}
}
