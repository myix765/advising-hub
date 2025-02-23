'use client';

import { useEffect, useState, useRef } from 'react';
import LoadingDots from './LoadingDots';
import TypingAnimation from './TypingAnimation';
import CourseCard from './CourseCard';
import AIAuditClassList from './AuditCourseList';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const courses = [
  {
    courseCode: "CS 40",
    courseName: "Machine Structure & Assembly",
    instructor: "Mark Sheldon",
    time: "TTh 1:30PM - 2:45PM",
    location: "Robinson Wing TTC, Room 253",
    description: "Structure of machine-level data and code including memory, cache, registers, and assembly language translation. High demand course.",
    requirements: ["CS 11", "CS 15"],
    credits: 5,
    ratings: {
      overall: 4.2,
      difficulty: 5
    }
  },
  {
    courseCode: "CS 171",
    courseName: "Human Computer Interaction",
    instructor: "Robert Jacob",
    time: "MW 1:30PM - 2:45PM",
    location: "Joyce Cummings Center, 160",
    description: "Introduction to human-computer interaction, focusing on designing and testing user interfaces and interaction methods.",
    requirements: ["CS 15"],
    credits: 3,

    ratings: {
      overall: 4.0,
      difficulty: 3.1
    }
  },
  {
    courseCode: "CS 138",
    courseName: "Reinforcement Learning",
    instructor: "Jivko Sinapov",
    time: "MW 3:00PM - 4:15PM",
    location: "Joyce Cummings Center, 160",
    description: "Explores reinforcement learning techniques for agents in complex, uncertain environments. Topics include practical applications, software libraries, and advanced topics such as transfer and deep RL.",
    requirements: ["CS 131", "CS 135"],
    credits: 3,

    ratings: {
      overall: 4.1,
      difficulty: 3.9
    }
  },
  {
    courseCode: "MATH 165",
    courseName: "Probability",
    instructor: "David Smyth",
    time: "TTh 3:00PM - 4:15PM",
    location: "Joyce Cummings Center, 260",
    description: "Covers probability theory including conditional probability, random variables, expectations, distributions, laws of large numbers, and the central limit theorem.",
    requirements: [],
    credits: 4,

    ratings: {
      overall: 4.3,
      difficulty: 4.0
    }
  }
];

const courseList = [
  {
    courseCode: "CS 40",
    courseName: "Machine Structure & Assembly",
    attributes: ["CS Core"],
    credits: 5
  },
  {
    courseCode: "CS 171",
    courseName: "Human Computer Interaction",
    attributes: ["CS Elective"],
    credits: 3
  },
  {
    courseCode: "CS 138",
    courseName: "Reinforcement Learning",
    attributes: ["CS Core"],
    credits: 4
  },
  {
    courseCode: "MATH 165",
    courseName: "Probability",
    attributes: ["CS Elective", "MATH/NS"],
    credits: 4
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
    id: '6',
    content: (
      <div>
        <p>Here are a list of classes that you can take. Select classes you would like to add to your schedule:</p>
        <br />
        <AIAuditClassList courseList={courseList} />
        <p className='mt-4'>When you are finished selecting, please select the "Finished selecting" button. Or type "Yes" to confirm selection.</p>
      </div>
    ),
    sender: 'ai',
    timestamp: new Date()
  },
  // after class selection

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
    timestamp: new Date()
  },
  
  //“Can I double count discrete math for both the natural science elective and my math major?”
  {
    id: '3',
    content: "Yes. But be aware that you can only double count half of your math major credits toward your CS major.",
    sender: 'ai',
    timestamp: new Date()
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
    timestamp: new Date()
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
    timestamp: new Date()
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
    timestamp: new Date()
  }
];

interface AISidebarProps {
  onUpdateContent: (content: string) => void;
}

const AISidebar: React.FC<AISidebarProps> = ({ onUpdateContent }) => {
  const [messages, setMessages] = useState<Message[]>(false ? mockMessages : []);
  // const [activeTab, setActiveTab] = useState('suggestions');
  const [chatResponse, setChatResponse] = useState("");
  const [inputValue, setInputValue] = useState(""); // User input
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  // const [selectedSuggestion, setSelectedSuggestion] = useState<any>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseText, setResponseText] = useState('');
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [mockMessageIndex, setMockMessageIndex] = useState(0);

  const [hasAppendedMessages, setHasAppendedMessages] = useState(false);

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

  return (
    <div className="h-full flex flex-col bg-white mx-10">
      {/* Sidebar Header */}
      <div className="h-14 border-b flex items-center justify-between px-4 bg-white">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
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
              className={`flex ${message.sender === 'user' ? 'justify-end ml-20' : 'justify-start'}`}
            >
              <div
                className={`w-full rounded-2xl p-3 ${message.sender === 'user'
                  ? 'px-6 bg-violet-200 text-black'
                  : 'text-gray-900'
                  }`}
              >
                <div className="text-sm whitespace-pre-wrap break-words">
                  {message.content}
                </div>
                <p className={`text-xs mt-1 opacity-40 ${message.sender === 'user' ? 'text-right mr-[-8px]' : 'text-left'}`}>
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
              placeholder="Ask about your schedule"
              rows={1}
              style={{ resize: 'none', minHeight: '36px', height: 'auto' }}
              className="w-full pl-6 pr-3 py-1.75 text-sm border border-gray-200 rounded-full text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 overflow-y-auto"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={isLoading || isTyping || !inputValue.trim()}
            className="bg-violet-100 text-indigo-800 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center w-10 h-10"
            aria-label="Send message"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 19V5m-7 7l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AISidebar;
