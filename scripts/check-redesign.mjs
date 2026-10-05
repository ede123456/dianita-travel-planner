import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
const base='http://127.0.0.1:5175/';
await mkdir('qa/redesign',{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const errors=[];
const page=await browser.newPage({viewport:{width:1440,height:1000},colorScheme:'light',reducedMotion:'reduce'});
page.on('pageerror',e=>errors.push(e.message));
async function loadImages(){await page.locator('img').evaluateAll(imgs=>imgs.forEach(i=>i.loading='eager'));await page.waitForFunction(()=>[...document.images].every(i=>i.complete && i.naturalWidth>0));for(const img of await page.locator('img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(i=>i.decode());}await page.evaluate(()=>scrollTo(0,0));}
await page.goto(base,{waitUntil:'networkidle'});await loadImages();
await page.screenshot({path:'qa/redesign/desktop.png',fullPage:true});
assert.equal(await page.locator('h1').innerText(),'¿A dónde\nnos vamos?');
await page.locator('.hero-postcard-paris button').click();
assert.equal(await page.locator('dialog').evaluate(d=>d.open),true);
await page.getByRole('button',{name:'Foto siguiente'}).click();
assert.match(await page.locator('.viewer-caption').innerText(),/Puerto Rico/);
await page.keyboard.press('Escape');
assert.equal(await page.locator('dialog').evaluate(d=>d.open),false);
await page.getByRole('button',{name:'Cruceros',exact:true}).hover();
assert.equal(await page.getByRole('button',{name:'Cruceros',exact:true}).getAttribute('aria-expanded'),'true');
await page.getByRole('button',{name:'Vuelos',exact:true}).focus();
assert.equal(await page.getByRole('button',{name:'Vuelos',exact:true}).getAttribute('aria-expanded'),'true');
await page.getByRole('button',{name:'Más destinos'}).click();
await page.waitForFunction(()=>document.querySelector('.postcard-carousel').scrollLeft>100);
const track=page.locator('.postcard-carousel');await track.scrollIntoViewIfNeeded();
await track.evaluate(e=>e.scrollLeft=0);
const box=await track.boundingBox();await page.mouse.move(box.x+600,box.y+170);await page.mouse.down();await page.mouse.move(box.x+250,box.y+170,{steps:10});await page.mouse.up();
assert.ok(await track.evaluate(e=>e.scrollLeft)>100,'Carousel drags');
await page.getByRole('link',{name:'MI VIAJE A DISNEY',exact:true}).click();
assert.equal(await page.locator('#destination').inputValue(),'Orlando');
assert.equal(await page.getByRole('checkbox',{name:'Disney',exact:true}).isChecked(),true);
await page.getByRole('button',{name:/VAMOS A PLANEARLO/}).click();
assert.equal(await page.locator('#name').getAttribute('aria-invalid'),'true');
await page.locator('#name').fill('Viajero de prueba');await page.locator('#email').fill('prueba@example.com');await page.locator('#whatsapp').fill('+1 202 555 0199');
await page.getByRole('button',{name:'VAMOS A PLANEARLO'}).click();await page.getByRole('heading',{name:'Tu idea de viaje está lista.'}).waitFor();
const download=page.waitForEvent('download');await page.getByRole('button',{name:'DESCARGAR MI VIAJE'}).click();assert.equal((await download).suggestedFilename(),'mi-viaje-con-dianita.txt');
await page.getByRole('button',{name:'Activar modo oscuro'}).click();await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:'qa/redesign/dark.png',fullPage:true});
const viewports=[];
for(const width of [320,390,768,1024,1440]){
 await page.setViewportSize({width,height:900});await page.goto(base,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
 const dimensions=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));viewports.push(dimensions);
 if(dimensions.scroll>width){console.log(await page.locator('body *').evaluateAll(es=>es.filter(e=>e.getBoundingClientRect().right>innerWidth&&!e.closest('.postcard-carousel')&&!e.closest('.marquee-track')).map(e=>({tag:e.tagName,cls:e.getAttribute('class'),right:e.getBoundingClientRect().right}))))}
 assert.ok(dimensions.scroll<=width,`Overflow at ${width}: ${dimensions.scroll}`);
 if(width===390){await loadImages();await page.screenshot({path:'qa/redesign/mobile.png',fullPage:true});await page.getByRole('button',{name:'Abrir menú'}).click();await page.locator('#main-nav').getByRole('link',{name:'Contacto',exact:true}).click();assert.equal(await page.locator('#menu-toggle').getAttribute('aria-expanded'),'false');await page.locator('.diary-photo-0 button').click();assert.equal(await page.locator('dialog').evaluate(d=>d.open),true);await page.getByRole('button',{name:'Cerrar foto'}).click();}
}
await page.emulateMedia({reducedMotion:'no-preference'});await page.setViewportSize({width:1440,height:1000});await page.goto(base,{waitUntil:'networkidle'});
await page.getByRole('button',{name:'Pausar cinta de viajes'}).click();assert.equal(await page.locator('.marquee-track').evaluate(e=>getComputedStyle(e).animationPlayState),'paused');await page.getByRole('button',{name:'Reanudar cinta de viajes'}).click();
await page.locator('.world-hero').hover({position:{x:150,y:200}});assert.notEqual(await page.locator('.world-hero').evaluate(e=>e.style.getPropertyValue('--pointer-x')),'0px');
await page.locator('#diario').scrollIntoViewIfNeeded();await page.locator('.diary-heading.visible').waitFor();
const route=await page.locator('#diario .route-airplane').evaluate(e=>({timeline:getComputedStyle(e).animationTimeline,distance:getComputedStyle(e).offsetDistance}));
await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.locator('.marquee-track').evaluate(e=>getComputedStyle(e).animationName),'none');
assert.deepEqual(errors,[]);
await writeFile('qa/redesign/checks.json',JSON.stringify({runtimeErrors:errors,viewports,route,checks:['photo viewer','viewer next and Escape','service hover and focus','carousel arrows and drag','destination prefill','form validation','download','dark mode','mobile menu and gallery','marquee pause','cursor depth','scroll reveals','reduced motion']},null,2));
console.log('Redesign browser checks passed.');await browser.close();
