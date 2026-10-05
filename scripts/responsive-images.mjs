import sharp from 'sharp';
const names=['mediterranean','beach','resort','parks','cruise','europe','newyork'];
for(const name of names) for(const size of [640,960]) await sharp(`public/images/${name}.webp`).resize({width:size,withoutEnlargement:true}).webp({quality:76}).toFile(`public/images/${name}-${size}.webp`);
