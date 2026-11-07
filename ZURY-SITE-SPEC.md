# ZURY CORRETORA — Especificação oficial do website

> **Hero — companhias:** substituir as quatro fotos por SVGs originais fornecidos de Porto Seguro, Allianz, Tokio Marine e Zurich, nesta ordem, com círculos sobrepostos de 48 px no desktop e 38 px no mobile. Exibir à direita, em Inter Tight semibold, “37 COMPANHIAS. UMA SÓ CORRETORA.”. Os SVGs fornecidos já contêm o fundo #F5F5F2 e a borda #DADAD6; mantê-los sem redesenho.

> **Light sweep compartilhado:** logo do cartão e frase “A ESCOLHA É ZURY” usam a mesma faixa, duração e curva da logo da navbar em desktop e mobile. No mobile, a faixa prateada compacta da navbar é compartilhada por variável CSS, sem alterar a entrada do texto nem a máscara da marca.

> **Espessura do feixe da navbar:** aumentar a borda luminosa do botão COTAR AGORA de 2 px para 3 px em desktop e mobile, preservando o ciclo e a cor prateada.

> **Feixe da navbar:** preservar o ciclo prata de 3,6 s e torná-lo visível na borda do COTAR AGORA desktop e mobile, posicionando o reflexo sobre a borda grafite sem afetar o texto ou o foco. Movimento reduzido continua estático.

> **Favicon transparente:** usar o monograma preto do PNG original com canal alfa preservado, sem base branca, nos arquivos PNG e ICO de favicon. A imagem Open Graph e o ícone Apple permanecem como anteriormente definidos.

> **06/11/2026 — assets de SEO enviados pelo proprietário:** favicon passa a usar o PNG preto/transparente do monograma anexado, sobre base clara apenas nas versões para abas e ícone Apple, sem redesenho/falso vetor. Open Graph e Twitter passam ao escudo original com fundo em malha anexado, JPEG 1200×630 sem corte da composição, em `public/brand/zury-escudo-malha-og.jpg`. Originais preservados em `assets-source/seo-branding/`; novos nomes de assets evitam reutilização do cache anterior. Substitui a imagem OG de assinatura da etapa anterior, sem alterar as logos ou fundos visíveis das páginas.

> **06/11/2026 — refinamento final autorizado:** CTAs de cotação compartilham face grafite e reflexo prata; verde restrito aos controles/links de WhatsApp, inclusive contatos e indicações. Feedback dos controles em 220 ms, feixes contínuos em 3,6 s; reflexos da marca continuam em 3,4 s. Ampliar alvos pequenos do catálogo/rodapé para 44 px, preservar layout e conteúdos. Redação das indicações refinada em `content.ts`, mantendo R$ 100 via Pix por contratação indicada e 10% da comissão recebida pela ZURY. Textos com destaque por rolagem partem de opacidade 0,65, preservando a animação e a leitura; fallback de alto contraste cobre as quatro linhas da hero. Favicon derivado do monograma original; OG com assinatura oficial; canonical/sitemap apontam ao subdomínio Vercel existente. PNGs mestres preservados, WebP sem perdas usados no frontend. Sem publicação; banco continua pendente. Evidências em `qa/final-polish/RELATORIO.md`.

> **06/11/2026 — infraestrutura de leads autorizada:** formulário compartilhado passa a POST no servidor e confirmação apenas após COMMIT PostgreSQL; WhatsApp posterior contém somente produto/protocolo aleatório não consultável publicamente. Complemento continua opcional. Autenticação de serviço interna com papéis agente/revisor, aprovação humana antes de registrar envio, criptografia de dados, idempotência, auditoria e retenção configurável; sem agente ou envio automático. Sem banco/chaves, retornar indisponibilidade e preservar formulário. Não publicar. Card de Nossas soluções mostra VIDA mantendo categoria oficial; cartão compartilha light sweep da navbar, quarta linha usa a mesma banda, duração e sincronismo existentes. Configuração e pendências em `docs/leads/README.md`.

> **06/11/2026 — cotação, etapa local:** preservar modal compartilhado de quatro etapas e valores entre etapas; complemento opcional; política acessível no consentimento. Dados normalizados em DTO versionado e transporte WhatsApp isolado, sem backend/persistência. Feedback verde confirma somente preparação da mensagem e orienta concluir no WhatsApp; não atesta recebimento sem integração. Sem publicação nesta etapa.

> **05/11/2026 — textos e formulário:** remover os números decorativos das opções de área no modal compartilhado, mantendo os identificadores internos e os destinos. CEP continua automático, porém sem botão, avisos de carregamento, mensagens de conclusão ou falha. Campos permanecem editáveis. Correções ortográficas aprovadas: EXPERIÊNCIA; À VISTA e A PRAZO; RENUNCIANDO À NOSSA COMISSÃO; CONTRATAÇÃO. Preservar integralmente as quatro linhas da frase de impacto da hero.

> **05/11/2026 — CEP automático:** substituir a necessidade de clicar na busca por consulta automática 350 ms após completar os oito dígitos, cancelando consultas e agendamentos antigos. Manter o botão para novas tentativas e o preenchimento manual em caso de erro. Campos de endereço aparecem imediatamente depois do CEP. Preencher logradouro, bairro, cidade, UF e complemento quando retornado, sem substituir complemento já preenchido; número do imóvel continua manual. O formulário compartilhado aplica a mudança na home e no cartão. CPF e placa permanecem conforme a decisão anterior.

> **05/11/2026 — CEP, CPF e placa na cotação:** no formulário compartilhado da home e do cartão, adicionar botão explícito para buscar endereço pelo CEP via ViaCEP (somente CEP enviado; sem credenciais, cookies ou CPF). Logradouro, bairro, cidade e UF são editáveis e opcionais, com preenchimento manual quando a consulta falhar ou não encontrar o CEP; cancelar consultas antigas ao trocar o CEP ou desmontar o componente, com timeout de 8 s. CPF continua sendo validado localmente pelos dígitos e mostra confirmação de validade matemática; não consultar nome, dados pessoais ou situação cadastral. Adicionar placa opcional somente para Automóveis, normalizada para maiúsculas e até 7 caracteres alfanuméricos. Endereço preenchido e placa, quando aplicável, seguem no resumo e na mensagem do WhatsApp do Thiago; nenhuma informação é armazenada nem enviada automaticamente ao WhatsApp.

> **05/11/2026 — ajuste do cartão:** remover somente o ícone do CTA COTAR AGORA, preservando texto centralizado, estilo, feixe e funcionamento; reduzir o desfoque do escudo sobreposto de 3 para 2 px, mantendo a malha nítida.

> **05/11/2026 — superfície da navbar conforme IMG_3593:** desktop usa cápsula perolada com extremidades arredondadas e o rebaixo central vetorial existente reativado; somente o design da superfície é aproveitado, preservando marca e conteúdo atuais. Mobile usa a mesma paleta perolada, com logo e ícone de menu escuros para contraste. Nenhum estilo do botão COTAR AGORA é alterado; fade de 520 ms, reflexos e comportamento de navegação permanecem.

> **05/11/2026 — escudo sobreposto no cartão:** o PNG original enviado (1254 × 1254) fica sobre o escudo dos cinco fundos, em um plano fixo que acompanha os mesmos breakpoints e o recorte cover. Uma máscara de contorno medida no próprio arquivo oculta o quadriculado incorporado, sem redesenhar a marca ou alterar o PNG. Aplicar blur de 3 px somente ao plano do escudo; a malha permanece nítida. Na hero, as três primeiras linhas usam cinza metalizado e A ESCOLHA É ZURY usa prata mais claro, preservando os efeitos existentes.

> **05/11/2026 — refinamento de brilho e hover:** o hover dos cards de Como funciona e dos botões que já se elevavam passa a 6 px; preservar movimento reduzido. Os feixes verdes de Indicações e do CTA final passam de 1,5 para 1,95 px; no desktop, os da navbar e da cotação da hero passam de 1,8 para 2,34 px e o do contato da hero de 1,5 para 1,95 px. As quatro linhas da hero compartilham a cor prata metalizada e somente a última recebe reflexo mais claro. A logo do cartão usa a mesma animação compartilhada da navbar.

> **05/11/2026 — interação nos cards:** em dispositivos com cursor, o hover pausa a flutuação existente e eleva o card de Como funciona em 2 px por 220 ms, como o botão flutuante de WhatsApp; movimento reduzido mantém os cards estáticos. A logo do cartão compartilha o light sweep da navbar, e o CTA de Soluções compartilha o gradiente grafite da navbar.

> **05/11/2026 — Como funciona, trilhos e revisão integrada:** a etapa 03 usa “Receba a cotação” e “Atendimento especializado disponível 24 horas por dia”, conforme aprovação expressa de disponibilidade 24h no §9.2, com dados centralizados em `processQuoteStep`. Os três cards flutuam de 0 a −3 px em ciclo de 6 s, via translate independente da entrada GSAP; pausam fora de vista, em aba oculta e durante hover/foco, e ficam estáticos com movimento reduzido. O card cresce com o texto e aproveita mais largura nas telas estreitas para manter palavras inteiras a 200%, sem encolher a fonte. Companhias e Benefícios passam juntos de 104 para 120 px/s, mantendo a direção, duas cópias e a desaceleração de Companhias a 25 px/s no hover; interpolação exponencial com constante de 220 ms e fase proporcional preservada no resize. Com movimento reduzido, ambos permitem rolagem manual por toque, scrollbar e teclado (setas/Home/End), sem cópia visual duplicada. O Velaris de Companhias também fica pausado. Os componentes e fundos validados anteriormente permanecem, com revisão integrada documentada em `qa/integrated-2026-11-05/RELATORIO.md`.

> **05/11/2026 — refinamento de navbar, reflexos e controles:** remover a margem superior desktop de 10 px e os 20 px extras do contêiner; fade da navbar passa de 280 para 520 ms, mantendo interrupção por rolagem, menus e recuperação por Tab. A frase A ESCOLHA É ZURY recebe prata mais contrastada; a entrada ocorre uma vez. O reflexo da frase entra no próximo ciclo completo de 3,4 s da logo após a entrada, sincronizado por `CSSAnimation.startTime` na document timeline, sem temporizadores periódicos e sem reiniciar a marca. Movimento reduzido mantém os elementos alterados estáticos. FALE COM UM ESPECIALISTA usa fundo rgba(8,11,14,0.76), hover rgba(16,20,24,0.9) e backdrop blur 8 px. Feixes verdes existentes ficam 20% mais espessos: 1,25→1,50 px e 1,50→1,80 px no conjunto já reforçado da navbar/hero, preservando cor, percurso e 3,6 s de ciclo; controles sem feixe verde não o recebem. SOLICITAR COTAÇÃO passa à face grafite compartilhada da navbar com borda base zero. No cartão, preservar os cinco fundos e seus breakpoints; deslocar o centro da arte para baixo com overscan vertical `clamp(40px,8svh,96px)`, sem faixa vazia ou blur; ícone e texto ficam juntos e centralizados (o CTA usa o monograma já existente). Remover o último WhatsApp do rodapé do cartão, preservando o botão principal e os três contatos. O controlador e a mídia do vídeo ficam intactos. Relatório: `qa/shine-controls-2026-11-05/RELATORIO.md`.

> **05/11/2026 — cartão digital, fundos e acessibilidade:** `/cartao` usa os cinco fundos fornecidos em ZURY_FUNDOS_CANTOS_CORRIGIDOS, preservados em `assets-source/digital-card-backgrounds/`, e WebP sem perdas em `public/backgrounds/digital-card/`. `<picture>` seleciona, nesta ordem: ultrawide com largura ≥1100 px e razão ≥2:1; desktop com largura ≥1100 px e razão ≥3:2; tablet horizontal nas demais telas em paisagem; tablet vertical nas demais telas com largura ≥768 px; mobile nas restantes. Imagem fixa, centralizada, `object-fit: cover`, sem blur CSS. Rodapé exclusivo do cartão preserva Soluções, Diferenciais, WhatsApp e dados legais, remove a logo, Sobre e links sociais/e-mail/avaliação, e inclui `/#companhias`, `/#indicacoes` e `/#beneficios`. Os canais do corpo do cartão continuam disponíveis. Logo superior mantém o arquivo mestre e o mesmo reflexo de 3,4 s em todas as larguras, com base prateada mais clara. Palavras vida/família/empresa passam a ciclo de 7,8 s; textos dos controles são centralizados independentemente do ícone. Com movimento reduzido, exibir a frase inteira estática e desativar os movimentos do cartão; pausar luzes e palavras em aba oculta. Esta decisão mais recente substitui a regra antiga de movimento obrigatório somente no cartão, sem alterar a landing. Detalhes dos assets e validação em `qa/card-refresh-2026-11-05/RELATORIO.md`.

> **05/11/2026 — auditoria e correção exclusiva do vídeo da hero:** preservar os arquivos `hero-shield-1080-v2.mp4` e `hero-shield-720-v2.mp4`, 111 quadros independentes a 24 fps, duração de 4,625 s. O controlador nativo único mapeia a rolagem do topo do wrapper até sua altura menos a altura real do sticky para os quadros 0–110, buscando o centro de cada quadro (0,020833–4,604167 s), com interpolação temporal equivalente a 0,18 por quadro de 60 Hz. Não adicionar outro controlador ScrollTrigger ao vídeo. Só exibir vídeo após seek decodificado; manter o pôster no carregamento e erro; recarregar também `NETWORK_NO_SOURCE` ao retomar. Por solicitação expressa desta etapa, a hero usa pôster estático e não baixa o vídeo nem monta seu Velaris com `prefers-reduced-motion: reduce`, inclusive se a preferência mudar durante a visita. Essa exceção substitui a regra geral antiga somente para o vídeo/fundo da hero. Diagnóstico, mapa do projeto e validação: `qa/hero-audit-2026-11-05/RELATORIO.md`.

> **03/11/2026 — contato, card SUSEP e CTAs:** o número oficial de Thiago passa a **(38) 99960-8455**, WhatsApp `https://wa.me/5538999608455`, em todos os menus, rodapés, indicações e cotação compartilhada. O card SUSEP mantém a inclinação, mas o reflexo acompanha a posição real do cursor e entra/sai por opacidade, sem retorno brusco. Os feixes externos de COTAR AGORA na navbar e na hero ficam discretamente mais visíveis, ainda contínuos e sincronizados no ciclo de 3,6 s, sem pulsação. Esta nota substitui o número e efeitos anteriores conflitantes.

> **03/11/2026 — revisão da hero e do cartão:** o escudo do cartão usa o quadro original de 1080 × 1920 centralizado em `background-size: cover`, com desfoque de 1 px, sem a marca-d’água no canto inferior direito; preencher a tela evita a moldura da imagem anterior. As logos principais da navbar compacta e do cartão no mobile usam base prateada clara e reflexo recortado nas letras, no mesmo ciclo anterior; a assinatura desktop recebe pequeno ajuste óptico de centralização. Os botões da hero e de PROTEJA O QUE VOCÊ CONSTRUIU usam o mesmo rótulo FALE COM UM ESPECIALISTA, o mesmo ícone WhatsApp de traço sem fundo, estilo e feixe, preservando os respectivos menus de contato. O vídeo da hero só fica visível após carregar dados, com pôster enquanto indisponível; o quadro de retorno usa a mesma faixa completa do seek. As versões originais disponíveis são 1080 × 1920 no desktop e 720 × 1280 no celular; telas maiores ampliam esses arquivos, não há fonte 4K no projeto. Esta nota supera decisões visuais anteriores conflitantes.

> **03/11/2026 — atualização de marca e cartão:** usar a assinatura em `public/brand/zury-assinatura-enviada.png`, cópia integral da imagem fornecida, em todas as aplicações da marca ZURY na landing e no cartão; preservar a caixa de layout e adaptar a escala à margem transparente do arquivo. As máscaras do reflexo usam o mesmo arquivo para preservar a animação sobre a marca. No botão Site institucional do cartão, usar `public/brand/zury-monograma-branco.svg`, cópia integral do vetor enviado. O fundo do escudo do cartão fica deslocado 10vh para baixo, mantendo o quadro original e o desfoque. A imagem de assinatura recebida apresenta transparências irregulares e parte inferior recortada; nenhuma reconstrução da marca foi feita. Esta nota supera as aplicações anteriores da marca nesses pontos.

> **03/11/2026 — ajustes finais de cartão e navegação:** título do cartão mantém suas duas linhas alinhadas à esquerda dentro do conjunto centralizado, com SUA e a palavra animada na mesma linha. O fundo usa o quadro frontal central do vídeo original `hero-shield-1080.mp4`, extraído em aproximadamente 3,7 s na resolução original de 1080 × 1920; imagem fixa centralizada com desfoque de 3 px e fundo escuro cobrindo todo o viewport. Retirar as setas dos controles do cartão e de seu modal, mantendo ícones de canais e destinos. A logo do cartão compartilha `brand-shine.css` com a navbar; a base prateada aumenta a visibilidade do mesmo reflexo branco. Navbar desktop e mobile usa fade de 280 ms na descida e na subida, preservando o comportamento de foco e menu. Esta nota supera as decisões visuais anteriores conflitantes.

> **03/11/2026 — refinamento aprovado:** ordem das áreas: VEÍCULOS, VIDA E SAÚDE, CRÉDITO, PATRIMÔNIO, AGRONEGÓCIO, RESPONSABILIDADE CIVIL, preservando os identificadores de cotação. Remover Transporte de cargas e acrescentar Corretagem de grãos ao Agronegócio (06 áreas / 25 soluções). Feixe verde externo de 1,25 px, ciclo linear de 3,6 s sincronizado por relógio entre home e cartão, sem pulsação; WhatsApp flutuante circular, demais controles retangulares com raio de 4 px. CTAs grafite da navbar e cartão compartilham vidro e halo estático sem hover. Hero mantém quatro linhas Inter Tight, entrada de 700 ms com intervalos de 150 ms; última linha prata metalizado, reflexo recortado nas letras após 1,15 s e ciclo de 4 s. Vídeos v2 cortados sem recompressão após o quadro 110 (tempo 4,583 s, duração 4,625 s), correspondência visual mais próxima da captura enviada; percurso de 160 svh para desacelerar. Companhias mantém logos sem placas e ganha chamada maior. Cartão: fundo escuro gerado a partir do escudo original, com desfoque incorporado, fixo cobrindo todo o viewport desktop/mobile; painel de conteúdo grafite translúcido e textos claros. Site institucional seguido imediatamente de WhatsApp; sem os textos Fale com a ZURY / Escolha com quem conversar; menu apenas com os três WhatsApps oficiais. Navbar compacta sem margem superior nem deslocamento na animação inicial, fundo igual ao body (`--ink-950`). Nenhuma publicação autorizada. Esta nota supera instruções visuais anteriores conflitantes.

