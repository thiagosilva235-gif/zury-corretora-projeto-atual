# Captação inicial — preparada, ainda não ativada

**Estado local:** não há PostgreSQL, DATABASE_URL ou credenciais configuradas. A API responde 503 e o formulário preserva o preenchimento, sem confirmar gravação nem oferecer WhatsApp. Não houve publicação. Não há agente, automação de navegador, multicálculo ou envio automático de propostas.

## Arquitetura e fluxo

`src/server.ts` encaminha `/api/leads*` e `/api/internal/leads/*` para módulos exclusivos do servidor em `src/server/leads/`. O projeto continua TanStack Start + Nitro; o alvo previsto é **Vercel Node 24**, já configurado em `vercel.json`. Não usar o driver TCP em uma hospedagem puramente estática. Migrações nunca rodam automaticamente no início de uma requisição ou build.

O modal compartilhado nas rotas `/` e `/cartao` mantém as quatro etapas. Na confirmação:
1. ENVIAR SOLICITAÇÃO obtém uma sessão de submissão, valida e envia o JSON por POST.
2. PostgreSQL executa validação de concorrência, cliente/produto/solicitação/histórico em uma única transação. Somente depois do COMMIT a API retorna `persisted: true` e um protocolo aleatório de 128 bits.
3. O modal mostra confirmação real e oferece CONTINUAR NO WHATSAPP. Esse segundo gesto evita bloqueadores de pop-up; nenhum WhatsApp é aberto na falha de gravação.
4. A URL do WhatsApp contém somente o produto e o protocolo, além do destinatário comercial oficial. CPF, telefone do cliente, endereço, nome, placa e e-mail não entram na URL. O protocolo não é credencial de acesso.

O título visual do card VIDA E SAÚDE em Nossas soluções passa a VIDA; o catálogo/produtos oficiais mantém a categoria para preservar dados e navegação existentes. O cartão já renderiza `.brand-shine-light` com `brand-shine` de 3,4s, a mesma CSS da navbar. O reflexo da quarta linha agora usa a mesma banda de 105°/branco 0,9 e 55% de percurso, sem brilho adicional; sincronismo e entrada permanecem existentes.

## Configuração antes de ativar

Use `.env.example`, sem credenciais reais no repositório. No ambiente de produção, os valores são **somente do servidor**, sem prefixo VITE_.

- `DATABASE_URL`: papel de execução restrito; servidor remoto usa TLS com validação do certificado. `DATABASE_CA_CERT` permite CA específica. Não desativar a validação TLS.
- `DATABASE_MIGRATION_URL`: papel proprietário separado, fornecido somente ao comando de migração, não ao frontend nem ao servidor público.
- `LEADS_ENCRYPTION_KEY` e `LEADS_HASH_KEY`: duas chaves diferentes de 32 bytes em hexadecimal, geradas criptograficamente. Gerenciar em secret manager, proteger backups. Nunca trocar a chave de criptografia sem recriptografar o acervo; esta versão não automatiza rotação/múltiplas chaves.
- `APP_ORIGIN`: origem exata, sem barra final; HTTPS em produção. Local: `http://127.0.0.1:5173`.
- `LEADS_SERVICE_ACCOUNTS`: JSON de contas internas com `id`, `role` (`agent` ou `reviewer`) e `tokenHash` SHA-256. Gerar tokens aleatórios de pelo menos 32 bytes em base64url; só o hash fica nesta configuração. Token de reviewer pertence exclusivamente à pessoa que fará a aprovação. Jamais fornecer esse token ao futuro agente. Esta etapa implementa autenticação de serviço, não um portal de usuários, SSO/MFA ou interface de aprovação.
- `LEADS_RETENTION_DAYS`: prazo aprovado pelo controlador; não foi inventado um prazo comercial/legal. Programar a execução periódica da retenção antes de ativar publicamente.
- `LEADS_ENABLED=true`: ativar somente após banco, migração, chaves, origem, operação de direitos e retenção estarem definidos e testados.
- `LEADS_TRUSTED_IP_HEADER`: somente em proxy próprio que REMOVA e SOBRESCREVA esse header. Na Vercel usa `x-vercel-forwarded-for`. Fora disso, sem configuração, há um único bucket global conservador de 10 tentativas/minuto; não confiar automaticamente em x-forwarded-for fornecido pelo cliente.

Para desenvolvimento com variáveis: `node --env-file=.env node_modules/vite/bin/vite.js dev`. O servidor local atualmente aberto não foi reiniciado ou configurado com segredos fictícios.

## Migração, permissões e retenção

Node 24 + dependências instaladas: `npm run db:migrate` (ou `bun run db:migrate`, que chama Node). O runner usa transação, lock e checksum e aplica `migrations/001_leads.sql`. Aplicação não cria banco nem usuário automaticamente.

O administrador cria papéis separados, sem superusuário/DDL para o runtime, e concede na schema escolhida:

```sql
-- Executar como proprietário, substituindo zury_runtime pelo papel realmente criado.
GRANT USAGE ON SCHEMA public TO zury_runtime;
GRANT SELECT, INSERT, UPDATE ON lead_customers, lead_products, lead_requests, lead_rate_limits TO zury_runtime;
GRANT SELECT, INSERT ON lead_results TO zury_runtime;
GRANT INSERT ON lead_events TO zury_runtime;
```

