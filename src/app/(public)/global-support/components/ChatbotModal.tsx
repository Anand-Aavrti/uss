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

export default function ChatbotModal({
  isOpen,
  onClose,
  currentLanguage,
}: ChatbotModalProps) {
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
      closeButton: "Close",
      initialMessage:
        "Hello! I'm your USS support assistant. How can I help you today?",
      quickActions: [
        "Getting Started Guide",
        "API Documentation",
        "Billing Questions",
        "Technical Support",
      ],
    },
    hi: {
      title: "USS सहायता सहायक",
      placeholder: "अपना संदेश टाइप करें...",
      sendButton: "भेजें",
      escalateButton: "मानव एजेंट से कनेक्ट करें",
      closeButton: "बंद करें",
      initialMessage:
        "नमस्ते! मैं आपका USS सहायता सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
      quickActions: [
        "शुरुआती गाइड",
        "API दस्तावेज़ीकरण",
        "बिलिंग प्रश्न",
        "तकनीकी सहायता",
      ],
    },
    ar: {
      title: "مساعد دعم USS",
      placeholder: "اكتب رسالتك...",
      sendButton: "إرسال",
      escalateButton: "الاتصال بوكيل بشري",
      closeButton: "إغلاق",
      initialMessage:
        "مرحبًا! أنا مساعد دعم USS الخاص بك. كيف يمكنني مساعدتك اليوم؟",
      quickActions: [
        "دليل البدء",
        "وثائق API",
        "أسئلة الفواتير",
        "الدعم الفني",
      ],
    },
  };

  const currentContent = content[currentLanguage as keyof typeof content];
  const isRTL = currentLanguage === "ar";

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: currentContent.initialMessage,
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
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
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
      setIsTyping(true);

      setTimeout(() => {
        const botResponse: Message = {
          id: messages.length + 2,
          text: "Thank you for your message. I'm processing your request and will respond shortly.",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
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
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages([...messages, newMessage]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className={`bg-card rounded-lg shadow-xl w-full max-w-2xl h-[600px] flex flex-col ${isRTL ? 'rtl' : 'ltr'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              <Icon name="ChatBubbleLeftRightIcon" size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{currentContent.title}</h3>
              <p className="text-xs text-success">Online</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors duration-300"
          >
            <Icon name="XMarkIcon" size={20} className="text-muted-foreground" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: '0.4s' }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="p-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2">Quick Actions:</p>
            <div className="grid grid-cols-2 gap-2">
              {currentContent.quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action)}
                  className="px-3 py-2 text-sm bg-muted hover:bg-muted/80 rounded-md transition-colors duration-300 text-foreground"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="p-4 border-t border-border">
          <div className="flex space-x-2 mb-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={currentContent.placeholder}
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground"
            />
            <button
              onClick={handleSendMessage}
              className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors duration-300 font-medium"
            >
              {currentContent.sendButton}
            </button>
          </div>
          <button
            className="w-full py-2 text-sm text-accent hover:text-accent/80 transition-colors duration-300 font-medium"
            // onClick={handleSendMessage}
          >
            {currentContent.escalateButton}
          </button>
        </div>
      </div>
    </div>
  );
}
