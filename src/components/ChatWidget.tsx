import { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User as UserIcon,
  Sparkles,
} from 'lucide-react';
import {
  chatSuggestions,
  chatReplies,
  defaultChatReply,
  type ChatMessage,
} from '@/data/supportData';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const welcomeMessage: ChatMessage = {
    id: 'welcome',
    sender: 'assistant',
    text: "Hi! I'm the Xfinity Assistant. I can help with outages, billing, technical support, and more. What can I do for you today?",
    timestamp: new Date(),
    quickReplies: chatSuggestions,
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const findReply = (text: string): { reply: string; followUps?: string[] } => {
    const lowerText = text.toLowerCase();
    for (const item of chatReplies) {
      if (item.keywords.some((kw) => lowerText.includes(kw))) {
        return { reply: item.reply, followUps: item.followUps };
      }
    }
    return { reply: defaultChatReply, followUps: ['Talk to an agent', 'Search help articles'] };
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const { reply, followUps } = findReply(text);
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date(),
        quickReplies: followUps,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
      if (!isOpen) setHasUnread(true);
    }, 1200 + Math.random() * 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(inputValue);
  };

  const handleQuickReply = (reply: string) => {
    handleSend(reply);
  };

  return (
    <>
      {/* Chat bubble button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-red shadow-lg shadow-brand-red/30 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-brand-red/40 active:scale-95"
          aria-label="Open Xfinity Assistant"
        >
          <MessageCircle className="h-6 w-6 text-white" />
          {hasUnread && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-yellow text-xs font-bold text-xfinity-black">
              1
            </span>
          )}
          <span className="absolute inset-0 animate-ping rounded-full bg-brand-red/30" style={{ animationDuration: '2s' }} />
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[600px] max-h-[calc(100vh-2rem)] w-[400px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-xfinity-gray-600 bg-xfinity-gray-900 shadow-2xl shadow-black/50 animate-slide-in-right">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-xfinity-gray-700 bg-gradient-to-r from-xfinity-gray-850 to-xfinity-gray-900 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-red to-brand-red-dark">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-xfinity-gray-850 bg-accent-green" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Xfinity Assistant</p>
                <p className="text-xs text-accent-green-light">Online · Ready to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-xfinity-gray-400 transition-colors hover:bg-xfinity-gray-800 hover:text-white"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="flex flex-col gap-4">
              {messages.map((message) => (
                <div key={message.id}>
                  {/* Message bubble */}
                  <div
                    className={`flex gap-2.5 ${
                      message.sender === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        message.sender === 'assistant'
                          ? 'bg-gradient-to-br from-brand-red to-brand-red-dark'
                          : 'bg-xfinity-gray-700'
                      }`}
                    >
                      {message.sender === 'assistant' ? (
                        <Bot className="h-4 w-4 text-white" />
                      ) : (
                        <UserIcon className="h-4 w-4 text-xfinity-gray-300" />
                      )}
                    </div>

                    {/* Bubble */}
                    <div
                      className={`max-w-[280px] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        message.sender === 'assistant'
                          ? 'rounded-tl-sm bg-xfinity-gray-800 text-xfinity-gray-200'
                          : 'rounded-tr-sm bg-brand-red text-white'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>

                  {/* Quick replies */}
                  {message.quickReplies && message.quickReplies.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2 pl-[42px]">
                      {message.quickReplies.map((reply) => (
                        <button
                          key={reply}
                          onClick={() => handleQuickReply(reply)}
                          className="rounded-full border border-xfinity-gray-600 bg-xfinity-gray-850 px-3 py-1.5 text-xs font-medium text-xfinity-gray-300 transition-all hover:border-brand-red hover:text-brand-red-light active:scale-95"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-red to-brand-red-dark">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-xfinity-gray-800 px-4 py-3">
                    <span className="h-2 w-2 animate-typing rounded-full bg-xfinity-gray-400" style={{ animationDelay: '0ms' }} />
                    <span className="h-2 w-2 animate-typing rounded-full bg-xfinity-gray-400" style={{ animationDelay: '200ms' }} />
                    <span className="h-2 w-2 animate-typing rounded-full bg-xfinity-gray-400" style={{ animationDelay: '400ms' }} />
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-xfinity-gray-700 bg-xfinity-gray-850 p-3">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-full border border-xfinity-gray-600 bg-xfinity-gray-900 px-4 py-2.5 text-sm text-white placeholder-xfinity-gray-500 focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-red text-white transition-all hover:bg-brand-red-hover active:scale-90 disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <div className="mt-2 flex items-center justify-center gap-1 text-xs text-xfinity-gray-600">
              <Sparkles className="h-3 w-3" />
              Powered by Xfinity Assistant · Demo mode
            </div>
          </div>
        </div>
      )}
    </>
  );
}
