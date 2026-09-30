'use client';
import {useEffect,useMemo,useState} from 'react';
import {ArrowRight,RotateCcw,Heart,Layers,Utensils,Flower2,Waves,CloudRain,ChefHat,Footprints,Phone,Bike,Hotel,Gift,Sparkles,House,Camera} from 'lucide-react';
import {chapters,type StoryPhoto} from './story-data';
import {defaults,type ChapterEdit} from './defaults';
import AnimatedTeddy from './animated-teddy';
const icons:any={cards:Layers,food:Utensils,flower:Flower2,waves:Waves,rain:CloudRain,cooking:ChefHat,steps:Footprints,care:Phone,rides:Bike,holiday:Hotel,gift:Gift,magic:Sparkles,family:House,photo:Camera};
type Scene={key:string;kind:'memory'|'letter'|'ending';title:string;caption:string;place:string;note:string;icon:string;art?:string;photos:StoryPhoto[];duration:number};
function readingTime(text:string){return Math.max(4200,Math.min(8000,text.split(/\s+/).length*150+1000));}
export default function StoryPlayer({data,onNext,mode}:{data:{name:string;memories:StoryPhoto[];letter:string;signature:string;chapterEdits?:Record<string,ChapterEdit>;surprises:typeof defaults.surprises};onNext?:()=>void;mode:'memory'|'letter'|'ending'}){
const [failedImages,setFailedImages]=useState<string[]>([]);
const [index,setIndex]=useState(0),[elapsed,setElapsed]=useState(0),[hidden,setHidden]=useState(false);
const scenes=useMemo(()=>{
 const letter=data.surprises.letter,gift=data.surprises.gift;
 const image=(id:string,title:string)=>id?[{id,title,caption:'',date:''}]:[];
 const all:Scene[]=chapters.map(original=>{const c={...original,...data.chapterEdits?.[original.id]};return {...c,key:c.id,kind:'memory',photos:data.memories.filter(p=>p.chapter===c.id),duration:readingTime(c.caption+' '+c.note)};});
 data.memories.filter(p=>!chapters.some(c=>c.id===p.chapter)).forEach(p=>all.push({key:p.id,kind:'memory',title:p.title,caption:p.caption,place:p.date||'ONE MORE LITTLE MEMORY',note:'One more moment we get to keep.',icon:'photo',photos:[p],duration:readingTime(p.caption)}));
 const pages=data.letter.match(/[\s\S]{1,380}(?:\s|$)|[\s\S]{1,380}/g)||['Happy birthday. I’m so glad you exist.'];
 pages.forEach((p,n)=>all.push({key:'letter-'+n,kind:'letter',title:n===0?letter.heading.replace('{name}',data.name):'And another thing…',caption:p,place:letter.eyebrow,note:n===pages.length-1?data.signature+' ♡':'',icon:'care',photos:image(letter.imageId,letter.title),duration:readingTime(p)}));
 all.push({key:'ending',kind:'ending',title:gift.heading,caption:gift.message,place:gift.eyebrow.replace('{name}',data.name),note:gift.note,icon:'gift',photos:image(gift.imageId,gift.giftName||gift.title),duration:6000});
 return all.filter(s=>s.kind===mode);
},[data,mode]);
const scene=scenes[index],done=index===scenes.length-1&&elapsed>=scene.duration;
useEffect(()=>{const update=()=>setHidden(document.hidden);document.addEventListener('visibilitychange',update);return()=>document.removeEventListener('visibilitychange',update);},[]);
useEffect(()=>{if(hidden||done)return;let last=performance.now();const timer=window.setInterval(()=>{const now=performance.now();setElapsed(v=>Math.min(scene.duration,v+Math.min(now-last,250)));last=now;},50);return()=>clearInterval(timer);},[hidden,done,scene.duration,index]);
useEffect(()=>{if(elapsed>=scene.duration&&index<scenes.length-1){setIndex(i=>i+1);setElapsed(0);}},[elapsed,index,scene.duration,scenes.length]);
const photo=scene.photos.length?scene.photos[Math.min(scene.photos.length-1,Math.floor(elapsed/scene.duration*scene.photos.length))]:null;
const photoSrc=photo?'/api/photos/'+photo.id:'';
const artSrc=scene.art?'/story/'+scene.art+'.png':'';
const showPhoto=!!photo&&!failedImages.includes(photoSrc),showArt=!!scene.art&&!failedImages.includes(artSrc);
const Icon=icons[scene.icon]||Heart;
return <div className={'story-cinema '+(hidden?'cinema-paused':'')}><div className="cinema-status"><span>{(mode==='memory'?data.surprises.story.title:mode==='letter'?data.surprises.letter.title:data.surprises.gift.title).toUpperCase()}</span><span>{String(index+1).padStart(2,'0')} / {scenes.length}</span></div><div className="cinema-timeline" aria-label={`Story scene ${index+1} of ${scenes.length}`}>{scenes.map((s,i)=><button key={s.key} aria-label={`Go to scene ${i+1}: ${s.title}`} aria-current={index===i?"step":undefined} onClick={()=>{setIndex(i);setElapsed(0);}}><i style={{width:i<index?'100%':i===index?`${elapsed/scene.duration*100}%`:'0%'}}/></button>)}</div>
<section className={'cinema-scene scene-'+scene.icon+' scene-kind-'+scene.kind} key={scene.key}><div className="cinema-visual">{showPhoto?<img className="cinema-photo" src={photoSrc} alt={photo!.title} onError={()=>setFailedImages(v=>[...v,photoSrc])}/>:showArt?<img className="cinema-photo illustrated-scene" src={artSrc} alt={scene.title} onError={()=>setFailedImages(v=>[...v,artSrc])}/>:<><div className="cinema-orbit"><Icon size={68} strokeWidth={1.5}/></div><AnimatedTeddy mood={scene.kind==='ending'?'celebrate':'wave'} paused={hidden}/><div className="scene-symbols" aria-hidden="true"><Icon/><Heart/><Sparkles/></div></>}{(showPhoto||showArt)&&<div className="teddy-narrator"><AnimatedTeddy paused={hidden}/></div>}<span className="visual-sticker">{scene.kind==='ending'?'to be continued ♡':scene.kind==='letter'?'from the heart ♡':'a memory worth keeping ♡'}</span></div><div className="cinema-copy"><span className="cinema-place">{scene.place}</span><h1>{scene.title}</h1><p className={scene.kind==='letter'?'cinema-letter':''}>{scene.caption}</p><div className={'cinema-secret '+(elapsed>900?'visible':'')}><Heart size={16}/><span>{scene.note}</span></div>{scene.kind==='ending'&&<div className="gift-details">{data.surprises.gift.giftName&&<h2>{data.surprises.gift.giftName}</h2>}{data.surprises.gift.giftMessage&&<p>{data.surprises.gift.giftMessage}</p>}{data.surprises.gift.giftUrl&&<a className="candy-button" href={data.surprises.gift.giftUrl} target="_blank" rel="noopener noreferrer">{data.surprises.gift.giftButton||'Open your gift'} <Gift size={17}/></a>}<span className="ending-signature">{data.surprises.gift.signature}</span></div>}</div></section>
<div className="cinema-controls">{onNext&&<button className="candy-button" onClick={onNext}>Choose your next surprise <ArrowRight size={17}/></button>}{done&&<button className="player-replay" onClick={()=>{setIndex(0);setElapsed(0);}}><RotateCcw size={16}/> Replay</button>}</div></div>;
}
