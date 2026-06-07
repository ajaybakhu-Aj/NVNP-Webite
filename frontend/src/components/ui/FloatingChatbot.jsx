import React, { useState, useEffect, useRef } from "react";
import Icon from "../../utils/Icon";

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "System active. Welcome to the NightVision Operations Center. How can we secure your perimeter today? 🔒",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const viewportRef = useRef(null);

  // Load initial visibility setting and listen for updates
  useEffect(() => {
    const savedSettings = localStorage.getItem("settings_telemetry");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        if (parsed.chatbotActive === false) {
          setIsVisible(false);
        }
      } catch (e) {
        console.error("Error reading chatbot settings:", e);
      }
    }

    const handleToggle = (e) => {
      if (e.detail && typeof e.detail.active === "boolean") {
        setIsVisible(e.detail.active);
      }
    };

    window.addEventListener("cyber-chatbot-toggle", handleToggle);
    return () => {
      window.removeEventListener("cyber-chatbot-toggle", handleToggle);
    };
  }, []);

  // Auto Scroll to Bottom on message update
  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  if (!isVisible) return null;

  const botResponses = [
    {
      keys: ["hello", "hi", "hey", "greetings"],
      response: "Live connection established. Please state your query. We can assist with cameras, installation, warranty, support hotline, or dealer details."
    },
    {
      keys: ["camera", "cctv", "product", "optics", "resolution"],
      response: "We deploy premium 4K dome, bullet, thermal, and PTZ cameras across Nepal. Visit our CCTV Cameras link under the 'BLOG & EVENTS' dropdown to explore details."
    },
    {
      keys: ["installation", "install", "setup", "mounting"],
      response: "NightVision provides elite professional installation services across Nepal. Contact our team to schedule a detailed site analysis for your property."
    },
    {
      keys: ["warranty", "claim", "warranty coverage"],
      response: "All genuine NightVision surveillance hardware is covered by a standard 2-year warranty. You can review instructions on our Support Center page."
    },
    {
      keys: ["dealer", "dealership", "partner", "platinum"],
      response: "We have an extensive network of vetting platinum partners across Bagmati, Koshi, Madhesh, and other provinces. Find a depot on our Dealerships page."
    },
    {
      keys: ["contact", "phone", "hotline", "call", "helpline", "number"],
      response: "Our 24/7 secure support hotline is +977-9745978217. Response time is typically under 2 minutes. Feel free to call us directly."
    },
    {
      keys: ["location", "address", "hq", "bhaktapur", "radhe radhe"],
      response: "Our national security command headquarters is located in Radhe Radhe, Bhaktapur, Nepal. You can visit us or email info@nightvision.com.np."
    }
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMsg = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentInput = inputValue.toLowerCase();
    setInputValue("");
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      let matchedResponse = "Query logged. A command center security specialist has been alerted. For urgent responses, please call our direct hotline: +977-9745978217.";

      for (const group of botResponses) {
        if (group.keys.some((key) => currentInput.includes(key))) {
          matchedResponse = group.response;
          break;
        }
      }

      const botMsg = {
        id: Date.now() + 1,
        text: matchedResponse,
        sender: "bot",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <div className="floating-chatbot-container">
      {/* Mini Chat Widget Window */}
      {isOpen && (
        <div className="mini-chat-panel">
          {/* Header */}
          <div className="chat-panel-header">
            <div className="header-status">
              <span className="pulse-dot" />
              <span className="header-title">NV//NightVision Chat</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="chat-panel-close-btn"
              aria-label="Close Chat"
            >
              ✕
            </button>
          </div>

          {/* Viewport */}
          <div ref={viewportRef} className="chat-panel-viewport">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`panel-bubble-row ${msg.sender === "user" ? "user" : "bot"}`}
              >
                {msg.sender === "bot" && (
                  <div className="bot-avatar">
                    <Icon name="smart_toy" size={16} />
                  </div>
                )}
                <div className="panel-bubble">
                  {msg.text}
                  <span className="panel-timestamp">
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="panel-bubble-row bot">
                <div className="bot-avatar">
                  <Icon name="smart_toy" size={16} />
                </div>
                <div className="panel-typing-indicator">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="chat-panel-input-bar">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask anything..."
              className="chat-panel-input"
            />
            <button
              onClick={handleSendMessage}
              className="chat-panel-send-btn"
            >
              <Icon name="send" size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Main Floating Bubble Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`floating-chat-bubble ${isOpen ? "active" : ""}`}
        aria-label="Toggle chat"
      >
        <span className="chat-bubble-badge" />
        <Icon name={isOpen ? "close" : "chat"} size={26} />
      </button>
    </div>
  );
}
