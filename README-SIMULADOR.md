# Simulador por consulta às tabelas Porto fornecidas

36 combinações de prazo/crédito (5 + 7 + 13 + 11 = 36 linhas), cada uma com parcela integral e reduzida. Não há interpolação nem promessa de aprovação/contemplação. Valores inteiros publicados são apresentados com centavos zero.

## Instalar no site
Envie TODOS os arquivos extraídos do pacote completo para a raiz do repositório, substituindo os anteriores. O index.html já contém acesso e simulador incorporado. Abra index.html ou simulador-consorcio.html para testar.

## Instalar sem substituir sua página atual
Envie simulador-consorcio.html, simulador.css, simulador.js, tabelas-consorcio.js e config.js. Adicione um link para simulador-consorcio.html no seu menu. Não substitua config.js se seu número foi atualizado; mantenha window.SITE_CONFIG.whatsapp.

## Dados e limites
Fontes: as sete imagens anexadas pela proprietária. Tabelas válidas até 31/10/2026. Os planos de 80 e 90 meses possuem imagens integrais e reduzidas com valores correspondentes. Planos 50/72: redução 25%; 80/90: 50%. Não aplicar percentual diretamente à parcela integral: usar a coluna publicada. Taxas não são adicionadas outra vez.
O material informa administração total, reserva 2%, prestamista 0,038%, reajuste anual 3% e lance embutido até 30% condicionado à disponibilidade. Não foi inferida periodicidade do seguro, fluxo futuro, valor após contemplação ou total final. Após validade o simulador sinaliza tabela vencida e WhatsApp solicita atualização.

## Atualização
Edite tabelas-consorcio.js com novos valores confirmados e atualize a validade/textos em simulador.js e simulador-consorcio.html. Sem dependências, banco de dados ou conexão com Porto.

## Conferência das imagens originais

As sete imagens PNG da raiz foram conferidas visualmente: `AUT_18_50m.png`, `AUT_18_50m_PP.png`, `AUT_18_72m.png`, `AUT_16_80m.png`, `-4551.png`, `AUT_15_90m.png` e `6512365.png`. As 36 combinações (5 de 50 meses, 7 de 72, 13 de 80 e 11 de 90), com 72 valores de parcelas integrais/reduzidas, correspondem a `tabelas-consorcio.js`, sem divergências. Administração total de 18%/18%/16%/15%, redução de 25%/25%/50%/50%, reserva de 2%, prestamista de 0,038%, reajuste anual de 3% e validade até 31/10/2026 também correspondem ao material. A conferência comprova a transcrição das imagens, não a disponibilidade comercial atual dos grupos.

O simulador incorporado usa `ResizeObserver` em `simulador.js` e mensagens de altura recebidas por `app.js` para acompanhar a altura do conteúdo, inclusive quando a tabela detalhada é aberta. Não fixe novamente sua altura em 1450 px: em celulares o conteúdo é mais alto.

## Abrir o pacote no computador
Extraia todo o ZIP para uma pasta antes de abrir `index.html`. Use o botão laranja **Simular consórcio** no menu, na abertura ou no cartão de consórcio. O simulador está incorporado na seção de mesmo nome; **Abrir simulador completo** abre a versão separada. A altura se ajusta também ao abrir por arquivo local, sem instalar dependências. WhatsApp e autocotação precisam de acesso à Internet.