> **30/10/2026 — Navbar, seções e cartão (6 etapas):** (1) **Navbar.** No desktop (a partir de 1100 px): INDICAÇÕES e BENEFÍCIOS à esquerda, logo ao centro e, à direita, REDES SOCIAIS (ícone de menu, abre o popover `#social-channels` com Instagram, TikTok e Facebook) e COTAR AGORA. CARTÃO DIGITAL, SOLUÇÕES, DIFERENCIAIS e SOBRE saem da barra desktop e seguem no rodapé e no menu hambúrguer. No mobile: logo à esquerda, COTAR AGORA sempre visível (também abaixo de 520 px) e hambúrguer. Os dois COTAR AGORA do header usam a cápsula grafite `.quote-graphite.quote-graphite--glow`, com brilho contínuo sem precisar de hover; `src/components/site/quote-cta.css` expõe `--quote-graphite-face`, `--quote-graphite-face-hover`, `--quote-graphite-shadow` e `--quote-graphite-ink` em `:root`. O brilho das logos da navbar vem de `src/components/site/brand-shine.css`, o mesmo efeito do `/cartao`. (2) **Hero.** `hero-scroll-video.tsx` guarda os saltos de tempo bloqueados por `readyState < 2` e os reaplica em `canplay`, e reativa o vídeo ao voltar à tela, ao reexibir a aba e em `pageshow` (recarrega se houve erro ou se esvaziou, reposiciona e reprepara): corrige o hero congelado depois de rolar para fora e voltar, reproduzido com a rede derrubada. (3) **Seções.** Nossas Soluções troca os índices 1.01 por marcadores (•) e ganha sublinhado suave sempre visível em cada solução; os carrosséis mobile usam o hook compartilhado `src/components/ui/use-snap-carousel.ts`. Como Funciona fica só com as três etapas (saem SUPORTE 24 HORAS e ACOMPANHAMENTO ATÉ A RESOLUÇÃO), numa linha no desktop e, até 1023 px, em carrossel de arrastar com pontos como Nossas Soluções. A ZURY EM NÚMEROS (StatsBand) é removida, com `stats-band.tsx`/`.css`; os contadores de áreas e soluções seguem em Nossas Soluções, no hero e na etapa 01 de Como Funciona. Companhias ganha o título visível COMPANHIAS. Ordem atual: Hero → Nossas Soluções → Como Funciona → Diferenciais → Companhias → Indicações → Benefícios → CTA final → rodapé. (4) **Indicações, Benefícios e WhatsApp.** Os cartões de Indicações ficam maiores (cerca de 380 px), com brilho difuso ao fundo e CTAs com luz contínua percorrendo a borda. Benefícios Exclusivos vira carrossel horizontal com setas "Parceiro anterior"/"Próximo parceiro", desativadas nas pontas; no celular, arrastar, setas e pontos. A etapa 04 da cotação continua enviando para Thiago (`contacts[0]`, `wa.me/5538999608455`). O WhatsApp flutuante vira círculo perfeito (56 px; 52 px no celular) com um feixe verde fino percorrendo a borda em loop, sem hover; estilos em `src/components/site/floating-whatsapp.css`. (5) **Rodapé.** Painel de largura total alinhado ao container de 1320 px; barra inferior com copyright à esquerda e lema à direita. (6) **Cartão.** No `/cartao`, COTAR AGORA passa a ser o CTA grafite com brilho da navbar (deixa de ser branco); todos os botões do cartão usam a mesma face e hover grafite, sem o brilho; a logo usa `brand-shine.css`; o botão WhatsApp abre o `ChannelsPopover` compartilhado (`#card-contact-channels`, mesmos contatos e links da home). O metal líquido (`src/components/ui/liquid-metal.tsx`/`.css`) e a dependência `@paper-design/shaders` saem de novo, assim como o sequenciador `use-silver-trace.ts`. O Silver Light Trace passa a ser só CSS: filete acetinado prata-grafite de 1 px mascarado na borda; o feixe roda continuamente só no COTAR AGORA, e os botões secundários recebem uma passagem do feixe e filete mais claro no hover ou foco visível; o modificador `tone="graphite"` atende botões claros. Nenhuma animação depende de `prefers-reduced-motion`, inclusive o trace (decisão do responsável). Verificação: 45 testes unitários e 47 e2e Playwright (desktop e Pixel 7) passando. Esta nota supera as anteriores nesses pontos.

> **Soluções, cotação e cartão — 30/10/2026:** NOSSAS SOLUÇÕES passa a 6 áreas e 25 soluções (`services` e `solutionCount` em `src/lib/content.ts`): 01 PATRIMÔNIO (Residenciais, Empresariais, Aeronáuticos, Transporte de cargas); 02 VIDA E SAÚDE (Seguros de vida, Planos de saúde, Odontológicos, Seguro viagem); 03 AGRONEGÓCIO (Seguros agrícolas, Safras, Pecuários, Equipamentos agrícolas); 04 VEÍCULOS (Automóveis, Frotas, Motos, Caminhões); 05 CRÉDITO (Consórcios, Financiamentos, Empréstimos, Seguro prestamista); 06 RESPONSABILIDADE CIVIL (RC Geral, RC Profissional, RC Obras e Engenharia, RC Agropecuária, RC Hospitalar e Clínicas). Os contadores mostram 06 ÁREAS e 25 SOLUÇÕES na seção, na faixa de rostos do hero e em A ZURY em números. No desktop o catálogo é uma grade uniforme 3 × 2 com filetes (2 colunas até 1023 px); no mobile (até 767 px), carrossel com scroll-snap e pontos de posição. Sai o COTAR AGORA de cada cartão: cada solução é um botão que abre a cotação na etapa 03 com área e solução preenchidas, e um único SOLICITAR COTAÇÃO fecha a seção. A fileira curva usa uma foto por área (bens, vida-saude, rural, automotivo, credito, responsabilidade-civil); `public/zoom/{centro,aereo-maritimo,transporte}.webp` deixam de ser usados. COMO FUNCIONA traz três etapas numa linha no desktop — 01 ESCOLHA UMA SOLUÇÃO (foto), 02 PREENCHA OS DADOS (cartão branco com formulário de cliente desenhado, cujas linhas se preenchem devagar) e 03 RECEBA A COTAÇÃO COM ATENDIMENTO ESPECIALIZADO (foto) —, com numerais finos e grandes e ícones de linha; SUPORTE 24 HORAS e SINISTROS ficam na segunda linha e COMPARE AS SEGURADORAS sai. O cartão EXPERIENCIA. AGILIDADE. SOLIDEZ. (VelarisStatement) é removido; o lema segue no rodapé e no letreiro do CTA final. Ordem atual: Hero → Nossas Soluções → Como Funciona → Diferenciais → Companhias → A ZURY em números → Indicações → Benefícios → CTA final → rodapé. Os cartões de membro de Indicações mostram o código como 12 pontos contínuos, sem quebra. A cotação vira um diálogo de quatro etapas, compartilhado por `/` e `/cartao`: 01 área (6), 02 solução (só os itens da área), 03 dados do cliente (obrigatórios: nome/razão social, CPF ou CNPJ com máscara e dígitos verificadores, inclusive o CNPJ alfanumérico de julho de 2026, WhatsApp com DDD, CEP, número do imóvel, complemento e aceite de privacidade; e-mail opcional) e 04 confirmação com resumo e ENVIAR PELO WHATSAPP, que abre o WhatsApp oficial (`contacts[0]`) com a mensagem formatada. Nenhum dado é armazenado (sem storage, cookies ou logs) e não há confirmação de envio; CTAs gerais abrem na etapa 01, toda abertura recomeça e Esc, X ou clique fora fecham, devolvendo foco e rolagem. Isso substitui o resumo provisório. O Facebook ganha endereço oficial fornecido pelo responsável (`https://www.facebook.com/share/19zFT3sdGr/?mibextid=wwXIfr`), no popover social e em REDES SOCIAIS do rodapé. O COTAR AGORA grafite do header passa para `src/components/site/quote-cta.css` (`.quote-graphite`), compartilhado com `/cartao`. No `/cartao`, o título "Proteção para sua vida/família/empresa" fica em caixa alta e sai a frase "Seu próximo passo começa com uma conversa."; abaixo do título entra COTAR AGORA grafite, que abre o mesmo diálogo. Canais na ordem Site institucional, Instagram, TikTok, Facebook, E-mail e Nos avalie (antes "Avaliações no Google"), sem o aviso de Facebook indisponível. As três linhas por atendente (WhatsApp e Ligar) saem por decisão do responsável: um único botão WhatsApp abre o menu THIAGO — CORRETOR / VALDIR — CONSULTOR / JOANA — SAÚDE, com números e links `wa.me`, que fecha por clique fora, botão fechar ou Esc e devolve o foco ao botão; o cartão deixa de oferecer `tel:`. O metal líquido (`@paper-design/shaders`) é removido com componente, CSS e dependência; os controles usam o Silver Light Trace (`src/components/ui/silver-trace.tsx`): filete prata-grafite de 1 px na borda externa e feixe branco-prata que percorre o contorno uma vez (cerca de 1 s), um controle por vez de cima para baixo (CTA primeiro, com filete de 1,5 px mais claro), seguido de descanso de 7 a 10 s; o hover clareia o filete com luz interna sutil. Por pedido expresso do responsável, esse efeito respeita movimento reduzido (exceção à regra geral de movimento), pausa em aba oculta e, em aparelhos mais modestos (até 4 núcleos, até 4 GB ou economia de dados), ilumina só o CTA. O carrossel de depoimentos de demonstração já havia sido removido (commit `a8f8df7` do Lovable). Esta nota supera as anteriores nesses pontos.
>
> **Atualização do mesmo dia (30/10/2026), a pedido do responsável:** o metal líquido volta ao `/cartao`: `src/components/ui/liquid-metal.tsx`/`.css` e a dependência `@paper-design/shaders` 0.0.82 são restaurados. Os seis canais e o botão WhatsApp ganham a borda animada de metal líquido de 2 px, e o Silver Light Trace passa a rodar sobre ela só como feixe (`.silver-trace--beam`: sem filete-base, faixa de 2 px); o sequenciador não muda (um controle por vez, CTA primeiro, cerca de 1 s, descanso de 7 a 10 s, respeita movimento reduzido, aparelhos modestos só no CTA). O metal líquido anima para todos, mesmo com movimento reduzido (regra geral do site), e desacelera/pausa conforme a visibilidade da página. O COTAR AGORA do cartão passa a branco com texto preto (`.card-quote-cta` em `src/digital-card.css`, sobre a cápsula de `quote-cta.css`): face `#ffffff → #e9edf0` (hover `#ffffff → #dde2e6`), texto `#0a0c0e`, filete do traço grafite e feixe prata acetinado mais escuro; `min(100%, 340px)` × 56 px no desktop e largura total × 54 px até 820 px. O COTAR AGORA do header da landing continua grafite. As fotos não usadas `public/zoom/centro.webp`, `aereo-maritimo.webp` e `transporte.webp` foram apagadas. Este complemento supera, nesses pontos, o texto acima desta nota.

> **Reformulação exclusiva do cartão — 29/10/2026:** `/cartao` passa a uma composição de contatos em primeiro plano, sem a antiga fotografia do escudo. Preserva logo e dados oficiais e usa o Velaris monocromático, título ascendente com vida/família/empresa e shader original de metal líquido nos controles, com dependência autorizada. Thiago, Valdir e Joana ficam visíveis com cargo, número e ações diretas de WhatsApp e ligação. Redes e acesso ao site vêm depois; Facebook continua indisponível. O carrossel final mantém os mesmos três exemplos do componente por autorização expressa, com aviso demonstrativo visível e dados centralizados para substituição posterior; não representa avaliações reais da ZURY. Há pausa global e local do carrossel e suporte a movimento reduzido. O diálogo de cotação permanece provisório, sem envio. Landing, header e suas animações não são redesenhados.

> **Acrílico superior no scroll — 28/10/2026:** no desktop, após o início da rolagem, somente a faixa de 14 px entre o topo da tela e a cápsula recebe preto translúcido com blur de 14 px. A camada fica atrás da navbar, não intercepta cliques nem cobre logo, links ou CTA. No início da página ela não aparece; mobile e animações permanecem inalterados.

> **Navbar compacta e cartão digital — 28/10/2026:** navbar desktop reduzida para 70–88 px (80 px em 1600 px), preservando cápsula, logo original, curvas e efeitos do CTA. Indicações e Benefícios passam a ser públicos também no build final, com links funcionais na navegação, por solicitação expressa do responsável. A rota independente `/cartao` importa somente o cartão do repositório indicado, sem substituir a landing nem incluir essa rota no menu. Reutiliza marca, escudo, dados oficiais e diálogo de cotação; WhatsApp e Contato mostram atendentes e cargos, Contato usa `tel:`, Facebook continua desabilitado e cotação mantém o resumo provisório sem envio.

> **Navbar desktop conforme referência — 28/10/2026:** somente a partir de 1100 px, a navegação passa à cápsula prateada acetinada, com rebaixo central SVG simétrico e a logo preta original centralizada no eixo da barra. Links à esquerda: Soluções, Diferenciais e Indicações; à direita: Benefícios, Sobre e COTAR AGORA, respeitando os mesmos gates comerciais das seções. O CTA preto abre o diálogo de cotação existente; o reflexo percorre apenas sua borda uma vez na entrada e novamente no hover, sem loop, com feedback de clique e suporte a movimento reduzido. O header permanece fixo conforme a versão mais recente do Lovable; mobile, hero, cards, rodapé e animações das seções permanecem intactos. Redes sociais e contatos continuam disponíveis no menu mobile e nos controles existentes da página. O indicador Sobre também reconhece a coluna institucional visível no fim do documento.

> **Etapa 02 com fundo branco — 27/10/2026:** o cartão COMPARE AS SEGURADORAS tem fundo branco, com as logos nos quadrinhos brancos de contorno suave. O degradê preto sobe do branco por paradas suaves, sem faixa cinza, e chega ao mesmo quase preto dos cartões com fotografia; o cartão é mais alto (390 px no computador, 430 px no celular) para as logos ficarem livres do degradê. Vale para computador e celular. Nenhum movimento foi alterado.

> **Animações originais com rolagem nativa — 27/10/2026:** escudo, fileira curva, faixa de seguradoras, letreiro final, entradas das seções e contadores voltam a se mover. A ida até uma seção fica com o navegador: histórico, interrupção e recuo de 96 px, sem rolagem animada própria. Fora da tela, a faixa e a fileira pausam. Com movimento reduzido, o escudo fica parado, fotos e faixas não correm, os contadores aparecem no valor final, a rolagem é imediata e nenhum texto fica escondido.

> **Adaptação para Lovable — 27/10/2026:** autorizada pelo responsável. Nesta cópia, a implementação usa TanStack Start/Vite, imagens HTML nativas e fonte Inter Tight local, mantendo o conteúdo, a marca, os assets e as interações da versão Next.js atual. `src/site-home.tsx` substitui a entrada de página; o manifesto de fotos é enumerado pelo Vite no build. A versão Next.js original e a Vercel permanecem intactas. A branch `backup/before-zury-20261027` preserva o projeto Lovable anterior. Esta nota altera somente as exigências específicas de framework deste documento.

> **Hero, botão e faixa — 27/10/2026:** FALE COM UM ESPECIALISTA fica só com o texto, sem as iniciais T V J. No celular, os quatro rostos e "08 áreas e 44 soluções" ficam centralizados juntos. No computador a faixa continua alinhada à esquerda da coluna.

> **Etapa 02 com as marcas — 27/10/2026:** o cartão claro COMPARE AS SEGURADORAS volta a mostrar as 37 logos das companhias, nas cores originais, embaixo do texto. Não há fotografia nova: o arquivo `public/process/compare-seguradoras.(webp|jpg|png)`, se existir, substitui essa grade.

> **Título das Companhias removido — 27/10/2026:** o responsável pediu para tirar o texto "Compare diferentes seguradoras. / Encontre a proteção para você." e o fundo branco. A faixa volta a ser só o trilho escuro das logos em placas e "37 COMPANHIAS PARCEIRAS". O título fica apenas para leitores de tela ("Companhias parceiras").

> **Título das Companhias de volta — 27/10/2026:** o recorte apontado volta a faixa: duas linhas em caixa de leitura, "Compare diferentes seguradoras." e "Encontre a proteção para você.", sobre papel claro (`--paper-100`), no tamanho já reduzido (`clamp(22px, 1.6vw + 10px, 34px)`). O trilho escuro das logos em placas permanece abaixo. O restante da página revertida não muda.

> **Faixa de rostos no hero — 27/10/2026:** abaixo de FALE COM UM ESPECIALISTA entra só o pedaço do print: quatro rostos sobrepostos e uma linha em dois pesos. O texto usa dados reais do site (08 áreas e 44 soluções), sem número inventado de clientes. As fotos são ilustrativas do público (produtor, caminhoneiro, empresária, mãe e filho), licença Unsplash, e não são clientes. A geração por Gemini estava sem cota.

> **Como Funciona na grade do print — 27/10/2026:** os cinco cartões deixam o carrossel e voltam à grade assimétrica do print. ETAPA 01 (foto do corretor no terraço) ocupa a coluna esquerda nas duas primeiras faixas. ETAPA 02 fica em cartão claro, sem foto. ETAPA 03, SUPORTE 24 HORAS e SINISTROS ficam sobre as fotos de cotação, madrugada e sinistro, com o texto num escurecimento na base. No mobile a grade empilha na ordem das etapas. Raio dos cartões segue 8px.

> **Redesign corporativo — 26/10/2026:** autorizado pelo responsável. Header horizontal fixo com logo oficial à esquerda, navegação ao centro e COTAR AGORA à direita; some ao rolar para baixo e retorna ao rolar para cima; abaixo de 1100 px a navegação vai para popover (hamburger). Controles com raio de 4 px e cards com 8 px, substituindo cápsulas/pills; indicador ativo da navbar passa a ser filete fino sob o rótulo. Sem texto em gradiente nem glass decorativo; superfícies grafite (`--ink-*`) e papel mineral (`--paper-*`), prata acetinada (`--silver-*`) como único acento. **Sem fotografias**: as únicas imagens são as logos (ZURY, 37 companhias, parceiros) e a arte aprovada do escudo; textura do nicho = guilloché (padrão de segurança de apólices) desenhado em canvas, mais gradiente WebGL grafite no Hero. Componentes adaptados em `components/ui/`: Logo Cloud (37 logos logo após o Hero, pausável), Bento + Glare Card (8 soluções; BENS, VIDA E SAÚDE, RURAL e AUTOMOTIVO em destaque), Stats Band (8 áreas, 44 soluções, 37 companhias, suporte 24 h, todos derivados do conteúdo oficial), Canvas Reveal + selo SUSEP (Diferenciais), Avatar stack com iniciais dos três contatos e CTA final com marquee. Nova ordem: Hero → Companhias → Soluções → Diferenciais → Números → Indicações/Benefícios (gates) → CTA → Rodapé. Textos novos de interface a validar: "FALE COM UM ESPECIALISTA", "ESCOLHA A ÁREA E SIGA DIRETO PARA A COTAÇÃO.", "A ZURY EM NÚMEROS", "PROTEJA O QUE VOCÊ CONSTRUIU." e a nota do CTA. Esta nota supera as regras anteriores conflitantes de header centralizado, cápsulas, ausência de CTA/subtítulo extra, proibição de seção de números/chamada final e sublinhado.

> **Redesign corporativo, rodada 2 — 26/10/2026:** Companhias vira banda escura com Velaris e o LogoCloud original (InfiniteSlider reverso a 80 px/s, desacelera para 25 px/s no hover, pausável), com as 37 logos nas cores originais sobre trilho claro acetinado; o `brightness-0 invert` do original foi descartado porque apaga logos em selo cheio (Itaú, HDI, Justos, Pier). Soluções ganha Zoom Parallax de entrada, 3D Marquee tipográfico e cards Bento com Canvas Reveal e foil prata. Tipografia cinematográfica via GSAP SplitText: caracteres do Hero, linhas de todos os títulos de seção, palavras acendendo no scroll (Diferenciais, frase comercial de Indicações) e títulos de Diferenciais em contorno → preenchido. Diferenciais em linhas editoriais, Indicações em quadro comparativo único e assinatura com a logo oficial em grande escala no rodapé. Reduced motion mostra tudo estático e preenchido.

> **Tipografia e imagens dos cards — 26/10/2026:** a caixa alta global foi restringida por pedido do responsável. Continuam em caixa alta: títulos, menu, botões, rótulos, números, nomes de áreas e listas curtas de produtos. Parágrafos e descrições passam à caixa natural, com tracking 0.005em; o texto é guardado em caixa natural e a apresentação é controlada por CSS. Textos aprovados gravados em caixa alta no conteúdo (Indicações e ofertas de Benefícios, ambos em prévia) seguem como estão até nova revisão. Cards COTAÇÃO ÁGIL, SUPORTE 24 HORAS e ACOMPANHAMENTO ATÉ A RESOLUÇÃO aceitam fotografia: arquivo em `public/process/{cotacao|suporte-24h|sinistros}.(webp|jpg|png)` substitui o gráfico desenhado, sem alteração de código. Esta nota supera a regra global de caixa alta do §4.2.

> **Indicações, Benefícios, Soluções mobile e motion — 26/10/2026:** removido o botão PAUSAR MOVIMENTO (a faixa de logos desacelera no hover). No mobile, a Hero passa a ordem título → lema → escudo → botões → dados. Soluções no mobile deixa de ser carrossel (sem "ARRASTE PARA A ESQUERDA"): pilha vertical de blocos com ícone, título, contagem, soluções em etiquetas e COTAR AGORA em largura total; componente Carousel removido. Indicações: cada modalidade é um cartão de membro ZURY (Glare Card 17:21 com inclinação 3D e foil), com CTA abaixo. Benefícios: cards Canvas Reveal com "+" nos cantos, logo em placa branca, nome e desconto sempre visíveis; trilho em loop e `lib/benefit-loop.mjs` removidos. Motion: grades de cards entram por máscara (`clip-path`) em cascata, cartões de membro entram "distribuídos" (giro + subida), cantos de Benefícios giram 90° no hover; tudo restrito a mouse e desligado com movimento reduzido.

