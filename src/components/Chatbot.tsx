// src/components/Chatbot.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';

type Message = {
  text: string;
  sender: 'user' | 'bot';
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUserMessage, setCurrentUserMessage] = useState('');
  const [currentBotMessage, setCurrentBotMessage] = useState("YOU CAN CALL ME JULIUS PARK. I CURRENTLY WORK AS A SOFTWARE ENGINEER AT COMPUTERTALK.");
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; startButtonX: number; startButtonY: number }>({ 
    startX: 0, 
    startY: 0, 
    startButtonX: 0, 
    startButtonY: 0 
  });

  // Initialize button position - prevent scrolling issues by using fixed positioning
  useEffect(() => {
    // Position near the top right by default
    const initialX = window.innerWidth - 100;
    const initialY = 100;
    setButtonPosition({ x: initialX, y: initialY });
  }, []);

  // Mouse down handler for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isOpen) return; // Don't allow dragging when chat is open
    
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startButtonX: buttonPosition.x,
      startButtonY: buttonPosition.y
    };
    e.preventDefault();
  };

  // Mouse move handler for dragging
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragRef.current.startX;
    const deltaY = e.clientY - dragRef.current.startY;
    
    setButtonPosition({
      x: Math.min(Math.max(0, dragRef.current.startButtonX + deltaX), window.innerWidth - 80),
      y: Math.min(Math.max(0, dragRef.current.startButtonY + deltaY), window.innerHeight - 80)
    });
  };

  // Mouse up handler for dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Register mouse events for dragging
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const toggleChatbot = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent any default behavior
    e.stopPropagation(); // Stop event propagation
    
    setIsOpen(!isOpen);
    
    // Focus input when opening
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Handle Escape key to close chatbot
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim() === '') return;
    
    // Set current user message
    setCurrentUserMessage(input);
    setInput('');
    setIsTyping(true);
    
    try {
      // Keep track of conversation context
      const messages = [
        { role: 'assistant', content: currentBotMessage },
        { role: 'user', content: input }
      ];
      
      // Call API endpoint that will communicate with OpenAI
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: input,
          history: messages
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response');
      }
      
      const data = await response.json();
      setCurrentBotMessage(data.message);
    } catch (error) {
      console.error('Error:', error);
      setCurrentBotMessage("Sorry, I couldn't process your request. Please try again later.");
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div 
      className="fixed z-50 font-mono"
      style={{ 
        top: `${buttonPosition.y}px`, 
        left: `${buttonPosition.x}px`,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
    >
      {/* Chat button */}
      <button 
        onMouseDown={handleMouseDown}
        onClick={toggleChatbot}
        className="bg-black hover:bg-gray-800 transition-all duration-200 text-white rounded-full shadow-lg flex items-center justify-center"
        aria-label={isOpen ? "Close chat" : "Open chat"}
        title={isOpen ? "Close chat" : "Chat with Julius"}
        style={{ 
          width: '80px', 
          height: '80px',
          cursor: isDragging ? 'grabbing' : (isOpen ? 'pointer' : 'grab')
        }}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="flex flex-col items-center">
            <span className="text-xs">CHAT</span>
          </div>
        )}
      </button>
      
      {/* Chat window */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-96 sm:w-[500px] bg-white rounded-none shadow-2xl border border-black flex flex-col h-[500px] overflow-hidden transition-all duration-300 ease-in-out">
          {/* Header */}
          <div className="bg-black text-white p-4 flex justify-between items-center uppercase tracking-wide font-bold">
            <div className="flex items-center">
              CHAT WITH JULIUS
            </div>
            <button 
              onClick={toggleChatbot} 
              className="text-white hover:text-gray-300 transition-colors"
              aria-label="Close chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Messages - Only showing the current exchange */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col">
            {/* Julius's message */}
            <div className="flex justify-start gap-2">
              <div className="flex flex-col max-w-[80%]">
                <div className="border border-black px-4 py-3">
                  {isTyping ? (
                    <div className="flex space-x-1">
                      <span className="h-2 w-2 bg-black rounded-full animate-bounce delay-100"></span>
                      <span className="h-2 w-2 bg-black rounded-full animate-bounce delay-300"></span>
                      <span className="h-2 w-2 bg-black rounded-full animate-bounce delay-500"></span>
                    </div>
                  ) : (
                    currentBotMessage
                  )}
                </div>
              </div>
            </div>
            
            {/* User's message - only show if there's a current message */}
            {currentUserMessage && (
              <div className="flex justify-end gap-2 mt-auto">
                <div className="flex flex-col max-w-[80%]">
                  <div className="bg-black text-white px-4 py-3">
                    {currentUserMessage}
                  </div>
                </div>
                <div className="flex-shrink-0 flex items-center justify-center">
                  <span className="text-xs font-bold">YOU</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Input */}
          <div className="border-t border-black p-4 bg-white">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                className="flex-1 border border-black rounded-none px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Type a message..."
                aria-label="Type your message"
              />
              <button 
                type="submit"
                className={`${
                  input.trim() === '' || isTyping 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-black hover:bg-gray-800'
                } text-white rounded-none p-2 transition-colors`}
                disabled={input.trim() === '' || isTyping}
                aria-label="Send message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
            <div className="mt-2 text-xs text-center text-gray-500">
              POWERED BY OPENAI
            </div>
          </div>
        </div>
      )}
    </div>
  );
}