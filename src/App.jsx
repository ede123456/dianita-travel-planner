import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, List, X, WhatsappLogo, Check, Sun, Moon, DownloadSimple } from '@phosphor-icons/react';
import { contact, interests } from './content';
import { TravelHero, TravelMarquee, PersonalAbout, InteractiveServices, MagicExperience, TravelDiary, DestinationCarousel, FinalAdventure, PhotoViewer, FlightRoute, OceanCruises } from './TravelWorld';
import { validateInquiry, formatInquiry, buildWhatsAppUrl } from './inquiry';

const nav = [['Inicio', '#inicio'], ['Sobre mí', '#sobre-mi'], ['Servicios', '#servicios'], ['Experiencias', '#experiencias'], ['Cómo funciona', '#como-funciona'], ['Contacto', '#contacto']];
const Arrow = () => <ArrowUpRight size={18} aria-hidden="true" />;
function Brand() { return <a className="brand" href="#inicio" title="Volver al inicio"><span>Dianita<span className="brand-period">.</span></span><small>TRAVEL PLANNER</small></a>; }
function Header({ dark, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    observer.observe(document.getElementById('top-marker'));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = e => { if (e.key === 'Escape') { setOpen(false); document.getElementById('menu-toggle').focus(); } };
    const closeOutside = e => { if (!document.querySelector('.header')?.contains(e.target)) setOpen(false); };
    document.addEventListener('keydown', close);
    document.addEventListener('pointerdown', closeOutside);
    return () => {
      document.removeEventListener('keydown', close);
      document.removeEventListener('pointerdown', closeOutside);
    };
  }, [open]);
  return <header className={`header ${scrolled ? 'is-scrolled' : ''}`}><div className="nav-shell">
    <Brand />
    <nav className={open ? 'navigation is-open' : 'navigation'} aria-label="Navegación principal" id="main-nav">{nav.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}</nav>
    <div className="nav-actions"><a className="button nav-cta" href="#contacto">PLANIFICA TU VIAJE <Arrow /></a><button className="icon-button theme-toggle" onClick={toggleTheme} aria-label={dark ? 'Activar modo claro' : 'Activar modo oscuro'}>{dark ? <Sun size={20} /> : <Moon size={19} />}</button><button id="menu-toggle" className="icon-button menu-toggle" aria-expanded={open} aria-controls="main-nav" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen(!open)}>{open ? <X size={26} /> : <List size={26} />}</button></div>
  </div></header>;
}
function InquiryForm({ destination, selectedInterests, setSelectedInterests }) {
  const interestSymbols = ['✈', '🏨', '🏰', '🎢', '🚢', '🌴', '🚐', '🛡'];
  const [errors, setErrors] = useState({});
  const [summary, setSummary] = useState('');
  const resultRef = useRef(null);
  useEffect(() => { if (summary) resultRef.current?.focus(); }, [summary]);
  function submit(event) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const nextErrors = validateInquiry(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) { document.getElementById(Object.keys(nextErrors)[0])?.focus(); return; }
    const message = formatInquiry(values, selectedInterests);
    setSummary(message);
    window.open(buildWhatsAppUrl(contact.whatsapp, message), '_blank', 'noopener,noreferrer');
  }
  function download() {
    const url = URL.createObjectURL(new Blob([summary], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'mi-viaje-con-dianita.txt'; anchor.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  const field = (id, label, type = 'text', { key, ...extra } = {}) => <div className="field"><label htmlFor={id}>{label}{['name','whatsapp','email','destination','travelers'].includes(id) && <span aria-hidden="true"> *</span>}</label><input key={key} id={id} name={id} type={type} aria-invalid={!!errors[id]} aria-describedby={errors[id] ? `${id}-error` : undefined} required={['name','whatsapp','email','destination','travelers'].includes(id)} {...extra} />{errors[id] && <span className="field-error" id={`${id}-error`}>{errors[id]}</span>}</div>;
  return <section id="contacto" className="section contact-section"><div className="contact-intro reveal"><span className="eyebrow">HAGAMOS QUE SUCEDA</span><h2>Cuéntame tu<br /><em>viaje ideal</em> ✨</h2><p>No necesitas tenerlo todo decidido. Una idea, un destino o las ganas de escaparte son un buen comienzo.</p><div className="personal-note"><span className="signature">Dianita</span><p>Te acompaño en cada detalle.</p></div><p className="form-note">Los campos con * son obligatorios.<br />Tus datos solo se comparten al abrir WhatsApp.</p></div><form className="inquiry-form reveal" onSubmit={submit} noValidate onChange={() => { if (summary) setSummary(''); }}>
    <div className="form-grid">{field('name', 'Nombre', 'text', { autoComplete: 'name', placeholder: '¿Cómo te llamas?' })}{field('whatsapp', 'WhatsApp', 'tel', { autoComplete: 'tel', placeholder: '+1 555 123 4567' })}{field('email', 'Email', 'email', { autoComplete: 'email', placeholder: 'tu@email.com' })}{field('destination', '¿A dónde quieres escapar?', 'text', { key: destination, defaultValue: destination, placeholder: 'Un lugar que sueñas conocer' })}{field('dates', '¿Cuándo hacemos las maletas?', 'text', { placeholder: 'Ej. julio de 2027, una semana' })}{field('travelers', '¿Quiénes se van?', 'number', { min: 1, max: 99, defaultValue: 2 })}<div className="field"><label htmlFor="budget">¿Qué presupuesto tienes en mente?</label><select id="budget" name="budget"><option value="">Por definir</option><option>Menos de US$2,000</option><option>US$2,000 a US$5,000</option><option>US$5,000 a US$10,000</option><option>Más de US$10,000</option></select></div><div className="field"><label htmlFor="type">Tipo de viaje</label><select id="type" name="type"><option value="">¿Con quién te vas?</option><option>En pareja</option><option>En familia</option><option>Con amigos</option><option>Viajo por mi cuenta</option><option>Celebración especial</option></select></div></div>
    <fieldset className="interests"><legend>¿Qué te gustaría incluir?</legend><div>{interests.map((interest, index) => <label className="interest" key={interest}><input type="checkbox" name="interests" value={interest} checked={selectedInterests.includes(interest)} onChange={e => setSelectedInterests(current => e.target.checked ? [...current, interest] : current.filter(item => item !== interest))} /><span><span aria-hidden="true">{interestSymbols[index]}</span>{selectedInterests.includes(interest) && <Check size={14} aria-hidden="true" />}{interest}</span></label>)}</div></fieldset><div className="field"><label htmlFor="message">Ahora sí... cuéntamelo TODO 👀</label><textarea id="message" name="message" rows="4" placeholder="Esos pequeños detalles que lo harían especial para ti." /></div><button className="button submit-button" type="submit">VAMOS A PLANEARLO ✈ <Arrow /></button><p className="submission-note">Al continuar, WhatsApp se abrirá con el mensaje para que puedas revisarlo y enviarlo.</p>
    {summary && <div className="form-success" ref={resultRef} tabIndex={-1} role="status"><h3>Tu idea de viaje está lista.</h3><p>Revisa tus datos y envíalos directamente a Dianita por WhatsApp para comenzar a planificar tu próxima aventura.</p><button type="button" className="text-link" onClick={download}>DESCARGAR MI VIAJE <DownloadSimple size={18} /></button>{contact.whatsapp && <a className="text-link" href={buildWhatsAppUrl(contact.whatsapp, summary)} target="_blank" rel="noopener noreferrer">ENVIAR POR WHATSAPP <Arrow /></a>}</div>}
  </form></section>;
}
export default function App() {
  const [dark, setDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);
  const [destination, setDestination] = useState('');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [notice, setNotice] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [motionPaused, setMotionPaused] = useState(false);
  useEffect(() => { document.documentElement.dataset.motionPaused = String(motionPaused); }, [motionPaused]);
  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light'; }, [dark]);
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      elements.forEach(element => element.classList.add('visible'));
      return;
    }
    document.documentElement.dataset.revealReady = 'true';
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: 0.08, rootMargin: '0px 0px 120px 0px' });
    elements.forEach(element => observer.observe(element));
    return () => {
      delete document.documentElement.dataset.revealReady;
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('ambient-outside', !entry.isIntersecting)));
    document.querySelectorAll('.dreamy-hero, .final-adventure').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  function chooseDestination(name, interest) { setDestination(name); if (interest) setSelectedInterests(current => current.includes(interest) ? current : [...current, interest]); }
  return <><div id="top-marker" /><a className="skip-link" href="#main">Saltar al contenido</a><Header dark={dark} toggleTheme={() => setDark(!dark)} /><main id="main">
    <TravelHero onOpen={setSelectedPhoto} motionPaused={motionPaused} toggleMotion={() => setMotionPaused(value => !value)} /><TravelMarquee />
    <div className="trust-line"><span>Agente de viajes certificada</span><span className="trust-divider" /><span>Disney</span><span>Universal</span><span>Cruceros</span></div>
    <PersonalAbout onOpen={setSelectedPhoto} />
    <InteractiveServices />
    <MagicExperience onOpen={setSelectedPhoto} chooseDestination={chooseDestination} />
    <TravelDiary onOpen={setSelectedPhoto} />
    <OceanCruises chooseDestination={chooseDestination} />
    <section id="como-funciona" className="section process-section"><div className="process-heading reveal"><h2>De “quiero viajar”<br />a <em>“ya hice la maleta”.</em></h2><p>Cuatro momentos. Una aventura que empieza contigo.</p></div><div className="journey-map"><FlightRoute id="process" /><ol className="journey">{[['ME CUENTAS ✨', 'Destino, fechas, viajeros, presupuesto y lo que imaginas.'], ['YO INVESTIGO 🔎', 'Busco opciones que encajen contigo y con tu forma de viajar.'], ['LO PLANEAMOS 💗', 'Afinamos cada detalle hasta encontrar tu combinación ideal.'], ['TÚ VIAJAS ✈', 'Tu plan organizado. Tu maleta lista. A disfrutar.']].map(([title, text], i) => <li className="reveal" key={title}><span className="step-number">0{i+1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></div></section>
    <DestinationCarousel chooseDestination={chooseDestination} />
    <section className="testimonials-section section reveal"><div><h2>Viajeros felices =<br /><em>Dianita feliz</em> 💗</h2><p className="sample-label">Un adelanto de este espacio · Testimonio de ejemplo</p></div><figure className="testimonial-letter"><span className="letter-stamp" aria-hidden="true">CON CARIÑO<br />DESDE MI VIAJE ♡</span><span className="quote-mark" aria-hidden="true">“</span><blockquote>“Dianita se encargó de cada detalle. Nosotros solo tuvimos que preocuparnos por disfrutar.”</blockquote><figcaption>Aquí irá la historia de un viajero real.<br /><small>Texto de muestra, pendiente de reemplazar.</small></figcaption></figure></section>
    <InquiryForm destination={destination} selectedInterests={selectedInterests} setSelectedInterests={setSelectedInterests} />
    <FinalAdventure onOpen={setSelectedPhoto} />
  </main><footer className="footer"><div className="footer-top"><div><Brand /><p>Tu viaje. Tu experiencia. Mi planificación.</p></div><nav aria-label="Navegación del pie de página">{nav.filter(([label]) => label !== 'Cómo funciona').map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav><div className="socials">{[['Instagram','instagram'],['Facebook','facebook'],['WhatsApp','whatsapp']].map(([label,key]) => contact[key] ? <a key={key} href={key === 'whatsapp' ? `https://wa.me/${contact[key]}` : contact[key]} target="_blank" rel="noreferrer">{label}<Arrow /></a> : <button key={key} onClick={() => setNotice(`El contacto de ${label} estará disponible pronto. Mientras tanto, prepara tu idea en el formulario.`)}>{label}<Arrow /></button>)}</div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Dianita Travel Planner</span><span>Información de certificación y agencia próximamente.</span><span>Hecho para empezar a viajar.</span></div></footer>
    <button className="whatsapp-float" aria-label="Hablemos de tu viaje por WhatsApp" onClick={() => contact.whatsapp ? window.open(`https://wa.me/${contact.whatsapp}`, '_blank', 'noopener,noreferrer') : setNotice('El número de WhatsApp de Dianita estará disponible pronto. Puedes preparar tu viaje en el formulario.')}><WhatsappLogo size={25} weight="regular" /><span>Hablemos de tu viaje</span></button>
    {notice && <div className="contact-notice" role="status"><button className="icon-button" aria-label="Cerrar aviso" onClick={() => setNotice('')}><X size={20} /></button><p>{notice}</p><a className="text-link" href="#contacto" onClick={() => setNotice('')}>PLANIFICA TU VIAJE <Arrow /></a></div>}
    <PhotoViewer selected={selectedPhoto} onClose={() => setSelectedPhoto(null)} onSelect={setSelectedPhoto} />
  </>;
}







