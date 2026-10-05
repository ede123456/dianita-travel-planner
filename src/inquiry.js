export function validateInquiry(values) {
  const errors = {};
  if (!values.name?.trim()) errors.name = 'Escribe tu nombre.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email || '')) errors.email = 'Escribe un email válido.';
  if (!/^\+?[\d\s().-]{7,22}$/.test(values.whatsapp || '') || (values.whatsapp.match(/\d/g) || []).length < 7) errors.whatsapp = 'Escribe un número válido con código de país.';
  if (!values.destination?.trim()) errors.destination = 'Indica un destino o escribe «Por decidir».';
  if (!Number.isInteger(Number(values.travelers)) || Number(values.travelers) < 1 || Number(values.travelers) > 99) errors.travelers = 'Indica entre 1 y 99 viajeros.';
  return errors;
}
export function formatInquiry(v, interests) {
  const services = [v.type, ...interests].filter(Boolean).join(', ') || 'Por definir';
  return [
    '✈️ NUEVA SOLICITUD DE VIAJE',
    '',
    '👤 Nombre:', v.name,
    '',
    '📱 WhatsApp:', v.whatsapp,
    '',
    '✉️ Email:', v.email,
    '',
    '📍 Destino:', v.destination,
    '',
    '📅 Fechas:', v.dates?.trim() || 'Por decidir',
    '',
    '👥 Viajeros:', v.travelers,
    '',
    '💰 Presupuesto:', v.budget?.trim() || 'Por definir',
    '',
    '🏨 Tipo de viaje / servicios:', services,
    '',
    '💬 Detalles adicionales:', v.message?.trim() || 'Sin detalles adicionales',
    '',
    '────────────────',
    '',
    'Solicitud enviada desde',
    'Dianita Travel Planner ✈️💕',
  ].join('\n');
}

export function buildWhatsAppUrl(phone, message) {
  return `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
}
