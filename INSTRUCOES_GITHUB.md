# Como publicar o CiênciasMica no GitHub e gerar o APK

O repositório `jabesguitar/CienciasMica` foi encontrado vazio na auditoria inicial. O ZIP contém o projeto desde a raiz; não copie apenas a pasta `src`.

## Opção recomendada: GitHub Desktop

1. Baixe `CienciasMica-GitHub-1.0.0.zip` e extraia o conteúdo.
2. Abra o GitHub Desktop e use **File → Clone repository**.
3. Na aba **URL**, informe `https://github.com/jabesguitar/CienciasMica` e escolha a pasta local.
4. Abra a pasta clonada no Explorador de Arquivos.
5. Copie **todos os arquivos e pastas de dentro** da pasta extraída `CienciasMica` para a raiz da pasta clonada. Confirme a mesclagem de `.github` caso o Windows pergunte.
6. Volte ao GitHub Desktop. Confira os arquivos listados, escreva a mensagem `feat: iniciar aplicativo CiênciasMica` e clique em **Commit to main**.
7. Clique em **Push origin**.

## Gerar o APK

1. No GitHub, abra o repositório `CienciasMica`.
2. Entre na aba **Actions**.
3. Selecione **Build Android APK**.
4. Se necessário, clique em **Run workflow** e selecione a branch `main`.
5. Aguarde a execução terminar. Abra a execução mais recente e localize o artefato **CienciasMica-Android-Debug**.
6. Baixe o ZIP do artefato e extraia `app-debug.apk`.
7. Transfira o APK para o Android e instale. O Android pode solicitar autorização para instalar aplicativos dessa origem.

## Se o workflow falhar

Abra a execução em Actions, selecione o job `build` e envie o log completo, especialmente o primeiro erro. Não substitua arquivos do projeto por uma versão anterior sem antes conferir o erro.

## O que o workflow faz

- Instala Node.js e dependências do aplicativo.
- Verifica o banco de questões e a estrutura de navegação.
- Compila o frontend com Vite.
- Cria a plataforma Android com Capacitor.
- Gera launcher adaptativo, foreground, background, monocromático e ícone de notificação.
- Sincroniza os recursos e compila `assembleDebug`.
- Publica o APK como artefato por 14 dias.

O projeto ainda precisa passar pelo workflow remoto e por instalação em um dispositivo Android real. A existência deste arquivo de workflow não significa que o APK já foi produzido ou validado.
