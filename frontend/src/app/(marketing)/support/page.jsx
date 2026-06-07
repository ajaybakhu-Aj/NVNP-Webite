import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, Clock, Send } from 'lucide-react';

const NightVisionSupport = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Welcome to NightVision Support! 👋 How can we assist you today?', sender: 'expert', timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeCategory, setActiveCategory] = useState('general');
  const [showChat, setShowChat] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const messagesEndRef = useRef(null);
  const isMounted = useRef(false);

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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = [
    { id: 'general', name: 'General Questions', icon: '?' },
    { id: 'technical', name: 'Technical Support', icon: '⚙️' },
    { id: 'installation', name: 'Installation', icon: '🔧' },
    { id: 'billing', name: 'Billing & Orders', icon: '💳' },
    { id: 'warranty', name: 'Warranty Claims', icon: '✓' },
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
    if (windowWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: '#ffffff', fontFamily: 'Inter, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <section style={{
        backgroundColor: '#8bc34a',
        color: '#000000',
        padding: isMobile ? '40px 20px' : isTablet ? '50px 30px' : '60px 40px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ 
            fontSize: isMobile ? '32px' : isTablet ? '40px' : '48px', 
            fontWeight: 'bold', 
            margin: '0 0 20px 0',
            lineHeight: '1.2',
          }}>
            24/7 EXPERT SUPPORT
          </h1>
          <p style={{ 
            fontSize: isMobile ? '14px' : isTablet ? '16px' : '18px', 
            margin: 0, 
            opacity: 0.9,
            lineHeight: '1.5',
          }}>
            Our surveillance specialists are ready to help you. Connect with an expert instantly.
          </p>
        </div>
      </section>

      {/* Mobile Menu Button */}
      {isMobile && (
        <div style={{
          padding: '15px 20px',
          borderBottom: '1px solid #333333',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#1a1a1a',
        }}>
          <span style={{ fontSize: '12px', color: '#999999', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {categories.find(c => c.id === activeCategory)?.name}
          </span>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{
              backgroundColor: '#8bc34a',
              border: 'none',
              color: '#000000',
              padding: '8px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            {isSidebarOpen ? '✕ Close' : '☰ Topics'}
          </button>
        </div>
      )}

      {/* Main Content */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : isTablet ? '250px 1fr' : '300px 1fr', 
        flex: 1,
        maxWidth: '1400px',
        width: '100%',
        margin: '0 auto',
        gap: 0,
      }}>
        
        {/* Sidebar - Categories */}
        <aside style={{
          backgroundColor: '#1a1a1a',
          borderRight: isMobile && !isSidebarOpen ? 'none' : '2px solid #333333',
          borderBottom: isMobile && isSidebarOpen ? '2px solid #333333' : 'none',
          padding: isMobile && !isSidebarOpen ? '0' : '30px 20px',
          display: isMobile && !isSidebarOpen ? 'none' : 'flex',
          flexDirection: 'column',
          gap: '10px',
          height: isMobile ? 'auto' : 'auto',
          order: isMobile && isSidebarOpen ? -1 : 0,
          gridColumn: isMobile ? '1 / -1' : 'auto',
          overflowY: isMobile ? 'auto' : 'visible',
          maxHeight: isMobile ? '300px' : 'auto',
        }}>
          <h3 style={{ color: '#8bc34a', fontSize: '14px', letterSpacing: '1px', margin: '0 0 20px 0', textTransform: 'uppercase' }}>
            Support Topics
          </h3>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              style={{
                backgroundColor: activeCategory === cat.id ? '#8bc34a' : 'transparent',
                color: activeCategory === cat.id ? '#000000' : '#ffffff',
                border: activeCategory === cat.id ? 'none' : '1px solid #333333',
                padding: '12px 16px',
                textAlign: 'left',
                cursor: 'pointer',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: activeCategory === cat.id ? 'bold' : '500',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}

          {/* Quick Contact */}
          <div style={{ marginTop: '40px', borderTop: '1px solid #333333', paddingTop: '20px' }}>
            <h3 style={{ color: '#8bc34a', fontSize: '12px', letterSpacing: '1px', margin: '0 0 15px 0', textTransform: 'uppercase' }}>
              Direct Contact
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '12px' }}>
                <Phone size={16} style={{ marginTop: '4px', color: '#8bc34a', flexShrink: 0 }} />
                <div>
                  <div style={{ color: '#999999', fontSize: '10px' }}>24/7 HELPLINE</div>
                  <div style={{ color: '#8bc34a', fontWeight: 'bold' }}>+977-9745978217</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '12px' }}>
                <Mail size={16} style={{ marginTop: '4px', color: '#8bc34a', flexShrink: 0 }} />
                <div>
                  <div style={{ color: '#999999', fontSize: '10px' }}>EMAIL</div>
                  <div style={{ color: '#8bc34a', fontWeight: 'bold' }}>info@nightvision.com.np</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '12px' }}>
                <Clock size={16} style={{ marginTop: '4px', color: '#8bc34a', flexShrink: 0 }} />
                <div>
                  <div style={{ color: '#999999', fontSize: '10px' }}>RESPONSE TIME</div>
                  <div style={{ color: '#8bc34a', fontWeight: 'bold' }}>{'< 2 minutes'}</div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Chat Area */}
        <main style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          backgroundColor: '#0f0f0f',
          minHeight: isMobile ? 'calc(100vh - 280px)' : 'auto',
          gridColumn: isMobile ? '1 / -1' : 'auto',
        }}>
          
          {/* Messages Container */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: isMobile ? '20px 16px' : isTablet ? '25px 30px' : '30px 40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            {messages.map(msg => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  animation: `fadeIn 0.3s ease-in`,
                }}
              >
                <div style={{
                  maxWidth: isMobile ? '85%' : '60%',
                  backgroundColor: msg.sender === 'user' ? '#8bc34a' : '#1a1a1a',
                  color: msg.sender === 'user' ? '#000000' : '#ffffff',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  borderLeft: msg.sender === 'expert' ? '3px solid #8bc34a' : 'none',
                  fontSize: isMobile ? '13px' : '14px',
                  lineHeight: '1.5',
                  wordBreak: 'break-word',
                }}>
                  {msg.text}
                  <div style={{
                    fontSize: '11px',
                    marginTop: '6px',
                    opacity: 0.7,
                  }}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#8bc34a',
                  borderRadius: '50%',
                  animation: 'bounce 1.4s infinite',
                }}></div>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#8bc34a',
                  borderRadius: '50%',
                  animation: 'bounce 1.4s infinite 0.2s',
                }}></div>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#8bc34a',
                  borderRadius: '50%',
                  animation: 'bounce 1.4s infinite 0.4s',
                }}></div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div style={{
              padding: isMobile ? '15px 16px' : isTablet ? '20px 30px' : '0 40px 20px 40px',
              borderTop: '1px solid #333333',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}>
              <p style={{ 
                fontSize: '12px', 
                color: '#999999', 
                margin: '0 0 12px 0', 
                textTransform: 'uppercase', 
                letterSpacing: '0.5px' 
              }}>
                Quick Questions
              </p>
              <div style={{ 
                display: 'flex', 
                gap: '8px', 
                flexWrap: 'wrap',
              }}>
                {quickReplies[activeCategory].map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickReply(reply)}
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid #8bc34a',
                      color: '#8bc34a',
                      padding: isMobile ? '6px 10px' : '8px 12px',
                      borderRadius: '4px',
                      fontSize: isMobile ? '11px' : '12px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      flex: isMobile ? '1 1 calc(50% - 4px)' : 'auto',
                      minWidth: isMobile ? '0' : 'auto',
                      whiteSpace: isMobile ? 'normal' : 'nowrap',
                      lineHeight: '1.3',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#8bc34a';
                      e.target.style.color = '#000000';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#8bc34a';
                    }}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div style={{
            padding: isMobile ? '15px 16px' : isTablet ? '20px 30px' : '20px 40px',
            borderTop: '1px solid #333333',
            display: 'flex',
            gap: '12px',
            backgroundColor: '#1a1a1a',
            flexShrink: 0,
          }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              placeholder={isMobile ? "Ask..." : "Type your question here..."}
              style={{
                flex: 1,
                backgroundColor: '#0a0a0a',
                border: '1px solid #333333',
                color: '#ffffff',
                padding: isMobile ? '10px 12px' : '12px 16px',
                borderRadius: '4px',
                fontSize: isMobile ? '13px' : '14px',
                outline: 'none',
                transition: 'border-color 0.3s ease',
                minHeight: isMobile ? '40px' : 'auto',
              }}
              onFocus={(e) => e.target.style.borderColor = '#8bc34a'}
              onBlur={(e) => e.target.style.borderColor = '#333333'}
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              style={{
                backgroundColor: '#8bc34a',
                border: 'none',
                color: '#000000',
                padding: isMobile ? '10px 14px' : '12px 20px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: isMobile ? '4px' : '8px',
                transition: 'all 0.3s ease',
                fontSize: isMobile ? '12px' : '14px',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = '0 0 20px rgba(139, 195, 74, 0.5)';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = 'none';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <Send size={isMobile ? 16 : 18} />
              {!isMobile && 'Send'}
            </button>
          </div>
        </main>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-8px);
          }
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #1a1a1a;
        }

        ::-webkit-scrollbar-thumb {
          background: #8bc34a;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #7ab500;
        }

        * {
          box-sizing: border-box;
        }

        @media (max-width: 767px) {
          body {
            margin: 0;
            padding: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default NightVisionSupport;