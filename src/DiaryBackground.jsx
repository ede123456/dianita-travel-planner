import { useEffect, useRef } from 'react';

export default function DiaryBackground() {
  const ref = useRef(null);
  useEffect(() => {
    const video = ref.current;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let disposed = false;
    const allowed = () => !disposed && visible && !reduced.matches && !document.hidden && document.documentElement.dataset.motionPaused !== 'true';
    const sync = () => {
      video.autoplay = allowed();
      if (allowed()) {
        if (!video.getAttribute('src')) video.src = '/videos/disney-dianita.mp4';
        video.play().then(() => { if (!allowed()) video.pause(); }).catch(() => {});
      } else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(video.parentElement);
    const pauseObserver = new MutationObserver(sync);
    pauseObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion-paused'] });
    reduced.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => { disposed = true; observer.disconnect(); pauseObserver.disconnect(); reduced.removeEventListener('change', sync); document.removeEventListener('visibilitychange', sync); video.pause(); };
  }, []);
  return <div className="diary-background" aria-hidden="true"><video ref={ref} autoPlay muted loop playsInline preload="metadata" poster="/videos/disney-dianita-poster.webp" tabIndex={-1} /><div className="diary-background-overlay" /></div>;
}
