import sharp from 'sharp';
import {readdir,writeFile,mkdir} from 'node:fs/promises';
const dir='public/imagenes/imagenes';
const files=(await readdir(dir)).filter(f=>/\.(jpe?g|png|webp)$/i.test(f)).sort();
await mkdir('qa/photos',{recursive:true});
const metadata=[];
const tiles=[];
for(const [i,file] of files.entries()){
 const source=dir+'/'+file;
 const meta=await sharp(source).metadata();
 metadata.push({index:i+1,file,width:meta.width,height:meta.height});
 const thumb=await sharp(source).rotate().resize(370,440,{fit:'contain',background:'#eeeeee'}).jpeg().toBuffer();
 const label=Buffer.from(`<svg width="370" height="40"><rect width="370" height="40" fill="white"/><text x="12" y="27" font-size="21" font-family="Arial">Photo ${i+1}</text></svg>`);
 tiles.push({input:thumb,left:(i%3)*370,top:Math.floor(i/3)*480});
 tiles.push({input:label,left:(i%3)*370,top:Math.floor(i/3)*480+440});
 await sharp(source).rotate().resize({width:1100,withoutEnlargement:true}).jpeg().toFile(`qa/photos/photo-${i+1}.jpg`);
}
await sharp({create:{width:1110,height:Math.ceil(files.length/3)*480,channels:3,background:'#eeeeee'}}).composite(tiles).jpeg().toFile('qa/photos/contact-sheet.jpg');
await writeFile('qa/photos/inventory.json',JSON.stringify(metadata,null,2));
console.log(metadata);
