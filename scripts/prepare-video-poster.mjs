import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage();
await page.goto('http://127.0.0.1:5175/');
const result=await page.evaluate(async()=>{
 const v=document.createElement('video');v.muted=true;v.src='/videos/disney-dianita.mp4';
 await new Promise((resolve,reject)=>{v.onloadeddata=resolve;v.onerror=reject});
 v.currentTime=.3;await new Promise(resolve=>v.onseeked=resolve);
 const c=document.createElement('canvas');c.width=v.videoWidth;c.height=v.videoHeight;c.getContext('2d').drawImage(v,0,0);
 return {width:v.videoWidth,height:v.videoHeight,duration:v.duration,poster:c.toDataURL('image/webp',.85)};
});
await writeFile('public/videos/disney-dianita-poster.webp',Buffer.from(result.poster.split(',')[1],'base64'));
console.log({width:result.width,height:result.height,duration:result.duration});await browser.close();
