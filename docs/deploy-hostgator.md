# Publicação da Bem Sertanejo FM na HostGator

## Preparar o build

Na pasta do repositório, use Node.js 22.12+ ou 20.19+ e pnpm.

```sh
pnpm install --frozen-lockfile
pnpm exec tsc --noEmit
pnpm lint
pnpm build
pnpm preview
```

O Vite gera a pasta `dist/`. Envie somente o **conteúdo** dessa pasta ao servidor. Node.js e pnpm são ferramentas locais de build. O preview do Vite serve o front-end. Para testar o endpoint, use um servidor com PHP e cURL apontando para `dist/`.

## Configurar e enviar

1. No cPanel, abra **Domínios** e confira se `bemsertanejofm.com` usa `public_html` como raiz. Aponte o DNS do domínio para a hospedagem conforme os dados do plano. Configure também `www.bemsertanejofm.com` para a mesma hospedagem, para que o redirecionamento funcione.
2. Em **SSL/TLS Status**, confirme o certificado para o domínio com e sem `www`. Se necessário, solicite o AutoSSL após a propagação do DNS.
3. No **Gerenciador de Arquivos**, habilite **Mostrar arquivos ocultos (dotfiles)** e envie o conteúdo de `dist/` para `public_html`. Também é possível enviar por FTP com TLS. Se fizer upload de um ZIP, extraia de modo que `index.html` e `.htaccess` fiquem diretamente em `public_html`.
4. Se já houver um `.htaccess` em produção, salve uma cópia e confira as regras existentes antes de incorporar as regras do build. O arquivo entregue configura HTTPS, redirecionamento ao domínio sem `www`, compressão e cache dos assets com hash. Apache entrega 404 para caminhos inexistentes.

[Envio pelo cPanel](https://suporte.hostgator.com.br/hc/pt-br/articles/30813145737235-Como-enviar-um-arquivo-para-o-cPanel) · [Gerenciamento do certificado SSL](https://suporte.hostgator.com.br/hc/pt-br/articles/30819189991443-Como-gerenciar-o-certificado-SSL-na-HostGator)

## Metadados da estação 8090

O player incorporado mantém a reprodução, as consultas e a apresentação de música e capa do próprio provedor. A página não chamava a antiga função Vercel e continua sem fazer consultas de metadados em paralelo ao iframe.

Para manter o contrato `{"songtitle": "…"}` ou `{"songtitle": null}`, `/api/now-playing.php` substitui a função anterior. Tanto o endpoint público SHOUTcast quanto a URL de metadados usada pelo player retornaram conteúdo em HTTPS sem credenciais, mas sem `Access-Control-Allow-Origin` para o domínio do site. A API SHOUTcast expõe o título no JSON e não fornece capa nessa resposta. O PHP usa a URL fixa de metadados observada no iframe oficial, extrai o JSON do invólucro do provedor e devolve apenas o título. A conexão usa HTTPS na porta 443, com até três segundos para conectar e cinco segundos no total. Cada GET faz uma única consulta, sem cache e sem tarefas em segundo plano. O PHP não fornece a capa, fora do contrato original.

Use uma versão de **PHP 8 em suporte**, extensão **cURL** com certificados raiz válidos e saída HTTPS na porta 443 para `player.svrdedicado.org`. O endpoint retorna 405 para métodos diferentes de GET e 502 quando o provedor está indisponível ou retorna dados inválidos.

[Player oficial da estação](https://player.svrdedicado.org/player-topo-html5/8090/0a0000) · [Documentação do SHOUTcast DNAS](https://sc-mirror.shoutca.st/docs/DNAS_Server.html)

## Conferir após publicar

- Abra `https://bemsertanejofm.com/`. Confira se HTTP e `www` redirecionam para essa URL. Teste com um caminho e parâmetros para confirmar que são preservados.
- Teste a reprodução, a música exibida, a navegação interna e os botões do aplicativo no desktop e no celular.
- Confira a resposta de `/api/now-playing.php`, além do favicon, da imagem Open Graph, de `/robots.txt` e de `/sitemap.xml`. Verifique se o HTML inicial contém o canonical e as URLs absolutas de compartilhamento.
- Para uma atualização, repita a instalação e o build local. Envie primeiro os novos arquivos de `assets/` e depois o `index.html`. Envie também os demais arquivos do build e confira o site antes de remover assets de builds anteriores.
