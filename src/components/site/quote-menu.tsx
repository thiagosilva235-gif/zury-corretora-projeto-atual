import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import { ArrowRight, CircleCheck, X } from "lucide-react";
import { contacts, services } from "@/lib/content";
import {
  quoteFieldOrder,
  quoteStart,
  validateCustomer,
  type QuoteCustomer,
  type QuoteErrors,
  type QuoteField,
} from "@/lib/quote-form.mjs";
import {
  CustomerStep,
  OptionStep,
  QuoteActions,
  QuoteProgress,
  ReviewStep,
  type Step,
} from "./quote-steps";
import {
  prepareQuoteSubmission,
  saveQuote,
  quoteReceiptWhatsAppHref,
  type QuoteReceipt,
} from "@/lib/quote-submission";
import { SilverTrace } from "@/components/ui/silver-trace";
import "./quote-menu.css";

type QuoteVariant = "primary" | "secondary" | "card";
export type QuoteDetail = { area?: string; solution?: string; trigger?: HTMLElement | null };

const QUOTE_EVENT = "zury:quote";
const emptyCustomer: QuoteCustomer = {
  name: "",
  document: "",
  phone: "",
  email: "",
  cep: "",
  number: "",
  complement: "",
  consent: false,
};
const areaOptions = services.map((item) => ({
  value: item.number,
  label: item.title,
}));

/** Opens the single quote dialog. Area + solution start at the customer step; no args start at step 1. */
// eslint-disable-next-line react-refresh/only-export-components -- shared entry point of this dialog
export function openQuote(detail: QuoteDetail = {}): void {
  window.dispatchEvent(new CustomEvent<QuoteDetail>(QUOTE_EVENT, { detail }));
}

export function QuoteTrigger({
  variant = "primary",
  className = "",
  children = "COTAR AGORA",
}: {
  variant?: QuoteVariant;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <button
      type="button"
      className={`btn btn-${variant} quote-trigger quote-graphite quote-graphite--glow ${className}`}
      aria-haspopup="dialog"
      aria-controls="quote-dialog"
      onClick={(event) => openQuote({ trigger: event.currentTarget })}
    >
      <span>{children}</span>
      <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
      <SilverTrace loop />
    </button>
  );
}

function isOutside(event: { clientX: number; clientY: number; currentTarget: Element }) {
  const bounds = event.currentTarget.getBoundingClientRect();
  return (
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom
  );
}

/** Locks page scroll while the modal is open; returns the restore callback. */
function lockPage() {
  const html = document.documentElement;
  const saved = {
    overflow: html.style.overflow,
    gutter: html.style.scrollbarGutter,
    scrollY: window.scrollY,
  };
  html.style.scrollbarGutter = "stable";
  html.style.overflow = "hidden";
  return () => {
    html.style.overflow = saved.overflow;
    html.style.scrollbarGutter = saved.gutter;
    if (window.scrollY !== saved.scrollY)
      window.scrollTo({ top: saved.scrollY, behavior: "instant" });
  };
}

/** Moves focus into the current step: the chosen (or first) radio, the first field, or the summary. */
function focusStep(root: HTMLDialogElement, step: Step) {
  const target =
    step === 3
      ? root.querySelector<HTMLElement>("#quote-name")
      : step === 4
        ? root.querySelector<HTMLElement>("#quote-step-title")
        : (root.querySelector<HTMLElement>(".quote-options input:checked") ??
          root.querySelector<HTMLElement>(".quote-options input"));
  target?.focus();
}

// Enter on a radio card or the consent checkbox advances like on a text field.
function submitOnEnter(event: KeyboardEvent<HTMLFormElement>) {
  const target = event.target;
  if (
    event.key === "Enter" &&
    target instanceof HTMLInputElement &&
    (target.type === "radio" || target.type === "checkbox")
  ) {
    event.preventDefault();
    event.currentTarget.requestSubmit();
  }
}

