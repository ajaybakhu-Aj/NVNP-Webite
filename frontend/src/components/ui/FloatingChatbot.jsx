import React, { useState, useEffect, useRef } from "react";
import Icon from "../../utils/Icon";

export default function FloatingChatbot() {
  const [launcherOpen, setLauncherOpen] = useState(false); // controls the 3-icon fan
  const [isOpen, setIsOpen] = useState(false);             // controls the chatbot panel
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

  const WHATSAPP_NUMBER = "9779745978217"; // E.164 without +
  const MESSENGER_URL   = "https://m.me/105891348155116";

  const botResponses = [
    {
      keys: ["hello", "hi", "hey", "greetings"],
      response: "Live connection established. Please state your query. We can assist with cameras, installation, warranty, support hotline, or dealer details."
    },
    {
      keys: ["camera", "cctv", "product", "optics", "resolution"],
      response: "We deploy premium 4K dome, bullet, thermal, and PTZ cameras across Nepal. Visit our CCTV Cameras link under the 'RESOURCES' dropdown to explore details."
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

  const openChatbot = () => {
    setIsOpen(true);
    setLauncherOpen(false);
  };

  const handleMainBtnClick = () => {
    if (isOpen) {
      // If chatbot is open, close it
      setIsOpen(false);
    } else {
      // Toggle the launcher fan
      setLauncherOpen((prev) => !prev);
    }
  };

  return (
    <div className="floating-chatbot-container">
      {/* ── Chatbot panel ── */}
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

      {/* ── Launcher fan (3 sub-icons) ── */}
      <div className={`chat-launcher-fan ${launcherOpen ? "open" : ""}`}>
        {/* Chatbot button */}
        <button
          className="launcher-action-btn chatbot-btn"
          onClick={openChatbot}
          title="NightVision AI Chat"
          aria-label="Open chatbot"
        >
          <Icon name="smart_toy" size={22} />
          <span className="launcher-label">Support</span>
        </button>

        {/* WhatsApp button */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="launcher-action-btn whatsapp-btn"
          title="Chat on WhatsApp"
          aria-label="Open WhatsApp"
          onClick={() => setLauncherOpen(false)}
        >
          {/* WhatsApp SVG icon */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span className="launcher-label">WhatsApp</span>
        </a>

        {/* Messenger button */}
        <a
          href={MESSENGER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="launcher-action-btn messenger-btn"
          title="Chat on Messenger"
          aria-label="Open Messenger"
          onClick={() => setLauncherOpen(false)}
        >
          {/* Messenger SVG icon */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.652V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8.1l3.131 3.259L19.752 8.1l-6.561 6.863z"/>
          </svg>
          <span className="launcher-label">Messenger</span>
        </a>
      </div>

      {/* ── Main floating bubble ── */}
      <button
        onClick={handleMainBtnClick}
        className={`floating-chat-bubble ${launcherOpen || isOpen ? "active" : ""}`}
        aria-label="Open contact options"
      >
        <span className="chat-bubble-badge" />
        <Icon name={launcherOpen || isOpen ? "close" : "chat"} size={26} />
      </button>
    </div>
  );
}