> **Fotografia de Nossas Soluções e nova ordem — 26/10/2026:** os oito painéis do Zoom Parallax recebem fotografia, uma por área, em `public/zoom/{bens|vida-saude|rural|automotivo|credito|aereo-maritimo|transporte|responsabilidade-civil}.webp`; o painel central usa `public/zoom/centro.webp` sob véu grafite; cada um dos 44 cartões do 3D Marquee usa a foto do próprio item em `public/marquee/<slug-do-item>.webp` (slug via `photoSlot`). São fotos do Unsplash com licença gratuita para uso comercial, sem atribuição obrigatória; a procedência está em `components/site/solutions.tsx`. Arquivo ausente volta ao painel/cartão desenhado. Esta nota supera a regra anterior "sem fotografias" somente nessas peças. O Zoom Parallax também roda no mobile (layout próprio de retrato); só some com movimento reduzido. Ordem da página: Hero → Companhias → Zoom Parallax → Nossas Soluções → Como Funciona → Diferenciais. Título de Companhias reduzido para clamp(22px–38px).

> **Catálogo de Nossas Soluções — 26/10/2026:** no desktop/tablet, as oito áreas deixam de ser bento com Glare Card e viram catálogo: folha com filetes, 4 colunas (2 até 1199px), cada verbete com número, contagem, ícone + título, itens indexados (1.01, 1.02…) e COTAR AGORA; as quatro áreas em destaque recebem filete prateado no topo. No mobile (até 767px) a apresentação anterior é mantida: blocos empilhados com ícone emoldurado, título e contagem, soluções em etiquetas e COTAR AGORA em largura total.

> **Rodapé Footer Section — 26/10/2026:** o rodapé adota o componente Footer Section (21st.dev) adaptado: painel grafite com topo arredondado, brilho e filete desfocado no centro superior; coluna da marca (logo oficial, lema EXPERIENCIA · AGILIDADE · SOLIDEZ e © 2026 ZURY CORRETORA LTDA) e quatro colunas — NAVEGAÇÃO, ATENDIMENTO (WhatsApp de Thiago, Valdir e Joana e e-mail), INSTITUCIONAL (`#institucional`, razão social, CNPJ e SUSEP com os links oficiais de consulta) e REDES SOCIAIS (Instagram, TikTok, Nos avalie no Google; Facebook fica fora até haver endereço). Entrada em cascata com desfoque (4 px, 8 px, 0,8 s, 0,1 s entre colunas) em GSAP, estática com movimento reduzido. Removidos a logo gigante `data-rise` e o popover `footer-social-channels`; o rodapé fica em `components/site/site-footer.tsx`.

> **Companhias em placas e zoom nítido no mobile — 27/10/2026:** Companhias perde o título visível (fica só um `h2` para leitores de tela, "Companhias parceiras") e a faixa clara contínua atrás do carrossel; cada logo fica em sua própria placa clara (`--paper-50`, raio 4 px), sempre nas cores originais, com o grafite aparecendo entre as placas; no hover com mouse a placa sobe 3 px. "37 COMPANHIAS PARCEIRAS" fica abaixo do carrossel. Esta nota supera a chamada "compare diferentes seguradoras" da nota de 25/10 nessa seção. A cópia de loop do carrossel deixa de ser `inert` (continua `aria-hidden`) para o hover valer nas duas cópias. Zoom Parallax no mobile: painel central no formato da tela (44vw × 44svh, termina em 2,3×) e foto própria em pé `public/zoom/centro-mobile.webp` (recorte 1040×2250 do original 4000×2250), servida por `<picture>` via `getImageProps`; desktop usa `centro.webp` em 3840px. ETAPA 01 de Como Funciona usa `public/process/escolha-solucao.webp` (gerada pelo usuário), enquadrada em 50% 28%.

> **Menu mobile em folha acrílica e ajustes de Como Funciona — 27/10/2026:** abaixo de 1100px o menu hambúrguer abre como folha de largura total colada sob o header, até o fim da tela, em acrílico (grafite 62% + desfoque 22px; header no mesmo acrílico enquanto aberto), com cortina por `clip-path` (480 ms) na abertura e no fechamento e itens subindo em cascata de 40 ms; sólido com `prefers-reduced-transparency`/contraste alto e sem animação com movimento reduzido. Cartões de Como Funciona: painel de texto em acrílico mais transparente (gradiente 12%→72%, desfoque 10px). Cotação Ágil enquadrada em 50% 14%. Companhias sem o spotlight branco desfocado atrás do carrossel.

> **Ordem das seções — 27/10/2026:** Companhias (carrossel de logos + "37 COMPANHIAS PARCEIRAS") sai de logo após a Hero e passa a ficar imediatamente acima do cartão EXPERIENCIA. AGILIDADE. SOLIDEZ. (VelarisStatement). Ordem atual: Hero → Zoom Parallax → Nossas Soluções → Como Funciona → Nossos Diferenciais → Companhias → VelarisStatement → A ZURY em números → Indicações/Benefícios (prévia) → CTA final → rodapé. Esta nota supera as ordens registradas nas notas anteriores.

> **Fileira curva no lugar do Zoom Parallax — 27/10/2026:** o Zoom Parallax foi substituído pelo componente Tilted Grid Hero adaptado (`components/ui/tilted-grid-hero.tsx`): uma fileira de fotos que corre da direita para a esquerda por dentro de um cilindro, plana no centro, curvada e esmaecida nas pontas, com "NOSSAS SOLUÇÕES · 08 ÁREAS · 44 SOLUÇÕES" acima; decorativa (`aria-hidden`), pausada como imagem parada com movimento reduzido; altura 460–640px no desktop e 440px no mobile. Mantém as fotos do zoom (`public/zoom/`: oito áreas + centro), servidas pelo otimizador do Next a ~1080px. Removidos `zoom-parallax.*` e `public/zoom/centro-mobile.webp`. Ordem atual: Hero → fileira curva → Nossas Soluções → Como Funciona → Nossos Diferenciais → Companhias → VelarisStatement → números → Indicações/Benefícios (prévia) → CTA final → rodapé.

> **Fileira curva corrigida — 27/10/2026:** fotos emendadas (espaço de 3% da altura da foto, curva 62°). Duas causas corrigidas no componente: (1) a altura da foto é limitada para que nenhuma tira visível passe de 115° no cilindro, porque a partir de ~127° ela cruza o plano da câmera e é projetada ao infinito/espelhada, gerando a linha piscando e fotos desenhadas umas sobre as outras; (2) os cartões são recriados juntos quando a geometria muda (chave pela geometria), para todas as animações terem o mesmo início, antes, um cartão criado depois do primeiro desenho ficava fora de fase, abrindo buracos e sobreposições.

> **Como Funciona em carrossel no desktop — 27/10/2026:** a partir de 768px, os cinco cartões de Como Funciona deixam a grade bento e correm num carrossel infinito de largura total (cartões de 340–440px, mesma altura, pontas esmaecidas, ~34 px/s, desacelera sob o mouse), reutilizando o `InfiniteSlider` com a nova opção `runWhen`. No mobile o loop fica parado e os cartões continuam empilhados como antes; com movimento reduzido no desktop, a fileira fica parada e rola na horizontal. `BentoGrid` e as regras de canto por posição foram removidos; os cartões usam raio de 8px.

> **Fileira curva ao lado de Nossas Soluções — 27/10/2026:** o 3D Marquee (mosaico inclinado de 44 cartões) foi removido, com `components/ui/three-d-marquee.*`, as fotos `public/marquee/` e o utilitário `photoSlot`. No lugar dele, ao lado do título NOSSAS SOLUÇÕES, entra a fileira curva (Tilted Grid Hero) que antes era uma faixa própria acima da seção; ela deixa de ter título próprio (o texto ao lado já o traz). Curva 50°, altura 460px no desktop, 380px até 1023px e 200px no mobile (abaixo do texto). O limite de ângulo das tiras visíveis caiu de 115° para 100°, para as pontas não virarem listras esticadas. Ordem atual: Hero → Nossas Soluções (com a fileira curva) → Como Funciona → Nossos Diferenciais → Companhias → VelarisStatement → números → Indicações/Benefícios (prévia) → CTA final → rodapé.

> **Seções claras com roseta, cartões de Indicações e menu acrílico — 27/10/2026:** Nossas Soluções e Como Funciona passam a usar o fundo papel (`surface-light`): títulos em grafite, textos secundários em aço, filetes `--line-light`; os botões COTAR AGORA dos cartões ficam grafite em superfície clara; no catálogo, o filete de destaque das quatro áreas fica grafite; no mobile, blocos brancos com borda fina. Toda seção `surface-light` (Soluções, Como Funciona e Benefícios) leva ao fundo a mesma roseta guilloché de Nossos Diferenciais (mesmos parâmetros), agora em tom grafite (`<Guilloche tone="ink">`). Os cartões de Como Funciona continuam escuros, com sombra suave sobre o papel. Indicações: os dois cartões de membro e os dois botões compartilham as mesmas linhas da grade (subgrid), lado a lado sem o deslocamento de 56px, com mesma altura (botões 52px). Menu hambúrguer aberto: o acrílico vale também com "reduzir transparência" do sistema (no Windows, "Efeitos de transparência" desligado ativa essa preferência), por pedido explícito; o header ao rolar continua sólido nesse caso.

> **Cotação e destaques — 25/10/2026:** CTA da Hero passa a COTAR AGORA, com fundo prateado contrastante, Liquid Glass, fade-in, glow, vidro no hover e pulsação discreta; reduced motion estático. Todos os oito cards de Soluções abrem o mesmo painel da Hero, pré-selecionando sua categoria. Destacar SEGURO AUTO, PLANOS DE SAÚDE, SEGURO EMPRESARIAL e AGRO com acesso à cotação. Companhias recebe chamada para comparar diferentes seguradoras. Preservar legibilidade, swipe e acesso aos CTAs no mobile. Mensagens WhatsApp personalizadas por produto/dados de formulário e encaminhamento ao atendente correto ficam para etapa posterior, dependente de campos e regras de roteamento.

> **Cotação e Companhias — 24/10/2026:** autorizado CTA SOLICITAR COTAÇÃO na Hero, abrindo painel com seleção única dos oito títulos oficiais de Soluções e confirmação provisória; próximas etapas serão fornecidas pelo responsável, sem coleta ou envio de dados nesta fase. Companhias passa a apresentar as 37 logos intactas em cards Liquid Glass uniformes, sem textos adicionais, mantendo velocidade e direção atuais do carrossel. Navbar recebe cápsula de hover móvel e interruptível, preservando prioridade visual de Contato e reduced motion.

> **Status:** briefing consolidado e aprovado para implementação.  
> **Companhias clara, menu mobile e CTAs — 24/10/2026:** Companhias passa a off-white com título grafite, sem faixa escura; preservar as 37 logos intactas. Fundos claros recebem pontilhado mineral CSS discreto, sem listras nem névoa lateral. Em até 767 px, logo ZURY à esquerda e hamburger à direita; navegação em popover nativo com foco inicial, fechamento por Escape/clique fora/seleção e menus de contato/social preservados. Esta autorização substitui a proibição histórica de hamburger somente no mobile. Contato da navbar e ambos os CTAs de Indicações com acento grafite/off-white e três passagens discretas de brilho, sem loop permanente nem motion em reduced motion. Hero ganha o subtítulo literal **EXPERIENCIA/AGILIDADE/SOLIDEZ**, em caixa alta, peso 400, com linha fina e tracking; preservar headline e tamanhos atuais, compartilhar parallax do grupo. Esta nota supera as restrições anteriores correspondentes.
> **Integração das 37 logomarcas — 24/10/2026:** recebida a pasta ZURY_37_Logomarcas. Integrar todos os 37 PNGs em public/companies, cópias intactas verificadas por SHA-256; seis arquivos com nomes genéricos identificados visualmente como Ademicon, Capemisa, Itaú, Rodobens, Brasilseg e AXA. Cadastro tipado com nome acessível, dimensões originais e largura óptica de 100–200 px. Logos sem filtros, cards ou legendas, contidas em faixa clara contínua para legibilidade das marcas pretas/azul-escuras; título/seção Companhias seguem grafite. Mesmos espaçamento/slots e loop à direita de 76 px/s preparado anteriormente, sem pausa por hover; mobile/reduced motion estáticos. O recebimento confirma os ativos enviados pelo responsável, não constitui verificação independente de parcerias ou condições comerciais.
> **Rodapé integral, Feedback e logos — 24/10/2026:** remover padding externo do rodapé para que painel e seção tenham a mesma largura/altura; preservar padding interno e não elevar o painel por hover. Três grupos: Navegação, Institucional e FEEDBACK; mover REDES SOCIAIS e NOS AVALIE NO GOOGLE para Feedback, sem duplicar links, mantendo componentes e destinos oficiais. Desktop em três colunas, mobile empilhado. Benefícios com fundo off-white uniforme, sem gradiente/névoa lateral. Companhias preparada com logos livres, sem cards ou textos visíveis, slots de 180–220 px, imagem contida até 180 × 72 px, intervalo de 48 px e o mesmo loop à direita a 76 px/s de Benefícios; mobile/reduced motion estáticos. A integração dos PNGs e ajuste óptico individual permanecem pendentes do envio da pasta, ainda não recebida nesta revisão. Esta nota supera a composição anterior correspondente.
> **Navbar cristalina, rodapé amplo e órbita — 24/10/2026:** painel do rodapé ocupa 100% da largura da seção, preservando padding interno e colunas responsivas. Navbar em vidro claro neutro translúcido com texto grafite, sem linha especular superior forte; contorno uniforme discreto e sombra inferior curta. Escudo com órbita contínua de ±16 px horizontal/±28 px vertical, pitch ±1,1°, yaw ±4° e roll ±1,3° em 10 s; intensidade móvel 40%, reduced motion estático. Preservar PNG e composição SVG do reflexo, limites do cursor, luz de fundo e cleanup existentes. Esta nota supera o vidro escuro da navbar, limite lateral do rodapé e amplitude anterior correspondentes.
> **Refinamento Glass e faixa livre — 24/10/2026:** navbar com vidro grafite translúcido e texto off-white, contorno especular fino, contraste em todos os estados e fallback sólido de alta acessibilidade. Superfícies claras mais cristalinas, sem cobertura leitosa. Entradas existentes passam a 1,2 s/espera 0,08 s; saída/retorno da navbar 160/220 ms; Flow Glass 600 ms e fade 160 ms, demais realces em torno de 180 ms. Benefícios ocupa a largura total da seção no desktop, sem janela central de 960 px, trilho a 76 px/s para a direita e cópias visuais calculadas para cobrir a viewport durante todo o ciclo. Preservar bordas próprias dos cards, logos, leitura móvel/reduced motion estáticos, proteção por foco/interação/documento oculto e ausência de pausa por hover. Impeccable instalado localmente; CYLTabBarController não é skill web e não foi instalado. Esta nota supera limites e timings anteriores correspondentes.
> **Revisão de 24/10/2026:** remover FARMELHOR UNAÍ dos dados renderizáveis de Benefícios, preservando o PNG histórico; restam ZAPP, GRUPO MV, ÓTICA VEMOS e LABORATÓRIO CENTROLAB. O loop não pausa mais ao passar o cursor; manter foco, interação ativa, documento oculto e reduced motion protegidos. Entradas existentes (seções, cards, títulos, marca/navbar e escudo) usam a mesma função de fade/deslocamento/escala, agora 2,4 s, espera de 0,25 s e power3.out; escudo sem rotação exclusiva na entrada, mantendo flutuação e reflexo. Esta revisão supera os tempos, parceiros e regras de hover anteriores correspondentes.
> **Revisão de iluminação e entradas — 22/10/2026:** remover integralmente tramas, riscos e arcos repetidos dos fundos claros; usar gradientes perolados e iluminação ampla distinta por seção (lateral em Soluções, halo em Indicações, diagonal em Benefícios). Destaques em gradiente grafite sobre claro e off-white sobre escuro, incluindo preenchimento WebKit e fallback de alto contraste. Entradas de superfície do header, logo, wrapper da navbar, linhas da Hero e reveals compartilham a configuração do escudo: 3,2 s, espera de 0,5 s, power3.out, translação 28/38 px e escala inicial 0,94; preservar inclinação própria do escudo, reduced motion e saída independente/rápida da navbar. Esta revisão substitui as texturas e tempos de entrada anteriores.
> **Refinamento complementar de 22/10/2026:** Benefícios com cards compactos (mínimo 240 px, expansíveis pelo conteúdo), marca 8 px acima da oferta e todas as cinco logos preservadas. Movimento linear para a direita a 52 px/s, conservando fase no resize e pausas implícitas de leitura/visibilidade; remover controle explícito de pausa. Mobile e reduced motion permanecem estáticos. Fundos off-white com texturas minerais distintas e gradientes; títulos/destaques em gradiente grafite sobre claro e off-white sobre escuro, com fallback de contraste. Glass mais transparente, seções arredondadas (24 px desktop/18 px mobile), junções sem linhas luminosas. Bloco da marca acompanha o fluxo da página sem animação; somente navbar recebe fade/saída no scroll. Esta nota supera as decisões anteriores correspondentes.
> **Revisão de 22/10/2026:** bloco de marca/navbar off-white com marca grafite; Hero mantém fundo original; Soluções, Indicações e Benefícios off-white mineral com texturas CSS neutras e tinta grafite, alternados com Diferenciais/Companhias/Footer escuros. Preservar superfícies transparentes, contraste e gates comerciais. Hero usa Inter Tight em todas as linhas, sem alterar texto/tamanhos, e wrapper deslocado 10% à direita/10% acima em relação à própria caixa, sem disputar o parallax. CTAs de Indicações iguais, 260 × 56 px limitados à largura útil, centralizados na base dos cards. Afiliado: INDICAÇÕES SIMPLES / CÓDIGO INDIVIDUAL DE INDICAÇÃO PODENDO GERAR UMA EXCELENTE RENDA EXTRA / **REMUNERAÇÃO DE R$100 ENVIADO VIA PIX PELA CONTRATACÃO DO INDICADO.** Remover POSSIBILIDADE DE RENDA EXTRA. Parágrafo: **A ZURY OFERECE O MELHOR PREÇO DO MERCADO PARA AFILIADOS E PARCEIROS NAS CONTRATAÇÕES, RENUNCIANDO Á NOSSA COMISSÃO.** Cópia fornecida, sem comprovação comercial presumida. Benefícios: ZAPP passa a 5% DE DESCONTO EM ATÉ 3X; adicionar ÓTICA VEMOS — 15% DE DESCONTO A VISTA E 10% Á PRAZO e LABORATÓRIO CENTROLAB — 10% DE DESCONTO, com PNGs fornecidos de 1254 × 1254 intactos. Cinco parceiros; carrossel condicional à direita, com pausa explícita acessível além de hover/foco. Mobile/reduced motion estáticos. Esta revisão supera os textos, famílias e fundos históricos correspondentes.
> **Correção complementar de 21/10/2026:** Afiliado passa a exibir código no terceiro tópico e remuneração no quarto, preservando somente a remuneração em negrito. Vida e Saúde recebe Plano de previdência e Seguro prestamista (total atual: 44 serviços). Ícones de Soluções ancorados no topo da mesma faixa de título; RESPONSABILIDADE CIVIL quebra apenas entre palavras, com ajuste óptico local de 18 px/tracking 0.025em. Reflexo usa uma única composição SVG plana com máscara alpha da imagem original e deslocamento 2D, em lugar de máscara CSS envolvendo filho 3D. Esta nota supera os valores e a ordem anteriores correspondentes.
> **Revisão mais recente — 21/10/2026:** autorizada seção COMPANHIAS acima de Benefícios (antes do Footer quando Benefícios estiver omitido), com logos PNG livres, sem cards e sem marcas fictícias. Cadastro tipado vazio até recebimento dos ativos autorizados; reutilizar movimento condicional de Benefícios, para a direita a 42 px/s, pausável em hover/foco/interação/documento oculto, estático em mobile/reduced motion. Esta autorização supera a proibição histórica de faixa de logos apenas nesta seção. Soluções segue a lista atualizada do §8.2 e usa títulos 20 px/listas 16 px. Reflexo do escudo restrito à área da imagem com queda suave nas bordas, opacidade máxima 0.28 e faixa estreita; reset ao rolar, perder foco ou sair da Hero. Preservar PNG, órbita e gates comerciais.
> **Natureza:** fonte única de verdade para marca, conteúdo, experiência, comportamento visual e critérios de aceite.  
> **Idioma de interface:** português brasileiro (`pt-BR`).  
> **Escopo:** landing page premium, responsiva, de página única; quatro blocos públicos atuais, Indicações e Benefícios adicionais em prévia de desenvolvimento (§§9.3–9.4).
> **Documento complementar:** [`AGENTS.md`](./AGENTS.md) contém somente instruções de execução para o Codex; não substitui este documento.  
> **Regra essencial:** não inventar textos, produtos, contatos, afirmações comerciais ou áreas extras para preencher o layout.
> **Revisão visual de 19/10/2026:** Premium Dark Gradient, navegação com cinco opções e contatos em popovers aprovados expressamente no pedido de redesign. Esta revisão substitui as decisões anteriores correspondentes; o escudo continua sem aprovação e isolado.
> **Refinamento complementar de 19/10/2026:** cápsulas Flow Glass compartilhadas na navbar e nos menus; contato e redes sociais separados; rodapé sem botão WhatsApp; produtos revisados no plural. Header completo com saída conjunta de 475 ms e reaparecimento somente no topo. Listas com marcadores discretos e 12 px entre produtos; diferenciais em caixa alta por CSS, organizados em trechos com marcadores e divisórias. Painel do rodapé compartilha as animações dos cards. Preservar a aplicação existente e o gate do escudo.
> **Etapa 2 — identidade visual e Hero:** direção cromática da imagem 4 e nova headline autorizadas pelo responsável. Substituem o congelamento anterior dos fundos e a headline antiga. Implementação visual ainda sujeita à avaliação; não implica aprovação do escudo nem autorização para etapas futuras.
> **Etapa 3 — Indicações:** autorizados Hero em caixa alta, remoção exclusiva das divisórias de produtos e nova seção de indicações em prévia, com acesso na navbar. Preservar a etapa 2 sem reconstrução. A oferta depende de validação comercial/jurídica; escudo continua isolado e sem aprovação.
> **Etapa 5 — revisão visual e comercial:** caixa alta global permanente, cards mais compactos e novos textos de Indicações. Benefícios contém somente três cards estáticos: FARMELHOR UNAÍ, ZAPP e GRUPO MV. Faixa de logos cancelada; avisos de prévia removidos da interface, sem liberar publicação comercial. Headline de rendimento mensal e operação de códigos continuam pendentes. Escudo continua isolado e sem aprovação.
> **Etapa 7 revisada:** Hero ampliada novamente, cards de Indicações perceptivelmente mais altos, título comercial único sem ponto e mensagem branca em negrito, duas linhas quando houver largura. Benefícios perde a chamada auxiliar e conserva o carrossel condicional. Menus aprovados da navbar são reutilizados no rodapé com abertura acima quando necessário. WhatsApp flutuante autorizado com menu horizontal à esquerda; verde-neon exclusivamente na borda/glow de hover/foco do botão. Esta revisão substitui restrições anteriores correspondentes. Gates comerciais e do escudo permanecem.
> **Decisão mais recente — integração do escudo em imagem:** o responsável autorizou expressamente integrar a própria imagem original à Hero. Essa decisão supera as restrições históricas de isolamento e obrigatoriedade de 3D real para esta alternativa. A captura de 19/10 às 21:30 orienta somente tamanho, inclinação e iluminação de fundo; textos, navbar, identidade e demais seções atuais permanecem. Não constitui aprovação do estudo procedural nem liberação dos gates comerciais.

