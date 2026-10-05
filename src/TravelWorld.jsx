import DiaryBackground from './DiaryBackground';
import { useEffect, useRef, useState } from 'react';
import { AirplaneTilt, ArrowUpRight, ArrowRight, ArrowLeft, MapPin, Sparkle, StarFour, X, Pause, Play, Check, Plus, Cloud, Heart, Boat, Buildings, Bus, ShieldCheck, SuitcaseRolling } from '@phosphor-icons/react';
import { photoById, photoUrl, travelPhotos } from './travelPhotos';
import { images, services } from './content';

export function RealPhoto({ id, eager = false, className = '', sizes = '(max-width: 700px) 85vw, 35vw' }) {
  const photo = photoById[id];
  const src = photoUrl(id);
  const srcSet = photo.srcSet || (photo.src ? undefined : `${photoUrl(id, 480)} 480w, ${photoUrl(id, 800)} 800w, ${photoUrl(id, 1200)} 1200w`);
  return <img className={className} src={src} srcSet={srcSet} sizes={sizes} alt={photo.alt} style={{ objectPosition: photo.position }} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" draggable="false" />;
}
function Postcard({ id, className = '', eager = false, onOpen, note, sizes }) {
  return <button className={`postcard ${className}`} onClick={() => onOpen(id)} aria-label={`${note || photoById[id].place}. Ver foto: ${photoById[id].place}. ${photoById[id].alt}`}><span className="postcard-image"><RealPhoto id={id} eager={eager} sizes={sizes} /><span className="location-reveal"><MapPin size={15} weight="fill" />{photoById[id].place}<ArrowUpRight size={16} /></span></span><span className="postcard-caption">{note || photoById[id].place}<span aria-hidden="true">↗</span></span></button>;
}
export function AmbientSky({ finale = false }) {
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
    {id:'paris-night', className:'hero-postcard-paris', treatment:'photo-polaroid', note:'París, siempre ♡'},
    {id:'disney-pink', className:'hero-postcard-disney', treatment:'photo-rounded', note:'Orlando, mi lugar feliz ✨'},
    {id:'brooklyn', className:'hero-postcard-newyork', treatment:'photo-taped', note:'Próxima parada: New York'},
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
    <button className="ambient-control" aria-pressed={motionPaused} onClick={() => { reset(); toggleMotion(); }} aria-label={motionPaused ? 'Reanudar animaciones' : 'Pausar animaciones'}>{motionPaused ? <Play size={14} /> : <Pause size={14} />}<span>{motionPaused ? 'Reanudar animaciones' : 'Pausar animaciones'}</span></button>
  </section>;
}

