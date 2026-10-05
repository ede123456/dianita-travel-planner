export const travelPhotos = [
  { id: 'baseball', place: 'Día de béisbol', note: 'También se viaja por la emoción.', alt: 'Dianita en las gradas de un estadio de béisbol', position: '50% 42%' },
  { id: 'paris-night', place: 'París', note: 'París, después de las luces.', alt: 'Dianita con la Torre Eiffel iluminada detrás', position: '50% 45%' },
  { id: 'puerto-rico', place: 'Puerto Rico', note: 'Un poquito de color, por favor.', alt: 'Dianita frente a una puerta pintada con la bandera de Puerto Rico', position: '50% 55%' },
  { id: 'disney-pink', place: 'Orlando', note: 'Nunca es demasiado tarde para la magia.', alt: 'Dianita con blusa rosa y orejas de Minnie frente al castillo de Disney', position: '50% 48%' },
  { id: 'brooklyn', place: 'Nueva York', note: 'Un paseo que sí estaba en el itinerario.', alt: 'Dianita paseando por el puente de Brooklyn', position: '50% 50%' },
  { id: 'disney-castle', place: 'Orlando', note: 'Aquí los sueños tienen castillo.', alt: 'Dianita junto a la baranda frente al castillo de Disney entre árboles', position: '50% 55%' },
  { id: 'louvre', place: 'París', note: 'Siempre pensando en el próximo viaje.', alt: 'Dianita frente a la pirámide de cristal del Louvre', position: '50% 50%' },
  { id: 'paris-fountains', place: 'París', note: 'Una postal para guardar.', alt: 'Dianita junto a las fuentes con vista a la Torre Eiffel', position: '50% 55%' },
  { id: 'overlook', place: 'Entre montañas', note: 'Otra vista que se queda conmigo.', alt: 'Dianita en un mirador sobre un paisaje de lagos y montañas', position: '50% 52%' },
  { id: 'universal-volcano-bay', place: 'Orlando', note: 'Diversión y aventura en cada rincón', alt: 'Dianita frente al volcán y las cascadas de Volcano Bay', position: '50% 55%', src: '/imagenes/dianita/universal-volcano-bay-800.webp', srcSet: '/imagenes/dianita/universal-volcano-bay-480.webp 480w, /imagenes/dianita/universal-volcano-bay-800.webp 800w, /imagenes/dianita/universal-volcano-bay-1200.webp 1200w' },
  { id: 'universal-harry-potter', place: 'Orlando', note: 'Magia, emoción y experiencias inolvidables', alt: 'Dianita en The Wizarding World of Harry Potter en Universal Studios', position: '50% 48%', src: '/imagenes/dianita/universal-harry-potter-800.webp', srcSet: '/imagenes/dianita/universal-harry-potter-480.webp 480w, /imagenes/dianita/universal-harry-potter-800.webp 800w, /imagenes/dianita/universal-harry-potter-1200.webp 1200w' },
];
export const photoById = Object.fromEntries(travelPhotos.map(photo => [photo.id, photo]));
export function photoUrl(id, width = 800) { return photoById[id].src || `/imagenes/dianita/${id}-${width}.webp`; }
