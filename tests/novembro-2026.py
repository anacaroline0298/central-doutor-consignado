import json, math
from pathlib import Path
from urllib.parse import urlparse,parse_qs
from playwright.sync_api import sync_playwright
F=json.loads((Path(__file__).parent/'novembro-2026.json').read_text());BASE='http://127.0.0.1:8010/'
money=lambda n:'R$ '+f'{n:,.2f}'.replace(',','X').replace('.',',').replace('X','.')
norm=lambda s:' '.join(s.split())
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 for width in [360,390,412,768,1440]:
  c=b.new_context(viewport={'width':width,'height':1000},reduced_motion='reduce');page=c.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  page.goto(BASE+'simulador-consorcio.html',wait_until='networkidle')
  for t in F['auto']:
   page.locator('#term').select_option(str(t['months']))
   assert page.locator('#credit option').count()==len(t['rows'])
   assert page.locator('#admin').inner_text()==str(t['admin'])+'%'
   assert t['monthly'] in page.locator('#plan-conditions').inner_text()
   for row in t['rows']:
    page.locator('#credit').select_option(str(row['credit']))
    for mode in ['full','reduced']:
     page.locator('[name=mode][value='+mode+']').check()
     assert money(row[mode]) in norm(page.locator('#installment').inner_text())
     msg=parse_qs(urlparse(page.locator('#sim-whatsapp').get_attribute('href')).query)['text'][0]
     assert money(row[mode]) in norm(msg) and '30/11/2026' in msg
     assert '50%' in msg and 'reajustadas no aniversário' in msg
   expected=[[money(row[k]) for k in ['credit','full','reduced']] for row in t['rows']]
   actual=[list(map(norm,row.locator('td').all_text_contents())) for row in page.locator('#rows tr').all()];assert actual==expected
  assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
  page.goto(BASE+'simulador-imoveis.html',wait_until='networkidle')
  assert page.locator('#plan option').count()==5
  for plan in F['property']:
   page.locator('#plan').select_option(plan['id'])
   assert page.locator('#credit option').count()==len(plan['rows'])
   assert page.locator('#admin').inner_text()==str(plan['admin']).replace('.',',')+'%'
   for row in plan['rows']:
    page.locator('#credit').select_option(str(row[0]))
    for mode,i in [('full',1),('reduced',2)]:
     page.locator('[name=mode][value='+mode+']').check()
     assert money(row[i])==norm(page.locator('#payment').inner_text())
     msg=parse_qs(urlparse(page.locator('#whatsapp').get_attribute('href')).query)['text'][0]
     assert money(row[i]) in norm(msg) and '30/11/2026' in msg and '200 meses' in msg
     assert ('não explicitada' in msg)==(plan['id']=='gg')
   assert [list(map(norm,row.locator('td').all_text_contents())) for row in page.locator('#rows tr').all()]==[[money(v) for v in row] for row in plan['rows']]
  for mode in ['age','plan']:
   page.locator('#horizon-mode').select_option(mode)
   for id,v in [('age','3'),('month','100'),('base','100000'),('rate','1'),('inflation','5')]:page.locator('#'+id).fill(v)
   if mode=='age':page.locator('#target').fill('18')
   result=page.evaluate("calculate(3,18,100,100000,1,5,'"+mode+"')")
   months=100 if mode=='plan' else 80
   assert math.isclose(result['gross'],100000*1.01**months)
   assert math.isclose(result['real'],result['gross']/1.05**((200 if mode=='plan' else 180)/12))
  assert norm(page.locator('#future-value').inner_text())=='R$ 270.481,38'
  assert '% ao mês' in parse_qs(urlparse(page.locator('#future-whatsapp').get_attribute('href')).query)['text'][0]
  assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
  page.goto(BASE,wait_until='networkidle');assert page.locator('.dc-site-footer').is_visible();assert page.locator('a[href="privacidade.html"]').count()>0
  if width<850:
   page.locator('.menu-toggle').click();page.locator('#site-menu a[href="#simulador"]').click();assert page.locator('#site-menu').is_hidden()
  for filename in ['simulador-consorcio.html','simulador-imoveis.html']:
   frame=next(f for f in page.frames if filename in f.url);iframe=page.locator('iframe[src*="'+filename+'"]')
   frame.locator('details').first.locator('summary').click();page.wait_for_timeout(250)
   assert iframe.evaluate('(e)=>e.clientHeight')>=frame.locator('main').bounding_box()['height']-2
   assert frame.evaluate('document.documentElement.scrollWidth<=innerWidth')
  assert page.evaluate('document.documentElement.scrollWidth<=innerWidth') and not errors,errors
  print('PASS',width,'77 rows / 154 prices, conditions, messages, projection, menu, iframe and overflow',flush=True);c.close()
 for instant,expired in [('2026-12-01T02:59:59Z',False),('2026-12-01T03:00:00Z',True)]:
  for file in ['simulador-consorcio.html','simulador-imoveis.html']:
   c=b.new_context();page=c.new_page();page.clock.install(time=__import__('datetime').datetime.fromisoformat(instant.replace('Z','+00:00')));page.goto(BASE+file,wait_until='networkidle');txt=page.locator('#validity').inner_text();assert ('vencida' in txt or 'encerrada' in txt)==expired,txt
   link='#sim-whatsapp' if 'consorcio' in file else '#whatsapp';msg=parse_qs(urlparse(page.locator(link).get_attribute('href')).query)['text'][0]
   assert ('atualizad' in msg)==expired,msg;c.close()
 print('PASS expiry boundary America/Sao_Paulo, both simulators');b.close()
