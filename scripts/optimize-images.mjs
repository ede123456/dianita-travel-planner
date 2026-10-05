import sharp from 'sharp';
import { readdir } from 'node:fs/promises';
for (const file of await readdir('public/images')) {
  if (!/\.(png|jpg)$/.test(file)) continue;
  await sharp(`public/images/${file}`).resize({ width: file.startsWith('mediterranean') ? 1600 : 1200, withoutEnlargement: true }).webp({ quality: 83 }).toFile(`public/images/${file.replace(/\.(png|jpg)$/, '.webp')}`);
}
const thumbs = await Promise.all(['beach','resort','parks','cruise','europe','newyork'].map(async (name) => ({ input: await sharp(`public/images/${name}.webp`).resize(320,220,{fit:'cover'}).toBuffer() })));
await sharp({create:{width:960,height:440,channels:3,background:'#eeeeee'}}).composite(thumbs.map((item,i)=>({...item,left:(i%3)*320,top:Math.floor(i/3)*220}))).jpeg().toFile('qa/photo-contact-sheet.jpg');
