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
