import { getAdminUser } from '@/lib/auth';
import { record, bucket } from '@/lib/content';
export async function GET(req:Request,{params}:any) { try {const {id}=await params; if(!/^[a-zA-Z0-9-]+$/.test(id)) return new Response('Not found',{status:404}); const obj=await bucket().get(id); if(!obj)return new Response('Not found',{status:404}); return new Response(obj.body,{headers:{'Content-Type':obj.httpMetadata?.contentType || 'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':'private, max-age=3600'}});}catch {return new Response('Photo unavailable',{status:503});}}
export async function POST(req:Request,{params}:any){
 const u=await getAdminUser(); if(!u)return Response.json({error:'Please sign in.'},{status:401});
 if(req.headers.get('origin')!==new URL(req.url).origin)return Response.json({error:'Invalid request.'},{status:403});
 try {const r=await record(); if(!r || r.owner!==u.userId)return Response.json({error:'Save your birthday details before uploading.'},{status:403});
 const {id}=await params; if(!/^[a-zA-Z0-9-]+$/.test(id))return Response.json({error:'Invalid photo.'},{status:400});
 const type=req.headers.get('content-type')||''; if(!['image/jpeg','image/png','image/webp','image/gif'].includes(type))return Response.json({error:'Choose a JPG, PNG, WebP or GIF.'},{status:400});
 const bytes=await req.arrayBuffer(); if(bytes.byteLength>4*1024*1024)return Response.json({error:'Choose an image smaller than 4 MB.'},{status:400});
 await bucket().put(id,bytes,{httpMetadata:{contentType:type}});return Response.json({ok:true});
 }catch(e){console.error(e);return Response.json({error:'Upload failed. Please try again.'},{status:503});}
}