---

## 1. Objetivo e princípios do projeto

Construir do zero um website de apresentação institucional e comercial da **ZURY CORRETORA**, empresa brasileira de corretagem de seguros e serviços correlatos, com qualidade visual de estúdio especializado em marcas de alto padrão. O resultado deverá transmitir **confiança, solidez, credibilidade, sofisticação, exclusividade, precisão e modernidade**.

### 1.1. Direção criativa aprovada

- **Quiet luxury:** luxo discreto, sem ornamentação supérflua, ostentação, efeitos chamativos ou aparência genérica de template.
- **Linguagem arquitetônica e geométrica:** alinhamentos rigorosos, ritmos consistentes, proporções cuidadosas, áreas de respiro equilibradas.
- **Minimalismo expressivo:** poucos elementos com alta qualidade de execução; não compensar espaços vazios adicionando conteúdo não autorizado.
- **Visual contemporâneo e atemporal:** refinado, premium, limpo e corporativo, sem excesso de gradientes ou cores de destaque.
- **Crystalline Liquid Glass:** superfícies translúcidas sutis, contornos cristalinos, reflexos delicados, profundidade contida e contraste sempre legível.
- **Motion cinematográfico:** movimento deliberado, macio, progressivo, com continuidade entre seções, sem cortes bruscos, flashes ou movimentos que causem desconforto.
- **Fidelidade ao conteúdo e à marca:** a logo está pronta; **não a redesenhar nem recriar sua tipografia**.

### 1.2. Prioridades de decisão (ordem)

1. Exatidão dos conteúdos, marca e estrutura autorizada, incluindo o gate de publicação de Indicações.
2. Legibilidade, acessibilidade e funcionamento em todos os dispositivos.
3. Fidelidade estética à direção premium, inclusive no mobile.
4. Performance real e estabilidade de carregamento.
5. Sofisticação técnica **somente onde agregue benefício perceptível**.

Se um efeito visual prejudicar a leitura, estabilidade, usabilidade ou desempenho, simplificar sua implementação **sem mudar a proposta de design**. Não remover indiscriminadamente todos os efeitos da versão mobile.

---

## 2. Arquitetura de informação e prévia de Indicações

A página pública padrão mantém os quatro blocos abaixo. A prévia completa insere `indicacoes` depois de `sobre` e `beneficios` depois de `indicacoes`, antes de `contato`: Hero → Soluções → Diferenciais → Indicações → Benefícios exclusivos → Footer. Cada oferta tem gate de publicação independente.

| Ordem | ID semântico | Seção | Tom de referência |
| --- | --- | --- | --- |
| 1 | `inicio` | Hero | grafite profundo com luz cinza-prata |
| 2 | `servicos` | Nossas Soluções | cinza mineral e grafite, mais luminoso que o Hero |
| 3 | `sobre` | Nossos Diferenciais | cinza mineral escuro com profundidade própria |
| 4 | `contato` | Footer institucional e contatos | gradiente escuro até grafite profundo `#1C1C1C` |

**Esclarecimentos importantes:**

- A navegação/header não é uma quinta seção.
- As únicas seções adicionais autorizadas são PROGRAMA DE INDICAÇÕES e BENEFÍCIOS EXCLUSIVOS, sujeitas aos gates dos §§9.3–9.4. Esta autorização substitui a limitação histórica de quatro blocos somente na prévia habilitada.
- **Não criar seção exclusiva de contato**: o destino `#contato` aponta para o footer.
- Não criar seções além das autorizadas, depoimentos, FAQ, estatísticas, formulário, newsletter, planos, logos de seguradoras ou chamada final. As três marcas comerciais do §9.4 pertencem a Benefícios, não a uma seção comercial adicional.
- O design entre os quatro tons deve parecer **uma transição luminosa contínua ao rolar a página**, com gradientes neutros distintos derivados do rodapé existente. Unir as bordas das seções sem mudanças abruptas; não uniformizar todas no mesmo tom.
- Entre seções, compartilhar uma transição arquitetônica: filete prateado de aproximadamente 1 px, baixa opacidade e extremidades dissipadas, acompanhado de luminosidade difusa suave. Sem faixas rígidas, linhas pesadas, novas cores ou novas seções.
- Rotas ou ferramentas locais **de pré-visualização do escudo** são permitidas durante o desenvolvimento, desde que **não integrem a navegação nem sejam publicadas como uma quinta seção/área comercial**.

---

## 3. Marca oficial e arquivos SVG

### 3.1. Pasta de ativos

Os seguintes arquivos foram fornecidos/preparados e devem ficar exatamente em `public/brand/`:

```text
public/
└── brand/
    ├── 04_ZURY_Preto_Transparente.svg       # original entregue; não editar
    ├── ZURY_Logo_Otimizada_Preto.svg        # preto #090909
    ├── ZURY_Logo_Otimizada_Grafite.svg      # grafite #1C1C1C
    └── ZURY_Logo_Otimizada_Branco.svg       # branco #FFFFFF
```

Os três SVGs otimizados possuem `viewBox="280 96 1046 324"` e dimensões nominais `1046 × 324`; o original possui `viewBox="0 0 1600 535"`. A otimização remove apenas excesso de margem transparente pela janela de visualização. **As curvas e proporções do desenho devem permanecer rigorosamente idênticas**.

### 3.2. Regras mandatórias de aplicação

**Revisão posterior — prata clara:** por solicitação expressa, logo completa e monograma na interface passam a usar `#D7DCE0`, como textos e ícones antes brancos. Aplicar a silhueta do próprio SVG oficial como máscara CSS, sem filtros, redesenho ou edição dos quatro arquivos originais. Preservar a imagem informativa acessível e a proporção natural. Essa aplicação supera somente a exigência histórica de branco na renderização; logos dos parceiros e imagem do escudo permanecem intactas.

1. Usar a **logo oficial completa** (símbolo/monograma + lettering) nos locais especificados; não substituir por texto digitado.
2. **Navbar e superfícies escuras:** usar `ZURY_Logo_Otimizada_Branco.svg`; em superfícies claras, preferir a variante grafite (`#1C1C1C`). Nunca recolorir o SVG com filtros.
3. **Footer grafite profundo:** usar `ZURY_Logo_Otimizada_Branco.svg` (`#FFFFFF`) para contraste.
4. Variante preta (`#090909`): disponível para superfícies muito claras e cenários auxiliares, se necessário.
5. Preservar o arquivo original como referência imutável. Não aplicar filtros que distorçam cor/contornos, não esticar, deformar, redesenhar, aplicar sombreamentos internos, recriar fonte, adicionar elementos ou recortar os caminhos visíveis.
6. Manter `aspect-ratio` natural, largura responsiva e alinhamento óptico. Não confiar somente na caixa externa para centralização visual; conferir renderização.
7. O efeito Liquid Glass deve estar **na superfície que hospeda a marca**, não dentro do desenho da logo.
8. Para a imagem informativa, garantir nome acessível apropriado: `ZURY CORRETORA`. Quando estiver adjacente a texto redundante, evitar anúncio duplo em leitores de tela.
9. Verificar visualmente o contraste e a legibilidade do lettering pequeno nos dispositivos reais/simulados.
10. O aumento sutil de espessura aparente foi solicitado, mas é condicionado à fidelidade absoluta. Não aplicar stroke, filtros ou font-weight sobre a imagem. Sem variante vetorial fiel aprovada, manter os quatro originais intactos; não simular a alteração.

### 3.3. Ativos que NÃO foram fornecidos

- **Não existe escudo 3D oficial pronto**. O Codex deve modelá-lo/desenvolvê-lo conforme o processo de aprovação do §7.
- Não assumir disponibilidade de fotos, ícones proprietários, vídeo, imagens decorativas ou novos arquivos de marca.
- Para os serviços, usar ícones vetoriais de traço da biblioteca aprovada (`lucide-react` ou equivalente tecnicamente consistente), sem introduzir imagens externas.

---

## 4. Design system: cor, tipografia, espaçamento e materiais

### 4.1. Paleta base aprovada

| Token sugerido | Cor | Emprego principal |
| --- | --- | --- |
| `--zury-offwhite` | `#EAEAE5` | texto e luz neutra sobre grafite |
| `--zury-stone` | `#D6D3D1` | prata e reflexos minerais |
| `--zury-midgray` | `#78716C` | referência mineral, misturada a grafite nos fundos |
| `--zury-graphite` | `#1C1C1C` | texto em superfícies claras, Footer |
| `--zury-white` | `#FFFFFF` | texto de alto contraste sobre fundo escuro |
| `--zury-logo-black` | `#090909` | cor técnica do SVG preto, **não** uma nova cor de UI |

- **Não acrescentar cores saturadas ou metalizados dourados/champagne** à identidade do site, exceto o verde de WhatsApp do §10.4, restrito à borda/glow de hover/foco do botão flutuante.
- Prata acetinada permanece o material do escudo; luminosidade cinza-prata neutra compõe gradientes/reflexos. Sem dourado, champagne ou gradientes coloridos. A única exceção de neon é o §10.4.
- Variações de opacidade, luminância e mistura entre tons neutros são permitidas para simular vidro e transições, desde que respeitem a paleta.
- Contrastes de texto, bordas, indicadores e controles devem ser aferidos sobre o **fundo composto real**, inclusive no movimento, não apenas sobre uma cor ideal. Sobre o cinza `#78716C`, o branco puro passa por margem relativamente pequena para texto comum; transparências e highlights podem diminuir esse contraste e devem ser testados.

**Superfícies da etapa 2 — referência imagem 4:** amostras médias de regiões de 12 × 12 px, sem copiar textos, logos, categorias ou escudo da imagem. As cores técnicas dos SVGs permanecem inalteradas.

| Token semântico | HEX | Função |
| --- | --- | --- |
| `--surface-mineral` | `#0A0C0E` | preto mineral, topo do Hero e profundidade do rodapé |
| `--surface-graphite` | `#1E2022` | grafite, transições e base dos diferenciais |
| `--surface-metal` | `#2D2E2E` | base metálica escura de Soluções |
| `--surface-steel` | `#4F4D4B` | luz mineral dos diferenciais, misturada com transparência |
| `--light-silver` | `#989491` | reflexos prateados difusos, nunca fundo principal claro |
| `--light-satin` | `#D6D3D1` | alias de `--zury-stone`, filetes acetinados |

Gradientes por seção em `--hero-surface`, `--solutions-surface`, `--about-surface` e `--footer-surface`. Luzes em `--hero-ambient`, `--solutions-ambient`, `--about-ambient`; encontros em `--boundary-line` e `--boundary-light`. Hero concentra luz à direita; Soluções recebe luz no alto à direita e sombra à esquerda; Diferenciais recebe luz lateral esquerda com reflexão diagonal discreta; rodapé retorna ao grafite profundo. Bordas dos gradientes compartilham tons, sem faixas claras. Somente o encontro Hero → Soluções recebe curva luminosa fina, estática, sem novos conteúdos ou loops. A composição aguarda aprovação visual desta etapa.

### 4.2. Tipografia

**Ajuste pontual de 21/10/2026:** navbar com fonte de 12 px e títulos de todos os cards (Soluções, Diferenciais, Indicações e Benefícios) com 18 px, inclusive no mobile. Permitir quebras e crescimento conforme o conteúdo, preservando tracking, famílias, corpo, títulos de seção, CTAs e animações. Até 393 px, reservar mais uma linha de navegação (44 px) acima da Hero e deslocar seu filete na mesma medida, evitando sobreposição. As demais sugestões da auditoria não foram incluídas neste pedido.

#### REGRA GLOBAL DE CAPITALIZAÇÃO — CAIXA ALTA OBRIGATÓRIA

**TODO O CONTEÚDO TEXTUAL VISÍVEL DO SITE ZURY CORRETORA DEVE SER EXIBIDO EM CAIXA ALTA, EM TODAS AS SEÇÕES, COMPONENTES, INTERAÇÕES E BREAKPOINTS. ESSA É UMA DIRETRIZ GLOBAL, PERMANENTE E PRIORITÁRIA DA IDENTIDADE VISUAL.**

Aplicar a todos os títulos, textos, cards, descontos, avisos, instruções, CTAs, navegação, popovers, rodapé, dados legais e estados visíveis, inclusive em previews locais. Implementar por `text-transform: uppercase` herdado da raiz e pelos controles, preservando os dados originais para busca, cópia e leitura assistiva. Não alterar capitalização de URLs, `href`, e-mails na fonte, identificadores, metadados estruturados ou parâmetros de WhatsApp. Não modificar textos incorporados aos SVGs/PNGs oficiais: identidade visual das marcas é exceção expressa. Rever quebras e dimensões após a transformação. Esta regra substitui qualquer permissão anterior de texto visual em caixa baixa; textos literais mistos neste documento continuam sendo a fonte semântica, não uma exceção de apresentação.

- Família principal: **Inter Tight**; carregar de forma otimizada (ex.: `next/font/google`, se a stack final suportar).
- Peso predominante: **600 / semibold**. Outros pesos apenas se melhorarem hierarquia e leitura; evitar aspecto excessivamente fino.
- Títulos de seções: **caixa alta**, tracking discreto/compacto, linhas de quebra conscientes e escala responsiva por `clamp()` ou sistema equivalente. A headline do Hero preserva a capitalização literal do §6.1.
- Textos auxiliares: hierarquia clara, corpo com entrelinha confortável e peso suficiente para leitura sobre vidro.
- Não substituir o lettering vetorizado da logo por Inter Tight; a fonte Inter Tight se destina **ao conteúdo e à interface do site**.
- Não sacrificar legibilidade para manter tudo em uma única linha; quebras pensadas são preferíveis a fontes microscópicas.

**Tracking global da etapa 6 — tokens semânticos em `:root`:**

| Papel | Token | Valor |
| --- | --- | --- |
| Hero, desktop e mobile | `--tracking-hero` | `0.025em` |
| Títulos de seção e chamada de Benefícios | `--tracking-section` | `0.06em` |
| Títulos de cards | `--tracking-card-title` | `0.055em` |
| Descrições, serviços e frases de apoio | `--tracking-copy` | `0.025em` |
| Botões e CTAs | `--tracking-control` | `0.065em` |
| Navbar | `--tracking-nav` | `0.065em` |
| Popovers e seus controles | `--tracking-popover` | `0.04em` |
| Rodapé, inclusive dados legais e links | `--tracking-footer` | `0.04em` |
| Valores financeiros e descontos | `--tracking-financial` | `0.035em` |

Estes valores substituem integralmente os baselines negativos e percentuais anteriores. Não aplicar um tracking único indiscriminadamente nem reaplicar percentuais. Inter Tight e caixa alta global permanecem; não alterar tipografia interna das logos. Ajustes ópticos de dimensão são permitidos para preservar hierarquia e leitura, sem texto cortado ou quarta linha do Hero desktop. Preservar escalas de corpo legíveis; conferir larguras reais no navegador.

### 4.3. Composição e grid

- Largura máxima confortável para conteúdo, com margens generosas e proporcionais; **não esticar excessivamente em monitores ultrawide**.
- Ritmo vertical elegante: títulos centralizados nas seções de conteúdo e espaçamento **moderado e equilibrado** entre títulos e cartões.
- Cortes/raios arquitetônicos: cantos moderadamente arredondados; controles tipo **pill** onde pertinente, sem tornar todos os cartões excessivamente arredondados.
- Alinhamentos rigorosos; evitar elementos decorativos gratuitos, separadores exagerados, linhas pesadas e sombras dramáticas.
- Componentes responsivos devem responder à **largura útil e ao conteúdo**, não somente a nomes de dispositivos.

### 4.4. Crystalline Liquid Glass

**Refinamento de 21/10/2026 — cristal e fundos:** reduzir preenchimento compartilhado do vidro para 0.035 / 0.004 / 0.018, tint de popovers/WhatsApp para 0.27, contorno neutro de 0.13 e blur estático de 16 px. Nav em repouso mais transparente, contorno refratado delicado, sem aumentar sombras. Preferências por menos transparência/mais contraste usam superfície quase sólida. Logo oficial mantém silhueta/lettering/arquivos intactos e recebe acabamento CSS prata fria (gradiente claro) pela máscara existente; sem filtros ou redesenho. Fundos com composições distintas: estúdio assimétrico na Hero, planos verticais em Soluções, luz diagonal em Diferenciais, duas luzes laterais em Indicações, horizonte luminoso em Benefícios e profundidade assimétrica no Footer. Manter paleta neutra, tipografia, header compacto e gates comerciais.

**Refinamento atual:** texto principal, estados antes brancos e ícones usam prata clara `#D7DCE0`. Vidro compartilhado com gradiente de opacidades 0.055 / 0.008 / 0.028 e blur de 12 px; tint de popovers e WhatsApp reduzido a 0.46. Preservar contraste e fallback opaco quando não houver backdrop-filter, sem alterar cores incorporadas aos ativos dos parceiros ou do escudo.

Aplicar este tratamento em **navbar, cartões de serviços, cartões institucionais, botões, popovers e painel do footer**:

- Translucidez moderada com efeito de vidro crível, **não** material opaco genérico nem transparência que apague o texto.
- Highlights estreitos/suaves, reflexos de borda e gradações sutis de luminosidade.
- Borda fina cristalina: **não** usar contorno branco espesso ou contraste teatral.
- Sombras difusas, leves, quase imperceptíveis.
- Hover/foco: sutil elevação/profundidade e resposta de luz, **sem inclinação dos cartões** (`tilt`) ou parallax intenso.
- Mobile: preservar sensação de vidro com luz ambiente sutil e resposta ao toque quando viável; adaptar intensidade/custo sem descaracterizar o projeto.
- Não usar `backdrop-filter` indiscriminadamente em camadas enormes e empilhadas; medir o custo de composição e manter fallback visual digno quando não houver suporte.
- O vidro deve ser perceptível e relativamente transparente, com blur controlado, realces especulares neutros, reflexo que responde discretamente à interação, foco acessível e feedback de pressão. Evitar aspecto leitoso, bordas brancas grossas e sombras pesadas.

