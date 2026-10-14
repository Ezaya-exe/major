import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { api, errorMessage } from "../api/client";
import type { Channel, DraftResponse, Language, Topic } from "../api/types";

const en = {
  title: "Prepare a complaint",
  intro:
    "Describe the problem and I will prepare a draft you can edit and send through the official channel. This tool does not submit or save anything.",
  description: "What is the problem?",
  descriptionPh: "For example: There is a big pothole near my house",
  location: "Where is it? (area, street)",
  landmark: "Nearby landmark (optional)",
  category: "Issue type",
  categoryAuto: "Detect automatically",
  categoryPick: "Please choose the issue type",
  prepare: "Prepare draft",
  working: "Preparing…",
  draftHeading: "Your draft (you can edit it)",
  subject: "Subject",
  message: "Message",
  copy: "Copy",
  copied: "Copied",
  where: "Where to send it",
  others: "Other official options",
  next: "What to do next",
  startOver: "Start over",
  verified: "Verified",
  unverified: "Not yet verified",
  open: "Open official page",
  language: "Language",
};
type Labels = typeof en;

const LABELS: Record<Language, Labels> = {
  en,
  mr: {
    title: "तक्रार तयार करा",
    intro:
      "समस्येचे वर्णन करा. मी तुम्हाला बदल करता येईल असा मसुदा तयार करतो, जो तुम्ही अधिकृत माध्यमातून पाठवू शकता. हे साधन काहीही सादर किंवा जतन करत नाही.",
    description: "समस्या काय आहे?",
    descriptionPh: "उदा. माझ्या घराजवळ मोठा खड्डा आहे",
    location: "ठिकाण कुठे आहे? (परिसर, रस्ता)",
    landmark: "जवळची खूण (ऐच्छिक)",
    category: "समस्येचा प्रकार",
    categoryAuto: "आपोआप ओळखा",
    categoryPick: "कृपया समस्येचा प्रकार निवडा",
    prepare: "मसुदा तयार करा",
    working: "तयार करत आहे…",
    draftHeading: "तुमचा मसुदा (तुम्ही बदल करू शकता)",
    subject: "विषय",
    message: "संदेश",
    copy: "कॉपी करा",
    copied: "कॉपी केले",
    where: "कुठे पाठवायचे",
    others: "इतर अधिकृत पर्याय",
    next: "पुढे काय करावे",
    startOver: "पुन्हा सुरू करा",
    verified: "तपासलेले",
    unverified: "अजून तपासलेले नाही",
    open: "अधिकृत पान उघडा",
    language: "भाषा",
  },
  hi: {
    title: "शिकायत तैयार करें",
    intro:
      "समस्या बताइए। मैं एक मसौदा तैयार करता हूँ जिसे आप बदल सकते हैं और आधिकारिक माध्यम से भेज सकते हैं। यह उपकरण कुछ भी जमा या सहेजता नहीं है।",
    description: "समस्या क्या है?",
    descriptionPh: "जैसे: मेरे घर के पास बड़ा गड्ढा है",
    location: "स्थान कहाँ है? (इलाका, सड़क)",
    landmark: "नज़दीकी पहचान स्थल (वैकल्पिक)",
    category: "समस्या का प्रकार",
    categoryAuto: "अपने आप पहचानें",
    categoryPick: "कृपया समस्या का प्रकार चुनें",
    prepare: "मसौदा तैयार करें",
    working: "तैयार कर रहे हैं…",
    draftHeading: "आपका मसौदा (आप इसे बदल सकते हैं)",
    subject: "विषय",
    message: "संदेश",
    copy: "कॉपी करें",
    copied: "कॉपी हो गया",
    where: "कहाँ भेजें",
    others: "अन्य आधिकारिक विकल्प",
    next: "आगे क्या करें",
    startOver: "फिर से शुरू करें",
    verified: "जाँचा गया",
    unverified: "अभी जाँचा नहीं गया",
    open: "आधिकारिक पेज खोलें",
    language: "भाषा",
  },
};

const LANGUAGE_NAMES: Record<Language, string> = { en: "English", mr: "मराठी", hi: "हिन्दी" };
const isSafeUrl = (u: string) => /^https:\/\//i.test(u);

