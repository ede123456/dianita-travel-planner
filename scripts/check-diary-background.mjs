import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
await mkdir('qa/diary',{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];
page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
await page.goto('http://127.0.0.1:5175');
const section=page.locator('#diario');const video=page.locator('.diary-background video');
for(const width of [1440,768,390]){
 await page.setViewportSize({width,height:1000});await section.scrollIntoViewIfNeeded();
 await page.waitForFunction(()=>{const v=document.querySelector('.diary-background video');return v.readyState>=2&&!v.paused});
 await page.waitForTimeout(800);
 const b=await section.boundingBox();assert.equal(Math.round(b.width),width);
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.evaluate(()=>window.scrollTo({top:document.querySelector('#diario').offsetTop-80,behavior:'instant'}));await page.waitForTimeout(800);
 await page.screenshot({path:`qa/diary/${width}.png`});
}
await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>document.querySelector('.diary-background video').paused);
assert.equal(await video.evaluate(v=>getComputedStyle(v).filter),'blur(8px)');
assert.equal(await section.evaluate(e=>getComputedStyle(e).overflow),'hidden');
assert.equal(await video.evaluate(v=>v.controls),false);assert.deepEqual(errors,[]);
console.log('PASS: desktop/tablet/mobile, full-width containment, playback, reduced motion, console.');await browser.close();
