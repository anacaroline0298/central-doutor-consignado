# Publicação no GitHub Pages

O workflow `.github/workflows/pages.yml` publica a página principal e os dois simuladores sem instalar dependências. Ele envia somente os arquivos utilizados pelo site. As tabelas PNG de referência e a documentação ficam fora do pacote público; os valores utilizados pelos simuladores são preservados.

## Ativação inicial

No repositório, abra **Settings → Pages → Build and deployment → Source → GitHub Actions**. O Pages precisa estar disponível para a visibilidade do repositório e o plano da conta; essa disponibilidade é exibida pelo próprio GitHub. Não altere a visibilidade do repositório para ativar o recurso sem uma decisão da proprietária.

Depois, em **Actions**, abra **Publicar site no GitHub Pages** e clique em **Run workflow**, escolhendo `main`. Se houver aprovação pendente no ambiente `github-pages`, aprove essa publicação no GitHub.

O endereço esperado, sem domínio personalizado, é:

https://anacaroline0298.github.io/central-doutor-consignado/

Use o endereço exibido pelo passo **Publicar** ou por **Settings → Pages** como confirmação da URL efetiva. Um workflow salvo no repositório, sozinho, não confirma ativação nem publicação bem-sucedida.

## Próximas alterações

Após a ativação, cada envio para `main` dispara o workflow e atualiza o site quando a execução termina com sucesso. Aguarde o resultado em **Actions** antes de conferir a página. Uma atualização que falha não substitui a publicação anterior.

Ao adicionar um novo arquivo usado pelo site, inclua-o também na lista do passo **Preparar arquivos públicos**. Imagens, fontes, CSS e JavaScript devem manter os nomes e caminhos relativos usados nas páginas.

Confira a página inicial, as imagens, a nova seção Quem somos, as abas de seguros, os dois simuladores, os seletores e os links de WhatsApp. Os simuladores e as tabelas mantêm a validade indicada e os avisos de condições; publicar não renova ofertas nem transforma projeções hipotéticas em garantia.
