(() => {
 'use strict';
 const KEY = 'dc_central_privacy_preferences';
 const VERSION = '2026-10-26.1';
 const TTL = 180 * 24 * 60 * 60 * 1000;
 document.querySelectorAll('[data-current-year]').forEach(e => { e.textContent = new Date().getFullYear(); });
 // The parent page manages the choice for both same-site simulators.
 if (window.parent !== window) {
  document.body.dataset.privacyEmbedded = 'true';
  return;
 }
 let storageAvailable = true;
 let current = null;
 let expiryTimer;
 let opener;
 function readPreference() {
  try {
   const raw = localStorage.getItem(KEY);
   if (!raw) return null;
   let value;
   try { value = JSON.parse(raw); } catch { localStorage.removeItem(KEY); return null; }
   const valid = value && value.version === VERSION && ['accepted','rejected','necessary-only'].includes(value.choice)
    && Number.isSafeInteger(value.savedAt) && Number.isSafeInteger(value.expiresAt)
    && value.savedAt <= Date.now() && value.expiresAt === value.savedAt + TTL && value.expiresAt > Date.now();
   if (valid) return value;
   localStorage.removeItem(KEY);
  } catch { storageAvailable = false; }
  return null;
 }
 const banner = document.createElement('section');
 banner.className = 'dc-cookie-banner';
 banner.setAttribute('aria-labelledby', 'dc-cookie-title');
 banner.innerHTML = `<div class="dc-cookie-inner"><div><h2 id="dc-cookie-title">Cookies e privacidade</h2><p>Não utilizamos cookies opcionais nem rastreadores de análise ou publicidade. Guardamos apenas sua preferência neste navegador por até 180 dias. Aceitar ou rejeitar não ativa rastreadores: não há categorias opcionais nesta versão.</p><a href="privacidade.html">Política de Privacidade</a></div><div class="dc-cookie-actions"><button type="button" data-cookie-choice="accepted">Aceitar todos</button><button type="button" data-cookie-choice="rejected">Rejeitar não essenciais</button><button type="button" class="dc-cookie-configure" data-cookie-settings>Configurar preferências</button></div></div>`;
 const header = document.querySelector('body > header');
 if (header) header.after(banner); else document.body.prepend(banner);
 const dialog = document.createElement('dialog');
 dialog.className = 'dc-cookie-dialog';
 dialog.id = 'dc-cookie-preferences';
 dialog.setAttribute('aria-labelledby','dc-cookie-preferences-title');
 dialog.setAttribute('aria-describedby','dc-cookie-description');
 dialog.innerHTML = `<h2 id="dc-cookie-preferences-title" tabindex="-1">Configurações de Cookies</h2><p id="dc-cookie-description">Este projeto não usa cookies opcionais, análise de audiência ou publicidade. Não há finalidades opcionais para selecionar. Suas escolhas não ativam serviços de terceiros.</p><div class="dc-cookie-category"><h3>Preferência de privacidade · armazenamento necessário</h3><p>Uma chave de armazenamento local lembra sua escolha, a versão e as datas de gravação e expiração. Não é um cookie de rastreamento. Prazo: 180 dias. Não guardamos os dados dos formulários nessa chave.</p></div><p class="dc-cookie-current"></p><p class="dc-cookie-feedback" role="status" aria-live="polite"></p><p><a href="privacidade.html">Ler a Política de Privacidade</a></p><div class="dc-cookie-dialog-actions"><button type="button" data-cookie-choice="accepted">Aceitar todos</button><button type="button" data-cookie-choice="rejected">Rejeitar não essenciais</button><button type="button" data-cookie-choice="necessary-only">Salvar preferências</button><button type="button" data-cookie-revoke>Revogar minha escolha</button><button type="button" data-cookie-close>Fechar</button></div>`;
 document.body.append(dialog);
 const live = document.createElement('p');
 live.className = 'dc-privacy-live';
 live.setAttribute('role','status');
 live.setAttribute('aria-live','polite');
 document.body.append(live);
 function announce(text) {
  live.textContent = text;
  dialog.querySelector('.dc-cookie-feedback').textContent = text;
 }
 function sync() {
  banner.hidden = Boolean(current);
  const labels = { accepted:'Aceitar todos', rejected:'Rejeitar não essenciais', 'necessary-only':'Somente armazenamento necessário' };
  dialog.querySelector('.dc-cookie-current').textContent = current
   ? `Escolha atual: ${labels[current.choice]}.${storageAvailable ? "" : " Não foi possível salvar no navegador; vale somente nesta página."} Expira em ${new Date(current.expiresAt).toLocaleString('pt-BR')}. Versão ${VERSION}. Não há rastreadores opcionais ativos.`
   : `Nenhuma escolha salva. Versão ${VERSION}. Não há rastreadores opcionais ativos.`;
  dialog.querySelector('[data-cookie-revoke]').disabled = !current;
  clearTimeout(expiryTimer);
  if (current) expiryTimer = setTimeout(() => {
   if (Date.now() >= current.expiresAt) {
    try { localStorage.removeItem(KEY); } catch { storageAvailable = false; }
    current = null;
   }
   sync();
  }, Math.min(Math.max(1,current.expiresAt-Date.now()),2147483647));
 }
 function save(choice) {
  const now = Date.now();
  current = { version:VERSION, choice, savedAt:now, expiresAt:now+TTL };
  try { localStorage.setItem(KEY,JSON.stringify(current)); storageAvailable = true; }
  catch { storageAvailable = false; }
  sync();
  announce(storageAvailable ? 'Preferência salva por até 180 dias. Nenhum rastreador opcional foi ativado.' : 'O navegador não permitiu salvar. A escolha vale apenas nesta página e será solicitada novamente ao recarregar. Nenhum rastreador opcional foi ativado.');
  if (dialog.open) dialog.close();
 }
 function revoke() {
  current = null;
  let removed = true;
  try { localStorage.removeItem(KEY); } catch { removed = false; storageAvailable = false; }
  sync();
  announce(removed ? 'Escolha revogada e preferência removida deste navegador. Não há cookies opcionais ou rastreadores deste site para remover ou interromper.' : 'Escolha revogada nesta página. O navegador bloqueou o acesso ao armazenamento; confira suas configurações para remover uma preferência anterior.');
 }
 document.addEventListener('click', event => {
  const settings = event.target.closest('[data-cookie-settings]');
  if (settings) {
   event.preventDefault(); opener = settings;
   sync(); dialog.showModal(); dialog.querySelector('h2').focus(); return;
  }
  const choice = event.target.closest('[data-cookie-choice]');
  if (choice && ['accepted','rejected','necessary-only'].includes(choice.dataset.cookieChoice)) { save(choice.dataset.cookieChoice); return; }
  if (event.target.closest('[data-cookie-revoke]')) revoke();
  if (event.target.closest('[data-cookie-close]')) dialog.close();
 });
 dialog.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const controls = [...dialog.querySelectorAll('a[href],button:not([disabled])')].filter(e => e.getClientRects().length);
  const first = controls[0], last = controls[controls.length - 1];
  if (event.shiftKey && (document.activeElement === first || !controls.includes(document.activeElement))) {
   event.preventDefault(); last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
   event.preventDefault(); first.focus();
  }
 });
 dialog.addEventListener('close', () => {
  if (opener?.isConnected && opener.getClientRects().length) opener.focus({ preventScroll:true });
 });
 window.addEventListener('storage', event => {
  if (event.key === KEY || event.key === null) { current = readPreference(); sync(); }
 });
 document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
   if (storageAvailable) current = readPreference();
   else if (current && current.expiresAt <= Date.now()) current = null;
   sync();
  }
 });
 current = readPreference();
 sync();
})();