export function TravelMarquee() {
  const [paused, setPaused] = useState(false);
  const text = 'VIAJEMOS ✦ DISNEY ✦ CRUCEROS ✦ RESORTS ✦ UNIVERSAL ✦ ESCAPADAS ✦ VUELOS ✦ AVENTURAS ✦ ';
  return <section className={`travel-marquee ${paused ? 'paused' : ''}`} aria-label="Inspiración para viajar"><div className="marquee-window"><div className="marquee-track"><span>{text}</span><span aria-hidden="true">{text}</span></div></div><button onClick={() => setPaused(!paused)} aria-label={paused ? 'Reanudar cinta de viajes' : 'Pausar cinta de viajes'}>{paused ? <Play size={17} weight="fill" /> : <Pause size={17} weight="fill" />}</button></section>;
}
export function PersonalAbout({ onOpen }) {
  return <section id="sobre-mi" className="personal-about section"><div className="about-scrapbook reveal"><Postcard id="louvre" onOpen={onOpen} note="Dianita, en su elemento ♡" /><span className="about-note note-certified handwritten">Agente certificada <Check size={19} /></span><span className="about-note note-disney handwritten">Europa ✨</span><span className="about-note note-universal handwritten">El mundo 🌍</span><span className="about-note note-travel handwritten">Travel obsessed ✈</span><StarFour className="about-star" weight="fill" aria-hidden="true" /></div><div className="personal-about-copy reveal"><span className="eyebrow">EUROPA Y EL MUNDO</span><h2>Descubre el mundo<br /><em>a tu manera</em></h2><p className="about-lead">Tu travel planner, copiloto y cómplice de aventuras.</p><p>Desde las calles llenas de historia de Europa hasta destinos inolvidables alrededor del mundo, te ayudo a planificar cada detalle para que solo tengas que preocuparte por disfrutar.</p><a className="text-link" href="#como-funciona">ASÍ PLANEAMOS TU VIAJE <ArrowRight size={19} /></a><span className="handwritten personal-signature">Siempre pensando en el próximo viaje. ♡</span></div></section>;
}
export function InteractiveServices() {
  const [active, setActive] = useState(0);
  const keyboardSelection = useRef(false);
  const visuals = ['paris-fountains', null, 'brooklyn', null, 'overlook', 'puerto-rico'];
  const titles = ['Vuelos', 'Resorts & Hoteles', 'Traslados', 'Cruceros', 'Seguros de viaje', 'Paquetes vacacionales'];
  const symbols = [AirplaneTilt, Buildings, Bus, Boat, ShieldCheck, SuitcaseRolling];
  const ActiveSymbol = symbols[active];
  return <section id="servicios" className="world-services" data-service={active}><div className="section"><div className="services-title reveal"><h2>Yo planeo.<br /><em>Tú haces la maleta.</em> <span>💗</span></h2><p>De la primera idea al último detalle.<br />Todo conectado, todo pensado para ti.</p></div><div className="world-services-layout"><div className="interactive-service-list reveal">{services.map((service, i) => <div className={`interactive-service ${active === i ? 'active' : ''}`} key={service.title}><h3><button onMouseEnter={() => { if (!keyboardSelection.current) setActive(i); }} onMouseMove={() => { keyboardSelection.current = false; if (active !== i) setActive(i); }} onFocus={() => { keyboardSelection.current = true; setActive(i); }} onClick={() => setActive(i)} aria-expanded={active === i} aria-controls={`service-${i}`}><span className="service-name">{(() => { const Icon = symbols[i]; return <Icon size={23} aria-hidden="true" />; })()}{titles[i]}</span>{active === i ? <ArrowUpRight size={25} /> : <Plus size={20} />}</button></h3><p id={`service-${i}`} hidden={active !== i}>{service.text}</p></div>)}</div><figure className="service-stage reveal" aria-live="polite"><div className="service-stage-photo" key={active}>{visuals[active] ? <RealPhoto id={visuals[active]} /> : <img src={active === 3 ? images.cruise : images.resort} srcSet={active === 3 ? '/images/cruise-640.webp 640w, /images/cruise-960.webp 960w, /images/cruise.webp 1200w' : '/images/resort-640.webp 640w, /images/resort-960.webp 960w, /images/resort.webp 1200w'} sizes="(max-width: 700px) calc(100vw - 48px), (max-width: 900px) 45vw, 40vw" alt={active === 3 ? 'Cruceros en las aguas del Caribe' : 'Resort con una piscina junto al mar'} loading="lazy" decoding="async" />}</div><figcaption><span className="handwritten">{['Todo empieza con un «¿y si vamos?»', 'Tu pausa favorita.', 'Llegar también es parte del viaje.', 'Despertar en otro lugar.', 'Viajar con un plan, siempre.', 'Una escapada hecha a tu medida.'][active]}</span><ActiveSymbol size={32} className="service-symbol" aria-hidden="true" /></figcaption></figure></div></div></section>;
}
export function MagicExperience({ onOpen, chooseDestination }) {
  return <section id="experiencias" className="magic-section"><div className="magic-inner section"><div className="magic-copy reveal"><span className="magic-label"><Sparkle size={19} /> MOMENTOS QUE NO CABEN EN UNA FOTO</span><h2>Okay... ahora viene<br />la parte <em>mágica</em> ✨</h2><p className="handwritten magic-subtitle">Donde los sueños también tienen itinerario.</p><p>Yo también he sonreído frente a ese castillo. Te ayudo a planear los días, las entradas, el alojamiento y los traslados para que tú vivas tu propia historia.</p><div className="magic-links"><a className="button" href="#contacto" onClick={() => chooseDestination('Orlando', 'Disney')}>MI VIAJE A DISNEY <ArrowUpRight size={18} /></a><a className="text-link" href="#contacto" onClick={() => chooseDestination('Orlando', 'Universal')}>MI VIAJE A UNIVERSAL <ArrowRight size={18} /></a></div><div className="universal-ticket"><span>UNIVERSAL</span><p>Para quienes quieren un poquito más de adrenalina.</p><StarFour size={23} aria-hidden="true" /></div></div><div className="magic-photos"><div className="magic-main reveal"><Postcard id="universal-volcano-bay" onOpen={onOpen} note="Diversión y aventura en cada rincón" /></div><div className="magic-small reveal"><Postcard id="universal-harry-potter" onOpen={onOpen} note="Magia, emoción y experiencias inolvidables" /></div><StarFour className="magic-star-one" weight="fill" aria-hidden="true" /><Sparkle className="magic-star-two" weight="fill" aria-hidden="true" /><span className="magic-stamp">RECUERDOS<br />PARA SIEMPRE<br /><span>ORLANDO ♡</span></span></div><div className="magic-disney-gallery reveal"><Postcard id="disney-castle" className="magic-disney-castle" onOpen={onOpen} /><Postcard id="disney-pink" className="magic-disney-pink" onOpen={onOpen} /></div></div></section>;
}
export function FlightRoute({ id }) {
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
export function TravelDiary({ onOpen }) {
  const ids = ['puerto-rico', 'paris-fountains', 'baseball', 'overlook'];
  const notes = ['Ojalá estuvieras aquí 💌', 'Próxima parada →', 'Otro para los recuerdos ✨', 'Vuelvo pronto. Estoy explorando.'];
  return <section id="diario" className="diary-video-section"><DiaryBackground /><div className="travel-diary section"><FlightRoute id="diary" /><div className="diary-heading reveal"><span className="handwritten">Mi cámara, mi maleta y muchas historias.</span><h2>Dianita around<br /><em>the world</em> 🌎</h2><p>Pequeños pedacitos de los lugares que me han hecho feliz.<br />Toca una foto y ven conmigo.</p></div><div className="diary-collage" tabIndex={0} aria-label="Recuerdos de viaje de Dianita">{ids.map((id,i) => <div className={`diary-photo diary-photo-${i} reveal`} key={id}><Postcard id={id} className={i === 1 ? "photo-editorial" : i === 2 ? "photo-taped" : ""} onOpen={onOpen} note={photoById[id].place} /><span className="handwritten diary-annotation">{notes[i]}</span></div>)}</div><span className="diary-end handwritten">Todavía quedan muchas páginas por llenar…</span></div></section>;
}
export function DestinationCarousel({ chooseDestination }) {
  const track = useRef(null);
  const drag = useRef(null);
  const suppressClick = useRef(false);
  const cards = [{name:'Europa',destination:'París',id:'paris-night',note:'París es solo el comienzo.'},{name:'Orlando',id:'disney-pink',note:'La magia sí tiene dirección.'},{name:'Nueva York',id:'brooklyn',note:'Mil planes. Tu propia película.'},{name:'Caribe',destination:'Puerto Rico',id:'puerto-rico',note:'Puerto Rico: color, mar y ganas de volver.'},{name:'Cruceros',image:images.cruise,note:'Tu próxima parada, en el horizonte.'}];
  function pointerDown(e) { if(e.pointerType !== 'mouse' || e.button !== 0)return; suppressClick.current=false; drag.current={x:e.clientX,scroll:track.current.scrollLeft}; }
  function pointerMove(e) { if(!drag.current)return; const delta=e.clientX-drag.current.x; if(Math.abs(delta)>5){suppressClick.current=true;track.current.setPointerCapture(e.pointerId);track.current.scrollLeft=drag.current.scroll-delta;track.current.classList.add('is-dragging');} }
  function pointerUp(e) { drag.current=null;track.current.classList.remove('is-dragging');if(track.current.hasPointerCapture(e.pointerId))track.current.releasePointerCapture(e.pointerId); }
  function slide(direction){track.current.scrollBy({left:direction * track.current.clientWidth*.75,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
  return <section className="destination-section"><div className="destination-heading section reveal"><div><span className="eyebrow">COLECCIONA MOMENTOS, NO PENDIENTES</span><h2>Choose your<br /><em>next adventure.</em></h2><p className="destination-subtitle">¿Dónde hacemos el próximo check-in?</p></div><div className="carousel-controls"><button className="icon-button" aria-label="Destinos anteriores" onClick={()=>slide(-1)}><ArrowLeft size={23}/></button><button className="icon-button" aria-label="Más destinos" onClick={()=>slide(1)}><ArrowRight size={23}/></button></div></div><div className="postcard-carousel" ref={track} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp} onLostPointerCapture={()=>{drag.current=null;track.current?.classList.remove('is-dragging');}} onClickCapture={e=>{if(suppressClick.current){e.preventDefault();e.stopPropagation();suppressClick.current=false;}}} aria-label="Destinos para tu próximo viaje" tabIndex={0} onKeyDown={e=>{if(e.target===track.current && ['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();slide(e.key==='ArrowRight'?1:-1);}}}>{cards.map((card,i)=><a className={`destination-postcard destination-card-${i}`} key={card.name} href="#contacto" draggable="false" onClick={()=>chooseDestination(card.destination || card.name,card.name==='Cruceros'?'Crucero':undefined)}><div className="destination-postcard-image">{card.id?<RealPhoto id={card.id} sizes="(max-width: 700px) 80vw, 400px"/>:<img src={card.image} alt="Cruceros en el Caribe" loading="lazy" draggable="false"/>}<span className="destination-hover">ESTE PODRÍA SER TU PRÓXIMO VIAJE <ArrowUpRight size={20}/></span></div><div className="destination-card-caption"><h3>{card.name}</h3><MapPin size={20}/></div><p>{card.note}</p></a>)}</div><p className="carousel-hint handwritten">Un destino lleva a otro →</p></section>;
}
export function FinalAdventure({ onOpen }) {
  return <section className="final-adventure"><AmbientSky finale /><div className="final-copy reveal"><span className="handwritten">La próxima foto podría ser la tuya.</span><h2>Okay...<br />¿A dónde<br /><em>nos vamos?</em> <AirplaneTilt size={60} weight="fill" /></h2><p>Cuéntame el viaje que tienes en mente.<br />Yo te ayudo con el resto.</p><a className="button" href="#contacto">PLANIFICA MI VIAJE <ArrowUpRight size={20}/></a></div><div className="final-photo reveal"><Postcard id="overlook" onOpen={onOpen} note="Nos vemos en la próxima aventura ♡"/><span className="handwritten final-note">Más historias como esta, por favor.</span></div><StarFour className="final-star" weight="fill" aria-hidden="true"/></section>;
}
export function PhotoViewer({ selected, onClose, onSelect }) {
  const dialog=useRef(null);
  const index=travelPhotos.findIndex(photo=>photo.id===selected);
  const photo=travelPhotos[index];
  useEffect(()=>{
    if(!selected)return;
    const previous=document.body.style.overflow;
    document.body.style.overflow='hidden';
    if(!dialog.current.open)dialog.current.showModal();
    return ()=>{document.body.style.overflow=previous;};
  },[selected]);
  function step(direction){onSelect(travelPhotos[(index+direction+travelPhotos.length)%travelPhotos.length].id);}
  return <dialog ref={dialog} className="photo-viewer" aria-label="El álbum de Dianita" onCancel={e=>{e.preventDefault();e.currentTarget.close();}} onClose={onClose} onClick={e=>{if(e.target===e.currentTarget){e.currentTarget.close();}}} onKeyDown={e=>{if(e.key==='Escape'){e.preventDefault();dialog.current.close();return;}if(e.key==='ArrowRight'){e.preventDefault();step(1);}if(e.key==='ArrowLeft'){e.preventDefault();step(-1);}}}>{photo&&<><button className="viewer-close icon-button" aria-label="Cerrar foto" onClick={()=>dialog.current.close()}><X size={25}/></button><div className="viewer-image"><RealPhoto id={photo.id} eager sizes="(max-width:700px) 90vw, 65vw"/></div><div className="viewer-caption"><div><span className="handwritten">{photo.place}</span><p>{photo.note}</p></div><div className="viewer-controls"><button className="icon-button" aria-label="Foto anterior" onClick={()=>step(-1)}><ArrowLeft size={22}/></button><span>{index+1} / {travelPhotos.length}</span><button className="icon-button" aria-label="Foto siguiente" onClick={()=>step(1)}><ArrowRight size={22}/></button></div></div></>}</dialog>;
}



