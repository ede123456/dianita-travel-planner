import sharp from 'sharp';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
const inventory=JSON.parse(await readFile('qa/photos/inventory.json','utf8'));
const names=['baseball','paris-night','puerto-rico','disney-pink','brooklyn','disney-castle','louvre','paris-fountains','overlook'];
await mkdir('public/imagenes/dianita',{recursive:true});
for(const [i,item] of inventory.entries()) {
 for(const width of [480,800,1200]) await sharp(`public/imagenes/imagenes/${item.file}`).rotate().resize({width,withoutEnlargement:true}).webp({quality:width === 480 ? 72 : 78}).toFile(`public/imagenes/dianita/${names[i]}-${width}.webp`);
}
await writeFile('qa/photos/assignments.json',JSON.stringify(inventory.map((item,i)=>({...item,asset:names[i]})),null,2));
