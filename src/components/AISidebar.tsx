'use client';

import { useEffect, useState, useRef } from 'react';
import LoadingDots from './LoadingDots';
import TypingAnimation from './TypingAnimation';

const mockSuggestions = [
    {
        id: 1,
        title: 'Machine Architecture and Assembly Programming',
        content:
            'Smith et al. (2023) discusses similar concepts in "AI-Powered Research Environments"',
    },
    {
        id: 2,
        title: 'Algorithms',
        content:
            'Consider breaking this paragraph into smaller sections for better readability',
    },
    {
        id: 3,
        title: 'Programming Languages',
        content:
            'Add a methodology section here to explain your research approach',
    },
];

const mockSelectedClasses = [
    {
        id: 1,
        number: 'CS160',
        title: 'Statistical Bioinformatics',
        professor: 'Donna Slonim',
        time: 'Mon, Wed 10:00-11:15',
        credits: '3 SHU',
        location: 'Medford/Tufts',
        status: 'open',
        semesters: 'Fall',
        rating: '4.3',
        difficulty: '3.3',
        attributes: 'SOE-Computing'

    },
    {
        id: 2,
        title: 'Linear Algebra',
        content: 'An introduction to machine learning concepts and techniques.',
    },
    {
        id: 3,
        title: 'Deep Learning Explained',
        content: 'A detailed overview of deep learning and its impact on AI.',
    },
];

const mockEditorContent = `
<strong>Project Description</strong> (6 pages maximum). <insertion> The project description is brief and should focus on the scope of proposed research activities and the suitability of assembled personnel to make the proposed advances. Detailed research plans are not appropriate. Results from Prior NSF Support should not be included. The project description must consist of the following sections, in the order shown and using the headings indicated. </insertion> </p><p>A. Vision and integrated research goals of the Institute. <em>(Suggested length: 1/2 page). </em>Provide a brief, holistic description of the motivation and vision for the proposed Institute, and a high-level description of the proposed research areas/themes.</p><p>B. Foundational AI research.<em> (Suggested length: 1 to 2 pages).</em> Address the following questions using the underlined headings:</p><ul><li><p>Limitations. What are the specific limitations in the current state of AI revealed in the Institute's vision for use-inspired research and societal impact?</p></li><li><p>Foundational AI contributions. In which of those areas of AI research will the Institute investigate/develop <em>significant new knowledge or methods</em> to overcome those challenges?</p></li><li><p>Basis of confidence. What special conditions or prior work make the proposed Institute uniquely suited for addressing these AI research challenges?</p></li></ul><p>C. Use-Inspired Research.<em> (Suggested length: 1 to 2 pages)</em>. Address the following questions using the underlined headings:</p><ul><li><p>Use-inspired research contributions. In what use-inspired research areas will the Institute make advances, and what is the role of AI in those advances?</p></li><li><p>Areas of additional AI application. In addition to the areas of AI research identified for advancement under <em>Foundational AI contributions</em>, what other areas of AI are expected to be applied in the use-inspired research?</p></li><li><p>Concept for use-inspired research. How does the institute plan to structure its activities to best leverage the use-inspired research context to establish a virtuous cycle of inquiry and discovery across all research activities?</p></li></ul><p>D. Broader Impacts. <em>(Suggested length: up to 1 page). </em>How will the Institute make a lasting strategic impact beyond its research outcomes? Highlight intent or preliminary plans for new activities in any or all of Education and Workforce Development, Broadening Participation, Collaboration, and Knowledge Transfer.</p><p>E. Key Personnel and prospective organization. <em>(Suggested length: 1 to 2 pages).</em></p><ul><li><p>Organization. Describe the preliminary network of organizations comprising the Institute and their relationships to one another.</p></li><li><p>Key Personnel. Identify key contributors to the Institute's prospective research activities, their primary research thrusts related to the institute goals and how this demonstrates their suitability to drive and disseminate the research advances AI and associated disciplines/sectors presented in this preliminary proposal.</p></li></ul><p>Deviations from the PAPPG:</p><ul><li><p>You may omit the PAPPG-required section on Results from Prior NSF Support.</p></li></ul><p><strong>4. References Cited:</strong> Section. List only references cited in the Project Description. See PAPPG for format instructions.</p><p><strong>5. Biographical Sketches</strong> (3-page limit per person): Biographical sketches are required for the PI, any co-PIs, and each of the participating Senior Personnel. All biographical sketches submitted in response to this solicitation are expected to follow the NSF-approved format in accordance with the policy in the PAPPG.</p><p>No other sections or documents are permitted. This includes Budget and Budget Justification, Data Management Plan, Postdoctoral Researcher Mentoring Plan, Current and Pending (Other) Support, Collaborators and Other Affiliations Information, Facilities, Equipment, and Other Resources, and Letters of Collaboration.</p>
`;

const DEMO_MODE = false;

