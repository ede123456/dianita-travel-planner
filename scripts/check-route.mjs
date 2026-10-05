import {chromium} from '@playwright/test';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'no-preference'});
await page.goto('http://127.0.0.1:5175/',{waitUntil:'networkidle'});
const y=await page.locator('#diario .flight-route').evaluate(e=>e.getBoundingClientRect().top+scrollY);
const distances=[];
for(const offset of [950,600,150]){await page.evaluate(top=>scrollTo({top,behavior:'instant'}),y-offset);await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));distances.push(await page.locator('#diario .route-airplane').evaluate(e=>getComputedStyle(e).offsetDistance));}
console.log({distances});
if(new Set(distances).size<2)throw new Error('Route did not progress');
await browser.close();
