import {readFile,writeFile} from 'node:fs/promises';
let html=await readFile('index.html','utf8');
html=html.replace('    <title>', '    <link rel="preload" as="image" href="/images/dianita-bg-800.webp" media="(max-width: 700px)" fetchpriority="high" />\n    <link rel="preload" as="image" href="/images/dianita-bg-1600.webp" media="(min-width: 701px)" fetchpriority="high" />\n    <title>');
await writeFile('index.html',html);
let app=await readFile('src/App.jsx','utf8');app=app.replace('aria-label="Dianita. Travel Planner, inicio"','title="Volver al inicio"');await writeFile('src/App.jsx',app);
let world=await readFile('src/TravelWorld.jsx','utf8');world=world.replace("motionPaused ? 'Reanudar movimiento' : 'Pausar movimiento'", "motionPaused ? 'Reanudar animaciones' : 'Pausar animaciones'");await writeFile('src/TravelWorld.jsx',world);