export function QuoteDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const feedback = useRef<HTMLDivElement>(null);
  const unlockPage = useRef<(() => void) | null>(null);
  const backdropPress = useRef(false);
  const [session, setSession] = useState(0);
  const [step, setStep] = useState<Step>(1);
  const [area, setArea] = useState("");
  const [solution, setSolution] = useState("");
  const [customer, setCustomer] = useState<QuoteCustomer>(emptyCustomer);
  const [touched, setTouched] = useState<Partial<Record<QuoteField, boolean>>>({});
  const [attempted, setAttempted] = useState(false);
  const [receipt, setReceipt] = useState<QuoteReceipt | null>(null);
  const [saving, setSaving] = useState(false);
  const [sendError, setSendError] = useState("");
  const attempt = useRef({ payload: "", key: "" });
  const inFlight = useRef(false);
  const generation = useRef(0);

  const service = services.find((item) => item.number === area);
  const areaTitle = service?.title ?? "";
  const errors = validateCustomer(customer);
  // Errors appear once a field was left (blur) or after an AVANÇAR attempt.
  const shownErrors: QuoteErrors = Object.fromEntries(
    quoteFieldOrder
      .filter((key) => errors[key] && (attempted || touched[key]))
      .map((key) => [key, errors[key]]),
  );

  useEffect(() => {
    const root = dialog.current;
    const open = (event: Event) => {
      const detail = (event as CustomEvent<QuoteDetail | undefined>).detail ?? {};
      const start = quoteStart(services, detail);
      setArea(start.area);
      setSolution(start.solution);
      setStep(start.step);
      setCustomer(emptyCustomer);
      setTouched({});
      setAttempted(false);
      setReceipt(null);
      setSaving(false);
      setSendError("");
      attempt.current = { payload: "", key: "" };
      inFlight.current = false;
      generation.current += 1;
      setSession((value) => value + 1);
      returnFocus.current =
        detail.trigger ??
        (document.activeElement instanceof HTMLElement ? document.activeElement : null);
      if (!root || root.open) return;
      unlockPage.current = lockPage();
      root.showModal();
    };
    window.addEventListener(QUOTE_EVENT, open);
    return () => {
      generation.current += 1;
      window.removeEventListener(QUOTE_EVENT, open);
      unlockPage.current?.();
    };
  }, []);

  useEffect(() => {
    if (dialog.current?.open) focusStep(dialog.current, step);
  }, [step, session]);

  useEffect(() => {
    if (receipt || sendError) feedback.current?.scrollIntoView({ block: "nearest" });
  }, [receipt, sendError]);

  const handleClose = () => {
    generation.current += 1;
    unlockPage.current?.();
    unlockPage.current = null;
    const target = returnFocus.current;
    returnFocus.current = null;
    if (target?.isConnected) target.focus({ preventScroll: true });
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step === 1 && service) setStep(2);
    else if (step === 2 && solution) setStep(3);
    else if (step === 3) {
      const invalid = quoteFieldOrder.find((key) => errors[key]);
      if (!invalid) {
        setStep(4);
        return;
      }
      // Render the messages first so the focused field announces its error.
      flushSync(() => setAttempted(true));
      dialog.current?.querySelector<HTMLElement>(`#quote-${invalid}`)?.focus();
    }
  };

  const send = async () => {
    if (inFlight.current || receipt) return;
    const submission = prepareQuoteSubmission(customer, areaTitle, solution);
    const payload = JSON.stringify(submission);
    if (attempt.current.payload !== payload)
      attempt.current = { payload, key: crypto.randomUUID() };
    const currentGeneration = generation.current;
    inFlight.current = true;
    setSaving(true);
    setSendError("");
    try {
      const saved = await saveQuote(submission, attempt.current.key);
      if (generation.current === currentGeneration) setReceipt(saved);
    } catch (error) {
      if (generation.current === currentGeneration)
        setSendError(
          error instanceof Error ? error.message : "Não foi possível salvar. Tente novamente.",
        );
    } finally {
      if (generation.current === currentGeneration) {
        inFlight.current = false;
        setSaving(false);
      }
    }
  };

  return (
    <dialog
      ref={dialog}
      id="quote-dialog"
      className="quote-dialog"
      aria-labelledby="quote-title"
      onClose={handleClose}
      onPointerDown={(event) => {
        backdropPress.current = event.target === event.currentTarget && isOutside(event);
      }}
      onClick={(event) => {
        if (backdropPress.current && event.target === event.currentTarget && isOutside(event))
          event.currentTarget.close();
        backdropPress.current = false;
      }}
    >
      <header className="quote-header">
        <h2 id="quote-title">COTAR AGORA</h2>
        <button
          type="button"
          className="btn btn-icon quote-close"
          aria-label="Fechar cotação"
          onClick={() => dialog.current?.close()}
        >
          <X size={20} aria-hidden="true" />
        </button>
      </header>
      <form noValidate data-step={step} onSubmit={submit} onKeyDown={submitOnEnter}>
        <QuoteProgress step={step} />

        <div className="quote-step" key={`${session}-${step}`}>
          {step === 1 && (
            <OptionStep
              legend="Qual área você procura?"
              name="quote-area"
              options={areaOptions}
              value={area}
              onChoose={(number) => {
                setArea(number);
                // Only a solution outside the new area is cleared.
                setSolution((current) =>
                  services.find((item) => item.number === number)?.items.includes(current)
                    ? current
                    : "",
                );
              }}
            />
          )}
          {step === 2 && service && (
            <OptionStep
              legend={`Qual solução em ${service.title}?`}
              name="quote-solution"
              options={service.items.map((item) => ({ value: item, label: item }))}
              value={solution}
              onChoose={setSolution}
            />
          )}
          {step === 3 && (
            <CustomerStep
              areaTitle={areaTitle}
              solution={solution}
              customer={customer}
              errors={shownErrors}
              setCustomer={setCustomer}
              onTouch={(field) => setTouched((current) => ({ ...current, [field]: true }))}
              onEdit={setStep}
            />
          )}
          {step === 4 && (
            <ReviewStep areaTitle={areaTitle} solution={solution} customer={customer} />
          )}
        </div>

        <QuoteActions
          step={step}
          canAdvance={!((step === 1 && !service) || (step === 2 && !solution))}
          sendHref={receipt ? quoteReceiptWhatsAppHref(contacts[0].href, receipt) : undefined}
          saving={saving}
          onSend={() => void send()}
          onBack={() => {
            setReceipt(null);
            setSendError("");
            setStep((step - 1) as Step);
          }}
        />
        {receipt && (
          <div ref={feedback} className="quote-handoff" role="status" aria-live="polite">
            <CircleCheck size={22} aria-hidden="true" />
            <div>
              <strong>Solicitação de cotação enviada com sucesso!</strong>
              <p>
                Protocolo: {receipt.protocol}. Sua solicitação foi salva. Continue no WhatsApp para
                falar com a ZURY.
              </p>
            </div>
          </div>
        )}
        {sendError && (
          <p ref={feedback} className="quote-error" role="alert">
            {sendError}
          </p>
        )}
      </form>
    </dialog>
  );
}
