import sharp from 'sharp';
for(const size of [800,1600])await sharp('public/images/dianita-bg.png').resize({width:size,withoutEnlargement:true}).webp({quality:80}).toFile(`public/images/dianita-bg-${size}.webp`);
