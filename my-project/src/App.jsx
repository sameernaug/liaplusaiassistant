import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [currentPhase, setCurrentPhase] = useState('welcome');
  const [userProfile, setUserProfile] = useState({
    hasInterest: null,
    hasPCB: null,
    hasEligibility: null,
    interests: []
  });
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial welcome message
    const welcomeMessage = {
      id: 1,
      text: "Namaste and welcome! I'm Lia, your dedicated nursing admission companion. I'm here to guide you through every step of your B.Sc Nursing journey at our institution. What brings you here today?",
      isBot: true,
      options: [
        { text: "Yes, tell me about nursing programs", value: "interested", positive: true },
        { text: "I'm just looking around", value: "browsing", positive: false },
        { text: "What is B.Sc Nursing?", value: "info", positive: true }
      ]
    };
    setMessages([welcomeMessage]);
  }, []);

  const addMessage = (text, isBot = false, options = null) => {
    const newMessage = {
      id: Date.now(),
      text,
      isBot,
      options,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addTypingMessage = (text, isBot = false, options = null, delay = 1500) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage(text, isBot, options);
    }, delay);
  };

  const handleOptionClick = (option) => {
    // Add user's choice to chat
    addMessage(option.text, false);
    
    // Process the response based on current phase and option
    processResponse(option);
  };

  const processResponse = (option) => {
    switch(currentPhase) {
      case 'welcome':
        handleWelcomeResponse(option);
        break;
      case 'motivation':
        handleMotivationResponse(option);
        break;
      case 'academic':
        handleAcademicResponse(option);
        break;
      case 'eligibility':
        handleEligibilityResponse(option);
        break;
      case 'curriculum':
        handleCurriculumResponse(option);
        break;
      case 'career':
        handleCareerResponse(option);
        break;
      case 'financial':
        handleFinancialResponse(option);
        break;
      case 'campus':
        handleCampusResponse(option);
        break;
      case 'support':
        handleSupportResponse(option);
        break;
      case 'final':
        handleFinalResponse(option);
        break;
      default:
        break;
    }
  };

  const handleWelcomeResponse = (option) => {
    if (option.positive) {
      setUserProfile(prev => ({...prev, hasInterest: true}));
      setCurrentPhase('motivation');
      addTypingMessage(
        "Wonderful! I'm excited to help you explore this noble profession. Before we dive deep into our programs, I'd love to understand what inspires you to pursue nursing. Is it the desire to serve humanity and make a real difference in people's lives?",
        true,
        [
          { text: "Yes, I want to help people", value: "service", positive: true },
          { text: "I'm interested in healthcare", value: "healthcare", positive: true },
          { text: "It's a stable career", value: "stability", positive: true },
          { text: "I'm not sure yet", value: "unsure", positive: false }
        ]
      );
    } else {
      addTypingMessage(
        "I understand. Thank you for your time today. If you ever decide to explore nursing education in the future, I'll be here to assist you. Have a great day!",
        true,
        [
          { text: "Actually, tell me more", value: "reconsider", positive: true },
          { text: "Thank you", value: "goodbye", positive: false }
        ]
      );
    }
  };

  const handleMotivationResponse = (option) => {
    setCurrentPhase('academic');
    if (option.positive) {
      addTypingMessage(
        "That's truly admirable! Healthcare professionals like you make a real difference in the world. Our program emphasizes both compassionate care and technical excellence. Now, let me ask about your academic background - this will help me guide you better. Have you completed your 12th grade with Physics, Chemistry, and Biology subjects?",
        true,
        [
          { text: "Yes, I have PCB", value: "has_pcb", positive: true },
          { text: "No, I don't have Biology", value: "no_biology", positive: false },
          { text: "I have some subjects", value: "partial", positive: false }
        ]
      );
    } else {
      addTypingMessage(
        "That's completely fine! Let me help you discover the amazing aspects of nursing. It's one of the most rewarding careers with excellent job security, growth opportunities, and the satisfaction of making a difference. Have you completed your 12th grade with Physics, Chemistry, and Biology subjects?",
        true,
        [
          { text: "Yes, I have PCB", value: "has_pcb", positive: true },
          { text: "No, I don't have Biology", value: "no_biology", positive: false },
          { text: "I have some subjects", value: "partial", positive: false }
        ]
      );
    }
  };

  const handleAcademicResponse = (option) => {
    if (option.value === "has_pcb") {
      setUserProfile(prev => ({...prev, hasPCB: true}));
      setCurrentPhase('eligibility');
      addTypingMessage(
        "Perfect! Having PCB subjects puts you in an excellent position for nursing. Our B.Sc Nursing program is specifically designed for students with your background. Can you tell me if you scored above 45% in your 12th grade? This is our minimum eligibility requirement.",
        true,
        [
          { text: "Yes, above 45%", value: "eligible", positive: true },
          { text: "Below 45%", value: "not_eligible", positive: false },
          { text: "I'll check my marks", value: "check_marks", positive: false }
        ]
      );
    } else {
      setUserProfile(prev => ({...prev, hasPCB: false}));
      addTypingMessage(
        "I understand you might not have Biology as a subject. Don't worry - we have solutions! We offer a 6-month Biology foundation bridge program that prepares you for direct entry into our nursing program afterward. Would you be interested in learning more about this pathway?",
        true,
        [
          { text: "Yes, tell me about bridge program", value: "bridge_interested", positive: true },
          { text: "What are other options?", value: "other_options", positive: false },
          { text: "This sounds complicated", value: "complicated", positive: false }
        ]
      );
    }
  };

  const handleEligibilityResponse = (option) => {
    if (option.positive) {
      setUserProfile(prev => ({...prev, hasEligibility: true}));
      setCurrentPhase('curriculum');
      addTypingMessage(
        "Excellent! With your academic background, you're eligible for our program. Let me share some exciting details about our B.Sc Nursing course. It's a comprehensive 4-year program that combines 40% theoretical knowledge with 60% hands-on practical training. You'll start interacting with real patients from Day 1! Are you curious about what subjects you'll study in each year?",
        true,
        [
          { text: "Yes, show me the curriculum", value: "curriculum", positive: true },
          { text: "Tell me about career opportunities", value: "career", positive: true },
          { text: "What about fees and costs?", value: "fees", positive: false }
        ]
      );
    } else {
      addTypingMessage(
        "Don't worry! We have flexible admission criteria and can work with your situation. Our counselors can guide you on improving your eligibility or exploring alternative pathways. Would you like to know about our support programs for students who need additional academic preparation?",
        true,
        [
          { text: "Yes, tell me about support", value: "support", positive: true },
          { text: "What are my options?", value: "options", positive: true },
          { text: "Maybe nursing isn't for me", value: "doubt", positive: false }
        ]
      );
    }
  };

  const handleCurriculumResponse = (option) => {
    if (option.value === "curriculum") {
      setCurrentPhase('career');
      addTypingMessage(
        "Great! Let me break down the curriculum for you:\n\n📚 Year 1: Anatomy, Physiology, Microbiology, and Nursing Foundations\n📚 Year 2: Pharmacology, Pathology, and Medical-Surgical Nursing\n📚 Year 3: Pediatric Nursing, Maternity Care, and Psychiatric Nursing\n📚 Year 4: Community Health, Research Methods, and Leadership\n\nWe partner with 15+ leading hospitals including AIIMS, Max Healthcare, and Apollo Hospitals for clinical training. Would you like to know about career opportunities and salary prospects?",
        true,
        [
          { text: "Yes, tell me about careers", value: "career_info", positive: true },
          { text: "What about hospital partnerships?", value: "hospitals", positive: true },
          { text: "Show me success stories", value: "success", positive: true }
        ]
      );
    } else if (option.value === "career") {
      setCurrentPhase('career');
      addTypingMessage(
        "I'm so glad you're interested in career prospects! The nursing field offers incredible opportunities. Our placement record is outstanding - 95% of our students get placed within 6 months of graduation with an average starting salary of ₹30,000 per month. Some of our top performers even start at ₹50,000 per month! Would you like to hear inspiring success stories from our alumni?",
        true,
        [
          { text: "Yes, share success stories", value: "success_stories", positive: true },
          { text: "Tell me about international opportunities", value: "international", positive: true },
          { text: "What about further studies?", value: "higher_studies", positive: true }
        ]
      );
    } else {
      setCurrentPhase('financial');
      addTypingMessage(
        "Let's talk about the financial aspects! Our fee structure is transparent:\n\n💰 Annual Fee: ₹90,000\n💰 Total 4-Year Program: ₹3,60,000\n\nBut here's great news - we offer extensive scholarships! Students with 90%+ marks get ₹48,000 annual waiver. For families with income below ₹2 lakhs, we offer up to 70% fee waiver. Would you like to know which scholarships you might qualify for?",
        true,
        [
          { text: "Yes, check my eligibility", value: "scholarship_check", positive: true },
          { text: "Tell me about payment plans", value: "payment_plans", positive: true },
          { text: "This seems expensive", value: "expensive", positive: false }
        ]
      );
    }
  };

  const handleCareerResponse = (option) => {
    if (option.value === "success_stories") {
      setCurrentPhase('financial');
      addTypingMessage(
        "Wonderful! Here are some inspiring success stories:\n\n⭐ Priya Sharma (2019): Now earning ₹45,000/month as Senior ICU Nurse at Apollo\n⭐ Rahul Kumar (2018): Nurse Manager at Max Healthcare, ₹60,000/month\n⭐ Anjali Patel (2017): Working in London, UK, earning £35,000/year\n⭐ Vikram Singh (2016): Nursing Superintendent, ₹80,000/month\n\nThese stories show incredible growth potential! Would you like to explore financial planning for your education?",
        true,
        [
          { text: "Yes, tell me about fees", value: "fees", positive: true },
          { text: "I want to work abroad too", value: "international", positive: true },
          { text: "How do I achieve this success?", value: "success_path", positive: true }
        ]
      );
    } else {
      setCurrentPhase('campus');
      addTypingMessage(
        "Excellent question! We provide comprehensive support for international placements including IELTS preparation, visa guidance, and partner hospital connections in UK, USA, Canada, and Australia. Many of our graduates are working globally! Would you like to know about our campus facilities and student life?",
        true,
        [
          { text: "Yes, show me campus life", value: "campus", positive: true },
          { text: "Tell me about international process", value: "international_process", positive: true },
          { text: "What about fees first?", value: "fees", positive: false }
        ]
      );
    }
  };

  const handleFinancialResponse = (option) => {
    if (option.positive) {
      setCurrentPhase('campus');
      addTypingMessage(
        "Excellent! Let me detail our scholarship categories:\n\n🏆 Merit-Based: 90%+ = ₹48,000 waiver, 85-89% = ₹30,000 waiver\n🏆 Need-Based: Family income <₹2L = Up to 70% fee waiver\n🏆 Special: Defense families = 15% discount, Sports achievers = ₹35,000 support\n\nWe also offer flexible payment plans and EMI options. Would you like to know about our campus facilities and hostel life?",
        true,
        [
          { text: "Yes, tell me about campus", value: "campus", positive: true },
          { text: "Calculate my scholarship", value: "calculate", positive: true },
          { text: "Show me payment options", value: "payment", positive: true }
        ]
      );
    } else {
      addTypingMessage(
        "I understand your concern about costs. Remember, this is an investment in your future! With our 95% placement record and average starting salary of ₹30,000/month, you'll recover your investment within 18-24 months. Plus, our extensive scholarship programs can significantly reduce costs. Would you like me to help calculate potential savings?",
        true,
        [
          { text: "Yes, help me calculate", value: "calculate", positive: true },
          { text: "Tell me about ROI", value: "roi", positive: true },
          { text: "What are other career options?", value: "other_careers", positive: false }
        ]
      );
    }
  };

  const handleCampusResponse = (option) => {
    if (option.positive) {
      setCurrentPhase('support');
      addTypingMessage(
        "I'm glad you're interested in campus life! Our campus is your home away from home:\n\n🏠 Modern hostel facilities with 24/7 Wi-Fi\n🏠 Nutritionist-planned meals (veg/non-veg options)\n🏠 State-of-the-art simulation labs\n🏠 Digital library with 50,000+ resources\n🏠 Gym, sports complex, and health center\n\nHostel fee: ₹60,000/year including meals. We have excellent safety measures too! Would you like to know about our student support services?",
        true,
        [
          { text: "Yes, tell me about support services", value: "support", positive: true },
          { text: "What about safety measures?", value: "safety", positive: true },
          { text: "How do I apply?", value: "apply", positive: true }
        ]
      );
    } else {
      setCurrentPhase('support');
      addTypingMessage(
        "That's perfectly fine! Let me focus on our comprehensive support systems. We believe every student deserves to succeed, and we have extensive academic, financial, and emotional support services. Would you like to know about these support systems?",
        true,
        [
          { text: "Yes, tell me about support", value: "support", positive: true },
          { text: "What about exam preparation?", value: "exam_prep", positive: true },
          { text: "I want to apply", value: "apply", positive: true }
        ]
      );
    }
  };

  const handleSupportResponse = (option) => {
    if (option.value === "support") {
      setCurrentPhase('final');
      addTypingMessage(
        "Wonderful! We have comprehensive support systems:\n\n🤝 Academic: Remedial classes, peer tutoring, faculty mentors\n🤝 Financial: Emergency grants, work-study programs, laptop lending\n🤝 Mental Health: Professional counselors, 24/7 helpline\n🤝 Cultural: Multi-cultural environment, regional cuisine\n\nOur motto is 'No student left behind!' Are you ready to take the next step and start your application?",
        true,
        [
          { text: "Yes, I'm ready to apply!", value: "ready_apply", positive: true },
          { text: "Tell me about exam preparation", value: "exam_prep", positive: true },
          { text: "I need more time to think", value: "think", positive: false }
        ]
      );
    } else {
      setCurrentPhase('final');
      addTypingMessage(
        "Great! Let me explain our PNT (Pre-Nursing Test) and preparation support:\n\n📝 100 MCQs in 2 hours (Biology: 40, Chemistry: 30, Physics: 20, GK: 10)\n📝 Pass marks: 40% (very achievable!)\n📝 Our support: Study materials, mock tests, doubt clearing\n\nExam dates: March 15 & August 15. Are you ready to start your application and exam preparation?",
        true,
        [
          { text: "Yes, let's start the process!", value: "start_process", positive: true },
          { text: "Send me preparation materials", value: "materials", positive: true },
          { text: "I need to discuss with family", value: "family", positive: false }
        ]
      );
    }
  };

  const handleFinalResponse = (option) => {
    if (option.positive) {
      addTypingMessage(
        "Fantastic! I'm so excited for you! Here's your immediate action plan:\n\n✅ Right Now: I'll provide the application link\n✅ Today: Complete online application (30 minutes)\n✅ Tomorrow: Our counselor will call you\n✅ This Week: Receive PNT preparation materials\n\n🎯 Next Steps:\n• Application link: [nursing-admission.liaplus.com]\n• Helpline: 1800-XXX-XXXX\n• WhatsApp: +91-XXXXX-XXXXX\n\nWelcome to the beginning of your nursing journey! 🌟\n\nYour dreams of becoming a healthcare professional start here. Our team will support you every step of the way!",
        true,
        [
          { text: "Thank you! Send me the details", value: "send_details", positive: true },
          { text: "I have one more question", value: "question", positive: true }
        ]
      );
    } else {
      addTypingMessage(
        "I completely understand! This is a big decision and you need time to think about it. That's absolutely the right approach.\n\n💝 Remember:\n• You have incredible potential for nursing\n• Our doors are always open for you\n• Healthcare needs compassionate people like you\n• We're here whenever you're ready\n\n🌟 My Promise: Whenever you're ready to explore nursing education - whether next week, next month, or next year - I'll be here with the same enthusiasm!\n\nThank you for this wonderful conversation. Take care! 💙",
        true,
        [
          { text: "Actually, let me apply now", value: "apply_now", positive: true },
          { text: "Send me information to review", value: "info_review", positive: true },
          { text: "Thank you, goodbye", value: "goodbye", positive: false }
        ]
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-80 h-80 bg-blue-500 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-1/2 -right-10 w-64 h-64 bg-purple-500 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-10 left-1/2 w-96 h-96 bg-pink-500 rounded-full opacity-10 animate-pulse"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">LiaPlus AI</h1>
                <p className="text-xs text-blue-200">Nursing Admission Assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Lia Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl min-h-[600px] flex flex-col">
          
          {/* Chat Header */}
          <div className="p-4 border-b border-white/20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <div>
                <h2 className="text-white font-semibold">Lia - Nursing Admission Counselor</h2>
                <p className="text-blue-200 text-sm">Here to guide your B.Sc Nursing journey</p>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: '500px' }}>
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.isBot 
                    ? 'bg-white/20 text-white border border-white/30' 
                    : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                }`}>
                  <div className="whitespace-pre-line text-sm leading-relaxed">
                    {message.text}
                  </div>
                  {message.options && (
                    <div className="mt-3 space-y-2">
                      {message.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleOptionClick(option)}
                          className={`w-full p-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            option.positive
                              ? 'bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30'
                              : 'bg-orange-500/20 text-orange-300 border border-orange-500/30 hover:bg-orange-500/30'
                          }`}
                        >
                          {option.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/20 text-white border border-white/30 px-4 py-3 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm">Lia is typing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Stats Footer */}
          <div className="p-4 border-t border-white/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-green-400 font-bold text-lg">95%</div>
                <div className="text-white text-xs">Placement Rate</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-blue-400 font-bold text-lg">₹30K</div>
                <div className="text-white text-xs">Starting Salary</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-purple-400 font-bold text-lg">15+</div>
                <div className="text-white text-xs">Hospital Partners</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-pink-400 font-bold text-lg">5000+</div>
                <div className="text-white text-xs">Alumni Network</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-white text-sm">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>1800-XXX-XXXX</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>admissions@liaplus.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Delhi, India</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;