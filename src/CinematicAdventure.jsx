'use client';

import { useEffect, useRef } from 'react';
import { AirplaneTilt, Sparkle, SuitcaseRolling } from '@phosphor-icons/react';
import './cinematic-adventure.css';

export default function CinematicAdventure({ motionPaused }) {
  const section = useRef(null);
  const video = useRef(null);

  useEffect(() => {
    const element = video.current;
    const container = section.current;
    element.muted = true;
    element.defaultMuted = true;
    element.playsInline = true;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let inView = false;
    let disposed = false;
    const syncPlayback = () => {
      const play = inView && !motionPaused && !preference.matches && !document.hidden;
      container.classList.toggle('cinema-resting', !play);
      element.autoplay = play;
      if (play && element.getAttribute('src')) {
        element.play().then(() => { if (disposed) element.pause(); }).catch(() => {});
      } else element.pause();
    };
    const load = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      if (!element.getAttribute('src')) element.src = '/videos/disney-dianita.mp4';
      load.disconnect();
      syncPlayback();
    }, { rootMargin: '250px' });
    const visibility = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.08 });
    load.observe(element);
    visibility.observe(element);
    preference.addEventListener('change', syncPlayback);
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      disposed = true;
      load.disconnect();
      visibility.disconnect();
      preference.removeEventListener('change', syncPlayback);
      document.removeEventListener('visibilitychange', syncPlayback);
      element.pause();
    };
  }, [motionPaused]);

  return <section ref={section} className="cinematic-adventure" aria-labelledby="adventure-title">
    <div className="section cinema-layout">
      <div className="cinema-copy reveal">
        <p className="cinema-eyebrow">TU PRÓXIMA AVENTURA <span aria-hidden="true">✦</span></p>
        <h2 id="adventure-title"><span>La magia</span> comienza<br />desde que empiezas<br />a planear.</h2>
        <p className="cinema-description">Desde Disney hasta ese destino que llevas años soñando, Dianita te acompaña a organizar cada detalle para que tú solo tengas que disfrutar la experiencia.</p>
        <a className="button" href="#contacto">Planea tu viaje <span aria-hidden="true">✨</span></a>
        <div className="cinema-keepsake" aria-hidden="true"><SuitcaseRolling size={24} weight="light" /><span /><AirplaneTilt size={25} weight="light" /><span className="handwritten">Todo empieza con un sueño.</span></div>
      </div>
      <div className="cinema-scene reveal">
        <div className="cinema-parallax">
          <div className="cinema-blob cinema-blob-pink" aria-hidden="true" />
          <div className="cinema-blob cinema-blob-blue" aria-hidden="true" />
          <div className="cinema-postcard">
            <div className="cinema-window">
              <img src="/videos/disney-dianita-poster.webp" alt="" loading="lazy" width="854" height="480" />
              <video ref={video} autoPlay muted loop playsInline preload="metadata" poster="/videos/disney-dianita-poster.webp" aria-label="Dianita frente al castillo de Disney" />
            </div>
          </div>
          <Sparkle className="cinema-spark cinema-spark-large" weight="fill" aria-hidden="true" />
          <Sparkle className="cinema-spark cinema-spark-small" weight="light" aria-hidden="true" />
        </div>
      </div>
    </div>
  </section>;
}
