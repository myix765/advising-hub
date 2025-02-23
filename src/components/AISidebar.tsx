'use client';

import { useEffect, useState, useRef } from 'react';
import LoadingDots from './LoadingDots';
import TypingAnimation from './TypingAnimation';
import CourseCard from './CourseCard';

const courses = [
  {
    courseCode: "CS 40",
    courseName: "Machine Structure & Assembly",
    instructor: "Mark Sheldon",
    time: "MWF 10:30 - 11:45 AM",
    location: "TTC Auditorium",
    description: "Introduction to computer architecture and assembly language. Topics include digital logic, processor organization, memory hierarchies, and assembly programming.",
    requirements: ["CS 11", "CS15"],
    ratings: {
      overall: 4.2,
      difficulty: 3.8
    }
  },
  {
    courseCode: "CS 160",
    courseName: "Algorithms",
    instructor: "Karen Edwards",
    time: "TTh 1:30 - 2:45 PM",
    location: "Joyce Cummings 270",
    description: "Design and analysis of efficient algorithms. Topics include sorting, searching, dynamic programming, graph algorithms, NP-completeness.",
    requirements: ["CS 15", "MATH 61"],
    ratings: {
      overall: 4.5,
      difficulty: 4.0
    }
  },
  {
    courseCode: "CS 138",
    courseName: "Reinforcement Learning",
    instructor: "Michael Hughes",
    time: "MW 3:00 - 4:15 PM",
    location: "SEC 205",
    description: "Introduction to reinforcement learning and sequential decision making. Covers Markov decision processes, Q-learning, policy gradient methods, and deep RL.",
    requirements: ["CS 135", "MATH 61"],
    ratings: {
      overall: 4.7,
      difficulty: 3.5
    }
  },
  {
    courseCode: "MATH 165",
    courseName: "Numerical Analysis",
    instructor: "James Adler",
    time: "TTh 10:30 - 11:45 AM",
    location: "Bromfield-Pearson 101",
    description: "Study of numerical methods for solving mathematical problems. Topics include interpolation, numerical integration, solution of linear systems, and numerical solution of differential equations.",
    requirements: ["MATH 70", "MATH 72"],
    ratings: {
      overall: 4.3,
      difficulty: 3.7
    }
  }
];

interface Message {
  id: string;
  content: React.ReactNode; // Now accepts JSX or a string
  sender: 'user' | 'ai';
  timestamp: Date;
}

const mockMessages: Message[] = [
  {
    // What classes should I take if I want to do robotics and fulfill my requirements?
    id: '1',
    content: (
      <div>
         <p>Follow a two‑step plan:</p>
  <ol>
    <li>
      <strong>Core CS Courses:</strong>
      <p>Complete required courses (CS 11, 15, 40, 61, 105, 160, 170, etc.).</p>
    </li>
    <li>
      <strong>Robotics Electives:</strong>
      <ul>
        <li>CS 133: Human‑Robot Interaction</li>
        <li>CS 141: Probabilistic Robotics</li>
        <li>CS 139: AI &amp; Robotics Ethics</li>
        <li>Other robotics/AI electives (e.g., CS 138: Reinforcement Learning)</li>
      </ul>
      <p>Finish with a robotics capstone (CS 97/98 or CS 197).</p>
    </li>
  </ol>
  <p>Consult your advisor for the latest guidelines.</p>
  
      </div>
    ),
    sender: 'ai',
    timestamp: new Date('2025-02-08T17:30:00')
  },
  // after class selection
  {
    id: '2',
    content: (
      <div>
        <p>
        Type yes to confirm class info on CS40, CS160, CS138, MATH165.
          </p>

      </div>
    ),
    sender: 'ai',
    timestamp: new Date('2025-02-08T17:31:05')
  },
  
  // classes
  {
    id: '2',
    content: (
      <div className="space-y-2">
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            {...course}
          />
        ))}
      </div>
    ),
    sender: 'ai',
    timestamp: new Date('2025-02-08T17:31:05')
  },

  //“Can I double count discrete math for both the natural science elective and my math major?”
  {
    id: '3',
    content: "Yes. But be aware that you can only double count half of your math major credits toward your CS major.",
    sender: 'ai',
    timestamp: new Date('2025-02-08T17:30:05')
  },
  //“Who should I talk to if I want to graduate early?”
  {

    id: '4',
    content: (
      <div>
        <p>If you have questions or need guidance, you can reach out to John O'Keefe, the Senior Academic Advisor for Student Success at the School of Engineering.</p> 
        {/* <p>Book an appointment here:  
          <a href="https://calendly.com/john-okeefe" target='_blank'>Book an appointment</a>
          </p>  */}
          <button 
    onClick={() => window.open('https://calendly.com/john-okeefe', '_blank')} 
    style={{
      backgroundColor: '#007BFF',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    }}
  >
    Book an appointment
  </button>
      </div>
    ),
    sender: 'ai',
    timestamp: new Date('2025-02-08T17:31:00')
  },
  // “What classes do I need to take if I want to do an engineering management minor?
  {
    id: '5',
    content: (
      <div>
        <p>If you're planning to pursue an Engineering Management minor, you'll need to complete the following courses:</p>
  <ul>
    <li><strong>EM51:</strong> Engineering Management (Offered SP25)</li>
    <li><strong>EM52:</strong> Technical &amp; Managerial Communication (Offered SP25)</li>
    <li><strong>EM54:</strong> Engineering Leadership (Offered SP25)</li>
    <li><strong>EM153:</strong> Management of Innovation (Offered SP25)</li>
  </ul>
  <br />
  <p>Be sure to confirm course availability and any additional requirements with your academic advisor.</p>
      </div>
    ),
    sender: 'ai',
    timestamp: new Date('2025-02-08T17:31:05')
  },
  //What credits would CS116 satisfy?
  {
    id: '6',
    content: (
      <div>
        <p>
    CS116 (which has a SOE‑Computing attribute) can count toward the following credit requirements:
  </p>
  <ul>
    <li>System Elective</li>
    <li>CS Social Context Elective (j)</li>
    <li>General CS Elective (k)</li>
  </ul>
      </div>
    ),
    sender: 'ai',
    timestamp: new Date('2025-02-08T17:31:05')
  } 
];

