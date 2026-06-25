import { useState, useRef, useEffect } from "preact/hooks";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "What did Èric build in CertiShot?",
  "What's his experience with AI?",
  "Which backend technologies does he use?",
];

const API_URL = "/api/chat";

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || loading) return;

    setError(null);
    const next: Message[] = [...messages, { role: "user", content: question }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      if (res.status === 429) {
        setError("Rate limit reached — please try again in a few minutes.");
        return;
      }
      if (!res.ok) throw new Error(`Request failed (${res.status})`);

      const data = (await res.json()) as { reply?: string };
      setMessages([
        ...next,
        { role: "assistant", content: data.reply ?? "Sorry, I couldn't generate a reply." },
      ]);
    } catch {
      setError("The assistant isn't reachable right now. Try again later.");
    } finally {
      setLoading(false);
    }
  }

  const hasConversation = messages.length > 0;

  return (
    <div class="rounded-2xl border border-line bg-surface p-4 sm:p-6">
      {/* Conversation */}
      <div
        ref={listRef}
        class="max-h-80 space-y-4 overflow-y-auto"
        style={{ scrollbarWidth: "thin" }}
      >
        {!hasConversation && (
          <p class="py-6 text-center text-sm text-muted">
            Ask anything about my background, projects or skills.
          </p>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            class={
              m.role === "user"
                ? "ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-ink px-4 py-2.5 text-sm text-bg"
                : "mr-auto max-w-[90%] rounded-2xl rounded-bl-sm bg-surface-2 px-4 py-2.5 text-sm text-ink ring-1 ring-line"
            }
          >
            {m.content}
          </div>
        ))}

        {loading && (
          <div class="mr-auto rounded-2xl rounded-bl-sm bg-surface-2 px-4 py-2.5 text-sm text-muted ring-1 ring-line">
            <span class="inline-flex gap-1">
              <span class="animate-bounce">·</span>
              <span class="animate-bounce [animation-delay:0.15s]">·</span>
              <span class="animate-bounce [animation-delay:0.3s]">·</span>
            </span>
          </div>
        )}
      </div>

      {error && <p class="mt-3 text-xs text-red-600">{error}</p>}

      {/* Suggestions (only before first message) */}
      {!hasConversation && (
        <div class="mt-4 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              class="rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-ink hover:text-ink"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        class="mt-4 flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <input
          type="text"
          value={input}
          onInput={(e) => setInput((e.target as HTMLInputElement).value)}
          placeholder="Ask a question…"
          maxLength={300}
          class="flex-1 rounded-full border border-line bg-bg px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-ink/40"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          class="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          Send
        </button>
      </form>
    </div>
  );
}
