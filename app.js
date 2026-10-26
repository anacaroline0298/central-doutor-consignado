const form = document.querySelector('#lead-form');
const radios = [...document.querySelectorAll('[name="produto"]')];
function syncProduct() {
 const insurance = form.elements.produto.value === 'Seguro auto';
 const consortium = form.elements.produto.value === 'Consórcio';
 document.querySelector('#other-fields').hidden = consortium || insurance;
 document.querySelector('#consorcio-fields').hidden = !consortium;
 document.querySelector('#seguro-fields').hidden = !insurance;
 form.elements.veiculo.required = insurance;
}
radios.forEach(r => r.addEventListener('change', syncProduct));
document.querySelectorAll('[data-product]').forEach(a => a.addEventListener('click', () => {
 radios.forEach(r => { r.checked = r.value === a.dataset.product; }); syncProduct();
}));
function url(text) { return 'https://wa.me/' + window.SITE_CONFIG.whatsapp + '?text=' + encodeURIComponent(text); }
document.querySelectorAll('[data-whatsapp]').forEach(a => { a.href = url('Olá! Quero informações sobre consórcio e seguro auto.'); });
form.addEventListener('submit', e => {
 e.preventDefault();
 if (!form.reportValidity()) return;
 const d = new FormData(form);
 let message = 'Olá, Doutor Consignado! Quero atendimento sobre ' + d.get('produto') + '.\nNome: ' + d.get('nome').trim() + '\nCidade/UF: ' + d.get('cidade').trim();
 message += d.get('produto') === 'Consórcio' ? '\nCrédito desejado: ' + d.get('credito') : d.get('produto') === 'Seguro auto' ? '\nVeículo: ' + d.get('veiculo').trim() + '\nCotação: ' + d.get('tipo') : '\nObjetivo: ' + d.get('objetivo').trim();
 window.location.assign(url(message));
});
const dialog = document.querySelector('#privacy');
['privacy-open','privacy-footer'].forEach(id => document.getElementById(id).addEventListener('click', () => dialog.showModal()));
document.querySelector('#privacy-close').addEventListener('click', () => dialog.close());
document.querySelector('#year').textContent = new Date().getFullYear();
syncProduct();

const insuranceTabs = [...document.querySelectorAll('[data-insurance]')];
function chooseInsurance(tab) {
 insuranceTabs.forEach(t => {
  const selected = t === tab;
  t.setAttribute('aria-selected', String(selected));
  t.tabIndex = selected ? 0 : -1;
  document.getElementById(t.getAttribute('aria-controls')).hidden = !selected;
 });
}
insuranceTabs.forEach((tab,index) => {
 tab.addEventListener('click', () => chooseInsurance(tab));
 tab.addEventListener('keydown', e => {
  let next;
  if(e.key === 'ArrowRight') next = (index+1)%insuranceTabs.length;
  if(e.key === 'ArrowLeft') next = (index+insuranceTabs.length-1)%insuranceTabs.length;
  if(e.key === 'Home') next = 0;
  if(e.key === 'End') next = insuranceTabs.length-1;
  if(next !== undefined){e.preventDefault();chooseInsurance(insuranceTabs[next]);insuranceTabs[next].focus();}
 });
});

// Resize each simulator independently, including downloaded file:// pages.
const simulators = [
 { src: 'simulador-consorcio.html', type: 'consorcio:resize', request: 'consorcio:request-size' },
 { src: 'simulador-imoveis.html', type: 'doutor-imoveis-height', request: 'doutor-imoveis-request-height' }
];
for (const simulator of simulators) {
 const frame = document.querySelector(`iframe[src="${simulator.src}"]`);
 if (!frame) continue;
 window.addEventListener('message', event => {
  if (event.source !== frame.contentWindow) return;
  const expectedOrigin = location.protocol === 'file:' ? 'null' : location.origin;
  if (event.origin !== expectedOrigin || event.data?.type !== simulator.type) return;
  const height = event.data.height;
  if (typeof height === 'number' && Number.isFinite(height) && height > 0) {
   frame.style.height = Math.ceil(height) + 'px';
  }
 });
 frame.addEventListener('load', () => {
  frame.contentWindow.postMessage({ type: simulator.request }, '*');
 });
}

// Mobile navigation stays a normal list of links when JavaScript is unavailable.
const menuToggle = document.querySelector('.menu-toggle');
const siteMenu = document.getElementById('site-menu');
const mobileNavigation = window.matchMedia('(max-width: 850px)');
function closeNavigation(returnFocus = false) {
 menuToggle.setAttribute('aria-expanded', 'false');
 menuToggle.setAttribute('aria-label', 'Abrir menu principal');
 siteMenu.hidden = mobileNavigation.matches;
 if (returnFocus) menuToggle.focus({ preventScroll: true });
}
menuToggle.addEventListener('click', () => {
 const open = menuToggle.getAttribute('aria-expanded') !== 'true';
 menuToggle.setAttribute('aria-expanded', String(open));
 menuToggle.setAttribute('aria-label', open ? 'Fechar menu principal' : 'Abrir menu principal');
 siteMenu.hidden = !open;
});
siteMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
 if (!mobileNavigation.matches) return;
 closeNavigation();
 const target = document.getElementById(link.hash.slice(1));
 if (target) { target.tabIndex = -1; target.focus({ preventScroll: true }); }
}));
document.addEventListener('keydown', event => {
 if (event.key === 'Escape' && mobileNavigation.matches && menuToggle.getAttribute('aria-expanded') === 'true') closeNavigation(true);
});
document.addEventListener('click', event => {
 if (mobileNavigation.matches && !menuToggle.closest('header').contains(event.target)) closeNavigation();
});
mobileNavigation.addEventListener('change', () => closeNavigation());
closeNavigation();