### 4.5. Flow Glass

- Derivar o efeito da faixa diagonal de luz do antigo botão CONTATO: fluxo amplo e suave de prata/grafite atravessando a superfície, sem spotlight circular, rastreamento do cursor, neon ou pontos artificiais.
- Compartilhar tokens de gradiente, transparência, bordas, blur, raios, duração e easing. Animar apenas a camada decorativa limitada à superfície, por transform e opacity, sem mover texto ou animar blur.
- Aplicar aos itens de navegação, cards de serviços/institucionais/indicações e opções selecionáveis dos popovers. Os cards continuam informativos, sem falso clique ou cursor de botão; somente os CTAs de interesse são links.
- Uma única primitiva `flow-glass flow-capsule` serve navbar, WhatsApp, e-mail, Instagram, TikTok e os três contatos: raio totalmente arredondado, overflow recortado, contorno cristalino fino, fundo translúcido e reflexo atrás do texto. Nenhum retângulo aparece durante hover/foco/pressão. Intensidade pode variar, sem bibliotecas ou efeitos concorrentes.
- Hover apresenta superfície cristalina leve e reflexo desacelerado; saída desvanece gradualmente. Na navbar, preservar integralmente o Liquid Glass aprovado durante hover (reflexo, glow, transparência, blur, borda, raio, duração, easing e intensidade). Em repouso, inclusive link ativo sem hover, mostrar somente texto, sem fundo, contorno individual ou glow permanente; preservar `aria-current` e contraste textual, nunca underline. Foco visível e popovers abertos conservam seus estados acessíveis. Não modificar a estrutura externa, padding, posições ou parâmetros do hover para remover as cápsulas inativas; limitar a correção ao CSS de repouso da navbar.
- Touch recebe feedback de pressão sem hover persistente; reduced motion conserva resposta estática sem deslocamento do reflexo. Sem loops contínuos ou listeners de pointermove.
- Não existem setas visuais na landing page, inclusive em links, menus e carrosséis. Expansão WhatsApp pode usar sinal mais/menos, não chevron.

---

## 5. Navegação e header

### 5.1. Desktop

**Refinamento de 21/10/2026:** conjunto de marca/navbar mais compacto, com padding desktop de 20 px no topo/12 px na base e gap de 14 px. Cápsula com padding de 4 px e controles com mínimo de 44 px. Manter fonte de 12 px e uma única linha horizontal a partir de 768 px; entre 768 e 1000 px, reduzir somente o padding horizontal dos itens para 10 px. Mobile mantém quebra e todas as opções visíveis. Ocultar o conjunto já aos 32 px de scroll, em 250 ms; revelar somente até 8 px do topo, em 350 ms. Preservar foco/popover protegido, reduced motion e saída conjunta. Substitui os limites e durações anteriores.

- Logo oficial completa branca centralizada e navbar flutuante Liquid Glass, centralizada e bem distribuída sobre os novos fundos escuros.
- Ordem final da prévia completa: `SOLUÇÕES` → `#servicos`; `DIFERENCIAIS` → `#sobre`; `INDICAÇÕES` → `#indicacoes`; `BENEFÍCIOS` → `#beneficios`; `SOBRE` → `#institucional`; `REDES SOCIAIS` → popover social; `CONTATO` → popover de contato. Popovers verticais centralizados no gatilho quando couberem, preferencialmente abaixo, reposicionados dentro da viewport.
- INDICAÇÕES e BENEFÍCIOS seguem gates independentes. Preservar cápsula externa, parâmetros de hover, Flow Glass e ocultação do header.
- Não criar uma quinta seção para SOBRE. O ID `institucional` pertence à coluna legal já existente.
- Os itens ficam somente textuais em repouso, sem cápsulas visíveis, mantendo posição, padding, tamanho e espaçamento. Em hover, preservar exatamente o Liquid Glass existente e seu raio `9999px`, borda, fundo, reflexos e animação; na saída, retornar ao repouso limpo com os parâmetros existentes. A estrutura externa Liquid Glass permanece intacta. Informar `aria-current` quando aplicável; preservar contraste do ativo, foco acessível, popovers abertos e feedback de toque, sem sublinhado.
- Header visível inicialmente e no topo; logo, contêiner superior e navbar animam como uma unidade em 475 ms (faixa de referência 400–550 ms), `power2.out` com desaceleração, fade e deslocamento de 24 px para cima. **Não reaparece ao subir: somente ao retornar ao topo.** Usar histerese contra flicker (ocultar a partir de 88 px, revelar até 8 px). Não recolher altura/gap da marca durante o scroll. Não ocultar enquanto popover da navbar estiver aberto ou foco estiver em seus controles visíveis; ao terminar, retomar a política de posição. Oculto fica inert, sem bloquear cliques ou prender foco. Reduced motion mantém a regra sem deslocamento prolongado.
- Contraste e reflexos se ajustam aos fundos, sem troca abrupta de tema.

### 5.2. Mobile

- Logo oficial completa e **todas as opções acessíveis e visíveis** (sete na prévia completa; cinco no padrão), com distribuição compacta em múltiplas linhas quando necessário, inclusive em tablets cuja largura não comporte a linha única.
- **Não usar menu hamburger, dropdown para esconder links nem scroll horizontal da própria navbar**.
- Verificar obrigatoriamente **320, 360, 375, 390 e 430 px** de largura.
- Priorizar legibilidade e alvos de toque utilizáveis; não cortar textos ou provocar overflow horizontal para forçar uma linha.
- O conteúdo não pode ficar escondido sob o header; considerar `scroll-margin-top`, safe areas e posições reais do elemento fixo/flutuante.

### 5.3. Comportamento e acessibilidade

- Navegação programática por âncoras usa somente GSAP ScrollToPlugin, com `power2.inOut`, duração por distância limitada a 0,55–1,10 s, alvo por posição de layout (sem transforms de reveal), margem fixa de 96 px (livra os títulos do final do fade da navbar) e limite do documento. CSS vertical usa `scroll-behavior: auto`, sem `scrollIntoView` ou segundo tween concorrente. Novo clique substitui o anterior; wheel, toque e teclas de rolagem interrompem a animação, sem sequestrar o scroll manual. Hash e foco são preservados; regiões de destino não desenham borda de foco ao redor da seção inteira, mas todos os controles mantêm foco visível. Reduced motion navega imediatamente. Carrosséis mantêm apenas seu scroll horizontal nativo local.
- `prefers-reduced-motion: reduce`: navegação funcional e rápida, sem animações longas.
- Estados de hover, foco visível e ativo diferenciáveis. Informar link ativo adequadamente (`aria-current` quando aplicável).
- Não bloquear clique ou foco em elementos próximos; suportar teclado, mouse, toque e leitores de tela.

---

## 6. Hero: texto exato, layout e entrada

### 6.1. Elementos permitidos

**Somente:**

1. Headline **exatamente** `SEU PATRIMÔNIO MERECE A MELHOR ESCOLHA ZURY!`.
2. **A imagem original do escudo** com movimento sutil, conforme decisão atual do §7.0.

**Não adicionar:** subtítulo, CTA/botão, texto de apoio, indicação de scroll, carrossel, números, selo, ícones extras, microcopy ou objetos 3D decorativos adicionais.

### 6.2. Composição

**Refinamento atual:** entrelinha da Hero reduzida a 1.08, inclusive no mobile. Primeiras duas linhas em grafite claro `#ADB4BB`; ZURY! permanece em prata `#D7DCE0`. Fontes, tamanhos, centralização e arte do escudo preservados.

**Últimas anotações tipográficas:** primeira e terceira linhas usam Arial, sans-serif; segunda usa system-ui, sans-serif. Primeira/segunda: escala-base menos 2 px (35.09 px a 903 px); terceira: escala-base mais 6 px (43.09 px a 903 px). Preservar centralização e responsividade, sem dois-pontos após ESCOLHA. Essa revisão substitui a fonte Inter Tight e os tamanhos iguais anteriores somente nas três linhas do Hero.

Entre 768 e 902 px, reservar 60% / 40% para texto e escudo, acomodando a largura real das novas fontes sem cortes. A partir de 903 px, manter as proporções dos breakpoints existentes.

**Alinhamento atual solicitado:** as três linhas compartilham eixo horizontal central, tamanho e entrelinha, com bloco centralizado verticalmente na coluna ao lado do escudo. Remover o recuo, largura e altura especiais de ZURY! descritos na revisão anterior. Centralização mobile preservada; não juntar palavras nem alterar a frase oficial.

- Desktop: composição sem colisão, com colunas **55% para headline / 45% para escudo**; entre 768 e 1199 px, **57% / 43%** para acomodar a ampliação tipográfica solicitada nas anotações visuais.
- O escudo é protagonista visual sem empurrar a tipografia ou invadir margens.
- Mobile: headline **centralizada acima do escudo**, escudo com largura visual próxima de **75% da área útil**; altura responsiva, sem forçar corte de conteúdo ou viewport excessiva.
- Headline em Inter Tight, peso predominantemente semibold, em caixa alta literal na fonte oficial, preservando acentos e pontuação. Quebras balanceadas por largura, sem remover espaços entre palavras.
- Tracking do Hero `0.025em`, conforme §4.2, sem mudar a frase, remover espaços entre palavras ou invadir o espaço do escudo.
- Hero em três linhas no desktop: `SEU PATRIMÔNIO MERECE` / `A MELHOR ESCOLHA` / `ZURY!`, spans com espaços semânticos. Escala `clamp(31px, calc(3vw + 10px), 58px)`, limitada a 42 px entre 768 e 1199 px; entrelinha `1.22`, tracking/peso preservados. A 903 px: primeiras linhas com 37.09 px e ZURY! com 37.26 px. ZURY! recebe recuo visual de 1em via CSS (não espaços adicionais no texto), largura máxima de 400 px e altura mínima de 70.45 px.
- Anotações finais de dimensões substituem os valores intermediários de 950 × 900 px: entre 768 e 1199 px, container centralizado de até **930 px**, sempre limitado à largura disponível e às margens responsivas. A partir de 1200 px, preservar o container amplo de até 1560 px. Altura mínima desktop de **800 px**, podendo crescer para acomodar o escudo; padding superior de **200 px** e fonte herdada de 20 px. Mobile até 767 px preserva escala `clamp(22px, 6.6vw, 44px)`, entrelinha `1.22`, centralização e fonte herdada de 16 px; ZURY! com fator 1.08, sem recuo ou reserva extra de altura. Sem quarta linha desktop ou colisões; preservar o escudo já autorizado na Hero.
- Abaixo da composição superior de marca/navbar, incluir somente transição visual por pseudo-elementos: mesmo filete prateado difuso e gradiente tonal usado entre seções, sem conteúdo novo ou borda pesada.
- Entrada visual: **texto primeiro** e escudo **depois**; uma vez estabilizado, flutuação muito discreta e rotação lenta parcial do escudo.
- Nenhuma rotação manual do escudo por gesto/toque no mobile.

### 6.3. Invariantes

- Não mover o layout quando o 3D for carregado; reservar o espaço desde o primeiro render.
- Hero não deve depender do WebGL para mostrar headline e marca.
- Não permitir que câmera, luz ou rotação exponham geometrias pobres, interseções ou materiais plásticos.

---

## 7. Escudo 3D: execução, visual e aprovação obrigatória

### 7.0. Revisão cinematográfica — 20/10/2026

**Refinamento de 21/10/2026 autorizado:** ampliar órbita do PNG para x ±8 px / y ±18 px, yaw ±3.4°, pitch ±0.85° e roll ±1.1°, em 12 s, com 45% no mobile. Interação por mouse inclui deslocamento até 8 × 6 px e reflexo prateado visual separado, recortado pela transparência da própria imagem, acompanhando o cursor sobre a Hero. Esse efeito substitui a proibição anterior de sobreposição luminosa somente para o reflexo solicitado; não editar a imagem nem afirmar reflexos físicos de modelo 3D. Sem reflexo/tilt manual no toque ou reduced motion; pausar/reverter/resetar junto às camadas existentes, incluindo retorno de opacidade ao sair da área.

**Integração autorizada após a prévia:** o responsável confirmou “PODE IMPLEMENTAR NA HERO”, usando a captura `Captura de Tela 2026-10-19 às 21.30.17.png` para escala, inclinação e luz atrás. Reutilizar `ImageShield` à direita, com a headline atual à esquerda; mobile empilha texto e escudo. Perspectiva estática contida em camada separada dos movimentos, escudo ocupando aproximadamente 28–30% da largura desktop e luz prateada difusa/curva atrás, sem repintar o PNG ou alterar sua proporção. A prévia isolada continua disponível para inspeção. As notas seguintes registram o histórico anterior, não um bloqueio atual desta integração.

**Decisão posterior — imagem original animada:** o responsável autorizou usar a própria `IMG_3369.PNG` em lugar da reconstrução procedural. Essa autorização substitui a exigência de WebGL/3D real para esta alternativa: preservar a imagem intacta, sua transparência, proporções, textura e reflexos, sem redesenho, filtros ou iluminação artificial sobreposta. Entrada suave, flutuação e inclinação mínima por mouse; toque sem rotação manual e reduced motion estático. A imagem é um plano animado, não um modelo com perfil ou reflexos físicos dinâmicos. Implementar primeiro em `/preview/escudo`; o aceite da abordagem não aprova automaticamente a implementação visual nem sua integração ao Hero. Preservar os arquivos do estudo 3D anterior, sem carregá-los nessa prévia.

O pedido mais recente substitui a frente prateada anterior por **metal grafite quase preto, escovado acetinado**, com reflexos prateados discretos. `IMG_3369.PNG` é a referência prioritária da silhueta, monograma Z, proporções, recortes, bordas e chanfros; `IMG_3367.PNG` orienta exclusivamente a iluminação cinematográfica. Cópias intactas em `public/shield/references/`.

O responsável autorizou desenvolver isoladamente, inspecionar e depois integrar à direita da Hero; isso não equivale a aprovação visual do resultado. A integração depende de reprodução satisfatória: se o estudo procedural não atingir a fidelidade solicitada, explicar as diferenças e propor um modelo GLB dedicado antes de avançar. **Estado atual: estudo isolado, sem integração por fidelidade visual insuficiente**, especialmente no relevo, escovação e resposta dos chanfros.

Entrada de 2,5–4 s, flutuação vertical mínima, mouse tilt amortecido e limitado, parallax/pequenas rotações por ScrollTrigger e variação discreta dos reflexos. Toque adaptado com amplitude reduzida e scroll vertical nativo, substituindo a proibição anterior de interação móvel. Configuração central em `components/shield/motion-config.mjs`; grupos separados possuem entrada, flutuação, tilt e scroll. Reduced motion e falhas WebGL exibem poster transparente do próprio estudo, sem carregar/manter o Canvas no modo reduzido. A prévia permite inspeção frontal, inclinada, perfil e sobreposição dos contornos à imagem 2. O poster é provisório, não um ativo aprovado.

O refinamento subsequente solicitado preserva o isolamento: contornos externos medidos no PNG, recortes e bordas revistos, câmera ortográfica de comparação, microtextura de aço escovado direcionada por UV/tangentes e luzes de área físicas. Corrigir artefatos de normais, paredes coplanares e orientação do ambiente antes de avaliar o material. Tolerância de 2 px nos landmarks testados da silhueta não significa reprodução exata de toda a geometria ou aprovação artística; a espessura oculta continua não determinada pelas referências.

**Este é um fluxo de produção com gate de aprovação, não uma tarefa de implementação única.**

### 7.1. Aparência obrigatória

- Escudo tridimensional **verdadeiro**, sofisticado, geométrico e arquitetônico.
- **Face frontal:** grafite quase preto, metálico e escovado acetinado, conforme §7.0; brilho controlado, sem aparência plástica.
- **Laterais/chanfros:** profundidade grafite, recortes e bordas precisos com reflexos prateados discretos, preservando a imagem 2.
- Iluminação de estúdio premium, com highlights suaves e leitura volumétrica limpa.
- Silhueta reconhecível, proporções elegantes, cantos bem resolvidos, superfície contínua e sem facetas visuais indesejadas.
- **Não adicionar galhos, asas, partículas, brasões, textos, letras além do monograma Z original, reflexos coloridos, fundos cenográficos ou objetos secundários.**
- Movimentação: flutuação contida e rotação **lenta, parcial e contínua** em torno da pose principal; não girar 360° freneticamente nem revelar o verso de forma indevida.

### 7.2. Implementação preferencial

- Base técnica sugerida: **Three.js + React Three Fiber**, respeitando compatibilidade real com React e Next.js.
- **Real-time WebGL primário**, incluindo em dispositivos móveis capazes, mediante otimização e testes.
- Fallback: animação prerenderizada de alta qualidade **derivada do mesmo modelo**, e, para carregamento/redução de movimento/indisponibilidade, **poster estático premium** derivado do mesmo escudo.
- Nunca usar um escudo visualmente diferente no fallback: **mesma geometria, enquadramento, materiais e iluminação**.
- Evitar carregar todo o motor 3D no caminho crítico de leitura do Hero, usando carregamento oportuno/segmentação e preservando o layout.
- Detectar WebGL indisponível, falhas de inicialização, perda de contexto, baixa capacidade/desempenho real ou preferência por movimento reduzido; não trocar automaticamente para render prerenderizado **apenas por ser mobile**.
- Reduzir DPR/resolução/sombras/reflexos conforme capacidade antes de sacrificar a fidelidade visual. Evitar renderização ininterrupta fora da área visível quando possível.
- A experiência deve funcionar **sem áudio** e sem demandar interação para iniciar a exibição estática.

### 7.3. Sequência mandatória de aprovação

**Fase E1 — Componente isolado:** criar o escudo em componente e ambiente de pré-visualização independente, sem inseri-lo no Hero final.

**Fase E2 — Inspeção visual:** apresentar ao responsável capturas/preview em ângulos e tamanhos representativos; conferir modelagem, profundidade, materiais, recortes, iluminação, reflexos, escala e rotação.

**Fase E3 — Gate:** **PARAR E SOLICITAR APROVAÇÃO VISUAL EXPLÍCITA**. Não presumir aprovação nem integrar o escudo definitivo ao Hero antes do aceite. O restante das tarefas não dependentes pode ser preparado separadamente, desde que não esconda este gate.

**Fase E4 — Assets derivados:** somente após a aprovação, gerar **poster estático e fallback prerenderizado** coerentes com o modelo aprovado. Se a modelagem procedural não conseguir a qualidade esperada, propor workflow para um `.glb` dedicado, mantendo a mesma aprovação visual.

**Fase E5 — Integração:** inserir o componente e fallbacks no Hero com reserva de espaço e transição suave do poster para o modelo pronto; validar desktop/mobile, FPS e ausência de CLS.

**Importante:** o escudo não é a logo. Não reinterpretar ou substituir o monograma oficial por ele.

---

## 8. Seção 2 — NOSSAS SOLUÇÕES

### 8.1. Título e layout

- Headline **exatamente** `NOSSAS SOLUÇÕES`.
- Centralizada em todos os dispositivos; distância até cartões moderada e visualmente equilibrada.
- **Oito cartões, na ordem abaixo**, com informações **sempre visíveis** (sem acordeão, flip, tooltip obrigatório, expansão ou clique para revelar serviços). Numeração `01` a `08` oculta no desktop/tablet em grid; pode permanecer nos cards mobile. Não alterar o contador funcional do carrossel.
- Cartões são **informativos, não links**: não criar cursores de botão, onClick decorativo ou falsa affordance.
- Cada cartão contém ícone linear correspondente, título e lista semântica com um marcador nativo discreto por produto, prata neutra e alinhado à primeira linha, com recuo suspenso consistente nas quebras. Usar 12 px de `row-gap` entre produtos (referência 10–14 px), não apenas entrelinha. Todos os textos visualmente em caixa alta por CSS. Preservar grafia, acentos, ordem e capitalização originais nos dados de `lib/content.ts`; numeração visual somente no mobile. A altura uniforme cresce conforme o conteúdo real máximo, sem cortes ou altura fixa limitante.
- Etapa 3: remover todas as divisórias entre produtos nos oito cards, incluindo bordas, gradientes e pseudoelementos. Preservar marcadores nativos, 12 px de intervalo, tracking, entrelinha e alturas uniformes. Etapa 4 remove também as divisórias internas dos Diferenciais. Bordas externas e separadores entre seções permanecem.
- Ícone **sem fundo, sem círculo, sem quadrado e sem contêiner decorativo**; deve estar ao lado do título, com alinhamento refinado.
- Conteúdo ancorado no topo; espaços inferiores vazios devem ser apenas consequência natural da altura uniforme.

