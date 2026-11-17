import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import mascotImg from "../images/maskot_genion.png";
import {
  SPEECH_BUBBLE_MESSAGES,
  QUICK_TOPIC_CHIPS,
  INITIAL_BOT_MESSAGE,
  getBotTemplateResponse,
  QuickAction,
} from "../data/chatbotTemplates";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
  actions?: QuickAction[];
}

const getCurrentTime = () => {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
};

export const Chatbot: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [bubbleText, setBubbleText] = useState("");
  const [isBubbleTyping, setIsBubbleTyping] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      sender: "bot",
      text: INITIAL_BOT_MESSAGE.text,
      time: getCurrentTime(),
      actions: INITIAL_BOT_MESSAGE.actions,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Floating mascot speech bubble typing cycle
  useEffect(() => {
    let messageIndex = 0;
    let isCancelled = false;

    const runTypewriter = () => {
      if (isCancelled) return;
      setIsBubbleTyping(true);
      setBubbleText("");

      const typingTimer = setTimeout(() => {
        if (isCancelled) return;
        setIsBubbleTyping(false);
        const targetMessage = SPEECH_BUBBLE_MESSAGES[messageIndex];
        let charIndex = 0;

        const interval = setInterval(() => {
          if (isCancelled) {
            clearInterval(interval);
            return;
          }
          if (charIndex < targetMessage.length) {
            setBubbleText(targetMessage.slice(0, charIndex + 1));
            charIndex++;
          } else {
            clearInterval(interval);
            setTimeout(() => {
              if (isCancelled) return;
              messageIndex = (messageIndex + 1) % SPEECH_BUBBLE_MESSAGES.length;
              runTypewriter();
            }, 4500);
          }
        }, 45);
      }, 1200);

      return () => clearTimeout(typingTimer);
    };

    const startTimer = setTimeout(runTypewriter, 1000);

    return () => {
      isCancelled = true;
      clearTimeout(startTimer);
    };
  }, []);

  // Auto-scroll when messages or typing state change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isBotTyping]);

  // Focus input when sidebar drawer opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Close with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Process a user query through the template engine
  const executeQuery = (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed || isBotTyping) return;

    const userMsg: Message = {
      id: String(Date.now()),
      sender: "user",
      text: trimmed,
      time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsBotTyping(true);

    // Realistic typing effect (simulated 400ms delay)
    setTimeout(() => {
      const template = getBotTemplateResponse(trimmed);
      const botMsg: Message = {
        id: String(Date.now() + 1),
        sender: "bot",
        text: template.text,
        time: getCurrentTime(),
        actions: template.actions,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsBotTyping(false);
    }, 400);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isBotTyping) return;
    const text = inputVal;
    setInputVal("");
    executeQuery(text);
  };

  const handleActionClick = (action: QuickAction) => {
    if (action.query) {
      executeQuery(action.query);
      return;
    }
    if (action.url) {
      if (action.isExternal || action.url.startsWith("http") || action.url.startsWith("mailto:") || action.url.startsWith("tel:")) {
        window.open(action.url, "_blank", "noopener,noreferrer");
      } else {
        navigate(action.url);
      }
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "init-" + Date.now(),
        sender: "bot",
        text: INITIAL_BOT_MESSAGE.text,
        time: getCurrentTime(),
        actions: INITIAL_BOT_MESSAGE.actions,
      },
    ]);
  };

  // Inline formatting helper for bold (**text**) and markdown links ([text](url))
  const formatInline = (str: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    const regex = /(\*\*([^*]+)\*\*)|(\[([^\]]+)\]\(([^)]+)\))/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let key = 0;

    while ((match = regex.exec(str)) !== null) {
      if (match.index > lastIndex) {
        parts.push(str.substring(lastIndex, match.index));
      }

      if (match[1]) {
        // Bold
        parts.push(
          <strong key={key++} className="font-semibold text-gray-900 dark:text-white">
            {match[2]}
          </strong>
        );
      } else if (match[3]) {
        // Link
        const label = match[4];
        const url = match[5];
        const isExt = url.startsWith("http") || url.startsWith("tel:") || url.startsWith("mailto:");
        parts.push(
          <a
            key={key++}
            href={url}
            target={isExt ? "_blank" : undefined}
            rel={isExt ? "noopener noreferrer" : undefined}
            className="text-[#0891b2] dark:text-cyan-400 hover:underline font-medium inline-flex items-center gap-0.5"
          >
            {label}
            {isExt && (
              <svg className="w-3 h-3 inline ml-0.5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            )}
          </a>
        );
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < str.length) {
      parts.push(str.substring(lastIndex));
    }

    return parts.length > 0 ? parts : str;
  };

  // Structured multi-line formatter for bullet points, numbered steps, and paragraphs
  const renderFormattedText = (text: string) => {
    const lines = text.split("\n");
    const elements: React.ReactNode[] = [];
    let currentList: string[] = [];

    const flushList = (keyIdx: number) => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`ul-${keyIdx}`} className="space-y-1.5 my-2 pl-0.5">
            {currentList.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                <span className="text-[#0891b2] dark:text-cyan-400 font-bold leading-5 select-none">•</span>
                <span className="flex-1 leading-relaxed text-gray-800 dark:text-gray-200">
                  {formatInline(item)}
                </span>
              </li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    lines.forEach((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) {
        flushList(i);
        return;
      }

      if (/^[-*•]\s+/.test(trimmed)) {
        currentList.push(trimmed.replace(/^[-*•]\s+/, ""));
      } else if (/^\d+\.\s+/.test(trimmed)) {
        flushList(i);
        const match = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (match) {
          elements.push(
            <div key={`step-${i}`} className="flex items-start gap-2.5 my-1.5 text-xs sm:text-sm">
              <span className="flex-shrink-0 w-5 h-5 rounded-md bg-cyan-500/15 border border-cyan-500/30 text-[#0891b2] dark:text-cyan-400 font-mono font-bold text-[11px] flex items-center justify-center select-none">
                {match[1]}
              </span>
              <div className="flex-1 leading-relaxed text-gray-800 dark:text-gray-200">
                {formatInline(match[2])}
              </div>
            </div>
          );
        }
      } else {
        flushList(i);
        elements.push(
          <p key={`p-${i}`} className="text-xs sm:text-sm leading-relaxed mb-2 last:mb-0 text-gray-800 dark:text-gray-200">
            {formatInline(trimmed)}
          </p>
        );
      }
    });

    flushList(lines.length);
    return elements;
  };

  return (
    <>
      {/* Backdrop overlay on mobile/desktop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Floating Mascot with Greeting Bubble */}
      <div className="fixed bottom-6 right-6 z-[9997] select-none">
        {/* Greeting Speech Bubble - appears above mascot */}
        {(bubbleText || isBubbleTyping) && (
          <div
            onClick={() => setIsOpen(true)}
            className="absolute bottom-full right-0 mb-3 cursor-pointer transition-all duration-300 transform animate-bounce-subtle"
            title="Klik untuk membuka chat"
          >
            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl rounded-br-sm px-4 py-3 shadow-2xl border border-[#0891b2]/30 dark:border-[#0891b2]/50 max-w-[220px] sm:max-w-[260px] hover:border-[#0891b2]/50 transition-colors">
              {isBubbleTyping ? (
                <div className="flex items-center space-x-1.5 py-1">
                  <span className="w-2 h-2 bg-[#0891b2] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-[#0891b2] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-[#0891b2] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              ) : (
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100 leading-relaxed">
                  {bubbleText}
                </p>
              )}
            </div>
            {/* Bubble Pointer Arrow */}
            <div className="absolute bottom-0 right-8 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white dark:border-t-[#1a1a1a] transform translate-y-full" />
          </div>
        )}

        {/* Mascot Image - Clickable to open chat */}
        <div
          onClick={() => setIsOpen(true)}
          className="cursor-pointer relative flex items-end justify-center transform hover:scale-110 active:scale-95 transition-transform duration-300 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
          title="Klik untuk chat dengan Genisten!"
          role="button"
          aria-label="Buka chat dengan Genisten"
        >
          <img
            src={mascotImg}
            alt="Genisten - Asisten Virtual Genion Team"
            className="w-full h-full object-contain filter drop-shadow-2xl animate-float"
          />
        </div>
      </div>

      {/* Chat Sidebar Drawer */}
      <aside
        className={`fixed top-0 right-0 z-[9999] w-full sm:w-[400px] md:w-[420px] h-full bg-white dark:bg-[#0d0d0d] shadow-2xl border-l border-gray-200 dark:border-white/[0.08] flex flex-col transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Genisten Chat Assistant"
      >
        {/* Drawer Header */}
        <div className="bg-gradient-to-r from-gray-900 via-[#071d24] to-gray-950 dark:from-[#051318] dark:via-[#082029] dark:to-[#051318] px-5 py-3.5 flex items-center justify-between text-white border-b border-cyan-500/20 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm p-1 border border-cyan-500/40 flex items-center justify-center">
                <img src={mascotImg} alt="Genisten" className="w-full h-full object-contain" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-gray-900 rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base font-poppins text-white leading-tight">Genisten</h3>
                <span className="text-[10px] font-mono tracking-wider uppercase text-cyan-300 bg-cyan-500/20 border border-cyan-500/30 px-2 py-0.5 rounded-full font-semibold">
                  Official
                </span>
              </div>
              <p className="text-xs text-gray-300/80 flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Asisten Resmi Genion Team
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            {/* Clear Chat Button */}
            <button
              onClick={handleResetChat}
              className="w-8 h-8 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
              title="Bersihkan Percakapan"
              aria-label="Bersihkan Percakapan"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
              title="Tutup Chat"
              aria-label="Tutup Chat"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Quick Topics Chip Bar */}
        <div className="px-4 py-2.5 bg-gray-50 dark:bg-[#121212] border-b border-gray-200/80 dark:border-white/[0.06] overflow-x-auto no-scrollbar flex items-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#0891b2] dark:text-cyan-400 font-bold whitespace-nowrap pl-0.5">
            Topik:
          </span>
          {QUICK_TOPIC_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => executeQuery(chip.query)}
              disabled={isBotTyping}
              className="whitespace-nowrap px-2.5 py-1 rounded-full text-xs font-medium bg-white dark:bg-[#1a1a1a] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:border-[#0891b2] dark:hover:border-cyan-500 hover:text-[#0891b2] dark:hover:text-cyan-400 transition-all duration-150 flex-shrink-0 disabled:opacity-50"
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Messages Scroll Area */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto chat-scrollbar space-y-4 bg-gray-50/60 dark:bg-[#0a0a0a]">
          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <div key={msg.id} className="animate-fade-in-up">
                <div className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : ""}`}>
                  {isUser ? (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-200 dark:bg-[#222] border border-gray-300 dark:border-white/10 flex items-center justify-center flex-shrink-0 text-gray-600 dark:text-gray-300">
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cyan-500/10 border border-[#0891b2]/40 p-0.5 flex items-center justify-center flex-shrink-0">
                      <img src={mascotImg} alt="Bot" className="w-full h-full object-contain" />
                    </div>
                  )}

                  <div className={`max-w-[85%] ${isUser ? "items-end" : "items-start"}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 shadow-sm ${
                        isUser
                          ? "bg-[#0891b2] text-white rounded-tr-sm"
                          : "bg-white dark:bg-[#141414] text-gray-800 dark:text-gray-100 rounded-tl-sm border border-gray-200/80 dark:border-white/[0.08]"
                      }`}
                    >
                      {renderFormattedText(msg.text)}

                      {/* Bot Message Action Buttons */}
                      {!isUser && msg.actions && msg.actions.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-gray-100 dark:border-white/[0.08] flex flex-wrap gap-1.5">
                          {msg.actions.map((act, actIdx) => (
                            <button
                              key={actIdx}
                              onClick={() => handleActionClick(act)}
                              disabled={isBotTyping}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-[#0891b2]/40 bg-cyan-500/5 hover:bg-[#0891b2] hover:text-white dark:hover:text-black text-[#0891b2] dark:text-cyan-400 transition-colors duration-150 active:scale-95 disabled:opacity-50"
                            >
                              <span>{act.label}</span>
                              {act.isExternal ? (
                                <svg className="w-3 h-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              ) : act.url ? (
                                <svg className="w-3 h-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                              ) : null}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <time
                      className={`text-[10px] text-gray-400 dark:text-gray-500 mt-1 block px-1 ${
                        isUser ? "text-right" : "text-left"
                      }`}
                    >
                      {msg.time}
                    </time>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Bot Typing Indicator */}
          {isBotTyping && (
            <div className="flex items-start gap-2.5 animate-fade-in-up">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cyan-500/10 border border-[#0891b2]/40 p-0.5 flex items-center justify-center flex-shrink-0">
                <img src={mascotImg} alt="Bot" className="w-full h-full object-contain" />
              </div>
              <div className="bg-white dark:bg-[#141414] border border-gray-200/80 dark:border-white/[0.08] rounded-2xl rounded-tl-sm px-4 py-2.5 shadow-sm">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 bg-[#0891b2] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-[#0891b2] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-[#0891b2] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  <span className="text-xs text-gray-400 dark:text-gray-500 ml-1.5">Menjawab...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form & Footer */}
        <div className="p-3.5 sm:p-4 bg-white dark:bg-[#111111] border-t border-gray-200 dark:border-white/[0.08]">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Tanya layanan, biaya, portofolio, tim..."
              className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-[#1c1c1c] text-gray-900 dark:text-white rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0891b2]/40 focus:border-[#0891b2] border border-gray-200 dark:border-white/10 placeholder-gray-400 dark:placeholder-gray-500 transition-all"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isBotTyping}
              className="w-10 h-10 bg-gradient-to-tr from-[#0891b2] to-[#06b6d4] hover:from-[#0e7490] hover:to-[#0891b2] text-white rounded-full flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 shadow-md shadow-cyan-600/20 active:scale-95"
              aria-label="Kirim Pesan"
            >
              <svg className="w-4 h-4 transform rotate-90" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
          <div className="mt-2 text-center">
            <p className="text-[10px] text-gray-400 dark:text-gray-500 flex items-center justify-center gap-1.5">
              <svg className="w-3 h-3 text-[#0891b2] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Jawaban resmi berbasis template • Respon instan tanpa AI</span>
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
