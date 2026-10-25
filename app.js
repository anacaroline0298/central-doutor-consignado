const form = document.querySelector('#lead-form');
const radios = [...document.querySelectorAll('[name="produto"]')];
function syncProduct() {
 const insurance = form.elements.produto.value === 'Seguro auto';
 document.querySelector('#consorcio-fields').hidden = insurance;
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
 message += d.get('produto') === 'Consórcio' ? '\nCrédito desejado: ' + d.get('credito') : '\nVeículo: ' + d.get('veiculo').trim() + '\nCotação: ' + d.get('tipo');
 window.location.assign(url(message));
});
const dialog = document.querySelector('#privacy');
['privacy-open','privacy-footer'].forEach(id => document.getElementById(id).addEventListener('click', () => dialog.showModal()));
document.querySelector('#privacy-close').addEventListener('click', () => dialog.close());
document.querySelector('#year').textContent = new Date().getFullYear();
syncProduct();