function ChannelBox({ ch, L }: { ch: Channel; L: Labels }) {
  return (
    <div className="rounded bg-blue-50 p-3 text-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-semibold">{ch.name}</span>
        <span
          className={`rounded px-2 py-0.5 text-xs font-medium ${
            ch.verified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {ch.verified ? L.verified : L.unverified}
        </span>
      </div>
      <p className="text-gray-700">{ch.instructions}</p>
      {ch.url && isSafeUrl(ch.url) && (
        <a
          href={ch.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 underline"
        >
          {L.open}
        </a>
      )}
    </div>
  );
}

export function ComplaintPage() {
  const nav = useLocation().state as { description?: string; language?: Language } | null;

  const [lang, setLang] = useState<Language>(nav?.language ?? "en");
  const [description, setDescription] = useState(nav?.description ?? "");
  const [location, setLocation] = useState("");
  const [landmark, setLandmark] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [showCategory, setShowCategory] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState<string[]>([]);
  const [result, setResult] = useState<DraftResponse | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [copied, setCopied] = useState(false);

  const L = LABELS[lang];

  useEffect(() => {
    api
      .topics(lang)
      .then((r) => setTopics(r.topics.filter((t) => t.complaint_enabled)))
      .catch(() => setTopics([]));
  }, [lang]);

  async function prepare() {
    if (loading || !description.trim()) return;
    setLoading(true);
    setError(null);
    setNotes([]);
    try {
      const a = await api.analyze({
        description: description.trim(),
        location: location.trim() || undefined,
        language: lang,
      });

      // A manually chosen category satisfies the "description" gap.
      const questions = a.follow_up_questions.filter(
        (q) => !(q.field === "description" && categoryId),
      );
      const cat = categoryId || a.category_id;
      setShowCategory(!a.category_id);

      if (!cat || questions.length > 0) {
        setNotes(questions.map((q) => q.question));
        return;
      }

      const d = await api.draft({
        category_id: cat,
        description: description.trim(),
        location: location.trim(),
        landmark: landmark.trim() || undefined,
        language: lang,
      });
      setResult(d);
      setTitle(d.draft.title);
      setBody(d.draft.body);
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(`${title}\n\n${body}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Could not copy automatically. Please select the text and copy it.");
    }
  }

  function startOver() {
    setResult(null);
    setNotes([]);
    setError(null);
    setCategoryId("");
    setShowCategory(false);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4 p-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">{L.title}</h1>
        <label className="text-sm">
          <span className="mr-1">{L.language}:</span>
          <select
            value={lang}
            disabled={result !== null}
            onChange={(e) => setLang(e.target.value as Language)}
            className="rounded border border-gray-300 p-1 disabled:opacity-50"
          >
            {(Object.keys(LANGUAGE_NAMES) as Language[]).map((code) => (
              <option key={code} value={code}>
                {LANGUAGE_NAMES[code]}
              </option>
            ))}
          </select>
        </label>
      </div>

      {!result && (
        <>
          <p className="text-sm text-gray-700">{L.intro}</p>

          <div className="space-y-3">
            <div>
              <label htmlFor="desc" className="block text-sm font-medium">
                {L.description}
              </label>
              <textarea
                id="desc"
                rows={3}
                maxLength={2000}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={L.descriptionPh}
                className="w-full rounded border border-gray-300 p-2"
              />
            </div>

            <div>
              <label htmlFor="loc" className="block text-sm font-medium">
                {L.location}
              </label>
              <input
                id="loc"
                maxLength={300}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded border border-gray-300 p-2"
              />
            </div>

            <div>
              <label htmlFor="lm" className="block text-sm font-medium">
                {L.landmark}
              </label>
              <input
                id="lm"
                maxLength={200}
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                className="w-full rounded border border-gray-300 p-2"
              />
            </div>

            {showCategory && (
              <div>
                <label htmlFor="cat" className="block text-sm font-medium">
                  {L.category}
                </label>
                <select
                  id="cat"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full rounded border border-gray-300 p-2"
                >
                  <option value="">{L.categoryPick}</option>
                  {topics.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              type="button"
              onClick={() => void prepare()}
              disabled={loading || !description.trim()}
              className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
            >
              {loading ? L.working : L.prepare}
            </button>
          </div>

          {notes.length > 0 && (
            <div role="status" className="space-y-1 rounded border border-yellow-300 bg-yellow-50 p-3 text-sm">
              {notes.map((n) => (
                <p key={n}>{n}</p>
              ))}
            </div>
          )}
        </>
      )}

      {error && (
        <div role="alert" className="rounded border border-red-300 bg-red-50 p-3 text-red-800">
          {error}
        </div>
      )}

      {result && (
        <section className="space-y-4" aria-live="polite">
          <h2 className="text-lg font-semibold">{L.draftHeading}</h2>

          <div>
            <label htmlFor="dt" className="block text-sm font-medium">
              {L.subject}
            </label>
            <input
              id="dt"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded border border-gray-300 p-2"
            />
          </div>

          <div>
            <label htmlFor="db" className="block text-sm font-medium">
              {L.message}
            </label>
            <textarea
              id="db"
              rows={12}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full rounded border border-gray-300 p-2"
            />
          </div>

          <button
            type="button"
            onClick={() => void copy()}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            {copied ? L.copied : L.copy}
          </button>

          {result.channel && (
            <div className="space-y-1">
              <h3 className="text-sm font-semibold">{L.where}</h3>
              <ChannelBox ch={result.channel} L={L} />
            </div>
          )}

          {result.other_channels.length > 0 && (
            <div className="space-y-1">
              <h3 className="text-sm font-semibold">{L.others}</h3>
              {result.other_channels.map((c) => (
                <ChannelBox key={c.name} ch={c} L={L} />
              ))}
            </div>
          )}

          <div>
            <h3 className="text-sm font-semibold">{L.next}</h3>
            <ol className="mt-1 list-decimal space-y-1 pl-5 text-sm">
              {result.next_steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>

          <button
            type="button"
            onClick={startOver}
            className="rounded border border-gray-300 px-4 py-2"
          >
            {L.startOver}
          </button>

          <p className="border-t pt-2 text-xs text-gray-600">{result.disclaimer}</p>
        </section>
      )}
    </div>
  );
}