### 8.2. Conteúdo oficial — reproduzir literalmente

#### 01 — BENS

- Ícone: `house`
- Residenciais
- Condomínios
- Imóveis
- Empresariais
- Equipamentos agrícolas
- Industriais
- Armazéns
- Seguros de engenharia
- Usinas

#### 02 — VIDA E SAÚDE

- Ícone: `heart-pulse`
- Seguros de vida
- Planos de saúde
- Odontológicos
- Plano de previdência
- Seguro prestamista

#### 03 — RURAL

- Ícone: `sprout`
- Seguros agrícolas
- Transportes
- Soluções de logística
- Safras
- Pecuários
- Responsabilidade civil rural e agropecuário

#### 04 — AUTOMOTIVO

- Ícone: `car-front`
- Automóveis
- Frotas
- Motos
- Caminhões

#### 05 — CRÉDITO

- Ícone: `landmark`
- Consórcios
- Financiamentos
- Empréstimos

#### 06 — AÉREO E MARÍTIMO

- Ícone: `plane`
- Marítimos
- Aeronáuticos
- Hangares

#### 07 — TRANSPORTE

- Ícone: `truck`
- TRANSPORTE NACIONAL E INTERNACIONAL DE CARGAS
- RESPONSABILIDADE CIVIL DE CARGAS
- TRANSPORTADOR DE CARGAS
- OPERADOR DE CARGAS

#### 08 — RESPONSABILIDADE CIVIL

- Ícone: `scale`
- RC Geral
- RC Profissional
- RC Médicos
- RC Dentistas
- RC Advogados
- RC Engenheiros e Arquitetos
- RC Obras e Engenharia
- RC Condomínios
- RC Rural / Agropecuário
- RC Hospitalar e Clínicas

**Contagem de integridade (revisão de 21/10/2026):** 8 cartões, **44 linhas de produtos/serviços**. RESPONSABILIDADE CIVIL substitui PREVIDÊNCIA e possui 10 itens; RURAL substitui AGRO e recebe responsabilidade civil rural e agropecuário. Vida e Saúde inclui Plano de previdência e Seguro prestamista. Ícones acima dos títulos, alinhados na mesma altura; faixa de título com mínimo de 96 px, crescimento livre, sem quebra no meio das palavras. Títulos de Soluções com 20 px (ajuste óptico de 18 px somente em RESPONSABILIDADE CIVIL) e listas com 16 px; alturas crescem pelo maior conteúdo real.

As denominações foram pluralizadas sem mudar modalidades. Engenharia, logística e previdência usam os núcleos plurais Seguros, Soluções e Planos para evitar plurais artificiais dos nomes de área. Os quatro textos específicos de TRANSPORTE prevalecem literalmente sobre a regra geral de plural e ficam em caixa alta também na fonte de dados.

### 8.3. Responsividade e dimensionamento

- Desktop: **grid de quatro colunas por duas linhas (4 × 2)**, visualmente balanceado; **todos os oito cartões com a mesma altura**, determinada pelo maior conteúdo real (incluindo as 10 linhas de RESPONSABILIDADE CIVIL), e não altura distinta por linha.
- Tablet/intermediário: **duas colunas** quando quatro não comportarem de modo legível; usar breakpoint fundamentado no espaço disponível.
- Mobile: **carrossel horizontal de gesto/swipe**, com próximo cartão parcialmente visível (`peek`), `scroll-snap`, sem rotação automática, e todos os 8 cartões acessíveis.
- Mobile: **todos os cartões com altura uniforme, tomando BENS (9 linhas) como referência mínima**; calcular/acomodar a altura real máxima caso quebras de linha em outro cartão exijam mais espaço. Nenhum conteúdo pode ser cortado.
- Mobile: mostrar **imediatamente acima do carrossel** uma instrução em caixa alta, acompanhada de ícone gestual discreto, por exemplo: `ARRASTE PARA A ESQUERDA PARA VER MAIS`.
- Sem setas visuais. Preservar gesto bidirecional, scroll-snap, contador **`01 / 08` a `08 / 08`** e indicadores discretos selecionáveis por clique/toque/teclado, com nome acessível de cada cartão.
- O contador deve refletir o cartão efetivamente ativo, inclusive após swipe manual, resize e navegação por indicador.
- Evitar overflow horizontal da **página**; scroll horizontal limitado ao trilho dos cartões.

---

## 9. Seção 3 — NOSSOS DIFERENCIAIS

### 9.1. Título e layout

**Última revisão:** retirar integralmente o tópico de parceria com seguradoras de SEGURANÇA. Os três cards têm altura mínima de 280 px e crescem se o conteúdo exigir; nunca cortar texto. Títulos NOSSAS SOLUÇÕES e NOSSOS DIFERENCIAIS passam a `clamp(29px, calc(3.4vw + 2px), 51px)` (32.70 px a 903 px).

- Headline **exatamente** `NOSSOS DIFERENCIAIS`.
- Não apresentar `DIFERENÇA ZURY`, `A DIFERENÇA ZURY` ou qualquer subtítulo substituto acima desse título.
- Centralizada em todas as larguras, com espaçamento equilibrado até os cartões.
- Três cartões institucionais sem numeração visual dentro dos cards em qualquer largura, com o mesmo tratamento Liquid Glass da seção anterior. Conteúdo em caixa alta por CSS, preservando dados originais, acentos, ordem e hierarquia. Cada alegação permanece em item semântico com marcador discreto, mas sem qualquer divisória interna, borda, gradiente linear ou pseudoelemento separador. Preservar o ritmo vertical: o espaço antes ocupado pela borda pode ser substituído por 1 px de padding, sem desenhar linha. Manter bordas externas, ícones, alturas uniformes, animações e controles do carrossel.
- Ícones Lucide à esquerda dos títulos: SEGURANÇA `shield-check`, SUPORTE `headset`, AGILIDADE `zap`. Reutilizar o alinhamento e a cor `#d0d2cd` dos serviços, tamanho 24 px, `strokeWidth: 1.4`, gap de 12 px; sem fundo, círculo ou contêiner decorativo. Ícones decorativos ocultos para tecnologias assistivas; títulos, ordem e marcadores preservados, sem divisórias internas.
- Desktop: **três cartões lado a lado**, de mesma altura, tendo como referência o texto mais longo.
- Mobile: carrossel de swipe com próximo cartão parcial, instrução gestual **em caixa alta imediatamente acima**, indicadores selecionáveis sem setas e contador **`01 / 03` a `03 / 03`**. Nenhum conteúdo pode ser truncado.
- Sem expansão, flip, links falsos ou clickboxes não funcionais.

### 9.2. Conteúdo textual oficial — reproduzir literalmente

| Nº | Título | Descrição |
| --- | --- | --- |
| 01 | **SEGURANÇA** | `Equipe qualificada, atuação autorizada pela SUSEP.` |
| 02 | **SUPORTE** | `Atendimento humanizado e especializado, disponível 24 horas por dia.` |
| 03 | **AGILIDADE** | `Agilidade nas cotações e no acompanhamento e resolução de sinistros.` |

A ordem SEGURANÇA → SUPORTE → AGILIDADE e os índices correspondentes são únicos nos dados e se aplicam ao desktop, tablet, carrossel e navegação acessível. Os índices não são conteúdo visual dos cartões.

Os textos completos da tabela permanecem imutáveis na fonte de dados. É autorizada sua divisão de apresentação: SEGURANÇA em equipe qualificada / atuação autorizada pela SUSEP / parceria com diversas seguradoras para proteger seu patrimônio; SUPORTE em atendimento humanizado e especializado / disponível 24 horas por dia; AGILIDADE em agilidade nas cotações / acompanhamento e resolução de sinistros. Omitir somente conectivos e pontuação de união, sem novas alegações ou alteração de significado.

**Observação editorial:** o responsável pela marca **confirmou e autorizou expressamente** as afirmações sobre disponibilidade 24h, autorização SUSEP e parceria com seguradoras. Implementar o texto aprovado sem inventar novas alegações de prazo, cobertura, garantia, preço ou ranking. A confirmação foi fornecida pelo responsável; não constitui verificação independente do registro.

---

### 9.3. Programa de Indicações — etapa 7

**Inclusão de 21/10/2026:** adicionar ao card SEJA UM AFILIADO o quarto tópico literal `CÓDIGO INDIVIDUAL DE INDICAÇÃO PODENDO GERAR UMA EXCELENTE RENDA EXTRA`, sem remover os três anteriores, preservando a remuneração em negrito no terceiro tópico. Manter CTAs e gates. Trata-se de cópia da prévia solicitada, não implementação ou comprovação de emissão de códigos.

**Último ajuste de dimensões e ênfase:** ambos os cards têm mínimo de 430 px, com crescimento livre para evitar cortes. Terceiro tópico de ambos os cards em negrito. CTAs de 260 × 48 px quando houver espaço, recuo de 25 px reduzido conforme largura útil; Afiliado em 13.5 px, Parceiro em 12.5 px, entrelinha 1.2 e padding 8 × 12 px. Em telas estreitas, limitar largura à disponível e permitir altura maior se a quebra exigir. Substitui as medidas anteriores de 470 px, recuo de 45 px e CTAs menores. Preservar cópias, ordem, destinos e gates.

**Revisão mais recente (substitui instruções anteriores correspondentes):** cards com mínimo de 470 px, sem valores destacados acima dos CTAs. Remover também QUEM INDICA MERECE MAIS. Título da seção e parágrafo comercial usam 22 px, com quebra livre responsiva. Afiliado: QUALQUER PESSOA PODE INDICAR POTENCIAIS CLIENTES À ZURY. / POSSIBILIDADE DE RENDA EXTRA / **O AFILIADO RECEBERÁ R$ 100 VIA PIX POR CADA CONTRATAÇÃO INDICADA.**, nesta ordem, com três marcadores e somente o último tópico em negrito. Parceiro: INDICAÇÕES RECORRENTES. / CÓDIGO INDIVIDUAL DE INDICAÇÃO PODENDO GERAR UMA EXCELENTE RENDA EXTRA / REMUNERAÇÃO DE 10% DA COMISSÃO RECEBIDA PELA CONTRATACÃO DO INDICADO. No último item, a cópia renderizada não leva o ponto final usado nesta frase explicativa. Preservar a grafia fornecida, CTAs, recuo responsivo e gates comerciais. As alegações de renda/código não são validação da operação nem autorização para publicar.

**Últimas anotações dos cards (prevalecem sobre as revisões abaixo):** remover dos dados e da interface PARTICIPAÇÃO SIMPLES e INDICAÇÕES SEM NECESSIDADE DE ATUAÇÃO COMERCIAL RECORRENTE, inclusive seus marcadores. Preservar POSSIBILIDADE DE RENDA EXTRA e as descrições. Valores financeiros ficam fora das listas, no bloco inferior imediatamente acima dos respectivos CTAs, sem marcador. Altura mínima de ambos os cards passa a 580 px, permitindo crescimento para conteúdo real em telas estreitas. CTAs recebem recuo de 45 px quando houver espaço, reduzido automaticamente para evitar overflow; preservar os links, mensagens e gates existentes.

**Revisão atual de organização:** cards com altura mínima de 640 px (crescimento livre conforme conteúdo), mesmo alinhamento superior e CTA na base. Todos os tópicos informativos, inclusive valor, descrições e benefícios, usam uma lista semântica com marcador à esquerda; título e CTA não recebem marcador. Intervalos de 22 px, recuo suspenso e alinhamento comum; padding desktop de 44 × 32 px. Esta revisão substitui as instruções antigas de apresentação sem marcadores. Mobile conserva padding de 38 × 24 px e fontes legíveis.

**Nova cópia expressamente solicitada, sem ponto final, somente na prévia comercial:** `EM AGRADECIMENTO ÀS INDICAÇÕES, A ZURY OFERECE O MELHOR PRECO DO MERCADO PARA AFILIADOS E PARCEIROS NAS CONTRATAÇÕES DE PRODUTOS, RENUNCIANDO Á NOSSA COMISSÃO`

Substitui o parágrafo provisório abaixo, preservando literalmente a grafia recebida. A solicitação editorial não comprova a alegação comparativa nem a política de comissão: manter o gate de produção e as pendências de validação comercial/jurídica; não publicar nem tratar como oferta comprovada.

Nova seção `#indicacoes`, após Diferenciais e antes de Benefícios exclusivos. Reutilizar Inter Tight, paleta da etapa 2, Liquid Glass, Flow Glass, bordas e reveal existentes. Dois cards de mesma altura lado a lado no desktop/tablet; empilhados e completos no mobile. Ícones Lucide `user-round-plus` e `handshake`, sem numeração promocional. CTAs em cápsulas; nenhum card inteiro clicável. Apresentação integralmente em caixa alta, conforme regra global, sem alterar as mensagens de WhatsApp.

Grid centralizado até 1000 px, gap 16 px, padding vertical 38 px/horizontal 22 px e ícones 18 px. Cards perceptivelmente mais altos, com distribuição real, não somente vazio inferior. Títulos 13 px; valores 19–22 px com margens verticais 24 px; descrições 13,5 px/1,6 em grid com gap 16 px e margem inferior 24 px. Frases 13 px/1,55, sem marcadores, gap uniforme 12 px e margem inferior 26 px. CTAs alinhados na base, alvo 44 px, texto 10,5 px, largura pelo conteúdo e mínimo limitado de 210 px. Mobile: padding 38 px/24 px, descrições 15 px, frases 14 px. Sem altura fixa limitante, escala, redução de fonte ou largura maior. Tracking conforme §4.2.

**Conteúdo oficial:**

- Título: `PROGRAMA DE INDICAÇÕES`.
- Somente o título da seção antes dos cards: remover a headline provisória anterior e sua margem/wrapper exclusivo, sem inserir subtítulo substituto.
- Proposta pendente, não renderizada nem publicada: `SUAS INDICAÇÕES PODEM RENDER MAIS DE R$ 10.000 POR MÊS!`. Preservar exatamente esta grafia se vier a ser aprovada; exigir dados reais suficientes e validação comercial/jurídica antes de substituir a alternativa provisória. Não foi fornecida comprovação nesta revisão.
- Removidos da interface e dos dados renderizáveis: complemento comercial anterior, ressalva de ganhos e aviso de prévia. Não adicionar nova faixa/parágrafo de advertência nem armazenar cópias antigas ocultas nos componentes.

**SEJA UM AFILIADO** — `R$ 100 POR CONTRATAÇÃO`

QUALQUER PESSOA PODE INDICAR POTENCIAIS CLIENTES À ZURY.

SE A INDICAÇÃO RESULTAR EM CONTRATAÇÃO, O AFILIADO RECEBERÁ R$ 100 VIA PIX.

Três frases exclusivas, sem pontos finais, bullets ou marcadores, alinhadas à esquerda no mesmo eixo e com intervalo uniforme:

```text
PARTICIPAÇÃO SIMPLES
POSSIBILIDADE DE RENDA EXTRA
INDICAÇÕES SEM NECESSIDADE DE ATUAÇÃO COMERCIAL RECORRENTE
```

CTA: `QUERO SER AFILIADO`. Mensagem exata: `Olá! Tenho interesse em participar do programa de afiliados da ZURY CORRETORA. Gostaria de saber como funciona.`

**SEJA UM PARCEIRO COMERCIAL** — `10% DA COMISSÃO RECEBIDA PELA ZURY`

O PARCEIRO COMERCIAL MANTÉM UMA RELAÇÃO MAIS PRÓXIMA COM A CORRETORA, REALIZANDO INDICAÇÕES RECORRENTES.

CADA PARCEIRO RECEBERÁ UM CÓDIGO INDIVIDUAL DE INDICAÇÃO.

SE A INDICAÇÃO RESULTAR EM CONTRATAÇÃO, A REMUNERAÇÃO CORRESPONDERÁ A 10% DA COMISSÃO RECEBIDA PELA ZURY NESSA CONTRATAÇÃO.

Sem lista adicional: remover os quatro itens repetitivos anteriores, preservando somente os três parágrafos principais, título, destaque financeiro e CTA.

CTA: `QUERO SER PARCEIRO COMERCIAL`. Mensagem exata: `Olá! Tenho interesse em me tornar parceiro comercial da ZURY CORRETORA. Gostaria de conhecer as condições da parceria.`

Ambos os CTAs usam Thiago — Corretor, `https://wa.me/5538999608455`, com a mensagem codificada em `text`. Esta é a exceção expressamente autorizada à regra de WhatsApp sem mensagem; menus existentes não mudam. Apenas preparar a conversa, sem envio automático. Não há códigos reais, cadastro, atribuição automatizada ou pagamentos implementados.

**Bloco comercial abaixo dos dois cards:** centralizado, integrado ao fundo, sem card/banner/cápsula. Largura até 1320 px, margem superior 48 px. Título único de 18–22 px sem ponto; corpo branco `#fff`, peso 700, 16–19 px/1,6, tracking de descrição. Distribuição balanceada em exatamente duas linhas no desktop quando houver espaço; mais linhas em telas menores, sem miniaturizar fonte. Até comprovação, usar a formulação objetiva provisória:

`QUEM INDICA MERECE MAIS`

`EM AGRADECIMENTO ÀS INDICAÇÕES, A ZURY BUSCA MELHORES CONDIÇÕES PARA AFILIADOS E PARCEIROS NAS CONTRATAÇÕES PRÓPRIAS, INCLUSIVE COM POSSÍVEL RENÚNCIA À COMISSÃO, QUANDO APLICÁVEL.`

Este benefício é para contratação própria dos afiliados/parceiros, não dos clientes indicados; é distinto dos R$ 100 e 10%. Texto pretendido, PENDENTE e não renderizado: `COMO FORMA DE AGRADECIMENTO PELAS SUAS INDICAÇÕES, A ZURY ABRE MÃO DE SUA PRÓPRIA COMISSÃO NOS SERVIÇOS CONTRATADOS POR AFILIADOS E PARCEIROS COMERCIAIS, GARANTINDO A ELES OS MELHORES PREÇOS DO MERCADO EM TODOS OS NOSSOS SERVIÇOS.` Confirmar existência, renúncia integral/parcial, abrangência, permissões contratuais/normativas e comprovação objetiva antes de substituir o provisório. Não publicar promessa universal sem comprovação.

Não alegar melhor preço garantido, renúncia universal de comissão ou renda típica. Não foi fornecida comprovação da política: confirmar renúncia total/parcial, produtos e serviços abrangidos, aplicação a contratos com parceiros remunerados, restrições das seguradoras/instituições e documentação comparativa de preços. Não confundir comissão da corretora com preço final. Somente após validação usar uma formulação mais específica compatível com a operação real; gates de publicação permanecem.

**Gate de publicação:** seção e link habilitados em desenvolvimento ou por `ZURY_REFERRAL_PREVIEW=true` durante o build local. Build de produção padrão, sem essa variável, deve omitir ambos. A variável não constitui aprovação nem controle de acesso: o artefato de prévia não deve ser publicado. Exigir validação expressa antes de alterar este gate.

**Pendências comerciais/jurídicas — não inventar condições:** regulamento e regras de participação; prazos de pagamento; cancelamentos e estornos; atribuição de indicações; regras de comissão e eventuais reduções/repasse por produto; tratamento de dados pessoais; requisitos legais/regulatórios aplicáveis à corretagem e aos produtos financeiros; sustentação da chamada mensal. Confirmar operação real de emissão dos códigos antes de anunciar o programa como ativo. A frase solicitada sobre códigos existe somente na prévia bloqueada para publicação; não há emissão implementada nem códigos fictícios. Não criar regulamento com critérios presumidos.

**Integração futura (não implementada):** modalidades com IDs estáveis `affiliate` e `commercial` em dados tipados. Eventual serviço autenticado deverá cuidar de cadastro/consentimento, atribuição, elegibilidade, conciliação de comissões e auditoria, após requisitos e aprovação específicos. Não criar backend, painel, códigos ou regras financeiras nesta etapa.

### 9.4. BENEFÍCIOS EXCLUSIVOS — cards e movimento condicional da etapa 7

Seção `#beneficios` após Indicações e antes do Footer. Reutilizar paleta grafite/prata, gradientes direcionais, iluminação contida, materiais Liquid Glass/Flow Glass e reveal existentes. Três cards de altura uniforme no grid desktop, empilhados e legíveis no mobile. Sem CTAs, links comerciais, regras de resgate ou condições não fornecidas.

