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
 document.getElementById('warning').textContent=reduced?'Redução informada de '+t.reduction+'% até a contemplação. O valor reduzido será compensado nas parcelas seguintes. Não representa desconto definitivo.':'A parcela não é fixa para todo o período: a tabela informa reajuste anual de 3% no aniversário do grupo.';
 document.getElementById('admin').textContent=t.admin+'%';
 document.getElementById('caption').textContent='Tabela de '+t.months+' meses · valores de referência para pessoa física';
 document.getElementById('rows').replaceChildren(...t.rows.map(row=>{const tr=document.createElement('tr');if(row.credit===r.credit)tr.className='selected';[row.credit,row.full,row.reduced].forEach(n=>{const td=document.createElement('td');td.textContent=money(n);tr.append(td);});return tr;}));
 const today=new Intl.DateTimeFormat('en-CA',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
 const expired=today>'2026-10-31';
 const link=document.getElementById('sim-whatsapp');
 if(expired){document.getElementById('validity').textContent='Tabela vencida em 31/10/2026. Valores históricos: solicite condições atualizadas antes de prosseguir.';link.textContent='Pedir tabela atualizada no WhatsApp ↗';}
 const message=expired?'Olá! Vi o simulador com tabela vencida em 31/10/2026 e gostaria das condições atualizadas para consórcio auto. Crédito de interesse: '+money(r.credit)+'.':'Olá! Consultei a tabela de consórcio auto válida até 31/10/2026. Crédito: '+money(r.credit)+'. Prazo informado: '+t.months+' meses. Parcela '+(reduced?'reduzida até a contemplação':'integral')+': '+money(value)+'. Quero confirmar disponibilidade e condições.';
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