interface AISidebarProps {
  onUpdateContent: (content: string) => void;
}

export default function AISidebar({ onUpdateContent }: AISidebarProps) {
  const [messages, setMessages] = useState<Message[]>(false ? mockMessages : []);
  const [activeTab, setActiveTab] = useState('suggestions');
  const [chatResponse, setChatResponse] = useState("");
  const [inputValue, setInputValue] = useState(""); // User input
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState<any>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseText, setResponseText] = useState('');
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [mockMessageIndex, setMockMessageIndex] = useState(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const showTypingAnimation = (message: React.ReactNode, onComplete?: () => void) => {
    setIsTyping(true);
    setResponseText(message as string);
    // The typing animation will call onComplete when done
  };

  async function handleAPISend() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: inputValue }),
      });
      
      setTimeout(() => {
        setIsLoading(false);
        setIsTyping(true);
      }, 1500);

      const data = await res.json();
      const answer = data.answer || data.error;
      setChatResponse(answer);
      setChatHistory((prev) => [...prev, answer]);
      setInputValue("");
    } catch (error) {
      console.error("Error calling AI API:", error);
      const errorMessage = "Error: " + (error as Error).message;
      setChatResponse(errorMessage);
      setChatHistory((prev) => [...prev, errorMessage]);
    }
  }

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInputValue('');

    if (inputRef.current) {
      inputRef.current.style.height = '36px';
    }
    
    setTimeout(() => {
      setIsLoading(false);
      if (mockMessageIndex < mockMessages.length) {
        const nextMockMessage = mockMessages[mockMessageIndex];
        const mockMessage: Message = {
          id: (Date.now() + mockMessageIndex).toString(),
          content: nextMockMessage.content,
          sender: 'ai',
          timestamp: new Date()
        };

        showTypingAnimation(nextMockMessage.content, () => {
          setMessages(prev => [...prev, mockMessage]);
        });
        
        setMockMessageIndex(prevIndex => prevIndex + 1);
      }
    }, 1500);
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Sidebar Header */}
      <div className="h-14 border-b flex items-center justify-between px-4 bg-white">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white text-xs">AI</span>
          </div>
          <h2 className="text-sm font-medium text-gray-900">Advisor</h2>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span className="text-xs text-gray-500">Active</span>
        </div>
      </div>

      {/* Main Content Area with Chat History */}
      <div className="flex-1 overflow-hidden relative">
        <div className="h-full overflow-auto p-3 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`w-full rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="text-sm whitespace-pre-wrap break-words">
                  {message.content}
                </div>
                <p className="text-xs mt-1 opacity-70">
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {(isLoading || isTyping) && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-gray-100">
                {isLoading ? (
                  <LoadingDots />
                ) : (
                  <TypingAnimation
                    text={responseText}
                    className="text-sm text-gray-900"
                    onComplete={() => {
                      if (isTyping) {
                        const newMessage: Message = {
                          id: Date.now().toString(),
                          content: responseText,
                          sender: 'ai',
                          timestamp: new Date()
                        };
                        setMessages(prev => [...prev, newMessage]);
                        setIsTyping(false);
                      }
                    }}
                  />
                )}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input Area */}
      <div className="p-3 border-t bg-white">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask anything..."
              rows={1}
              style={{ resize: 'none', minHeight: '36px', height: 'auto' }}
              className="w-full pl-3 pr-3 py-1.5 text-sm border border-gray-200 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 overflow-y-auto"
            />
          </div>
          <button 
            onClick={handleSend}
            disabled={isLoading || isTyping || !inputValue.trim()}
            className="p-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            aria-label="Send message"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
