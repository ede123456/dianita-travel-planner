import {readFile,writeFile} from 'node:fs/promises';
let source=await readFile('src/TravelWorld.jsx','utf8');
source=source.replace('Check, Plus, Minus','Check, Plus, Cloud, Heart, Boat, Buildings, Bus, ShieldCheck, SuitcaseRolling');
function replaceComponent(name,nextName,replacement){const start=source.indexOf(`export function ${name}(`),end=source.indexOf(`export function ${nextName}(`,start);if(start<0||end<0)throw Error(name);source=source.slice(0,start)+replacement+'\n'+source.slice(end);}
replaceComponent('TravelHero','TravelMarquee',`export function AmbientSky({ finale = false }) {
  return <div className={finale ? 'ambient-sky ambient-finale' : 'ambient-sky'} aria-hidden="true">
    <Cloud className="ambient-cloud cloud-a" weight="fill" /><Cloud className="ambient-cloud cloud-b" weight="fill" />
    <StarFour className="ambient-star ambient-star-a" weight="fill" /><StarFour className="ambient-star ambient-star-b" weight="fill" />
    <Sparkle className="ambient-sparkle" weight="fill" /><Heart className="ambient-heart" weight="duotone" />
    <span className="ambient-flight"><AirplaneTilt size={26} weight="fill" /></span>
  </div>;
}
export function TravelHero({ onOpen, motionPaused, toggleMotion }) {
  const scene = useRef(null);
  function move(event) {
    if (motionPaused || !window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    scene.current.style.setProperty('--pointer-x', ((event.clientX - rect.left) / rect.width - .5) * 12 + 'px');
    scene.current.style.setProperty('--pointer-y', ((event.clientY - rect.top) / rect.height - .5) * 9 + 'px');
  }
  function reset() { scene.current.style.setProperty('--pointer-x', '0px'); scene.current.style.setProperty('--pointer-y', '0px'); }
  const memories = [
    {id:'paris-night', className:'hero-postcard-paris', treatment:'photo-polaroid', note:'Toujours Paris ♡'},
    {id:'disney-pink', className:'hero-postcard-disney', treatment:'photo-rounded', note:'Orlando, mi lugar feliz ✨'},
    {id:'brooklyn', className:'hero-postcard-newyork', treatment:'photo-taped', note:'New York state of mind'},
  ];
  return <section className="world-hero dreamy-hero" id="inicio" ref={scene} onPointerMove={move} onPointerLeave={reset}>
    <div className="hero-sky-image" aria-hidden="true" /><div className="hero-sky-light" aria-hidden="true" /><AmbientSky />
    <div className="hero-sticker" aria-hidden="true"><Sparkle weight="fill" />un mundo por vivir</div>
    <div className="world-hero-copy"><span className="eyebrow">TU PRÓXIMA HISTORIA EMPIEZA AQUÍ</span><h1>¿A dónde<br /><em>nos vamos?</em></h1>
      <p className="hero-secondary">Tú sueñas el destino.<br /><strong>Dianita planea el resto.</strong></p>
      <p className="hero-support">Vuelos, resorts, cruceros, Disney, Universal y experiencias completas diseñadas para ti.</p>
      <a className="button" href="#contacto">PLANIFICA TU VIAJE <AirplaneTilt size={20} aria-hidden="true" /></a>
      <a className="hero-diary-link" href="#sobre-mi">CONOCE A DIANITA <ArrowRight size={16} /></a>
    </div>
    {memories.map(memory => <div key={memory.id} className={'hero-postcard ' + memory.className}><div className="memory-float"><Postcard id={memory.id} className={memory.treatment} eager sizes="(max-width: 700px) 45vw, (max-width: 1100px) 210px, 270px" onOpen={onOpen} note={memory.note} /></div></div>)}
    <span className="hero-scribble handwritten" aria-hidden="true">la vida se ve mejor<br />con un viaje en el calendario ↗</span>
    <span className="hero-ticket"><AirplaneTilt size={23} /><span>IDA: CUANDO TÚ QUIERAS<br /><strong>DESTINO: TU PRÓXIMO RECUERDO</strong></span></span>
    <button className="ambient-control" aria-pressed={motionPaused} onClick={() => { reset(); toggleMotion(); }} aria-label={motionPaused ? 'Reanudar animaciones' : 'Pausar animaciones'}>{motionPaused ? <Play size={14} /> : <Pause size={14} />}<span>{motionPaused ? 'Reanudar movimiento' : 'Pausar movimiento'}</span></button>
  </section>;
}
`);
source=source.replace('Sí, soy esa amiga que siempre está pensando en el próximo viaje.','Tu travel planner, copiloto y cómplice de aventuras.');
source=source.replace('Tú trae las ganas. Yo me encargo del plan. ♡','Siempre pensando en el próximo viaje. ♡');
source=source.replace("const titles = ['Vuelos', 'Resorts', 'Traslados', 'Cruceros', 'Seguros de viaje', 'Paquetes vacacionales'];", "const titles = ['Vuelos', 'Resorts & Hoteles', 'Traslados', 'Cruceros', 'Seguros de viaje', 'Paquetes vacacionales'];\n  const symbols = [AirplaneTilt, Buildings, Bus, Boat, ShieldCheck, SuitcaseRolling];\n  const ActiveSymbol = symbols[active];");
source=source.replace('<section id="servicios" className="world-services">','<section id="servicios" className="world-services" data-service={active}>');
source=source.replace('<span>{titles[i]}</span>','<span className="service-name">{(() => { const Icon = symbols[i]; return <Icon size={23} aria-hidden="true" />; })()}{titles[i]}</span>');
source=source.replace('<AirplaneTilt size={26} /></figcaption>','<ActiveSymbol size={32} className="service-symbol" aria-hidden="true" /></figcaption>');
source=source.replace('Los sueños también necesitan itinerario.','Donde los sueños también tienen itinerario.');
source=source.replace('<p className="magic-footnote">Disney o Universal: la aventura la eliges tú.</p>', '<div className="universal-ticket"><span>UNIVERSAL</span><p>Para quienes quieren un poquito más de adrenalina.</p><StarFour size={23} aria-hidden="true" /></div>');
source=source.replace('<path id={\x60flight-path-${id}\x60}', '<path pathLength="100" className="route-drawing" id={\x60flight-path-${id}\x60}');
source=source.replace('<div className="diary-collage">','<div className="diary-collage" tabIndex={0} aria-label="Recuerdos de viaje de Dianita">');
source=source.replace('<Postcard id={id} onOpen={onOpen} note={photoById[id].place} />','<Postcard id={id} className={i === 1 ? "photo-editorial" : i === 2 ? "photo-taped" : ""} onOpen={onOpen} note={photoById[id].place} />');
source=source.replace('<h2>Tu próxima<br /><em>postal favorita.</em></h2>', '<h2>Choose your<br /><em>next adventure.</em></h2><p className="destination-subtitle">¿Dónde hacemos el próximo check-in?</p>');
source=source.replace("{name:'París',id:'paris-night',note:'Un «oui» a perderse por sus calles.'}", "{name:'Europa',destination:'París',id:'paris-night',note:'París es solo el comienzo.'}");
source=source.replace("{name:'Puerto Rico',id:'puerto-rico',note:'Color, mar y ganas de volver.'}", "{name:'Caribe',destination:'Puerto Rico',id:'puerto-rico',note:'Puerto Rico: color, mar y ganas de volver.'}");
source=source.replace('chooseDestination(card.name,card.name', 'chooseDestination(card.destination || card.name,card.name');
source=source.replace('<section className="final-adventure"><div', '<section className="final-adventure"><AmbientSky finale /><div');
source=source.replace('Cuéntame qué tienes en mente.<br />Yo te ayudo a convertirlo en tu próximo viaje.', 'Cuéntame el viaje que tienes en mente.<br />Yo te ayudo con el resto.');
await writeFile('src/TravelWorld.jsx',source);
