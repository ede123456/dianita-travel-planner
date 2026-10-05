import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
await mkdir('qa/cinema',{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},colorScheme:'light'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
await page.goto('http://127.0.0.1:5175/');
assert.equal(await page.locator('.cinema-window video').getAttribute('src'),null,'Video deferred initially');
const section=page.locator('.cinematic-adventure');
await section.scrollIntoViewIfNeeded();
await page.waitForFunction(()=>{const v=document.querySelector('.cinema-window video');return v.readyState>=2&&!v.paused&&v.currentTime>0});
const media=await page.locator('video').evaluate(v=>({src:v.currentSrc,width:v.videoWidth,height:v.videoHeight,muted:v.muted,loop:v.loop,inline:v.playsInline,controls:v.controls,autoplay:v.autoplay}));
assert.ok(media.src.endsWith('/videos/disney-dianita.mp4'));assert.ok(media.muted&&media.loop&&media.inline&&media.autoplay&&!media.controls);
const response=await page.request.get('http://127.0.0.1:5175/videos/disney-dianita.mp4');assert.equal(response.status(),200);assert.match(response.headers()['content-type'],/video\/mp4/);
const layouts=[];
for(const width of [1440,1024,768,390,320]){
 await page.setViewportSize({width,height:width<768?1100:1000});await section.scrollIntoViewIfNeeded();await page.waitForTimeout(900);
 const copy=await page.locator('.cinema-copy').boundingBox();const video=await page.locator('.cinema-window').boundingBox();
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No horizontal overflow');
 if(width<768)assert.ok(video.y>copy.y+copy.height);else assert.ok(video.x>copy.x+copy.width);
 layouts.push({width,videoWidth:Math.round(video.width),videoHeight:Math.round(video.height)});
 await section.screenshot({path:`qa/cinema/${width}.png`});
}
await page.setViewportSize({width:1440,height:1000});
await page.getByRole('button',{name:'Pausar animaciones',exact:true}).click();await section.scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('video').paused);
await page.getByRole('button',{name:'Reanudar animaciones',exact:true}).click();await section.scrollIntoViewIfNeeded();await page.waitForFunction(()=>!document.querySelector('video').paused);
await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>document.querySelector('video').paused);
await page.emulateMedia({reducedMotion:'no-preference'});await page.waitForFunction(()=>!document.querySelector('video').paused);
await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.waitForFunction(()=>document.querySelector('video').paused);
await page.emulateMedia({colorScheme:'dark'});await page.reload();await section.scrollIntoViewIfNeeded();await page.waitForTimeout(900);await section.screenshot({path:'qa/cinema/dark.png'});
assert.deepEqual(errors,[]);await writeFile('qa/cinema/verification.json',JSON.stringify({media,layouts,errors},null,2));
console.log(JSON.stringify({media,layouts,errors},null,2));await browser.close();

