"use client";

import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/AppIcon";

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: string;
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
}

export default function ChatbotModal({ isOpen, onClose, currentLanguage }: ChatbotModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const content = {
    en: {
      title: "USS Support Assistant",
      placeholder: "Type your message...",
      sendButton: "Send",
      escalateButton: "Connect to Human Agent",
      initialMessage: "Hello! I'm your USS support assistant. How can I help you today?",
      quickActions: ["Getting Started Guide", "API Documentation", "Billing Questions", "Technical Support"],
    },
    hi: {
      title: "USS सहायता सहायक",
      placeholder: "अपना संदेश टाइप करें...",
      sendButton: "भेजें",
      escalateButton: "मानव एजेंट से कनेक्ट करें",
      initialMessage: "नमस्ते! मैं आपका USS सहायता सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
      quickActions: ["शुरुआती गाइड", "API दस्तावेज़ीकरण", "बिलिंग प्रश्न", "तकनीकी सहायता"],
    },
    ar: {
      title: "مساعد دعم USS",
      placeholder: "اكتب رسالتك...",
      sendButton: "إرسال",
      escalateButton: "الاتصال بوكيل بشري",
      initialMessage: "مرحبًا! أنا مساعد دعم USS الخاص بك. كيف يمكنني مساعدتك اليوم؟",
      quickActions: ["دليل البدء", "وثائق API", "أسئلة الفواتير", "الدعم الفني"],
    },
  };

  const currentContent = content[currentLanguage as keyof typeof content];
  const isRTL = currentLanguage === "ar";

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 1,
        text: currentContent.initialMessage,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }]);
    }
  }, [isOpen, currentContent.initialMessage, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputValue,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
      setIsTyping(true);

      setTimeout(() => {
        const botResponse: Message = {
          id: messages.length + 2,
          text: "Thank you for your message. I'm processing your request and will respond shortly.",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleQuickAction = (action: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text: action,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([...messages, newMessage]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div
        className={`backdrop-blur-xl bg-[#0B1220] border border-white/10 rounded-2xl shadow-2xl shadow-[#0EA5E9]/10 w-full max-w-xl h-[600px] flex flex-col overflow-hidden ${isRTL ? "rtl" : "ltr"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#1B365D]/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#0EA5E9]/30 to-[#1B365D]/50 rounded-full flex items-center justify-center border border-[#0EA5E9]/30">
              <Icon name="ChatBubbleLeftRightIcon" size={18} className="text-[#0EA5E9]" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">{currentContent.title}</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                <p className="text-xs text-green-400">Online</p>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#0EA5E9]/30 transition-all duration-200 text-white/50 hover:text-white"
          >
            <Icon name="XMarkIcon" size={16} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] text-white rounded-br-sm"
                    : "bg-[#1B365D]/30 border border-white/10 text-white/85 rounded-bl-sm"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className="text-xs opacity-50 mt-1.5">{message.timestamp}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[#1B365D]/30 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1.5 items-center">
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-[#0EA5E9]/60 rounded-full animate-bounce"
                      style={{ animationDelay: `${delay}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick actions */}
        {messages.length === 1 && (
          <div className="px-5 pb-3 border-t border-white/10 pt-3">
            <p className="text-xs text-white/40 mb-2">Quick Actions:</p>
            <div className="grid grid-cols-2 gap-2">
              {currentContent.quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action)}
                  className="px-3 py-2 text-xs font-medium bg-[#1B365D]/20 border border-white/10 hover:bg-[#0EA5E9]/10 hover:border-[#0EA5E9]/30 rounded-xl transition-all duration-200 text-white/70 hover:text-white"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="px-5 pb-5 pt-3 border-t border-white/10 space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder={currentContent.placeholder}
              className="flex-1 px-4 py-2.5 bg-[#1B365D]/20 border border-white/10 rounded-xl text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-transparent transition-all duration-300"
            />
            <button
              onClick={handleSendMessage}
              className="px-5 py-2.5 bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] text-white rounded-xl font-semibold text-sm shadow-lg shadow-[#0EA5E9]/20 hover:shadow-[#0EA5E9]/35 transition-all duration-300 flex-shrink-0"
            >
              {currentContent.sendButton}
            </button>
          </div>
          <button className="w-full py-2 text-xs text-[#0EA5E9]/70 hover:text-[#0EA5E9] transition-colors duration-200 font-medium">
            {currentContent.escalateButton}
          </button>
        </div>
      </div>
    </div>
  );
}
