# Auditoria de privacidade — 26/10/2026

A revisão do HTML, JavaScript e da navegação em Chromium não encontrou cookies definidos pelo projeto, scripts externos incorporados, pixels, análise de audiência ou publicidade. Antes desta implementação, não havia leitura ou escrita de localStorage/sessionStorage. Na navegação inicial, todas as requisições observadas pertenciam à origem do site. Fontes e simuladores são locais. Os links externos abrem WhatsApp, autocotação Trustfy ou fontes documentais somente quando acionados. A infraestrutura GitHub Pages pode processar dados técnicos das requisições; não se afirma ausência de coleta pela hospedagem ou pelos serviços externos.

Os formulários e as simulações são processados no navegador. Os dados da mensagem passam a integrar a URL do WhatsApp quando o usuário abre o serviço, antes de confirmar o envio à equipe. Não há endpoint próprio de cadastro no código auditado. A política distingue esses momentos e descreve os canais de atendimento.

## Preferência implementada

- `privacidade.js`: uma única chave localStorage `dc_central_privacy_preferences`, com escolha, versão `2026-10-26.1`, gravação e expiração (180 dias). Não contém campos de formulários.
- Não há categorias opcionais, controles fictícios ou instalação de rastreadores. Aceitar e rejeitar têm o mesmo destaque e não carregam serviços opcionais.
- Revogar remove somente a chave controlada pelo site, preservando outros dados. Não há cookies opcionais ou rastreadores do projeto para apagar/interromper. Dados de serviços externos não são apagados por este site.
- Registros vencidos, inválidos ou de outra versão são descartados. Expiração é verificada no carregamento, ao retomar a página e por temporizador. Alterações são sincronizadas entre abas pela API de armazenamento.
- Com armazenamento bloqueado, a escolha funciona em memória e o aviso retorna ao recarregar, com explicação dessa limitação.
- A página principal gerencia os simuladores incorporados para não repetir avisos. Os simuladores abertos diretamente também oferecem aviso e configurações.
- O aviso fica no fluxo da página; não impede navegação nem ocupa a área do WhatsApp. O diálogo de configurações usa o elemento nativo dialog, fechamento por Escape e retorno de foco.

## Validação

Chromium nas larguras 360, 390, 412, 768 e 1440: aceitar, rejeitar, salvar, consultar, alterar, revogar; persistência e remoção da chave; igual destaque visual; ausência de cookies e requisições externas antes e depois das escolhas; navegação sem rolagem lateral, política e links de contato. Casos adicionais: versão antiga, registro vencido, JSON inválido e armazenamento negado. Regressões dos simuladores verificam seletores, tabelas, mensagens, cálculo mensal, inflação e altura responsiva.

Se forem adicionados serviços opcionais no futuro, esta auditoria, a política, a versão e a implementação precisam ser atualizadas. Tais serviços devem permanecer bloqueados até autorização por finalidade e oferecer interrupção/remoção dos dados controláveis ao revogar. O componente atual não deve ser interpretado como autorização para incorporar novos rastreadores.
