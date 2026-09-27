export const dynamic='force-dynamic';
import {mergeContent} from '@/app/defaults';
import {record,defaults} from '@/lib/content';
export async function GET(){try{const r=await record();const saved=r?JSON.parse(r.data):{};return Response.json({data:mergeContent(saved)});}catch(e){console.error(e);return Response.json({error:'Your memories could not be loaded. Please try again.'},{status:503});}}
