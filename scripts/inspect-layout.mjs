import {chromium} from '@playwright/test';
import sharp from 'sharp';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:320,height:900},reducedMotion:'reduce'});
await page.goto('http://127.0.0.1:5173',{waitUntil:'networkidle'});
console.log(await page.locator('body *').evaluateAll(els=>els.filter(e=>{const r=e.getBoundingClientRect();return e.scrollWidth > e.clientWidth + 1 && getComputedStyle(e).position!=='absolute' && !e.closest('.destination-gallery')}).map(e=>({tag:e.tagName,cls:e.className,text:e.textContent.slice(0,60),right:e.getBoundingClientRect().right,width:e.clientWidth,scroll:e.scrollWidth})).slice(0,50)));
await browser.close();
await sharp('qa/desktop.png').extract({left:0,top:0,width:1440,height:1050}).resize({width:1100}).toFile('qa/hero-review.png');


