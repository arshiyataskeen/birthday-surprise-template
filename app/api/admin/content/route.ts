import {mergeContent} from '@/app/defaults';
import {chapters} from '@/app/story-data';
import { getAdminUser } from '@/lib/auth';
import { saveContent, record, defaults } from '@/lib/content';
export async function GET(){
 const user=await getAdminUser();if(!user)return Response.json({error:'Please sign in to edit.'},{status:401});
 try{const r=await record();if(r&&r.owner!==user.userId)return Response.json({error:'Only the page owner can open this studio.'},{status:403});const saved=r?JSON.parse(r.data):{};return Response.json({data:mergeContent(saved),canEdit:true});}catch(e){console.error(e);return Response.json({error:'Your page could not be loaded. Please try again.'},{status:503});}
}
export async function POST(req: Request) {
 const u = await getAdminUser(); if (!u) return Response.json({error:'Please sign in to edit.'},{status:401});
 if (req.headers.get('origin') !== new URL(req.url).origin) return Response.json({error:'Invalid request origin.'},{status:403});
 try { const data: any = await req.json();
 if (!data || typeof data.name !== 'string' || !data.name.trim() || data.name.length > 80 || typeof data.letter !== 'string' || data.letter.length > 10000 || typeof data.intro !== 'string' || data.intro.length > 500 || typeof data.signature !== 'string' || data.signature.length > 200 || typeof data.birthday !== 'string' || !Array.isArray(data.memories) || data.memories.length > 100) return Response.json({error:'Please check your details and keep the album under 100 photos.'},{status:400});
 for (const m of data.memories) if(typeof m.id !== 'string' || !/^[a-zA-Z0-9-]+$/.test(m.id) || typeof m.title !== 'string' || m.title.length>200 || typeof m.caption !== 'string' || m.caption.length>2000 || typeof m.date !== 'string' || (m.chapter !== undefined && (typeof m.chapter !== 'string' || m.chapter.length > 40))) return Response.json({error:'Please check your memory details.'},{status:400});
 if(data.welcome!==undefined){
 if(!data.welcome||typeof data.welcome!=='object'||Array.isArray(data.welcome))return Response.json({error:'Please check the welcome screen text.'},{status:400});
 for(const key of Object.keys(defaults.welcome)){if(typeof data.welcome[key]!=='string'||!data.welcome[key].trim()||data.welcome[key].length>(['prompt','noMessage'].includes(key)?500:120))return Response.json({error:'Fill in each welcome field and keep headings under 120 characters.'},{status:400});}
 }
 if(data.welcomeMedia!==undefined){const m=data.welcomeMedia;if(!m||!['pink','classic','original','upload'].includes(m.mode)||!['float','sway','none'].includes(m.motion)||typeof m.imageId!=='string'||(m.imageId&&!/^[a-zA-Z0-9-]+$/.test(m.imageId))||(m.mode==='upload'&&!m.imageId))return Response.json({error:'Please choose a welcome image and animation.'},{status:400});}
 if(data.surprises!==undefined){
 for(const kind of ['story','letter','gift'] as const){const value=data.surprises?.[kind];if(!value||typeof value!=='object'||Array.isArray(value))return Response.json({error:'Please check all three surprises.'},{status:400});
 for(const key of Object.keys(defaults.surprises[kind])){const v=value[key];if(typeof v!=='string'||v.length>(['message','giftMessage'].includes(key)?2000:500))return Response.json({error:'Please check your surprise text.'},{status:400});}
 if(value.imageId&&!/^[a-zA-Z0-9-]+$/.test(value.imageId))return Response.json({error:'Invalid surprise image.'},{status:400});
 if(kind==='gift'&&value.giftUrl){try{const url=new URL(value.giftUrl);if(!['https:','http:'].includes(url.protocol))throw Error();}catch{return Response.json({error:'Use a complete https:// gift link.'},{status:400});}}
 }
 }
 if(data.chapterEdits !== undefined){
 if(!data.chapterEdits || typeof data.chapterEdits !== 'object' || Array.isArray(data.chapterEdits) || Object.keys(data.chapterEdits).length>14)return Response.json({error:'Invalid story changes.'},{status:400});
 for(const [id,edit] of Object.entries(data.chapterEdits) as [string,any][]){if(!chapters.some(c=>c.id===id)||!edit||typeof edit.title!=='string'||!edit.title.trim()||edit.title.length>200||typeof edit.place!=='string'||edit.place.length>200||typeof edit.caption!=='string'||edit.caption.length>2000||typeof edit.note!=='string'||edit.note.length>300)return Response.json({error:'Please check your chapter text.'},{status:400});}
 }
 const r = await record(); if (r && r.owner !== u.userId) return Response.json({error:'Only the birthday page owner can edit.'},{status:403});
 await saveContent(u.userId,data);
 return Response.json({ok:true});
 } catch(e) {console.error(e); return Response.json({error:'Could not save. Your changes are still here—please try again.'},{status:503});}
}
