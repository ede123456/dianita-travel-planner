import sharp from 'sharp';
await sharp('qa/redesign/mobile.png').extract({left:0,top:0,width:390,height:1650}).toFile('qa/redesign/mobile-top.png');
await sharp('qa/redesign/dark.png').extract({left:0,top:0,width:1440,height:1000}).resize({width:1000}).toFile('qa/redesign/dark-top.png');
