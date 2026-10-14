import { useEffect, useState, type FormEvent } from "react";
import { api, ApiError } from "../api/client";
import type { AskResponse, Language, Topic } from "../api/types";
import { useNavigate } from "react-router-dom";

const en = {
  title: "Ask about a city service",
  question: "Your question",
  placeholder: "For example: Where can I get a birth certificate?",
  ask: "Ask",
  searching: "Searching…",
  steps: "What to do",
  services: "Official services",
  open: "Open official page",
  verified: "Verified",
  unverified: "Not yet verified",
  channel: "Official channel",
  checked: "checked",
  language: "Language",
};
type Labels = typeof en;

const LABELS: Record<Language, Labels> = {
  en,
  mr: {
    title: "शहरातील सेवेबद्दल विचारा",
    question: "तुमचा प्रश्न",
    placeholder: "उदा. जन्म प्रमाणपत्र कुठे मिळेल?",
    ask: "विचारा",
    searching: "शोधत आहे…",
    steps: "काय करावे",
    services: "अधिकृत सेवा",
    open: "अधिकृत पान उघडा",
    verified: "तपासलेले",
    unverified: "अजून तपासलेले नाही",
    channel: "अधिकृत माध्यम",
    checked: "तपासले",
    language: "भाषा",
  },
  hi: {
    title: "शहर की सेवा के बारे में पूछें",
    question: "आपका प्रश्न",
    placeholder: "जैसे: जन्म प्रमाणपत्र कहाँ मिलेगा?",
    ask: "पूछें",
    searching: "खोज रहे हैं…",
    steps: "क्या करें",
    services: "आधिकारिक सेवाएँ",
    open: "आधिकारिक पेज खोलें",
    verified: "जाँचा गया",
    unverified: "अभी जाँचा नहीं गया",
    channel: "आधिकारिक माध्यम",
    checked: "जाँचा",
    language: "भाषा",
  },
};

const LANGUAGE_NAMES: Record<Language, string> = { en: "English", mr: "मराठी", hi: "हिन्दी" };

// Only render links that are plain https URLs.
const isSafeUrl = (u: string) => /^https:\/\//i.test(u);

function Badge({ ok, yes, no }: { ok: boolean; yes: string; no: string }) {
  return (
    <span
      className={`rounded px-2 py-0.5 text-xs font-medium ${
        ok ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
      }`}
    >
      {ok ? yes : no}
    </span>
  );
}

export function AskPage() {
  const [lang, setLang] = useState<Language>("en");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AskResponse | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const L = LABELS[lang];
  const navigate = useNavigate();
  
  useEffect(() => {
    api.topics().then((r) => setTopics(r.topics)).catch(() => setTopics([]));
  }, []);

  async function submit(q: string) {
    const text = q.trim();
    if (!text || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      setResult(await api.ask({ question: text, language: lang }));
    } catch (e) {
      setError(
        e instanceof ApiError && e.code === "network_error"
          ? "Cannot reach the server. Is the backend running?"
          : e instanceof ApiError
            ? e.message
            : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void submit(question);
  }

  const examples = topics.flatMap((t) => t.example_questions);

  return (
    <div className="mx-auto max-w-2xl space-y-4 p-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">{L.title}</h1>
        <label className="text-sm">
          <span className="mr-1">{L.language}:</span>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as Language)}
            className="rounded border border-gray-300 p-1"
          >
            {(Object.keys(LANGUAGE_NAMES) as Language[]).map((code) => (
              <option key={code} value={code}>
                {LANGUAGE_NAMES[code]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <form onSubmit={onSubmit} className="space-y-2">
        <label htmlFor="q" className="block text-sm font-medium">
          {L.question}
        </label>
        <textarea
          id="q"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          maxLength={1000}
          rows={3}
          className="w-full rounded border border-gray-300 p-2"
          placeholder={L.placeholder}
        />
        <button
          type="submit"
          disabled={loading || !question.trim()}
          className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? L.searching : L.ask}
        </button>
      </form>

      {examples.length > 0 && (
        <div className="flex flex-wrap gap-2" aria-label="Example questions">
          {examples.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => {
                setQuestion(ex);
                void submit(ex);
              }}
              className="rounded-full border border-gray-300 px-3 py-1 text-sm hover:bg-gray-100"
            >
              {ex}
            </button>
          ))}
        </div>
      )}

      {error && (
        <div role="alert" className="rounded border border-red-300 bg-red-50 p-3 text-red-800">
          {error}
        </div>
      )}

      {result && (
        <section className="space-y-3 rounded border border-gray-200 p-4" aria-live="polite">
          {result.is_mock && (
            <span className="inline-block rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
              Demo data
            </span>
          )}

          {result.answer && <p className="whitespace-pre-line">{result.answer}</p>}

          {result.services.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold">{L.services}</h2>
              <ul className="mt-1 space-y-2">
                {result.services.map((s) => (
                  <li key={s.id} className="rounded border border-gray-200 p-3 text-sm">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium">{s.name}</span>
                      <Badge ok={s.verified} yes={L.verified} no={L.unverified} />
                    </div>
                    <p className="text-gray-700">{s.authority}</p>
                    {isSafeUrl(s.official_url) && (
                      <a
                        href={s.official_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 underline"
                      >
                        {L.open}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.steps.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold">{L.steps}</h2>
              <ol className="mt-1 list-decimal space-y-1 pl-5 text-sm">
                {result.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
          )}

                    {result.intent === "complaint" && (
            <button
              type="button"
              onClick={() =>
                navigate("/complaint", { state: { description: question, language: lang } })
              }
              className="rounded bg-blue-600 px-4 py-2 text-white"
            >
              {L.prepareComplaint}
            </button>
          )}

          {result.official_channel && (
            <div className="rounded bg-blue-50 p-3 text-sm">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-semibold">{L.channel}</h2>
                <Badge ok={result.official_channel.verified} yes={L.verified} no={L.unverified} />
              </div>
              <p>{result.official_channel.name}</p>
              <p className="text-gray-700">{result.official_channel.instructions}</p>
              {result.official_channel.url && isSafeUrl(result.official_channel.url) && (
                <a
                  href={result.official_channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 underline"
                >
                  {L.open}
                </a>
              )}
            </div>
          )}

          <p className="border-t pt-2 text-xs text-gray-600">{result.disclaimer}</p>
        </section>
      )}
    </div>
  );
}