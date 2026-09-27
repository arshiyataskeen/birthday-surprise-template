import {configured,supabase} from './supabase';
export {defaults} from '@/app/defaults';
export async function record(){
 if(!configured())return null;
 const r=await supabase('/rest/v1/birthday_content?id=eq.birthday&select=owner,data');
 if(!r.ok)throw Error('Content could not be loaded');
 const rows=await r.json();return rows[0]?{owner:rows[0].owner,data:JSON.stringify(rows[0].data)}:null;
}
export async function saveContent(owner:string,data:unknown){
 const r=await supabase('/rest/v1/birthday_content?on_conflict=id',{method:'POST',headers:{'Content-Type':'application/json',Prefer:'resolution=merge-duplicates'},body:JSON.stringify({id:'birthday',owner,data})});
 if(!r.ok)throw Error('Content could not be saved');
}
export function bucket(){return {
 async get(id:string){const r=await supabase('/storage/v1/object/birthday-media/'+id);if(r.status===404||r.status===400)return null;if(!r.ok)throw Error('Image unavailable');return {body:r.body,httpMetadata:{contentType:r.headers.get('content-type')}};},
 async put(id:string,bytes:ArrayBuffer,options:{httpMetadata:{contentType:string}}){const r=await supabase('/storage/v1/object/birthday-media/'+id,{method:'POST',headers:{'Content-Type':options.httpMetadata.contentType,'x-upsert':'true'},body:bytes});if(!r.ok)throw Error('Image upload failed');}
};}
