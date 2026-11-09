const tables = window.CONSORCIO_TABLES;
const term = document.getElementById('term'), credit = document.getElementById('credit');
const money = n => n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
function currentTable(){return tables.find(t=>t.months===Number(term.value));}
function updateCredits(){const t=currentTable();credit.replaceChildren(...t.rows.map(r=>new Option(money(r.credit),String(r.credit))));render();}
function render(){
 const t=currentTable(),r=t.rows.find(r=>r.credit===Number(credit.value));
 const reduced=document.querySelector('[name=mode]:checked').value==='reduced';
 const value=reduced?r.reduced:r.full;
 document.getElementById('credit-result').textContent=money(r.credit);
 document.getElementById('installment-label').textContent=reduced?'Parcela reduzida de referência, até a contemplação':'Parcela integral de referência';
 document.getElementById('installment').textContent=money(value)+' / mês';
 document.getElementById('comparison').textContent='Prazo informado: '+t.months+' meses · '+(reduced?'Integral na tabela: '+money(r.full):'Reduzida na tabela: '+money(r.reduced));
 document.getElementById('warning').textContent=reduced?'Redução informada de '+t.reduction+'% até a contemplação. O valor reduzido será compensado nas parcelas seguintes. Não representa desconto definitivo.':'A parcela não é fixa para todo o período: há reajuste no aniversário do grupo, sem percentual informado na arte.';
 document.getElementById('admin').textContent=t.admin+'%';
 document.getElementById('reserve').textContent=t.reserve+'%';
 document.getElementById('insurance').textContent=t.insurance;
 document.getElementById('plan-conditions').textContent='Plano selecionado: '+t.months+' meses. Administração total: '+t.admin+'%; taxa mensal anunciada: '+t.monthly+' ao mês. Fundo de reserva: '+t.reserve+'%; seguro prestamista: '+t.insurance+'. Redução: '+t.reduction+'% até a contemplação, com compensação nas parcelas seguintes. Lance embutido de até '+t.embeddedBid+'% do crédito, conforme disponibilidade no grupo. Parcelas reajustadas no aniversário do grupo, sem percentual informado. Validade: 30/11/2026.';
 document.getElementById('caption').textContent='Tabela de '+t.months+' meses · valores de referência para pessoa física';
 document.getElementById('rows').replaceChildren(...t.rows.map(row=>{const tr=document.createElement('tr');if(row.credit===r.credit)tr.className='selected';[row.credit,row.full,row.reduced].forEach(n=>{const td=document.createElement('td');td.textContent=money(n);tr.append(td);});return tr;}));
 const parts=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()).map(p=>[p.type,p.value]));
 const expired=`${parts.year}-${parts.month}-${parts.day}`>t.validUntil;
 const link=document.getElementById('sim-whatsapp');
 document.getElementById('validity').textContent=expired?'Tabela vencida em 30/11/2026. Valores históricos: solicite condições atualizadas antes de prosseguir.':'Referência para pessoa física · Tabelas válidas até 30/11/2026.';
 link.textContent=expired?'Pedir tabela atualizada no WhatsApp ↗':'Consultar disponibilidade no WhatsApp ↗';

 const message=expired?'Olá! Vi o simulador com tabela vencida em 30/11/2026 e gostaria das condições atualizadas para consórcio auto. Crédito de interesse: '+money(r.credit)+'.':'Olá! Consultei a tabela de consórcio auto válida até 30/11/2026. Crédito: '+money(r.credit)+'. Prazo informado: '+t.months+' meses. Parcela '+(reduced?'reduzida até a contemplação':'integral')+': '+money(value)+'. Administração total: '+t.admin+'%; redução de '+t.reduction+'% até a contemplação, com compensação posterior. Parcelas reajustadas no aniversário do grupo. Quero confirmar disponibilidade e condições.';
 link.href='https://wa.me/'+(window.SITE_CONFIG?.whatsapp||'5508008787026')+'?text='+encodeURIComponent(message);
}
term.addEventListener('change',updateCredits);credit.addEventListener('change',render);document.querySelectorAll('[name=mode]').forEach(r=>r.addEventListener('change',render));updateCredits();

// Report content height without requiring same-origin DOM access by the parent.
if (window.parent !== window) {
 const reportHeight = () => window.parent.postMessage({
  type: 'consorcio:resize',
  height: document.querySelector('main').getBoundingClientRect().height
 }, '*');
 new ResizeObserver(reportHeight).observe(document.querySelector('main'));
 window.addEventListener('message', event => {
  if (event.source === window.parent && event.data?.type === 'consorcio:request-size') reportHeight();
 });
 reportHeight();
}
