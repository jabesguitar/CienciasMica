# CiênciasMica — Laboratório de descobertas

Aplicativo educativo para o 6º ano do Ensino Fundamental, baseado no capítulo 12 do material SAE Digital enviado nesta conversa: **Materiais, medicamentos e tecnologia**. O foco de estudo é compreender os materiais do cotidiano, suas transformações, os impactos socioambientais, os medicamentos e a relação entre ciência e tecnologia.

## Identidade visual

- **Lona de Algodão** — 60%: `#D8C5A5`
- **Tinta Berinjela** — 30%: `#51283F`
- **Laranja Papaia** — 10%: `#FF9B54`
- Interface principal em modo escuro premium, com superfícies quentes, hierarquia tipográfica e realces em laranja.
- Ícone principal PNG transparente 1024 × 1024 em `public/brand/icon-1024.png`.
- Arte de launcher 16:9 e recursos para PWA incluídos em `public/brand/`.

## Funcionalidades

- Caderno de estudo dividido em 13 tópicos, com textos didáticos e imagens ilustrativas.
- Quiz principal com o banco completo de 46 perguntas e alternativas embaralhadas a cada partida.
- Dificuldades: Fácil (90 segundos e 3 vidas), Normal (60 segundos e 4 vidas), Difícil (30 segundos e 5 vidas).
- Cronômetro reiniciado por pergunta; dicas; botão de pular que move a pergunta atual para o final da fila; retorno ao início; perda das vidas encerra a partida.
- Jogos adicionais: associe pergunta à resposta, relacione/liga-colunas, memória, verdadeiro ou falso, caça-palavras e palavras cruzadas.
- Música instrumental procedural e efeitos de acerto/erro, com controle de volume e silêncio.
- Progresso local no próprio dispositivo, sem conta ou envio de dados.
- PWA com cache básico para uso offline; imagens externas podem não aparecer sem internet, mas o resumo e os jogos continuam disponíveis.

## Tecnologia

- Vite + TypeScript, HTML/CSS responsivo.
- Capacitor 7 para empacotamento Android.
- GitHub Actions para gerar APK Debug.

## Desenvolvimento local

Requisitos: Node.js 22 e npm.

```bash
npm install
npm run dev
```

Compilar a versão web:

```bash
npm run build
```

## APK Android

O workflow `.github/workflows/build-android-apk.yml` cria a plataforma Android, aplica os ícones, compila e publica o APK Debug como artefato do GitHub Actions. Execute o workflow na aba **Actions → Build Android APK → Run workflow** ou envie um push para `main`.

O APK só deve ser considerado validado após o workflow concluir com sucesso e o aplicativo ser instalado e testado em um aparelho Android real. O pacote entregue aqui contém a configuração e a automação; não há alegação de teste físico em dispositivo.

## Arquivos de identidade visual

Os exports finais estão em `design-assets/`: ícone transparente 1024 × 1024, ícone 4K 4096 × 4096, launcher 16:9, splash screen, foreground/background adaptativos, monocromático e ícone de notificação.

## Fonte do resumo e lacuna nas fotos

O ZIP enviado contém fotografias legíveis das páginas impressas 43–57 e 59. A página 58 não veio no arquivo e, por isso, seu conteúdo não foi presumido. As imagens não referentes ao capítulo não foram incluídas. Consulte `RESUMO_CIENCIAS.md` para a versão textual do material de estudo, `CREDITS.md` para as imagens de terceiros e `INSTRUCOES_GITHUB.md` para publicar e gerar o APK.

## Estado do repositório

Na auditoria inicial, `jabesguitar/CienciasMica` estava público, vazio, sem commits e sem arquivos. A integração GitHub conectada recusou escrita com HTTP 403 (`Resource not accessible by integration`). Por isso, este ZIP é a base inicial pronta para envio ao repositório; nenhum arquivo é apresentado como já publicado no GitHub.
