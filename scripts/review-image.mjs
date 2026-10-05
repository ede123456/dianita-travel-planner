import sharp from 'sharp';
await sharp('qa/mobile.png').extract({left:0,top:0,width:390,height:1700}).toFile('qa/mobile-top.png');
await sharp('qa/desktop.png').resize({width:700}).toFile('qa/desktop-review.png');
await sharp('qa/desktop-dark.png').extract({left:0,top:0,width:1440,height:1000}).resize({width:1000}).toFile('qa/dark-review.png');
