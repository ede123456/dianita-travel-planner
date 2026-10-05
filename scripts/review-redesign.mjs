import sharp from 'sharp';
await sharp('qa/redesign/desktop.png').extract({left:0,top:0,width:1440,height:1050}).resize({width:1200}).toFile('qa/redesign/hero-review.png');
await sharp('qa/redesign/desktop.png').resize({width:700}).toFile('qa/redesign/full-review.png');
