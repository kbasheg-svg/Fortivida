"use client";
import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; text: string; ts: number };

const SUGGESTIONS = [
  "I’m stressed about work",
  "I can’t focus today",
  "Big meeting in 10 minutes",
  "Sleep has been rough",
];

export default function CelesteWidget() {
  // Open by default on first visit (then remember)
  const [open, setOpen] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    const v = sessionStorage.getItem("celesteOpen");
    return v === null ? true : v === "true";
  });

  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Hi, I’m Celeste. What’s on your mind today?",
      ts: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [freeCount, setFreeCount] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    const v = sessionStorage.getItem("celesteFreeCount");
    return v ? parseInt(v) : 0;
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    sessionStorage.setItem("celesteOpen", String(open));
    // Autofocus when opened
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => sessionStorage.setItem("celesteFreeCount", String(freeCount)), [freeCount]);

  const isLoggedIn = () => Boolean(localStorage.getItem("fortivida_auth"));

  async function sendText(text: string) {
    const trimmed = text.trim();
    if (!trimmed || sending) return;

    if (!isLoggedIn() && freeCount >= 5) {
      setMsgs((m) => [
        ...m,
        {
          role: "assistant",
          text:
            "You’ve reached the free preview. Create an account to unlock daily guidance, full rituals, and live sessions.",
          ts: Date.now(),
        },
      ]);
      return;
    }

    setMsgs((m) => [...m, { role: "user", text: trimmed, ts: Date.now() }]);
    setInput("");
    setSending(true);

    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed }),
      });
      const j = await r.json();
      setMsgs((m) => [...m, { role: "assistant", text: j.reply, ts: Date.now() }]);
      if (!isLoggedIn()) setFreeCount((n) => n + 1);
    } catch {
      setMsgs((m) => [
        ...m,
        { role: "assistant", text: "Couldn’t reach me just now — try again.", ts: Date.now() },
      ]);
    } finally {
      setSending(false);
    }
  }

  function handleSend() {
    if (!input.trim()) return;
    sendText(input);
  }

  return (
    <>
      {/* Floating Button (still there if they close the panel) */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-40 rounded-full bg-[#2563EB] text-white px-5 py-3 shadow-lg hover:bg-[#1D4ED8]"
          aria-label="Open chat with Celeste"
        >
          Talk with Celeste
        </button>
      )}

      {/* Expanded Panel */}
      <div
        className={`fixed z-50 bottom-5 right-5 w-[420px] max-w-[96vw] transition-all ${
          open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-label="Celeste chat"
      >
        <div className="rounded-2xl border border-[#E2E8F0] bg-white shadow-2xl ring-1 ring-black/5">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[#E2E8F0]">
            <div className="h-10 w-10 rounded-full bg-[#EAF2FF] grid place-items-center shadow-inner">
              <span className="text-[#2563EB] font-semibold">C</span>
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-[#0F172A]">Celeste</div>
              <div className="text-xs text-[#475569]">Real guidance in minutes — Mind • Body • Strategy</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="ml-auto text-[#475569] hover:text-[#0F172A]"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Suggestion chips (only show until the user sends something) */}
          {msgs.length <= 1 && (
            <div className="px-4 pt-3 pb-1 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => sendText(s)}
                  className="rounded-full border border-[#E2E8F0] px-3 py-1.5 text-xs hover:bg-[#F8FAFC]"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Messages */}
          <div className="max-h-[60vh] min-h-[260px] overflow-y-auto px-3 py-3 space-y-2">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-white border border-[#E2E8F0] text-[#0F172A]"
                      : "bg-[#EAF2FF] text-[#0F172A]"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="px-3 py-2 rounded-2xl text-sm bg-[#EAF2FF] text-[#0F172A]">
                  typing…
                </div>
              </div>
            )}
          </div>

          {/* Free message notice */}
          {!isLoggedIn() && freeCount >= 5 && (
            <div className="px-4 pt-1 text-xs text-[#475569]">
              You’ve used your 5 free messages.{" "}
              <a href="/signup" className="text-[#2563EB] underline">
                Start Free
              </a>{" "}
              or{" "}
              <a href="/login" className="text-[#2563EB] underline">
                Log In
              </a>{" "}
              to continue.
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2 p-3 border-t border-[#E2E8F0]">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="share what’s going on… I’ll help you find your next step"
              className="flex-1 rounded-xl border border-[#E2E8F0] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2563EB]/30"
            />
            <button
              onClick={handleSend}
              disabled={sending || !input.trim()}
              className="rounded-xl bg-[#2563EB] text-white px-3 py-2 text-sm disabled:opacity-50 hover:bg-[#1D4ED8]"
            >
              Send
            </button>
          </div>

          {/* Privacy microcopy */}
          <div className="px-4 pb-3 text-[11px] text-[#94A3B8]">
            Private by default. No medical advice; for crisis support, contact local services.
          </div>
        </div>
      </div>
    </>
  );
}