O papel de manutenção recebe apenas permissões de leitura/exclusão necessárias, inclusive exclusões em cascata de eventos/resultados. Não conceder DELETE de auditoria ao runtime. O DBA deve verificar permissões efetivas e o search_path. Não é multi-tenant: conta interna autenticada acessa os leads da única corretora. Não expor acesso SQL ou credenciais compartilhadas ao agente.

`npm run db:retention` conta elegíveis (dry run). `npm run db:retention -- --apply` remove solicitações mais antigas que o prazo configurado, exceto `legal_hold=true`, remove clientes órfãos e buckets vencidos. Logs não incluem dados pessoais. Eventos/resultados são excluídos junto ao lead. Não há agendamento externo criado nesta etapa; a operação deve defini-lo e alinhar retenção dos backups e hipóteses de obrigação legal. Restrição legal (`legal_hold`) exige operação administrativa autorizada, não é alterável pela API pública.

## Contratos

- `POST /api/leads/session`: mesma origem, HttpOnly/SameSite=Strict, ticket assinado de 30 minutos. Retorna token CSRF. Sem identificação do visitante, esse ticket protege o formulário; não autentica identidade civil.
- `POST /api/leads`: JSON com DTO de `prepareQuoteSubmission`; headers `X-Quote-CSRF` e `Idempotency-Key` UUIDv4, cookie correspondente. Limite 16 KiB. Resposta apenas protocolo/produto/status inicial/persistência. Sem endpoint público de leitura.
- `GET /api/internal/leads/<UUID>`: Bearer de servidor. Retorna snapshot descriptografado, status, versão do conteúdo, pendências sinalizadas, campos não preenchidos, resultados e aprovação. Nunca localizar por protocolo público. Leituras registram auditoria sem copiar os dados pessoais.
- `PATCH /api/internal/leads/<UUID>`: Bearer e `{version, action, ...}`. Ações `update` (DTO completo em `data`), `result` (texto até 4000 caracteres), `status`, `approve`, `sent`. `missingFields` aceita somente nomes conhecidos. O serviço não inventa requisitos específicos de seguradoras: `unfilledFields` é informativo; campos obrigatórios de cada produto serão confirmados pela equipe.

Estados: `recebido`, `dados_pendentes`, `cotando`, `aguardando_aprovacao`, `aprovado`, `enviado`. Para aprovar, é necessário resultado da versão atual e ausência de pendências sinalizadas. `approve` e `sent` são exclusivos do reviewer; um trigger reforça o papel no banco. Marcar enviado é registro manual, não envio de proposta. Alterações de dados ou resultado aumentam a versão e removem aprovação; voltar a cotando também remove aprovação. Enviado fica fechado a alterações neste fluxo. Tokens autorizam o papel, mas a identificação efetiva da pessoa e o processo operacional de aprovação são responsabilidade da corretora até existir um portal/SSO.

Idempotência: mesma chave + mesmo conteúdo retorna o recibo original; mesma chave com outro conteúdo é 409. Conteúdo idêntico com outra chave em 24h é 409 sem revelar o protocolo existente. Locks e restrições SQL protegem concorrência entre instâncias. A contagem de tentativas é gravada em transação separada para que falhas/duplicatas não desfaçam o controle de abuso. A chave permanece em memória ao repetir uma tentativa com falha; ao mudar conteúdo, nasce outra chave. Uma falha de rede depois do COMMIT pode significar que houve gravação: repetir a tentativa original evita nova solicitação. O estado de recibo retorna a condição de criação, não um acompanhamento público do andamento.

## Proteção de dados e limites

CPF/CNPJ é validado localmente e novamente no servidor, sem consulta cadastral externa. Somente CEP vai ao ViaCEP. Campos de dados pessoais, snapshots e resultados são criptografados AES-256-GCM com IV aleatório e contexto por registro; hashes HMAC permitem deduplicação sem armazenar documento em coluna aberta. Referências e dados operacionais não são criptografados. A aplicação não usa localStorage para leads, não coloca dados pessoais em URLs nem loga SQL, tokens, payloads ou chaves. TLS e criptografia do provedor/backups continuam requisitos operacionais.

Esses controles **não equivalem a certificação de conformidade integral com a LGPD**. Pendem definição/validação de base legal e retenção pelo controlador, operação de direitos dos titulares, contratos com operadores, backups e recuperação, gestão de acessos e política de incidentes. O consentimento é registrado com versão da política e horário do servidor e não autoriza marketing nem envio automático de propostas.

Referências técnicas consultadas: [transações node-postgres](https://node-postgres.com/features/transactions), [TLS node-postgres](https://node-postgres.com/features/ssl), [segurança REST OWASP](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html), [controle de acesso OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html).

## Validação e pendências reais

`npm run test:leads`: testes de validação, protocolos, criptografia, autenticação/autorização, CSRF, limites, URLs e falhas. `tests/leads/postgres.test.mjs` executa a persistência real somente com **TEST_DATABASE_URL de banco descartável**; cria schema aleatória e a remove. Nunca apontar esse teste para produção. Sem essa variável, o teste é explicitamente SKIP; não é prova de persistência.

No estado atual, migração, concorrência/rollback no PostgreSQL real e permissões efetivas do papel SQL ainda precisam desse banco. A recusa de conexão foi testada com pg em porta local fechada, além de API sem configuração. Não foi criada nenhuma integração fictícia de CRM nem substituto de banco em produção.
