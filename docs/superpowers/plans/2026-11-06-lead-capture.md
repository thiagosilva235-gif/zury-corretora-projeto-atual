# Captação inicial ZURY — plano de execução

Objetivo: persistir a cotação antes de oferecer o WhatsApp, sem agente ou envio automático.
Arquitetura: endpoints no fetch do servidor TanStack já existente; PostgreSQL via pg; serviços e repositório exclusivos do servidor; formulário compartilhado consome POST JSON. Banco/segredos ausentes implicam 503, nunca sucesso simulado.

- [x] Criar validação de contrato, catálogo oficial, protocolo aleatório, criptografia autenticada dos dados pessoais e HMAC para deduplicação; testes unitários.
- [x] Criar migração SQL transacional para clientes, produtos, solicitações, estados, histórico e controle de abuso; runner separado com lock e checksum. Papel de execução sem DDL; configuração por ambiente.
- [x] Criar serviço/repositório transacional: idempotência com segredo por tentativa, deduplicação recente sem revelar protocolo de outra sessão, persistência antes da resposta. Atualizações internas versionadas; aprovação só por humano, alterações invalidam aprovação.
- [x] Criar API pública somente POST com origem, JSON limitado e rate limit compartilhado no PostgreSQL. Endpoints internos por UUID e Bearer de credenciais de servidor com escopos agente/humano, sem lookup público por protocolo. Não registrar dados pessoais/segredos em logs.
- [x] Integrar formulário: submissão assíncrona, erro recuperável e dados preservados; recibo só após COMMIT e WhatsApp curto com produto/protocolo. Atualizar política para descrever persistência configurável e limitações reais.
- [x] Ajustar título VIDA somente no card de Soluções; conferir light sweep já compartilhado no cartão e igualar banda da quarta linha à navbar sem alterar entrada.
- [x] Executar testes de API/serviço/criptografia; teste real PostgreSQL condicional a TEST_DATABASE_URL, explicitamente pendente se ausente; typecheck, lint dos arquivos, build. Não implementar Playwright nesta etapa, não publicar.

Decisões: sem portal/login novo, credenciais Bearer de serviço de alta entropia configuradas por servidor (papéis distintos), sem segredos no cliente. API de criação é pública por necessidade do formulário; leitura/alteração exige autenticação. Não pedir CPF extra nem ampliar coleta. Retenção, base legal e operação de direitos precisam de definição do controlador antes da ativação pública; não afirmar conformidade integral com LGPD.
Riscos a testar: concorrência/idempotência e retries; rollback/conexão indisponível; agente tentando aprovar; alteração após aprovação; URLs sem CPF/nome/endereço; ausência de credenciais falha fechada; corpo excessivo; origem inválida.

Execução encerrada localmente: implementação e verificações disponíveis concluídas. Integração PostgreSQL real permanece não ativada e não verificada por ausência de banco/credenciais; não confundir itens de implementação com ativação. Evidências em qa/leads-2026-11-06.md.