Grid centralizado de no máximo 960 px, intervalo de 14 px e padding de 20 px. Área de logo com 56 px de altura; imagens proporcionais até 150 × 48 px, símbolo MV até 48 × 48 px, sem editar os ativos. Títulos de 13 px; descontos de 18–20 px. No mobile, padding de 22 px, títulos de 14 px e descontos de 20 px. Sem legendas descritivas nos três cards, sem CTAs ou avisos de prévia. Não aplicar escala geral nem cortar texto. Altura uniforme no desktop, com cada logo centralizada verticalmente na área reservada. Títulos de seção mantêm a hierarquia global.

- Título: `BENEFÍCIOS EXCLUSIVOS`.
- Sem chamada ou descrição auxiliar: remover texto, wrapper e espaçamento exclusivo, sem substituto. Preservar somente título e cards; comportamento condicional abaixo.

| Nome de apresentação | Oferta sujeita à validação |
| --- | --- |
| FARMELHOR UNAÍ | 10% DE DESCONTO ADICIONAL |
| ZAPP | 10% DE DESCONTO ADICIONAL |
| GRUPO MV | 5% DE DESCONTO EM SERVIÇOS |

Esta revisão substitui os nomes anteriores por **FARMELHOR UNAÍ** e **ZAPP**. O símbolo verde corresponde ao **GRUPO MV**. O card ZAPP usa a logo metálica recebida, sem FOR MEN, preservada sem cortes, filtros ou alterações destrutivas. A logo FarMelhor não contém a localização UNAÍ; o nome textual solicitado permanece distinto do desenho original.

**Ativos oficiais recebidos e preservados byte a byte:** `public/partners/farma-melhor.png` (300 × 72), `grupo-zapp.png` (997 × 379), `grupo-zapp-metalico.png` (2172 × 724) e `grupo-mv.png` (1057 × 1057). PNGs com canal alpha. Preservar cores de marca, transparência, proporções e respiro com `object-fit: contain`; as cores originais nas logos são exceção à neutralidade cromática da UI. Sem filtros, recoloração, reconstrução, cortes ou fundo branco. O lettering preto pequeno de FarmaMelhor merece variante oficial adequada a fundo escuro. Não tratar nome confirmado como autorização comercial comprovada.

**Carrossel condicional de cards completos:** a faixa de logos isoladas permanece cancelada. Medir largura real do container, quantidade de cards e mínimo legível de 260 px por card + gap 14 px. Enquanto couberem, manter grid estático; não usar limite arbitrário de quantidade. Se exceder no desktop/tablet, animar os mesmos cards completos (logo/nome/oferta) da esquerda para a direita em loop linear contínuo, 42 px/s (referência 35–50), sem saltos, setas, indicadores ou scrollbar. Pausar em hover, foco, interação e documento oculto, retomar da mesma posição. Duplicatas visuais ficam `aria-hidden` e `inert`, sem IDs duplicados. Recalcular em resize/alteração de dados; limpar animação, observers e listeners. Mobile até 767 px e reduced motion usam grid estático completo, sem movimento imposto pela largura. Três parceiros atuais cabem e permanecem estáticos no desktop. Não adicionar parceiros fictícios aos dados de produção; simulações somente temporárias em desenvolvimento. Carrosséis manuais de serviços e diferenciais permanecem sem autoplay.

**Gate:** em desenvolvimento ou com `ZURY_BENEFITS_PREVIEW=true` no build local, renderizar seção e três cards; produção padrão os omite. Independente do gate de Indicações. Não publicar artefato de prévia nem afirmar parceria/oferta ativa antes da confirmação expressa das parcerias, autorização de uso das marcas e condições comerciais. Não inventar cumulatividade, validade, itens participantes ou procedimento de resgate. O aviso visível foi removido por solicitação expressa, sem retirar essas pendências ou liberar publicação.

## 10. Footer, contatos e dados institucionais

### 10.1. Aspecto

- Fundo grafite profundo derivado dos tokens `--surface-mineral` e `--surface-graphite`, transição gradual a partir da seção institucional. A cor oficial grafite da marca permanece `#1C1C1C`.
- **Painel Crystalline Liquid Glass** refinado com cantos de raio moderado, contorno fino e luz sutil.
- Reutilizar a mesma entrada dos cards (850 ms, `power3.out`, opacity e y de 24 px), com reveal no wrapper e hover no painel filho. Compartilhar `glass-card` e `flow-glass`: elevação de 4 px em 400 ms, borda em 350 ms, reflexo em 1200 ms e fade em 380 ms, sem tween concorrente. Foco nos controles internos ilumina o painel; movimento reduzido remove deslocamentos. Não transformar o painel/textos legais em botões nem dar animação de clique ao painel informativo. Arquitetura de contatos permanece intacta.
- Logo, grupo de navegação, institucional e copyright entram coordenadamente: uma única timeline/ScrollTrigger para o painel, conservando os 24 px de deslocamento compartilhado e fades internos de 850 ms/`power3.out` com stagger de 60 ms. Não somar deslocamentos nos filhos, ocultar conteúdo sem JS ou animar controles concorrentes. Preservar reentrada/cleanup e conteúdo estático com movimento reduzido. Links e CONTATOS mostram somente texto no repouso e a mesma cápsula Flow Glass da navbar no hover/foco, sem cápsulas permanentes ou ícones adicionais. Compartilhar reflexo, glow, bordas delicadas, durações e easing; não substituir por simples mudança de cor. Tipografia alinhada aos Diferenciais: títulos 18 px, links e dados legais 16 px, copyright auxiliar 14 px; manter caixa alta global.
- **Logo oficial completa branca** (SVG otimizado branco), proporcional, visível e nítida.
- Não inserir um formulário, CTA extra, mapa, links sociais não fornecidos, badges inventados ou áreas promocionais.

### 10.2. Colunas e ordem

- Desktop: duas colunas úteis **`Navegação/CONTATOS` → `Institucional`**, sem coluna vazia reservada ao botão removido.
- Mobile: empilhamento **`Navegação/CONTATOS` → `Institucional`**, espaços compactos e divisórias discretas, sem repetir logo ou conteúdo desnecessariamente.

**Navegação** — links na mesma página, sem duplicar o botão principal de contato:

- `CONTATOS` — gatilho textual do popover, na lateral esquerda imediatamente acima de SOLUÇÕES; mesma tipografia e hierarquia dos links, sem ícone nem cápsula visível em repouso. Operável por clique, toque e teclado, com Flow Glass compartilhado no hover/foco.
- `SOLUÇÕES` → `#servicos`
- `DIFERENCIAIS` → `#sobre`
- `SOBRE` → `#institucional`
- `REDES SOCIAIS` → mesmo menu social da navbar, com posicionamento adaptado ao rodapé.

`NOS AVALIE NO GOOGLE` é um link textual com o mesmo tratamento, após SOBRE, para `https://share.google/AnNgzLmPy4lMNqHO9`, fornecido pelo usuário e verificado no navegador em 20/10/2026: abre o perfil ZURY CORRETORA em Unaí, com site e telefone oficiais e a opção de avaliar. Abrir em nova aba com `noopener noreferrer`. O endereço leva ao perfil, não diretamente ao formulário; não inventar um link direto ou identificador alternativo. Não enviar avaliações em nome do usuário.

**Contato** — CONTATOS na coluna esquerda usa o mesmo componente da navbar, sem navegar/rolar. O antigo botão WhatsApp gradiente do rodapé permanece removido. O novo botão fixo do §10.4 é uma autorização distinta e não ocupa coluna do rodapé. WhatsApps são acessados pelos três pontos compartilhados; e-mail somente por CONTATO/CONTATOS, nunca por REDES SOCIAIS. Contatos oficiais: `THIAGO — CORRETOR`, `VALDIR — CONSULTOR`, `JOANA — SAÚDE`. Cargos opcionais na tipagem; somente mostrar os confirmados. Uma única fonte tipada em `lib/content.ts` alimenta navbar, rodapé e flutuante:

| Nome | Cargo confirmado | Telefone oficial (não exibir nos menus) | Link exato |
| --- | --- | --- | --- |
| Thiago | Corretor | `(38) 99960-8455` | `https://wa.me/5538999608455` |
| Valdir | Consultor | `(38) 99961-5862` | `https://wa.me/5538999615862` |
| Joana | Saúde | `(61) 98563-8090` | `https://wa.me/5561985638090` |

- Cada contato tem link individual; exibir somente nome e cargo confirmado, sem telefone.
- Preferir âncoras externas corretas (`target="_blank"` e `rel="noopener noreferrer"` se abrir em nova aba), foco visível e nome acessível contextualizado.
- **Não incluir mensagem pré-preenchida inventada** no WhatsApp.

### 10.3. Balões de contato e redes sociais

- Um único componente-base de contato/social, mesmos dados, estados, animações, estilos e acessibilidade na navbar e rodapé. Preservar os menus aprovados da navbar; no rodapé priorizar abertura acima, centralizada no gatilho e limitada à viewport. Popovers `auto` mutuamente exclusivos; clicar novamente fecha, assim como clique fora, Escape e botão fechar. Reposicionar após expansão/resize e restaurar foco por Escape. Comparar conteúdo/ícones/fontes/padding/blur/bordas/glow/expansão e destinos entre contextos; só posicionamento e título CONTATO/CONTATOS diferem.
- **Contato:** primeiro nível somente ícone + WHATSAPP e ícone + E-MAIL. WhatsApp é botão com `aria-expanded`/`aria-controls`, expansão vertical suave de 200 ms, reversível, com links THIAGO — CORRETOR, VALDIR — CONSULTOR e JOANA — SAÚDE. Sem telefones, endereço de e-mail ou explicações visíveis. E-mail preserva `mailto:contato@zurycorretora.com`. Lista recolhida fica fora da navegação/árvore acessível. Reduced motion elimina transição prolongada.
- **Redes sociais:** linhas verticais com ícone à esquerda e nome à direita: INSTAGRAM, TIKTOK e FACEBOOK, sem handles/URLs/legendas. Destinos Instagram `https://www.instagram.com/zury_corretora/` e TikTok `https://www.tiktok.com/@zury_corretora`. Facebook é botão desabilitado até URL oficial ser fornecida, configuração nula, nunca `href="#"`. Mesma cápsula Flow Glass e alvos mínimos de 44 px.
- Inspeção pública nesta revisão: ambos os destinos abriram no navegador integrado e exibiram o identificador `zury_corretora`, sem login. Isto confirma acessibilidade pública dos destinos, não a titularidade das contas.
- Popovers ancorados com transparência contextual, blur, bordas finas, ícones discretos e abertura suave. Fechar por Escape, clique fora e botão fechar; teclado, foco/restauração e posição sempre dentro do viewport. Mobile pode usar painel flutuante responsivo.
- Nenhum formulário. Dados legais e copyright permanecem visíveis, exatamente uma vez.

**Institucional** — dados oficiais, **exatamente uma vez na coluna institucional**:

```text
ZURY CORRETORA LTDA
CNPJ: 49.393.734/0001-77
SUSEP: 262180499
```

**Consultas oficiais da etapa 6:** transformar CNPJ e SUSEP em âncoras acessíveis, preservando os números e o alinhamento. Destinos verificados em 20/10/2026:

- CNPJ → `https://solucoes.receita.fazenda.gov.br/Servicos/cnpjreva/`, serviço oficial da Receita Federal para emissão do comprovante de inscrição e situação cadastral.
- SUSEP → `https://www2.susep.gov.br/safe/Corretores/pesquisa`, pesquisa oficial de corretores.

Abrir em nova aba com `noopener noreferrer`. Não foi estabelecido suporte documentado a preenchimento por URL; usar as páginas de consulta sem inventar parâmetros ou páginas intermediárias. O link não constitui validação do CNPJ ou registro SUSEP. Não consultar/submeter dados ou resolver CAPTCHA automaticamente.

Reutilizar exatamente `footer-link flow-glass flow-capsule` e os estilos compartilhados do rodapé: somente texto em repouso, sem borda/fundo/glow permanente; mesma cápsula, glow, blur da superfície hospedeira, bordas, reflexo de 1200 ms, fade de 380 ms e easing `cubic-bezier(.23,1,.32,1)` no hover/foco. Não criar animação própria para os números. Alvo mínimo de 44 px e foco visível; `overflow: clip` no painel evita rolagem interna ao focar as âncoras.

**Faixa final de copyright** — exatamente:

```text
© 2026 · Todos os direitos reservados.
```

- Não repetir razão social, CNPJ ou SUSEP na faixa de copyright.
- Não adicionar a expressão `ZURY CORRETORA LTDA` antes ou depois do copyright.
- Repetições técnicas necessárias em metadados estruturados de SEO não contam como repetição **visual**, mas não devem causar conteúdo visível duplicado.

---

### 10.4. WhatsApp flutuante — exceção autorizada da etapa 7 revisada

**Refinamento atual:** ao abrir, focar o contêiner do menu, não Thiago, para manter os três contatos com o mesmo estado neutro; Tab leva ao primeiro link com foco visível. Nenhum contato possui prioridade visual. No hover com mouse preciso e sem preferência de movimento reduzido, elevar o conjunto do botão 4 px por transição de 220 ms, retornando suavemente; sem loop ou movimento no toque. Essa política substitui o foco automático no primeiro contato descrito abaixo.

Botão fixo no canto inferior direito, 56 px (52 px no mobile estreito), distância confortável com safe areas. Usar o ícone WhatsApp existente, Liquid Glass escuro, reflexos neutros e borda delicada. Entrada única com fade/translate de 8 px em 400 ms, sem pulso contínuo. A única cor nova autorizada é `#25D366` na borda fina e glow externo contido de hover/foco deste botão, fade-in/out de opacity em 320 ms com `cubic-bezier(.23,1,.32,1)`. Corpo continua escuro; não aplicar verde a outros elementos.

Até 420 px, CTAs de Indicações usam largura de até 210 px e quebra natural de texto, sem reduzir fonte; manter faixa lateral livre para o botão flutuante e alvo mínimo de 44 px.

Clique abre menu horizontal à esquerda, na mesma altura, com THIAGO / VALDIR / JOANA e cargos confirmados, sem telefone/e-mail. Mesma fonte `contacts`; nunca duplicar destinos. Uma linha desktop, três itens compactos e alvos de pelo menos 44 px no mobile, dentro da viewport. Reveal horizontal originado à direita, fade/translate em 240 ms, saída correspondente e sem spring. Primeiro contato recebe foco; Escape restaura foco ao botão; clique fora, segundo clique e seleção fecham. `aria-expanded`, `aria-controls`, nome acessível, foco visível e links seguros. Popover nativo participa da exclusividade dos demais menus. Reduced motion reduz a transição sem impedir uso. Conferir que botão não encobre CTAs e que a faixa flutuante só ocupa espaço quando aberta.

## 11. Sistema de animação e scroll

### 11.1. Direção da experiência

**Refinamento posterior do escudo solicitado:** substituir o balanço diagonal por órbita suave de 14 s, com eixos defasados e continuidade na emenda: x até ±6 px, y até ±12 px, pitch ±0.65°, yaw ±2.8° e roll ±0.9°. Entrada preserva 3.2 s e atraso de 0.5 s, com profundidade inicial contida (escala 0.94, yaw −9°, pitch 4°, roll −4°), sem alterar a escala final aprovada. Luz prateada difusa exclusivamente atrás da imagem acompanha a órbita e responde suavemente ao mouse em camada própria; não repintar reflexos no PNG. Usar uma timeline pausável para órbita e luz, removendo o loop CSS anterior. Mobile mantém 45% da amplitude, sem tilt por toque; reduced motion estático. Preservar o restante do site e os gates existentes.

**Motion ampliado autorizado:** preservar o layout/branding e tornar a coreografia mais perceptível. Entrada das três linhas da Hero com 1.05 s, stagger de 75 ms e deslocamento percentual; escudo entra após 0.5 s em 3.2 s. Flutuação do PNG até ±8 px, yaw ±1.8° e roll ±0.6°, ciclo completo de 10 s; no mobile, 45% da intensidade. Parallax exclusivo da Hero até 42 px e 3° pelo ScrollTrigger, em camada separada da entrada, flutuação e mouse tilt. Os reflexos continuam incorporados à imagem original: não simular modelo 3D real ou alterar a arte. Luz de fundo respira somente com o escudo ativo.

Reveals em 0.9 s com cascata de 75 ms, deslocamentos de 30 px (16 px no mobile) e escala mínima 0.985 apenas nos wrappers de cards. Luz ambiente acompanha scroll com deslocamento de 14 px (5 px no mobile), sem animar blur ou layout. Ícones sobem 3 px somente no hover de mouse. Configurações em `lib/site-motion.mjs` e `components/shield/image-motion.mjs`. MatchMedia reverte animações/ScrollTriggers ao mudar breakpoint ou preferência; observers/listeners possuem cleanup. Loops do escudo pausam fora da tela ou com documento oculto; reduced motion conserva conteúdo/arte estáticos. Não alterar carrosséis manuais, comportamento da navbar, cópias, dimensões aprovadas ou gates comerciais. Esta autorização supera o congelamento histórico de durações correspondente.

- A sensação deve ser de uma narrativa contínua, **cinematográfica, refinada, suave e não intrusiva**.
- **Transição progressiva de luminosidade entre os quatro tons**; pode ser implementada com camadas de fundo e interpolação de scroll, respeitando performance.
- Fundos definidos em tokens únicos: Hero em grafite mais profundo com luz controlada; Soluções em cinza mineral mais luminoso; Diferenciais em grafite com luz cinza-prata diagonal própria; footer em grafite profundo. Tons de encontro compartilhados mantêm continuidade. Separadores existentes, inclusive entre header e Hero: filete de 1 px com prata de opacidade moderadamente ampliada, extremidades dissipadas e halo extremamente suave, sem faixas ou brilho intenso.
- A etapa 2 substitui o congelamento anterior pela direção cromática da imagem 4, conforme §4.1. Preservar durações, easing e comportamento de todas as animações existentes; somente superfícies, luzes e encontros visuais são refinados. Não declarar a execução visual aprovada antes da avaliação do responsável.
- Elementos surgem com opacidade e deslocamento mínimos, em tempos coordenados, sem `bounce`, elasticidade excessiva ou trajetórias decorativas.
- **Revelações devem poder acontecer novamente quando o usuário voltar à seção**; implementar com controle de reentrada estável, sem flicker ou reanimações compulsivas a cada pixel.
- Navbar inteligente ao rolar; estados ativos e transições de vidro bem sincronizados.
- Hover em cartões: leve aumento da percepção de profundidade e luz; sem inclinação 3D.
- Mobile: combinar luz ambiente discreta com feedback ao toque, sem disparar animações caras continuamente.

### 11.2. Responsabilidade de bibliotecas

- **GSAP + ScrollTrigger:** mecanismo principal para timeline cinematográfica, reveals, mudanças de fundo coordenadas ao scroll, header inteligente quando apropriado.
- **CSS:** preferir para estados simples, transições básicas de hover/foco, layout, scroll-snap e propriedades visuais de baixo custo.
- **Motion** (biblioteca conhecida anteriormente como Framer Motion): opcional para microinterações isoladas que tenham justificativa; não instalar/usá-la se GSAP e CSS cobrirem as necessidades.
- **Nunca deixar GSAP e Motion disputando o mesmo `transform`, `opacity` ou outra propriedade do mesmo elemento ao mesmo tempo.**
- **shadcn/ui:** aproveitar primitivas acessíveis quando realmente úteis; não forçar o visual padronizado do kit sobre a direção autoral da ZURY.

### 11.3. Regras operacionais

- Implementar `prefers-reduced-motion`: reduzir/cessar flutuação e rotação contínuas, suavizar/retirar reveals e scrolling prolongado, preservar o conteúdo completo e o poster do escudo.
- Usar `gsap.context()` e/ou abstração própria equivalente com limpeza de instâncias em desmontagem; usar `ScrollTrigger.matchMedia`/`gsap.matchMedia` ou equivalentes compatíveis para breakpoints e motion preferences.
- Debounce/throttle/observers quando adequados, evitando listeners e `requestAnimationFrame` duplicados.
- Nada de `scroll-jacking`, scroll artificial que impede interação normal, wheel overrides, interceptação agressiva do touch ou `overflow: hidden` no `body` sem motivo.
- Serviços e diferenciais são gestuais/manuais sem autoplay; Benefícios segue exclusivamente a exceção condicional de cards completos do §9.4.

---

## 12. Requisitos responsivos e de acessibilidade

### 12.1. Matriz mínima de visualização

Testar, no mínimo:

