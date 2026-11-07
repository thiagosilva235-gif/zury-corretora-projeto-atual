import { digitalChannels } from "@/lib/content";

/** Native disclosure stays inside the modal focus scope and preserves all entered data. */
export function QuotePrivacy() {
  return (
    <details className="quote-privacy" id="quote-privacy">
      <summary>Política de Privacidade da cotação</summary>
      <div>
        <p>
          <strong>Responsável:</strong> ZURY CORRETORA LTDA. Esta política descreve este formulário,
          nas páginas principal e cartão digital. Versão: 06/11/2026.
        </p>
        <p>
          <strong>Dados e finalidade:</strong> nome ou razão social, CPF/CNPJ, WhatsApp, endereço e
          solução escolhida são usados para preparar sua solicitação e permitir o atendimento.
          E-mail, complemento e placa são opcionais. O CPF/CNPJ é validado no dispositivo e no
          servidor, sem consulta cadastral externa.
        </p>
        <p>
          <strong>Endereço:</strong> ao completar o CEP, apenas esse código é enviado ao ViaCEP para
          preenchimento. Você pode corrigir ou preencher o endereço manualmente.
        </p>
        <p>
          <strong>Envio e armazenamento:</strong> ao enviar, o formulário solicita o registro dos
          dados no servidor da ZURY para atendimento da cotação. O recebimento só é confirmado após
          a gravação no banco; se o serviço estiver indisponível, nenhuma confirmação será exibida.
          Os dados pessoais são protegidos por criptografia no armazenamento desta aplicação e o
          acesso interno exige autenticação. Depois de salvar, você pode abrir o WhatsApp com apenas
          o produto e o protocolo. O protocolo não permite consultar seus dados publicamente. O uso
          do WhatsApp está sujeito à política desse serviço.
        </p>
        <p>
          <strong>Seu controle:</strong> revise os dados antes de enviar, deixe os campos opcionais
          em branco ou feche o formulário sem enviar. Para solicitar acesso, correção, exclusão ou
          retirar sua autorização de contato após o envio, entre em contato com a ZURY pelo e-mail{" "}
          <a href={`mailto:${digitalChannels.email}`}>{digitalChannels.email}</a>. O armazenamento
          deve durar somente o necessário para o atendimento e obrigações aplicáveis. A definição do
          prazo operacional e do responsável pelo atendimento dos direitos deve ser concluída pela
          ZURY antes da ativação pública da captação. O registro de consentimento não autoriza envio
          automático de propostas.
        </p>
      </div>
    </details>
  );
}
