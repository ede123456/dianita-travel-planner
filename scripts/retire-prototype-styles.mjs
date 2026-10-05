import {readFile,writeFile} from 'node:fs/promises';
import postcss from 'postcss';
const root=postcss.parse(await readFile('src/styles.css','utf8'));
const retired=/\.(?:hero(?:-[\w-]+)?|about-section|about-image|about-copy|portrait-placeholder|credentials|services-section|services-layout|service-photo|service-list|service-item|photo-note|parks-[\w-]+|inspiration-[\w-]+|destination(?:-\d+|-gallery|-image|-title)?|emotional-section)(?![\w-])/;
root.walkRules(rule=>{if(retired.test(rule.selector))rule.remove();});
root.walkAtRules(rule=>{if(rule.nodes?.length===0)rule.remove();});
await writeFile('src/styles.css',root.toString());
let content=await readFile('src/content.js','utf8');content=content.replace('// Keep a real portrait null until Dianita supplies her own photograph.\nexport const portrait = null;', '// Real travel photography is catalogued in travelPhotos.js.');await writeFile('src/content.js',content);
let app=await readFile('src/App.jsx','utf8');app=app.replace('ArrowUpRight, ArrowRight, ArrowDown, List, X, WhatsappLogo, Check, Plus, Minus, Sun, Moon, DownloadSimple','ArrowUpRight, List, X, WhatsappLogo, Check, Sun, Moon, DownloadSimple');await writeFile('src/App.jsx',app);
