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

interface AISidebarProps {
  onUpdateContent: (content: string) => void;
}

  export default function AISidebar({ onUpdateContent }: AISidebarProps) {

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
            {/* <div className="h-14 border-b flex items-center justify-between px-4 bg-white">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs">AI</span>
                    </div>
                    <h2 className="text-sm font-medium text-gray-900">AI Assistant</h2>
                </div>
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-xs text-gray-500">Active</span>
                </div>
            </div> */}

            {/* Tabs */}
            <div className="flex px-1 pt-2 pb-1 gap-1 bg-white border-b">
                <button
                    className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                        activeTab === 'suggestions'
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('suggestions')}
                >
                    Class Search
                </button>
                <button
                    className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                        activeTab === 'references'
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab('references')}
                >
                    Selected Classes
                </button>
            </div>

      {/* Content Area */}
      <div className="flex-none p-3 space-y-3">
        {activeTab === 'suggestions' ? (
          selectedSuggestion ? ( // Check if a suggestion is selected
            <div
              className="p-3 bg-white rounded-lg border border-gray-100"
              onClick={() => setSelectedSuggestion(null)} // Click to deselect
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 text-xs">✓</span>
                </div>
                <h3 className="text-xs font-medium text-gray-900">
                  {selectedSuggestion.title}
                </h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed pl-6">{selectedSuggestion.content}</p>
            </div>
          ) : (
            mockSuggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-100 transition-colors"
                onClick={() => setSelectedSuggestion(suggestion)} // Set selected suggestion on click
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-4 rounded bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-xs">✓</span>
                  </div>
                  <h3 className="text-xs font-medium text-gray-900">
                    {suggestion.title}
                  </h3>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed pl-6">{suggestion.content}</p>
              </div>
            ))
          )
        ) : (
          mockSelectedClasses.map((selected) => (
            <div
              key={selected.id}
              className="p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-100 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xs font-medium text-gray-900">
                  <strong>{selected.number} {selected.title}</strong>
                </h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed pl-6">{selected.professor}</p>
              <p className="text-xs text-gray-600 leading-relaxed pl-6">{selected.time}</p>
              <p className="text-xs text-gray-600 leading-relaxed pl-6">{selected.location}</p>
            </div>
          ))
        )}
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
      <div className="flex-grow overflow-y-auto p-4">

          {chatHistory.map((message, index) => (
              <div key={index} className="mt-2 p-2 bg-gray-100 rounded">
                  <p className="text-sm text-gray-800">{message}</p>
              </div>
          ))}
          <div ref={chatEndRef} /> {/* Scroll target */}
      </div>


      {/* Input Area */}
          
      {/* Response Area */}
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
      )}

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
