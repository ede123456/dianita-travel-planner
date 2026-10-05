import {readFile,writeFile} from 'node:fs/promises';
let app=await readFile('src/App.jsx','utf8');
app=app.replace('FinalAdventure, PhotoViewer, FlightRoute','FinalAdventure, PhotoViewer, FlightRoute, OceanCruises');
app=app.replace("const [selectedPhoto, setSelectedPhoto] = useState(null);", "const [selectedPhoto, setSelectedPhoto] = useState(null);\n  const [motionPaused, setMotionPaused] = useState(false);\n  useEffect(() => { document.documentElement.dataset.motionPaused = String(motionPaused); }, [motionPaused]);");
app=app.replace('<TravelHero onOpen={setSelectedPhoto} />','<TravelHero onOpen={setSelectedPhoto} motionPaused={motionPaused} toggleMotion={() => setMotionPaused(value => !value)} />');
const cruiseStart=app.indexOf('<section className="cruise-section">'),cruiseEnd=app.indexOf('<section id="como-funciona"',cruiseStart);
app=app.slice(0,cruiseStart)+'<OceanCruises chooseDestination={chooseDestination} />\n    '+app.slice(cruiseEnd);
app=app.replace('<FlightRoute id="process" /><div className="process-heading reveal"><h2>Tu única tarea debería<br />ser <em>hacer la maleta.</em></h2><p>Del «me encantaría ir» al «ya estamos aquí».</p></div><ol className="journey">','<div className="process-heading reveal"><h2>De “quiero viajar”<br />a <em>“ya hice la maleta”.</em></h2><p>Cuatro momentos. Una aventura que empieza contigo.</p></div><div className="journey-map"><FlightRoute id="process" /><ol className="journey">');
app=app.replace("[['Cuéntame tu idea', 'Destino, fechas, viajeros, presupuesto y lo que imaginas.'], ['Diseño tu experiencia', 'Preparo opciones personalizadas para tu viaje.'], ['Afinamos los detalles', 'Ajustamos cada parte hasta encontrar la combinación adecuada.'], ['Disfruta', 'Recibe los detalles organizados y prepárate para viajar.']]", "[['ME CUENTAS ✨', 'Destino, fechas, viajeros, presupuesto y lo que imaginas.'], ['YO INVESTIGO 🔎', 'Busco opciones que encajen contigo y con tu forma de viajar.'], ['LO PLANEAMOS 💗', 'Afinamos cada detalle hasta encontrar tu combinación ideal.'], ['TÚ VIAJAS ✈', 'Tu plan organizado. Tu maleta lista. A disfrutar.']]");
app=app.replace('</li>)}</ol></section>','</li>)}</ol></div></section>');
app=app.replace('<h2>Viajes que ya se<br />convirtieron en <em>historias.</em></h2>', '<h2>Viajeros felices =<br /><em>Dianita feliz</em> 💗</h2>');
app=app.replace('<figure><span className="quote-mark"', '<figure className="testimonial-letter"><span className="letter-stamp" aria-hidden="true">CON CARIÑO<br />DESDE MI VIAJE ♡</span><span className="quote-mark"');
app=app.replace('<h2>Tu próximo viaje<br />empieza <em>aquí.</em></h2>', '<h2>Cuéntame tu<br /><em>viaje ideal</em> ✨</h2>');
app=app.replace("field('destination', 'Destino'", "field('destination', '¿A dónde quieres escapar?'");
app=app.replace("field('dates', 'Fechas aproximadas'", "field('dates', '¿Cuándo hacemos las maletas?'");
app=app.replace("field('travelers', 'Número de viajeros'", "field('travelers', '¿Quiénes se van?'");
app=app.replace('<label htmlFor="budget">Presupuesto aproximado</label>','<label htmlFor="budget">¿Qué presupuesto tienes en mente?</label>');
app=app.replace('<label htmlFor="message">Cuéntame cómo imaginas tu viaje…</label>','<label htmlFor="message">Ahora sí... cuéntamelo TODO 👀</label>');
app=app.replace('EMPECEMOS A PLANEAR <Arrow />','VAMOS A PLANEARLO ✈ <Arrow />');
app=app.replace("function InquiryForm({ destination, selectedInterests, setSelectedInterests }) {", "function InquiryForm({ destination, selectedInterests, setSelectedInterests }) {\n  const interestSymbols = ['✈', '🏨', '🏰', '🎢', '🚢', '🌴', '🚐', '🛡'];");
app=app.replace('interests.map(interest =>', 'interests.map((interest, index) =>');
app=app.replace('<span>{selectedInterests.includes(interest) && <Check', '<span><span aria-hidden="true">{interestSymbols[index]}</span>{selectedInterests.includes(interest) && <Check');
app=app.replace('    <FinalAdventure onOpen={setSelectedPhoto} />\n    <InquiryForm destination={destination} selectedInterests={selectedInterests} setSelectedInterests={setSelectedInterests} />', '    <InquiryForm destination={destination} selectedInterests={selectedInterests} setSelectedInterests={setSelectedInterests} />\n    <FinalAdventure onOpen={setSelectedPhoto} />');
// The cruise component now owns its responsive image.
const photoStart=app.indexOf('function Photo('),photoEnd=app.indexOf('function Header(',photoStart);
if(photoStart>=0)app=app.slice(0,photoStart)+app.slice(photoEnd);
app=app.replace('contact, images, interests','contact, interests');
await writeFile('src/App.jsx',app);
let world=await readFile('src/TravelWorld.jsx','utf8');
const routeStart=world.indexOf('export function FlightRoute('),routeEnd=world.indexOf('export function TravelDiary(',routeStart);
world=world.slice(0,routeStart)+`export function FlightRoute({ id }) {
  const path = 'M 20 100 C 180 100 170 15 330 35 S 540 140 650 75 S 830 15 980 55';
  return <div className="flight-route" aria-hidden="true"><svg viewBox="0 0 1000 140" className="flight-route-svg">
    <defs><mask id={'route-mask-' + id}><path className="route-drawing" d={path} pathLength="100" fill="none" stroke="white" strokeWidth="8" strokeDasharray="100" /></mask></defs>
    <path id={'flight-path-' + id} d={path} fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 9" mask={'url(#route-mask-' + id + ')'} />
    <g className="route-airplane" style={{ offsetPath: "path('" + path + "')" }}><AirplaneTilt x={-17} y={-17} width={34} height={34} weight="fill" style={{ transform: 'rotate(45deg)' }} /></g>
  </svg></div>;
}
export function OceanCruises({ chooseDestination }) {
  return <section className="ocean-cruises"><div className="ocean-heading section reveal"><span className="handwritten">¿Y si tu hotel también viajara contigo?</span><h2>CRUCEROS <Boat aria-hidden="true" weight="duotone" /></h2><p>Despierta en un destino diferente sin volver a hacer la maleta.</p><a className="button" href="#contacto" onClick={() => chooseDestination('Crucero', 'Crucero')}>QUIERO IRME DE CRUCERO <ArrowUpRight size={20} /></a></div><div className="ocean-window"><img src="/images/cruise.webp" srcSet="/images/cruise-640.webp 640w, /images/cruise-960.webp 960w, /images/cruise.webp 1200w" sizes="100vw" alt="Cruceros junto a las aguas turquesas del Caribe" loading="lazy" decoding="async" /></div><span className="ocean-note handwritten">Próxima parada: otro horizonte.</span></section>;
}
`+world.slice(routeEnd);
await writeFile('src/TravelWorld.jsx',world);
