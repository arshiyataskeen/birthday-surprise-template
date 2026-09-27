'use client';
import AnimatedTeddy from './animated-teddy';
export type WelcomeMedia={mode:string;imageId:string;motion:string};
export default function WelcomeVisual({media,pout=false}:{media:WelcomeMedia;pout?:boolean}){
if(media.mode==='classic')return <AnimatedTeddy mood={pout?'pout':'wave'}/>;
if(media.mode==='pink')return <AnimatedTeddy mood="pink"/>;
return <img className={'welcome-custom-image welcome-motion-'+media.motion} src={media.mode==='upload'&&media.imageId?'/api/photos/'+media.imageId:'/gallery/pink-teddy-original.png'} alt="Your welcome surprise"/>;
}
