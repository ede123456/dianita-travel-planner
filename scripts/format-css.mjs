import { readFile, writeFile } from 'node:fs/promises';
const css=await readFile('src/styles.css','utf8');
let out='',depth=0,quote='',parens=0,lineStart=true;
for(let i=0;i<css.length;i++){
 const c=css[i];
 if(quote){out+=c;if(c===quote && css[i-1]!=='\\')quote='';continue;}
 if(c==='"'||c==="'"){quote=c;out+=c;continue;}
 if(c==='(')parens++;
 if(c===')')parens--;
 if(c==='{'){out=out.trimEnd()+' {\n';depth++;lineStart=true;}
 else if(c==='}'){out=out.trimEnd()+'\n';depth--;out+='  '.repeat(depth)+'}\n';lineStart=true;}
 else if(c===';' && parens===0){out+=';\n';lineStart=true;}
 else if(/\s/.test(c) && lineStart)continue;
 else {if(lineStart){out+='  '.repeat(depth);lineStart=false;}out+=c;}
}
await writeFile('src/styles.css',out.trim()+'\n');
