# Sección cinematográfica de Dianita

## Cambios
- `src/App.jsx`: inserta la sección entre PersonalAbout e InteractiveServices. Corrige una advertencia preexistente de React: key se pasa directamente al input.
- `src/CinematicAdventure.jsx`: video con carga cercana al viewport, reproducción silenciosa en bucle, pausa fuera de pantalla, pestaña oculta, pausa global y movimiento reducido. CTA a #contacto.
- `src/cinematic-adventure.css`: composición editorial, colores y fuentes existentes, entrada escalonada, flotación de 5 px y parallax CSS de 20 px de recorrido total. Columnas desde 768 px y apilado móvil.
- `public/videos/disney-dianita.mp4`: copia del archivo encontrado en public/imagenes/dianita/videos/woman_smiling_by_castle_28751_Seedance_25.mp4. Original conservado.
- `public/videos/disney-dianita-poster.webp`: fotograma del video, 53 KB.
- `scripts/prepare-video-poster.mjs`: extracción reproducible del poster.
- `scripts/check-cinema.mjs`: comprobación de carga, responsive, reproducción, pausas y consola.

## Verificación
- URL /videos/disney-dianita.mp4: HTTP 200, video/mp4. 854 × 480, 5.056 s, 3.17 MB.
- Autoplay, muted, loop, playsInline activos al verse; sin controles. Carga diferida hasta aproximarse al viewport.
- Inspección visual desktop, tablet, móvil y modo oscuro. Capturas en esta carpeta.
- Anchos probados: 1440, 1024, 768, 390, 320 px; sin desbordamiento horizontal.
- Pausa global, fuera de pantalla y prefers-reduced-motion comprobados.
- Consola: cero errores en el recorrido automatizado de Chrome.
- Build de producción correcto; cuatro pruebas existentes pasan.
- Lighthouse móvil: rendimiento 87, accesibilidad 100, buenas prácticas 100, SEO 100. LCP 3.8 s; CLS 0.002. El LCP global sigue por encima del objetivo de 2.5 s; no se afirma cumplir todos los Core Web Vitals.

Se preservaron navegación, contenido y diseño de las otras secciones. El formato vertical, eyebrow, texto y CTA siguen el encargo explícito del usuario; no se aplicaron restricciones genéricas del skill que contradijeran ese encargo.
