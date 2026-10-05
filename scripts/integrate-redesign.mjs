import {readFile,writeFile} from 'node:fs/promises';
let app=await readFile('src/App.jsx','utf8');
app=app.replace("import { contact, portrait, images, services, destinations, interests } from './content';", "import { contact, images, interests } from './content';\nimport { TravelHero, TravelMarquee, PersonalAbout, InteractiveServices, MagicExperience, TravelDiary, DestinationCarousel, FinalAdventure, PhotoViewer, FlightRoute } from './TravelWorld';");
app=app.slice(0,app.indexOf('function Services()'))+app.slice(app.indexOf('function InquiryForm'));
app=app.replace("const [notice, setNotice] = useState('');", "const [notice, setNotice] = useState('');\n  const [selectedPhoto, setSelectedPhoto] = useState(null);");
function replaceBetween(start,end,content){const a=app.indexOf(start),b=app.indexOf(end,a);if(a<0||b<0)throw Error(start);app=app.slice(0,a)+content+'\n    '+app.slice(b);}
replaceBetween('<section className="hero"','<div className="trust-line"','<TravelHero onOpen={setSelectedPhoto} /><TravelMarquee />');
replaceBetween('<section id="sobre-mi"','<section className="cruise-section"','<PersonalAbout onOpen={setSelectedPhoto} />\n    <InteractiveServices />\n    <MagicExperience onOpen={setSelectedPhoto} chooseDestination={chooseDestination} />\n    <TravelDiary onOpen={setSelectedPhoto} />');
replaceBetween('<section className="section inspiration-section"','<section className="testimonials-section','<DestinationCarousel chooseDestination={chooseDestination} />');
replaceBetween('<section className="emotional-section','<InquiryForm','<FinalAdventure onOpen={setSelectedPhoto} />');
app=app.replace('<section id="como-funciona" className="section process-section">','<section id="como-funciona" className="section process-section"><FlightRoute id="process" />');
app=app.replace('  </>;\n}', '    <PhotoViewer selected={selectedPhoto} onClose={() => setSelectedPhoto(null)} onSelect={setSelectedPhoto} />\n  </>;\n}');
await writeFile('src/App.jsx',app);
let main=await readFile('src/main.jsx','utf8');main=main.replace("import './styles.css';", "import './styles.css';\nimport './travel-world.css';");await writeFile('src/main.jsx',main);
let html=await readFile('index.html','utf8');html=html.replace(/    <link rel="preload" as="image"[^>]+>/, '    <link rel="preload" as="image" href="/imagenes/dianita/paris-night-800.webp" imagesrcset="/imagenes/dianita/paris-night-480.webp 480w, /imagenes/dianita/paris-night-800.webp 800w, /imagenes/dianita/paris-night-1200.webp 1200w" imagesizes="(max-width: 700px) 85vw, 35vw" />');await writeFile('index.html',html);

