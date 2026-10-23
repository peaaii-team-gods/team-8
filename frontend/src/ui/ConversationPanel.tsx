import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { useStore } from "../state/store";

export default function ConversationPanel() {
  const messages = useStore((s) => s.messages);
  const scroller = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length]);
  return (
    <aside className="glass p-4 text-sm w-[min(380px,92vw)] max-h-[46vh] flex flex-col" data-testid="conversation-panel">
      <div className="flex items-center gap-2 font-semibold mb-1"><MessageSquare size={14} className="text-fuchsia-300" /> Agent talk</div>
      <p className="text-[10px] opacity-60 mb-2">The same reply rides the tether as a packet. Link two agents to watch one hand work to the next.</p>
      {messages.length === 0 ? (
        <p className="text-xs opacity-70">No replies yet. Run the pipeline and the exchange shows up here, line by line.</p>
      ) : (
        <ol ref={scroller} className="text-xs space-y-2 overflow-auto pr-1">
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.li
                key={m.id}
                data-testid="agent-message"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-2.5"
              >
                <div className="opacity-70 text-[10px] mb-1 tracking-wide">{m.fromTitle} <span className="text-fuchsia-300">→</span> {m.toTitle}</div>
                <div className="break-words whitespace-pre-wrap leading-relaxed">{m.text}</div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ol>
      )}
    </aside>
  );
}
