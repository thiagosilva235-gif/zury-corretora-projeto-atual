# Plano de alterações Zury

Escopo: projeto local extraído; não publicar, enviar mensagens ou introduzir coleta. Preservar conteúdo e destinos existentes exceto as alterações explicitamente solicitadas. As animações permanecem ativas para todos conforme decisão expressa do usuário.

1. Registrar e investigar o vídeo do hero em desktop e mobile, inclusive ida e volta; corrigir apenas mecanismos demonstrados e manter pôster confiável. Tornar título e CTA visíveis na primeira tela e reduzir a rolagem dedicada ao escudo. Integrar as quatro linhas e texto aprovados, entrada sequencial única e reflexo prateado; preservar navbar e remover somente ícone decorativo de redes sociais no desktop.
2. Em companhias remover linhas, ampliar legenda, padronizar cards e aumentar velocidade de 80 para 104 px/s, preservando o hover. Em benefícios implementar movimento contínuo para a direita com a mesma velocidade, sem controles ou interação manual, mantendo conteúdo, ordem e alternativas sem duplicação para leitores de tela.
3. Retirar separadores pontilhados e números visíveis dos cards de soluções; ajustar proporções. Retirar efeitos de luz nos cards de afiliado e parceiro preservando botões. Ajustar rodapé inferior com cantos quadrados.
4. Compartilhar estilo grafite e brilho verde para os CTAs indicados; adaptar cartão digital com botões em caixa alta, ícones originais nos botões principais, WhatsApp imediatamente abaixo do site e menu direto de três contatos. Preservar destinos e modal compartilhado.
5. Rodar typecheck, lint, testes, build e Playwright desktop/mobile quando disponíveis; verificar hero e rolagem, carrosséis, CTA, modal, links e contatos sem enviar mensagens. Inspecionar visualmente e relatar limitações e regressões preexistentes.

Revisão: evitar alterações em outros fluxos, manter o logotipo e os dados centralizados, testar navegação e foco, não afirmar correção de vídeo sem reproduzir o defeito.


## Refinamentos visuais solicitados após a primeira revisão

- Hero: retirados selo e dados cadastrais; reduzida a cobertura do vídeo para maior nitidez, preservando contraste do texto.
- Controles: raio de 4 px compartilhado, navbar retangular, feixe verde de 2,5 px em movimento contínuo via SilverTrace. Sem pulsação. Solicitar cotação e CTAs de parceria reutilizam o mesmo efeito do hero.
- Soluções: removida a contagem por card e ampliado o CTA da seção.
- Benefícios: logos sem cards ou placas, conteúdo e movimento preservados; mesma altura responsiva de Companhias.
- Rodapé: eliminada a faixa de espaço externo acima do painel.
- Tipografia: máscaras de títulos com folga para acentos durante a entrada e recorte liberado ao concluir; entrelinha ajustada.
- Revisão inclui desktop, celular e largura de 320 px. Nenhuma publicação autorizada.


## Refinamento seguinte — navbar, reflexos e companhias

- Apenas o WhatsApp flutuante volta ao círculo; mantidos fundo, ícone e feixe.
- Navbar com largura integral em desktop/mobile e fade conforme a direção da rolagem; interação e foco mantêm acesso aos controles.
- Companhias com título centralizado e logos originais sem placas ou sombras de cards.
- Botões claros recebem um metalizado off-white compartilhado entre hero e indicações.
- Reflexo da frase final do hero recortado nas letras, com o mesmo gradiente, duração e cadência da marca.
