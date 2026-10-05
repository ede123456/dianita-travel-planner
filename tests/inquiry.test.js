import test from 'node:test';
import assert from 'node:assert/strict';
import { validateInquiry, formatInquiry, buildWhatsAppUrl } from '../src/inquiry.js';
const valid = { name: 'Prueba', email: 'prueba@example.com', whatsapp: '+1 202 555 0199', destination: 'Caribe', travelers: '2' };
 test('requires contact information and destination', () => { assert.deepEqual(Object.keys(validateInquiry({})), ['name','email','whatsapp','destination','travelers']); });
 test('accepts valid inquiry and rejects malformed values', () => { assert.deepEqual(validateInquiry(valid), {}); assert.equal(Object.keys(validateInquiry({...valid,email:'bad',whatsapp:'abc',travelers:'1.5'})).length,3); });
 test('rejects zero travelers and whitespace-only names', () => { assert.ok(validateInquiry({...valid, travelers:'0'}).travelers); assert.ok(validateInquiry({...valid,name:'  '}).name); });
 test('summary includes current fields, optional defaults and selected services', () => { const summary=formatInquiry(valid,['Disney','Traslados']); assert.match(summary,/📍 Destino:\nCaribe/); assert.match(summary,/🏨 Tipo de viaje \/ servicios:\nDisney, Traslados/); assert.match(summary,/📅 Fechas:\nPor decidir/); assert.match(summary,/💰 Presupuesto:\nPor definir/); assert.match(summary,/💬 Detalles adicionales:\nSin detalles adicionales/); });
 test('WhatsApp URL preserves special characters, emojis, spaces and line breaks', () => {
  const values = { ...valid, name: 'Dianita & familia 🌴', dates: '10 al 17 de julio', budget: 'US$2,000 & más', type: 'En familia', message: 'Harry Potter + Volcano Bay 😍' };
  const message = formatInquiry(values, ['Universal', 'Crucero']);
  const url = new URL(buildWhatsAppUrl('+1 (829) 669-7499', message));
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, '/18296697499');
  assert.equal(url.searchParams.get('text'), message);
  assert.match(message, /Nombre:\nDianita & familia 🌴/);
  assert.match(message, /En familia, Universal, Crucero/);
  assert.match(message, /Harry Potter \+ Volcano Bay 😍/);
 });
