'use client';
export default function AnimatedTeddy({mood='wave',paused=false}:{mood?:'wave'|'pout'|'celebrate'|'pink';paused?:boolean}){
return <div className={'live-teddy live-teddy-'+mood+(paused?' live-teddy-paused':'')} role="img" aria-label={mood==='pout'?'Teddy playfully pouting and shaking its head':mood==='celebrate'?'Teddy dancing and celebrating':'Teddy waving and blinking'}><img className="teddy-sprite-image" src={`/animation/${mood}.png`} alt="" aria-hidden="true" onError={e=>{if(e.currentTarget.src.endsWith('/teddy.png'))return;e.currentTarget.src='/teddy.png';e.currentTarget.className='teddy-still-fallback';}}/></div>;
}
