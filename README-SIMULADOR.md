# Simulador por consulta às tabelas Porto fornecidas

39 combinações de prazo/crédito (5 + 7 + 13 + 11 = 36 linhas), cada uma com parcela integral e reduzida. Não há interpolação nem promessa de aprovação/contemplação. Valores inteiros publicados são apresentados com centavos zero.

## Instalar no site
Envie TODOS os arquivos extraídos do pacote completo para a raiz do repositório, substituindo os anteriores. O index.html já contém acesso e simulador incorporado. Abra index.html ou simulador-consorcio.html para testar.

## Instalar sem substituir sua página atual
Envie simulador-consorcio.html, simulador.css, simulador.js, tabelas-consorcio.js e config.js. Adicione um link para simulador-consorcio.html no seu menu. Não substitua config.js se seu número foi atualizado; mantenha window.SITE_CONFIG.whatsapp.

## Dados e limites
Fontes: as sete imagens anexadas pela proprietária. Tabelas válidas até 31/10/2026. Os planos de 80 e 90 meses possuem imagens integrais e reduzidas com valores correspondentes. Planos 50/72: redução 25%; 80/90: 50%. Não aplicar percentual diretamente à parcela integral: usar a coluna publicada. Taxas não são adicionadas outra vez.
O material informa administração total, reserva 2%, prestamista 0,038%, reajuste anual 3% e lance embutido até 30% condicionado à disponibilidade. Não foi inferida periodicidade do seguro, fluxo futuro, valor após contemplação ou total final. Após validade o simulador sinaliza tabela vencida e WhatsApp solicita atualização.

## Atualização
Edite tabelas-consorcio.js com novos valores confirmados e atualize a validade/textos em simulador.js e simulador-consorcio.html. Sem dependências, banco de dados ou conexão com Porto.