const mockMessages: Message[] = [
  {
    id: '1',
    content: "Hey! I just uploaded my files with my grant specifications.",
    sender: 'user',
    timestamp: new Date('2025-02-08T17:30:00')
  },
  {
    id: '2',
    content: "I'll help you format your grant according to NSF 23-610 specifications. Here's the standard format for the project description section:",
    sender: 'ai',
    timestamp: new Date('2025-02-08T17:30:05')
  },
  {
    id: '3',
    content: "Thanks! Could you help me with the Broader Impacts section?",
    sender: 'user',
    timestamp: new Date('2025-02-08T17:31:00')
  },
  {
    id: '4',
    content: "Of course! The Broader Impacts section (suggested length: up to 1 page) should focus on how your Institute will make a lasting strategic impact beyond its research outcomes. You should highlight plans for Education and Workforce Development, Broadening Participation, Collaboration, and Knowledge Transfer.",
    sender: 'ai',
    timestamp: new Date('2025-02-08T17:31:05')
  }
];

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}


interface AISidebarProps {
  onUpdateContent: (content: string) => void;
}

  export default function AISidebar({ onUpdateContent }: AISidebarProps) {
    const [messages, setMessages] = useState<Message[]>(DEMO_MODE ? mockMessages : []);

  const [activeTab, setActiveTab] = useState('suggestions');
  const [chatResponse, setChatResponse] = useState("");
  const [inputValue, setInputValue] = useState(""); // User input
  const [chatHistory, setChatHistory] = useState<string[]>([]); // State to hold chat history
  const chatEndRef = useRef<HTMLDivElement | null>(null); // Create a ref for the chat history end
  const [selectedSuggestion, setSelectedSuggestion] = useState<any>(null); // State to hold the selected suggestion
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseText, setResponseText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);


  const showTypingAnimation = (message: string, onComplete?: () => void) => {
    setIsTyping(true);
    setResponseText(message);
    // The typing animation will call onComplete when done
  };

  // Function to send the user's question to the API route via POST.
  async function handleSend() {
    setIsLoading(true);
    try {
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: inputValue }),
        });
        
        // Delay before starting to type
        setTimeout(() => {
          setIsLoading(false);
          setIsTyping(true);
        }, 1500); // 1.5 second delay

        const data = await res.json();
        const answer = data.answer || data.error;
        setChatResponse(answer);
        setChatHistory((prev) => [...prev, answer]); // Update chat history
        setInputValue(""); // Clear input after sending

    } catch (error) {
        console.error("Error calling AI API:", error);
        const errorMessage = "Error: " + (error as Error).message;
        setChatResponse(errorMessage);
        setChatHistory((prev) => [...prev, errorMessage]); // Update chat history
    }
  }
    // Auto-scroll to the latest message whenever the chat history changes.
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


      {/* Main Content Area with Chat History and Floating Suggestions */}
      <div className="flex-1 overflow-hidden relative">
        {/* Chat History */}
        <div className="h-full overflow-auto p-3 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
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
                        // Add message to chat after typing animation
                        const newMessage: Message = {
                          id: Date.now().toString(),
                          content: responseText,
                          sender: 'ai',
                          timestamp: new Date()
                        };
                        setMessages(prev => [...prev, newMessage]);
                        setIsTyping(false);

                        // After first message, update editor and show follow-up
                        if (!DEMO_MODE && responseText !== "I've updated the editor with the standard NSF 23-610 grant format. You can now start editing the document following these guidelines.") {
                          onUpdateContent(mockEditorContent);
                          setTimeout(() => {
                            const followUpMessage = "I've updated the editor with the standard NSF 23-610 grant format. You can now start editing the document following these guidelines.";
                            showTypingAnimation(followUpMessage);
                          }, 500);
                        }
                      }
                    }}
                  />
                )}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

      {/* professor: 'Donna Slonim',
        time: 'Monday, Wedesnday 10:00-11:15',
        credits: '3 SHU',
        location: 'Medford/Tufts',
        status: 'open',
        semesters: 'Fall',
        rating: '4.3',
        difficulty: '3.3',
        attributes: 'SOE-Computing' */}

      {/* Display Chat History */}
      
      {/* <div className="flex-grow overflow-y-auto p-4">

          {chatHistory.map((message, index) => (
              <div key={index} className="mt-2 p-2 bg-gray-100 rounded">
                  <p className="text-sm text-gray-800">{message}</p>
              </div>
          ))}
          <div ref={chatEndRef} /> 
      </div> */}


      {/* Input Area */}
          
      {/* Response Area
      {(isLoading || isTyping) && (
        <div className="p-3 border-t bg-gray-50">
          <div className="flex items-start gap-2">
            
            <div className="w-6 h-6 bg-blue-600 rounded flex-shrink-0 flex items-center justify-center mt-0.5">
              <span className="text-white text-xs">AI</span>
            </div>
            <div className="flex-1">
              {isLoading ? (
                <LoadingDots />
              ) : (
                <TypingAnimation
                  text={responseText}
                  className="text-sm text-gray-800 leading-relaxed"
                  onComplete={() => {
                    setIsTyping(false);
                    onUpdateContent(chatResponse);

                  }}  
                />
              )}
            </div>
          </div>
        </div>
      )} */}
</div>
      {/* Input Area */}

      <div className="p-3 border-t bg-white">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Ask anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}

              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="w-full pl-3 pr-8 py-1.5 text-sm border border-gray-200 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button 
          className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors font-medium"
          onClick={handleSend}
>
            Send
          </button>
        </div>
      </div>
    </div>
    
  );
}
