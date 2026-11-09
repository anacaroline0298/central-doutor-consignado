# Simuladores — tabelas de novembro de 2026

Nove imagens fornecidas pela proprietária em 09/11/2026, conferidas visualmente linha a linha. Os PNGs antigos de outubro na raiz são históricos e não são a fonte das ofertas atuais. As referências no código identificam as imagens pela competência, produto e prazo/faixa, sem inventar nomes de arquivos.

| Produto | Prazo | Crédito | Administração total | Mensal anunciada | Linhas |
|---|---:|---|---:|---:|---:|
| Automóveis | 50 meses | R$ 30 mil–50 mil | 18% | 0,36% | 5 |
| Automóveis | 72 meses | R$ 40 mil–70 mil | 18% | 0,25% | 7 |
| Automóveis | 80 meses | R$ 80 mil–140 mil | 16% | 0,2% | 13 |
| Automóveis | 90 meses | R$ 150 mil–250 mil | 15% | 0,17% | 11 |
| Imóveis | 200 meses | R$ 50 mil–100 mil | 25% | 0,13% | 6 |
| Imóveis | 200 meses | R$ 80 mil–140 mil | 25% | 0,13% | 7 |
| Imóveis | 200 meses | R$ 150 mil–270 mil | 23% | 0,12% | 8 |
| Imóveis | 200 meses | R$ 300 mil–550 mil | 21% | 0,11% | 11 |
| Imóveis | 200 meses | R$ 600 mil–1 milhão | 19,5% | 0,1% | 9 |

Total: 77 linhas e 154 parcelas transcritas, sem interpolação nem divisão da integral por dois. Todos os valores publicados são inteiros, exibidos com centavos zero. As taxas mensais são as anunciadas nas imagens; não são multiplicadas pelo prazo para substituir as taxas totais.

Todas as imagens: pessoa física, reserva de 2%, seguro prestamista de 0,038%, parcelas reajustadas no aniversário do grupo, validade até 30/11/2026. Não há percentual de reajuste informado nas novas artes. Periodicidade e base do prestamista não estão especificadas: confirmar no regulamento.

Automóveis: redução anunciada de 50% até a contemplação em todos os prazos, com compensação nas parcelas seguintes. Lance embutido de até 30% do crédito, conforme disponibilidade no grupo.

Imóveis: cabeçalho anuncia redução de 50%, lance fixo de 40% e lance embutido de 30% do crédito. A coluna reduzida inclui entrada diluída no prazo do grupo; a administração total informa taxa antecipada diluída no plano. As quatro primeiras faixas explicitam compensação posterior da redução. **Ponto para confirmação:** na faixa de R$ 600 mil a R$ 1 milhão, o rodapé não repete a compensação. O site e o WhatsApp pedem confirmação especificamente nesse plano, sem presumir que a regra de outra faixa se aplica. Nenhum lance garante contemplação.

Após 30/11/2026 (America/Sao_Paulo), os simuladores sinalizam tabela vencida e solicitam condições atualizadas no WhatsApp. Isso não renova ofertas automaticamente.

O planejamento familiar mantém juros compostos mensais hipotéticos após a contemplação, limite de 200 meses, inflação anual e todos os avisos de valor bruto, saldo devedor não descontado e ausência de garantias.

## Validação sem instalar dependências

A referência transcrita está em `tests/novembro-2026.json`. Com Python, Playwright e Chromium já disponíveis no ambiente, sirva a raiz com `python -m http.server 8010 --bind 127.0.0.1` e execute `python tests/novembro-2026.py`. O teste percorre todas as linhas e modalidades em 360/390/412/768/1440 px, tabelas detalhadas, condições, mensagens sem enviá-las, planejamento, menus, altura dos iframes e virada da validade no fuso de São Paulo. Não é necessário instalar dependências para usar o site.

A publicação continua pelo workflow `.github/workflows/pages.yml`, acionado por push na main. Arquivos de testes e esta documentação não são publicados.
