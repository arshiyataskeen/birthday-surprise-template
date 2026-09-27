'use client';
import {useState} from 'react';
import {Star,Heart,ArrowRight,Gift} from 'lucide-react';
import {defaults} from './defaults';
import {chapters} from './story-data';
import AnimatedTeddy from './animated-teddy';
import './general-surprises.css';
type Props={data:typeof defaults;onBack:()=>void};
export function Happiness({data,onBack}:Props){
 const [selected,setSelected]=useState<string|null>(null),[opened,setOpened]=useState<string[]>([]);
 const wishes=chapters.map(c=>({...c,...data.chapterEdits[c.id]}));
 const wish=wishes.find(w=>w.id===selected);
 const photo=data.memories.find(m=>m.chapter===selected);
 return <section className="general-surprise"><span className="wish-overline">LITTLE WISHES FOR YOUR BIG DAY</span><h1>{data.surprises.story.title}</h1><p>Pick a star. There’s a birthday wish waiting inside.</p><div className="wish-star-grid">{wishes.map((w,i)=><button key={w.id} className={opened.includes(w.id)?'star-opened':''} aria-label={`Open birthday wish ${i+1}`} aria-pressed={selected===w.id} onClick={()=>{setSelected(w.id);setOpened(v=>v.includes(w.id)?v:[...v,w.id]);}}><Star size={38} fill="currentColor"/><span>{String(i+1).padStart(2,'0')}</span></button>)}</div><div className="wish-reveal" aria-live="polite" key={selected||'intro'}>{wish?<>{photo&&<img src={'/api/photos/'+photo.id} alt={photo.title}/>}<span className="wish-overline">{wish.place}</span><h2>{wish.title}</h2><p>{wish.caption}</p><small>{wish.note}</small></>:<><Heart size={30}/><p>A little happiness, one star at a time.</p></>}</div><button className="candy-button" onClick={onBack}>Choose your next surprise <ArrowRight size={18}/></button></section>;
}
export function MakeAWish({data,onBack}:Props){
 const [madeWish,setMadeWish]=useState(false);const gift=data.surprises.gift;
 return <section className="general-surprise cake-surprise"><span className="wish-overline">{gift.eyebrow.replace('{name}',data.name)}</span><h1>{madeWish?gift.heading:'Make a wish.'}</h1>{!madeWish?<><p>Close your eyes, think of something wonderful…</p><button className="cake-button" aria-label="Blow out the birthday candles" onClick={()=>setMadeWish(true)}><span role="img" aria-label="Birthday cake">🎂</span><strong>Tap to blow out the candles</strong></button></>:<><div className="wish-confetti" aria-hidden="true">{Array.from({length:18},(_,i)=><i key={i} style={{left:(i*37%100)+'%',animationDelay:(i%5)*.12+'s'}}/>)}</div><div className="wish-celebrate"><AnimatedTeddy mood="celebrate"/></div><p>{gift.message}</p><p>{gift.note}</p>{gift.imageId&&<img className="gift-reveal-image" src={'/api/photos/'+gift.imageId} alt={gift.giftName||gift.title}/>}<h2>{gift.giftName}</h2>{gift.giftMessage&&<p>{gift.giftMessage}</p>}{gift.giftUrl&&<a className="candy-button" href={gift.giftUrl} target="_blank" rel="noopener noreferrer">{gift.giftButton||'Open your gift'} <Gift size={18}/></a>}<p className="ending-signature">{gift.signature}</p></>}<button className="candy-button" onClick={onBack}>Your surprises <ArrowRight size={18}/></button></section>;
}
