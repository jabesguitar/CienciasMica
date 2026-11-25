# CiênciasMica — estado atual do projeto

**Data:** 25/11/2026  
**Etapa:** pacote local 1.0.0 preparado; publicação no GitHub e validação Android pendentes.

## Identificação
- Projeto independente: quiz e material de estudo de Ciências para o 6º ano.
- Repositório-alvo: https://github.com/jabesguitar/CienciasMica
- Conteúdo-base: capítulo 12 do livro SAE Digital, “Materiais, medicamentos e tecnologia”.
- Nome visual mostrado no app: “CiênciasMica — Laboratório de descobertas” (proposta de identidade desta implementação, ainda não confirmado separadamente pelo usuário).
- Não misturar com Lyravoxen, ArteMica, English Quest ou outros quizzes.

## Decisões expressas pelo usuário
- Paleta: Lona de Algodão 60%, Tinta Berinjela 30% e Laranja Papaia 10%.
- Público: estudante de 6º ano, cerca de 12 anos.
- Aplicativo Android em APK, com visual responsivo, premium, elegante e não genérico.
- Modos: quiz principal; associe pergunta à resposta; relacione palavras; ligue colunas; memória; verdadeiro/falso; caça-palavras; palavras cruzadas.
- Fácil: 1min30 e 3 vidas; Normal: 1min e 4 vidas; Difícil: 30s e 5 vidas.
- Perguntas embaralhadas, banco completo utilizado, pular envia a pergunta ao fim da fila, dica, botão de início e retorno ao início ao perder todas as vidas.
- Música e efeitos, com trilhas diferentes por tela/jogo, aleatoriedade e volume/mudo.
- Ícone PNG transparente quadrado de 1024 × 1024, também com export 4K; launcher 16:9 e splash.

## Auditoria do repositório — 25/11/2026
- Repositório público, sem código-fonte/commits/componentes anteriores na branch padrão.
- Não havia app, tecnologia, navegação, funcionalidades, recursos gráficos ou workflow existentes para preservar.
- Tentativa de escrita na conta GitHub pela integração conectada retornou HTTP 403 (`Resource not accessible by integration`). Nenhum arquivo foi publicado no remoto nesta sessão.
- Não havia WebRTC, áudio de comunicação, mensagens, mapas ou compartilhamento de localização existentes no repositório. Esses módulos não foram inventados nem removidos.

## Material recebido
- ZIP com 16 fotografias das páginas impressas 43–57 e 59.
- Foto separada da abertura do capítulo 12.
- A página impressa 58 não veio no ZIP e seu conteúdo não foi presumido.
- Assuntos identificados: materiais naturais/manufaturados/sintéticos, origem de recursos e minérios, petróleo, plásticos e polímeros, microplásticos, reciclagem, impactos da mineração/florestas/moda, bioplásticos, remédios e medicamentos, tipos, história da aspirina, princípio ativo/excipientes, bula, tarjas, genéricos/similares, descarte, tecnologia na saúde e substâncias psicoativas.

## Implementação preparada
- Vite + TypeScript + Capacitor 8.6.2 + Splash Screen.
- 14 tópicos de estudo; arquivo textual `RESUMO_CIENCIAS.md`.
- 45 questões no quiz principal, com alternativas e explicações.
- 7 jogos alternativos: pergunta/resposta, relação de palavras, ligar colunas, memória (12 pares), verdadeiro/falso, caça-palavras e palavras cruzadas.
- Temporizador individual por questão; vidas por nível; dica e fila de perguntas puladas.
- Trilhas instrumentais procedurais por tela/jogo e efeitos via Web Audio; controle de volume e mudo persistido.
- Progresso local; PWA com cache básico e cache das fotos Commons depois do primeiro carregamento online.
- Recursos: ícone transparente, foreground/background adaptativos, monocromático, ícone de notificação, launcher 16:9, splash screen.
- Workflow `.github/workflows/build-android-apk.yml` para compilar APK Debug e publicar artefato.

## Testes e limites
- Relatório detalhado em `TEST_REPORT.md`.
- Verificações estáticas de conteúdo, telas, lógica do quiz, recursos Android e TypeScript executadas localmente.
- Não foi possível instalar dependências npm por timeout do registro de pacotes no ambiente; o build Vite/Gradle e a instalação física ainda não foram realizados.
- Nenhum APK foi produzido ou validado nesta sessão.

## Próxima ação
1. Baixar `CienciasMica-GitHub-1.0.0.zip` e publicar todos os arquivos na raiz do repositório com o procedimento em `INSTRUCOES_GITHUB.md`.
2. Executar o workflow `Build Android APK` em Actions.
3. Analisar os logs e corrigir eventuais falhas.
4. Instalar o APK num Android real e validar navegação, som, responsividade, ícones e cache offline.