- **Mobile:** 320, 360, 375, 390, 414/430 px.
- **Tablet e transição de grid:** 768, 820, 1024 px (e larguras limítrofes descobertas durante o teste).
- **Desktop:** 1280, 1440, 1920 px.
- **Ultrawide:** largura superior a 1920 px com conteúdo contido e proporções estáveis.
- Orientações de viewport significativas, diferentes densidades de pixel e pelo menos um navegador baseado em WebKit/Safari, além de Chromium.

Critérios gerais:

- Nenhum overflow horizontal da página, texto sobreposto, componente escondido por navbar ou conteúdo cortado.
- Ajustar grid aos comprimentos reais dos textos; quebra de linha não pode esconder produtos ou números.
- Hero deve permanecer equilibrado, com texto e escudo visíveis.
- Site mantém aparência premium e reflexos discretos também no mobile.
- Áreas de clique/toque utilizáveis; controles e links têm rótulos acessíveis, sem setas visuais.

### 12.2. Acessibilidade prática

- HTML semântico, idioma `pt-BR`, hierarquia correta de heading (headline no Hero como `h1`; seções como `h2`).
- Contraste de referência WCAG AA para conteúdo textual: **4.5:1 em texto comum; 3:1 em texto grande**, aferido sobre composição final com vidro/fundo em movimento.
- Foco por teclado visível e não suprimido; ordem de tabulação previsível; não depender de hover.
- SVGs decorativos (`lucide`) devem ser ocultados para tecnologias assistivas quando o título comunica a mesma informação; logo e poster devem ter semântica adequada ao contexto.
- Informar seção ativa na navegação sem depender só de cor.
- Não usar animação que cause flashing ou impeça leitura.
- **Carrosséis mobile:** indicadores selecionáveis nativos sem setas, operáveis por `Enter`/`Space`, grupos/descrição de cartões e anúncio de mudança quando apropriado. Swipes e controles devem atualizar o mesmo estado.
- Se permitir tecla de seta esquerda/direita dentro do trilho focado, não capturar setas globalmente nem romper rolagem natural de toda a página.
- **Sem autoplay em serviços e diferenciais**. Benefícios usa a exceção condicional do §9.4, pausável e estática em reduced motion/mobile; os três parceiros atuais permanecem estáticos no desktop.
- Preferir `scroll-snap` com detecção robusta da posição efetiva, considerando scroll programático e arrasto nativo, não uma implementação frágil de contador baseada apenas no clique.

---

## 13. Arquitetura técnica recomendada

### 13.1. Base

**Preferência aprovada para projeto novo e vazio:**

- **Next.js App Router**, versões estáveis atuais e compatíveis;
- **TypeScript** com tipagem explícita dos dados de cartões;
- **React** compatível com a versão de Next.js selecionada;
- **Tailwind CSS** para layout/tokens/utilitários; CSS dedicado quando necessário para materiais e motion;
- **ESLint e checagem TypeScript**, com scripts verificáveis;
- **Inter Tight**, com carregamento otimizado;
- **Lucide React** para os oito ícones;
- **GSAP + ScrollTrigger** como motor principal de animações;
- **Three.js + React Three Fiber** para escudo 3D, depois de verificar versões compatíveis;
- `@react-three/drei` apenas se simplificar de fato câmera, controles de ambiente, material ou carregamento;
- **shadcn/ui** de maneira seletiva e somente quando agregar acessibilidade e reduzir código;
- **Motion opcional**; não é dependência obrigatória.

**Não fixar números de versão de memória.** Consultar documentação e `peerDependencies` oficiais no momento da instalação. Em particular, React Three Fiber deve corresponder à versão principal de React. Preferir dependências estáveis e evitar bibliotecas experimentais apenas por estética.

### 13.2. Server/Client e carregamento

- Preservar o shell informacional da landing page renderizável sem exigir JavaScript para os textos essenciais, usando componentes de servidor onde apropriado.
- Isolar efeitos de scroll, carrosséis e Canvas em **Client Components pequenos**, evitando marcar toda a página como client desnecessariamente.
- Carregar WebGL de forma dinâmica, do lado do cliente, com fallback/poster estável, sem hidratação quebrada.
- Usar o diretório `public/brand/` para SVGs existentes. Não embutir as quatro variantes inteiras em JS sem benefício comprovado.
- Manter o conteúdo literal em estrutura de dados tipada e única; gerar cartões desktop/mobile a partir dessa mesma fonte. **Não duplicar arrays de conteúdo para as duas versões.**
- O layout desktop 4×2 e o carrossel mobile devem preferencialmente compartilhar os mesmos componentes/dados, mudando somente a apresentação/interação.

### 13.3. Estrutura sugerida — não rígida

```text
AGENTS.md
ZURY-SITE-SPEC.md
public/
  brand/                               # 4 arquivos oficiais do §3
  shield/                              # poster/fallback APÓS aprovação
src/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    layout/                            # Header, Footer, SectionShell
    hero/                              # Hero, escudo 3D, fallback
    cards/                             # ServiceCard, InstitutionalCard
    carousel/                          # carrossel acessível reutilizável
    ui/                                # primitivas, se necessárias
  content/                             # conteúdos oficiais tipados
  lib/                                 # animações, observadores, utilitários
  styles/                              # tokens/materiais específicos
```

A implementação pode ajustar a árvore à convenção do framework, mas **não criar pastas vazias, frameworks paralelos, múltiplas fontes de tokens nem abstrações sem uso**.

### 13.4. SEO técnico e segurança básica

- `title` e descrição institucional precisos, sem alegar superioridade, prêmios ou garantias não aprovadas. Sugestão de título: `ZURY CORRETORA | Proteção e soluções em seguros`.
- Metadados em português, Open Graph básico se houver imagem apropriada aprovada. Não improvisar fotografia/mockup como imagem oficial.
- URLs, anchors e telefones corretos; links externos com atributos de segurança aplicáveis.
- Evitar exposição de informações sensíveis, chaves em código de cliente, scripts de analytics sem solicitação ou bibliotecas externas desnecessárias.
- Se publicar, validar domínio, favicon e informações legais pertinentes separadamente, sem inventar dados ausentes.

---

## 14. Performance, estabilidade e métricas

**Diretriz:** a qualidade deve ser medida em dispositivos reais ou perfis representativos; metas não equivalem a garantia prévia.

### 14.1. Metas objetivas

Em condições reais, almejar os limiares de boa experiência de Core Web Vitals no percentil 75:

- **LCP ≤ 2,5 segundos**;
- **INP ≤ 200 ms**;
- **CLS ≤ 0,1**.

Essas são **metas de performance**, não promessas de que todo dispositivo terá resultados idênticos. Registrar resultados de Lighthouse/lab e, após publicação, observações de campo se disponível. Testar separadamente desktop e mobile.

### 14.2. Medidas esperadas

- Reservar dimensões para logo, cards, viewport do escudo, poster e controles (sem layout shift quando imagem/Canvas/fonts surgirem).
- Usar fontes otimizadas, poucos pesos e `font-display` adequado.
- Priorizar conteúdo e texto acima da dobra; carga pesada de 3D não deve impedir interação na landing page.
- Limitar custo de `backdrop-filter`, sombras grandes, blur e camadas animadas em todo o viewport.
- Fazer lazy load de recursos não críticos onde fizer sentido; preservar visibilidade inicial do poster e headline.
- Evitar render contínuo de WebGL fora de foco/viewport; pausar/reduzir quando o documento estiver oculto ou o recurso não estiver visível, se aplicável.
- Otimizar geometria, materiais, draw calls, DPR, luz, shadow maps e texturas sem comprometer a aparência premium.
- Fazer testes com degradação: sem WebGL, rede lenta, 3D que falha, JS limitado, dispositivo móvel de menor capacidade e preferência por movimento reduzido.
- Validar que efeitos de fundo e reveal não mantêm vários loops concorrentes desnecessariamente.

---

## 15. Processo de implementação e pontos de aprovação

O Codex deve executar fases rastreáveis, preferindo pequenos conjuntos coerentes de mudanças e relato dos resultados. **A ordem abaixo é o fluxo desejado, não autorização para pular o gate do escudo.**

### Fase 0 — Auditoria inicial (antes de escrever código)

- Inspecionar o diretório atual e diferenciar pasta vazia de pasta com arquivos existentes; **o projeto foi solicitado como novo, do zero**.
- Se já existirem arquivos na pasta, **não apagar nem sobrescrever silenciosamente**: reportar conflito e propor criar um diretório novo/vazio, preservando projetos anteriores.
- Confirmar presença dos dois documentos e dos quatro SVGs; listar ausências de forma objetiva.
- Verificar versão instalada de Node, gerenciador de pacotes e quais skills/MCPs estão **realmente disponíveis**, sem pressupor acesso por nome.

### Fase 1 — Fundação

- Inicializar stack estável compatível; configurar lint, scripts, tipagem, layout global, tokens, tipografia e importação de SVGs.
- Produzir shell acessível da página, hierarquia das quatro seções e conteúdo oficial antes dos efeitos custosos.

### Fase 2 — Layout responsivo e conteúdo

- Implementar navbar, Hero com **espaço reservado/poster provisório apenas de desenvolvimento** para o futuro escudo, grade/carrossel dos 8 serviços, 3 diferenciais e footer.
- Não publicar um escudo alternativo improvisado como resultado final.
- Conferir contagem de produtos, links, ordem de seções e alinhamentos.

### Fase 3 — Escudo independente e gate

- Seguir integralmente §7.3, fases E1 a E3.
- **Pedir aprovação visual explícita. Não integrar o modelo final ao Hero antes da aprovação.**

### Fase 4 — Integração 3D e motion

- Após aprovação, criar poster/fallback do mesmo modelo, integrar 3D com carregamento progressivo e implementar as transições cinematográficas, glass e navbar inteligente.
- Refinar responsividade e comportamento dos carrosséis.

### Fase 5 — QA, revisão e entrega

- Rodar verificação de tipos, lint, build, testes pertinentes e navegação real no navegador (Playwright/browser/Chrome/Computer Use se realmente disponíveis).
- Inspecionar capturas nos tamanhos obrigatórios e corrigir clipping/contraste/overflow.
- Reportar evidências: testes executados, resultados, problemas remanescentes, assets criados e itens pendentes do responsável.
- **Não apresentar como testado** nada que não tenha sido executado.

---

## 16. Critérios de aceite verificáveis (Definition of Done)

O site **somente** será considerado pronto para publicação depois de todos os itens obrigatórios abaixo serem aprovados.

### Marca, conteúdo e estrutura

- [ ] Build público padrão mantém Hero → Soluções → Diferenciais → Footer. Prévia completa insere Indicações → Benefícios antes do Footer, respeitando gates independentes; sem formulário ou funções extras de rodapé.
- [ ] Hero apresenta **exatamente** `SEU PATRIMÔNIO MERECE A MELHOR ESCOLHA ZURY!`, com acentos e pontuação literais, sem CTA/subtítulo/scroll cue. Escudo permanece isolado até aprovação expressa.
- [ ] Navbar segue §5: SOLUÇÕES, DIFERENCIAIS, INDICAÇÕES, BENEFÍCIOS, SOBRE, REDES SOCIAIS, CONTATO; links comerciais omitidos independentemente com seus gates. Destinos e menus oficiais funcionam.
- [ ] Navbar mostra somente texto em repouso, inclusive no ativo, sem cápsula individual permanente; `aria-current`, contraste e foco preservados. Hover conserva exatamente o Liquid Glass aprovado, sem alteração de parâmetros, nunca underline.
- [ ] SVG oficial **não foi redesenhado**; variante branca na navegação escura e no footer; original preservado.
- [ ] Seção serviços apresenta oito títulos na ordem `BENS`, `VIDA E SAÚDE`, `RURAL`, `AUTOMOTIVO`, `CRÉDITO`, `AÉREO E MARÍTIMO`, `TRANSPORTE`, `RESPONSABILIDADE CIVIL`.
- [ ] Todos os **44 itens** de serviço correspondem exatamente à lista oficial atualizada, com ícones correspondentes, um marcador discreto por produto e 12 px entre itens, sem duplicação de bullets ou divisórias entre produtos. Diferenciais também não possuem divisórias internas.
- [ ] Indicações com cards perceptivelmente mais altos e conteúdo redistribuído; frases sem marcadores/pontos, Parceiro sem lista extra e CTAs preservados. Título comercial único sem ponto; parágrafo branco/negrito/maior, duas linhas quando couber, provisório para contratação própria. Sem promessas presumidas, códigos fictícios ou remoção dos gates.
- [ ] Diferenciais apresentam **SEGURANÇA**, **SUPORTE**, **AGILIDADE**, com ícones Lucide aprovados à esquerda e sem numeração visual nos cards, com fonte literal do §9.2, apresentação segmentada, marcadores e espaçamentos preservados, sem divisórias internas; contador mobile preservado.
- [ ] Todos os textos visíveis, inclusive avisos, menus, popovers e rodapé, estão em caixa alta por apresentação; valores técnicos e desenhos oficiais preservados. Hero ocupa exatamente as três linhas do §6.2 no desktop, sem cortes.
- [ ] Benefícios preserva FARMELHOR UNAÍ, ZAPP e GRUPO MV, logos e percentuais. Três cards estáticos quando couberem; excedente ativa loop de cards completos à direita a 42 px/s, pausável, sem duplicatas acessíveis. Mobile/reduced motion estáticos. Sem faixa de logos isoladas. Logo ZAPP centralizada, originais intactos e gates preservados.
- [ ] Footer tem CONTATOS textual acima de SOLUÇÕES e REDES SOCIAIS, ambos com o mesmo componente/dados/comportamentos da navbar. Contato com ícones WhatsApp/e-mail, accordion nome/cargo sem telefones; social com dois links oficiais e Facebook desabilitado. Dados legais/copyright aparecem uma vez.
- [ ] Benefícios sem chamada auxiliar ou espaço residual; carrossel condicional preservado. Botão WhatsApp fixo com ícone existente e Liquid Glass; verde somente no hover/foco da borda/glow, fade de 320 ms. Menu horizontal à esquerda com três contatos, sem e-mail, tecla Escape/clique fora/segundo clique/seleção fecham. Mobile sem clipping, alvos 44 px, safe areas, foco e reduced motion funcionais; sem cobertura dos CTAs.
- [ ] CNPJ e SUSEP abrem os serviços oficiais do §10, sem parâmetros presumidos ou alegação de cadastro validado; usam exatamente as classes, estados de repouso/hover/foco e timings Flow Glass dos demais links do rodapé, com números/alinhamento preservados.
- [ ] Balões de contato e redes sociais compartilham lógica, são mutuamente exclusivos e fecham por Escape, clique fora e botão fechar, com foco e posicionamento corretos.
- [ ] A expressão DIFERENÇA ZURY foi removida; gradientes neutros distintos, vidro cristalino e microinterações refletem o redesign aprovado.

### Responsividade e UX

- [ ] Desktop: serviços **4 × 2**, oito cartões de altura igual; institucional 3 colunas de altura igual.
- [ ] Largura intermediária comporta 2 colunas nos serviços quando necessário.
- [ ] Mobile: serviços e institucionais em carrossel de toque, com **peek**, instrução gestual, indicadores selecionáveis sem setas, contador correto e todos os conteúdos visíveis.
- [ ] Flow Glass compartilhado substitui spotlight; itens da navbar e links do footer mostram texto em repouso e cápsula no hover/foco, com estados acessíveis e reduced motion. Navbar oculta após limite, continua oculta ao subir e só reaparece no topo, sem flicker; interações abertas/foco visível são protegidos.
- [ ] Mesma primitiva de cápsula em todos os itens interativos dos popovers, sem reflexos retangulares. Saída conjunta de logo, contêiner e navbar em 475 ms, deslocamento discreto e sem bloqueio quando oculta. Painel do footer compartilha reveal, elevação e Flow Glass dos cards, sem falso clique ou conflito de transforms.
- [ ] Tracking confere com a tabela fixa do §4.2; produtos no plural e quatro textos novos de TRANSPORTE correspondem ao §8.2. Navegação usa um único tween vertical, cancelável, com alinhamento estável.
- [ ] Serviços sem números no desktop, textos em caixa alta por CSS e dados originais preservados. Hero com tracking ampliado, sem clipping. Três transições de seção compartilham filete prateado difuso e discreto.
- [ ] BENS com suas 9 linhas está completamente legível em todos os dispositivos.
- [ ] Navbar mobile mantém todas as opções acessíveis (sete na prévia completa) e logo legível, sem hamburger e sem overflow.
- [ ] Não há clipping, sobreposição, overflow horizontal de página ou header ocultando anchors, nas larguras de §12.1.
- [ ] Espaçamentos, cores e glass refletem o briefing premium com contraste suficiente.

### Escudo e animação

- [x] Após a prévia isolada, o responsável autorizou expressamente integrar a alternativa com a imagem original, sem aprovar o estudo procedural.
- [ ] Imagem original preservada, com escala, inclinação e iluminação de fundo coerentes com a referência de composição.
- [ ] Exibição animada e estática usam o mesmo PNG, sem troca visual ou filtros sobre a arte.
- [ ] Espaço da imagem reservado desde o HTML; Hero não depende de WebGL e permanece legível sem animação.
- [ ] Transições entre seções são contínuas, reveals podem se repetir sem flicker e movimentos são suaves.
- [ ] `prefers-reduced-motion` foi validado; navegação e carrosséis continuam plenamente funcionais.

### Técnica e qualidade

- [ ] TypeScript, lint e build de produção passam (ou qualquer impedimento está explicitamente documentado).
- [ ] Carrosséis e navegação operam com teclado/leitor de tela, foco visível e links corretos.
- [ ] Há evidências de testes no navegador, inclusive larguras 320, 360, 375, 390/430, 768, 1024, 1440 e 1920 px.
- [ ] Core Web Vitals foram medidos ou estimados por ferramenta adequada, com métricas e condições declaradas; não inventar pontuações.
- [ ] Não há dependências, imagens, claims ou seções supérfluas.
- [ ] O usuário recebeu resumo claro do que foi executado, do que foi verificado e do que ainda depende de aprovação.

---

## 17. Restrições explícitas e prevenção de escopo

**NÃO fazer:**

- Criar logos novas ou alterar o monograma, a tipografia e os caminhos SVG oficiais.
- Criar seções além das autorizadas nos §§2, 9.3 e 9.4, formulário, CTA no Hero, botão de orçamento genérico, depoimentos inventados ou perguntas frequentes. CONTATOS textual do §10 é autorizado; botão WhatsApp no rodapé não é permitido. Não publicar Indicações ou Benefícios sem os respectivos gates comerciais/jurídicos.
- Esconder serviços em accordions, criar cards clicáveis falsos ou cortar linhas longas para uniformizar alturas.
- Trocar carrossel mobile por empilhamento vertical sem justificativa aceita, remover o peek ou ocultar os controles.
- Criar hamburger como atalho para resolver o espaço da navbar mobile.
- Trocar o indicador ativo por sublinhado.
- Aplicar dourado, champagne, cores saturadas fora da exceção de borda/glow do §10.4, sombras fortes, parallax agressivo ou rotação de cartões.
- Substituir 3D real por imagem estática como estratégia primária sem falha/capacidade justificável.
- Fazer o escudo definitivamente integrado antes da aprovação visual isolada.
- Declarar performance, conformidade SUSEP independente, funcionamento 24h auditado, testes executados ou assets existentes sem evidência.
- Adicionar várias bibliotecas que realizam as mesmas tarefas apenas por estarem instaladas no ambiente Codex.

**Pode fazer sem nova decisão estética:** ajustes de espaçamento fino, escolha de tamanhos responsivos, técnicas de renderização, simplificação de código, melhoria de contraste/acessibilidade e resolução de conflitos técnicos, **desde que não alterem os requisitos fixados**.

---

## 18. Referências técnicas para execução (não são briefing de marca)

Documentação oficial/autoridade a consultar conforme necessário; não substitui este documento nem exige novas dependências:

- Next.js — App Router e instalação: https://nextjs.org/docs/app/getting-started/installation
- React Three Fiber — instalação e compatibilidade: https://r3f.docs.pmnd.rs/getting-started/installation
- GSAP — ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- GSAP — `gsap.matchMedia()`: https://gsap.com/docs/v3/GSAP/gsap.matchMedia%28%29/
- W3C WAI — padrões de carrossel: https://www.w3.org/WAI/ARIA/apg/patterns/carousel/ e https://www.w3.org/WAI/tutorials/carousels/
- web.dev — Core Web Vitals: https://web.dev/articles/vitals

**Regra final:** este documento determina **o que** construir, como a ZURY deve se apresentar e quais resultados aceitar. O `AGENTS.md` determina **como** o Codex deve operar, utilizar ferramentas e reportar evidências. Manter as responsabilidades separadas para preservar contexto, reduzir repetição e evitar interpretações conflitantes.
