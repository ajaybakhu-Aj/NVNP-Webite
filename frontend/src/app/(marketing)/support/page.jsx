import React, { useState, useRef, useEffect } from 'react';
import { Phone, Mail, Clock, Send, HelpCircle, Settings, Wrench, CreditCard, Check } from 'lucide-react';
import { useSiteContents } from '../../../utils/cmsDb';
import PageHeroBanner from "../../../components/ui/PageHeroBanner";


const NightVisionSupport = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Welcome to NightVision Support! 👋 How can we assist you today?', sender: 'expert', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeCategory, setActiveCategory] = useState('general');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const isMounted = useRef(false);

  const siteContents = useSiteContents();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isMounted.current) {
      scrollToBottom();
    } else {
      isMounted.current = true;
    }
  }, [messages]);

  const categories = [
    { id: 'general', name: 'General Questions', icon: <HelpCircle size={18} /> },
    { id: 'technical', name: 'Technical Support', icon: <Settings size={18} /> },
    { id: 'installation', name: 'Installation', icon: <Wrench size={18} /> },
    { id: 'billing', name: 'Billing & Orders', icon: <CreditCard size={18} /> },
    { id: 'warranty', name: 'Warranty Claims', icon: <Check size={18} /> },
  ];

  const quickReplies = {
    general: [
      'What products do you offer?',
      'Do you provide installation service?',
      'What is your warranty coverage?',
    ],
    technical: [
      'My camera is not streaming',
      'I cannot connect to the app',
      'Night vision not working properly',
    ],
    installation: [
      'How do I install the camera?',
      'Do I need professional help?',
      'What tools are required?',
    ],
    billing: [
      'How can I track my order?',
      'What are your payment methods?',
      'Do you offer discounts?',
    ],
    warranty: [
      'How long is the warranty?',
      'What does warranty cover?',
      'How to claim warranty?',
    ],
  };

  const expertResponses = {
    general: [
      'We offer a comprehensive range of CCTV cameras and surveillance solutions for residential and commercial use. Our systems include 4K resolution, thermal imaging, and advanced night vision capabilities.',
      'Yes, we provide professional installation service across Nepal. You can schedule an installation by contacting our team at +977-9745978217 or visit our headquarters in Radhe Radhe, Bhaktapur.',
      'All our products come with a standard 2-year warranty covering manufacturing defects. Extended warranty options are available.',
    ],
    technical: [
      'Please ensure your camera is connected to a stable internet connection. Try restarting both the camera and your WiFi router. If the issue persists, our technical team can assist you remotely.',
      'Make sure you\'re using the latest version of our app. Clear the app cache and try logging in again. You may also need to check your firewall settings.',
      'This could be due to low lighting conditions or camera positioning. Ensure the camera has a clear line of sight and is properly focused. Contact us for detailed troubleshooting steps.',
    ],
    installation: [
      'Installation involves mounting the camera, running cables, and configuring the system. You\'ll need a power drill, ladder, and basic tools. We recommend professional installation for optimal performance.',
      'While DIY installation is possible, we highly recommend professional installation to ensure proper coverage and system security. Our team has years of experience.',
      'Basic tools include a drill, measuring tape, screwdriver set, and a ladder. We provide a detailed installation manual with each purchase.',
    ],
    billing: [
      'You can track your order in real-time through your account dashboard. You\'ll receive email updates at each stage of delivery.',
      'We accept credit cards, debit cards, bank transfers, and cash on delivery (in selected areas). eSewa and Khalti payment options are also available.',
      'Yes, we offer seasonal discounts and bulk purchase discounts. Subscribe to our newsletter for exclusive offers!',
    ],
    warranty: [
      'Our standard warranty period is 2 years from the date of purchase. Extended warranty can be purchased for up to 5 years.',
      'The warranty covers manufacturing defects, hardware failures, and component replacement. It does not cover physical damage or misuse.',
      'To claim warranty, contact us with your product serial number and proof of purchase. Our team will guide you through the process.',
    ],
  };

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const responses = expertResponses[activeCategory];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const expertMessage = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: 'expert',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, expertMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleQuickReply = (reply) => {
    handleSendMessage(reply);
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    setIsSidebarOpen(false);
  };

  return (
    <div className="support-chat-page">
      {/* Hero Section - Unified PageHeroBanner */}
      <PageHeroBanner
        title={siteContents.supportHeroTitle || "24/7 EXPERT SUPPORT"}
        subtitle={siteContents.supportHeroDesc || "Our surveillance specialists are ready to help you. Connect with an expert instantly."}
      />


      {/* Mobile Menu Button */}
      <div className="support-mobile-header">
        <span className="mobile-active-topic">
          {categories.find(c => c.id === activeCategory)?.name}
        </span>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="btn-toggle-sidebar"
        >
          {isSidebarOpen ? '✕ Close' : '☰ Topics'}
        </button>
      </div>

      {/* Main Content Layout */}
      <div className="support-main-layout">
        
        {/* Sidebar - Categories */}
        <aside className={`support-sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <h3 className="sidebar-section-title">
            Support Topics
          </h3>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`topic-btn ${activeCategory === cat.id ? 'active' : ''}`}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}

          {/* Quick Contact */}
          <div className="quick-contact-wrapper">
            <h3 className="sidebar-section-title">
              Direct Contact
            </h3>
            
            <div className="contact-item-list">
              <div className="contact-item">
                <Phone size={16} />
                <div>
                  <div className="contact-info-label">24/7 HELPLINE</div>
                  <div className="contact-info-val">
                    <a href={`tel:${siteContents.supportHelpline || "+977-9745978217"}`} style={{ color: "inherit", textDecoration: "none" }}>
                      {siteContents.supportHelpline || "+977-9745978217"}
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="contact-item">
                <Mail size={16} />
                <div>
                  <div className="contact-info-label">EMAIL</div>
                  <div className="contact-info-val">
                    <a href={`mailto:${siteContents.supportEmail || "info@nightvision.com.np"}`} style={{ color: "inherit", textDecoration: "none" }}>
                      {siteContents.supportEmail || "info@nightvision.com.np"}
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <Clock size={16} />
                <div>
                  <div className="contact-info-label">RESPONSE TIME</div>
                  <div className="contact-info-val">{'< 2 minutes'}</div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Chat Area */}
        <main className="chat-container">
          
          {/* Messages Container */}
          <div className="messages-viewport">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`message-bubble-row ${msg.sender === 'user' ? 'user-side' : 'expert-side'}`}
              >
                <div className="message-bubble">
                  {msg.text}
                  <span className="message-timestamp">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="typing-indicator">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="quick-replies-section">
              <p className="quick-replies-label">
                Quick Questions
              </p>
              <div className="quick-replies-list">
                {quickReplies[activeCategory].map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickReply(reply)}
                    className="quick-reply-btn"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="chat-input-wrapper">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              placeholder="Type your question here..."
              className="chat-input"
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              className="btn-chat-send"
            >
              <Send size={18} />
              <span className="send-text">Send</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NightVisionSupport;