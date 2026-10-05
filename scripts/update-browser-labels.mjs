import {readFile,writeFile} from 'node:fs/promises';
let test=await readFile('scripts/check-redesign.mjs','utf8');
test=test.replaceAll('EMPECEMOS A PLANEAR','VAMOS A PLANEARLO');
test=test.replace("{name:'VAMOS A PLANEARLO'}", "{name:/VAMOS A PLANEARLO/}");
await writeFile('scripts/check-redesign.mjs',test);
