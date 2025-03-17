// src/components/GooeyFloatingChatButton.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';

type Message = {
  text: string;
  sender: 'user' | 'bot';
};

export default function GooeyFloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUserMessage, setCurrentUserMessage] = useState('');
  const [currentBotMessage, setCurrentBotMessage] = useState("Hey! Nice to meet you, just created this draggable chat in case you wanted to ask certain things in detail. I should answer most things, but to train someone's 25 years of personal knowledge takes time! Haha");
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [buttonPosition, setButtonPosition] = useState({ x: 1200, y: 30 });
  const [chatPosition, setChatPosition] = useState({ x: 0, y: 0 });
  const [isDraggingButton, setIsDraggingButton] = useState(false);
  const [isDraggingChat, setIsDraggingChat] = useState(false);
  const buttonDragRef = useRef<{ startX: number; startY: number; startButtonX: number; startButtonY: number }>({ 
    startX: 0, 
    startY: 0, 
    startButtonX: 0, 
    startButtonY: 0 
  });
  const chatDragRef = useRef<{ startX: number; startY: number; startChatX: number; startChatY: number }>({ 
    startX: 0, 
    startY: 0, 
    startChatX: 0, 
    startChatY: 0 
  });

  // Button dragging handlers
  const handleButtonMouseDown = (e: React.MouseEvent) => {
    if (isOpen) return; // Don't allow dragging button when chat is open
    
    setIsDraggingButton(true);
    buttonDragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startButtonX: buttonPosition.x,
      startButtonY: buttonPosition.y
    };
    e.preventDefault();
  };

  // Chat header dragging handlers
  const handleChatHeaderMouseDown = (e: React.MouseEvent) => {
    setIsDraggingChat(true);
    chatDragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startChatX: chatPosition.x,
      startChatY: chatPosition.y
    };
    e.preventDefault();
  };

  // Mouse move handler for dragging
  const handleMouseMove = (e: MouseEvent) => {
    // Handle button dragging
    if (isDraggingButton) {
      const deltaX = e.clientX - buttonDragRef.current.startX;
      const deltaY = e.clientY - buttonDragRef.current.startY;
      
      setButtonPosition({
        x: Math.min(Math.max(0, buttonDragRef.current.startButtonX + deltaX), window.innerWidth - 80),
        y: Math.min(Math.max(0, buttonDragRef.current.startButtonY + deltaY), window.innerHeight - 80)
      });
    }
    
    // Handle chat window dragging
    if (isDraggingChat) {
      const deltaX = e.clientX - chatDragRef.current.startX;
      const deltaY = e.clientY - chatDragRef.current.startY;
      
      // Calculate new position ensuring chat window stays within viewport
      const chatWidth = 500; // Approximate width of chat window
      const chatHeight = 500; // Approximate height of chat window
      
      setChatPosition({
        x: Math.min(Math.max(-buttonPosition.x, chatDragRef.current.startChatX + deltaX), window.innerWidth - buttonPosition.x - chatWidth),
        y: Math.min(Math.max(-buttonPosition.y + 20, chatDragRef.current.startChatY + deltaY), window.innerHeight - buttonPosition.y - chatHeight)
      });
    }
  };

  // Mouse up handler for dragging
  const handleMouseUp = () => {
    setIsDraggingButton(false);
    setIsDraggingChat(false);
  };

  // Mouse enter/leave for gooey effect
  const handleMouseEnter = () => {
    if (!isOpen) {
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isOpen) {
      setIsExpanded(false);
    }
  };

  // Register mouse events for dragging
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingButton, isDraggingChat]);

  const toggleChatbot = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent any default behavior
    e.stopPropagation(); // Stop event propagation
    
    setIsOpen(!isOpen);
    setIsExpanded(false);
    
    // Reset chat position when opening
    if (!isOpen) {
      setChatPosition({ x: 0, y: 0 });
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
    <>
      {/* SVG Filter for Gooey Effect */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div 
        className="font-mono"
        style={{ 
          position: 'fixed',
          top: `${buttonPosition.y}px`, 
          left: `${buttonPosition.x}px`,
          cursor: isDraggingButton ? 'grabbing' : 'grab',
          zIndex: 1000,
          filter: isOpen ? 'none' : 'url(#gooey)',
        }}
      >
        {/* Chat button with gooey effect */}
        <button 
            onMouseDown={handleButtonMouseDown}
            onClick={toggleChatbot}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="bg-black hover:bg-gray-800 transition-all duration-300 text-white shadow-lg flex items-center justify-center"
            aria-label={isOpen ? "Close chat" : "Open chat"}
            title={isOpen ? "Close chat" : "Chat with Julius"}
            style={{ 
                width: isExpanded ? '80px' : '60px', 
                height: isExpanded ? '80px' : '60px',
                cursor: isDraggingButton ? 'grabbing' : (isOpen ? 'pointer' : 'grab'),
                transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
                border: 'none',
                outline: 'none'
            }}
            >
            {isOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            ) : (
                <span className={`text-xs ${isExpanded ? 'text-base' : 'text-xs'} transition-all duration-300`}>+CHAT+</span>
            )}
        </button>
                    
        {/* Gooey decorative blobs */}
        {!isOpen && (
          <>
            <div 
              className="absolute bg-black rounded-none"
              style={{
                width: '100px',
                height: '20px',
                left: isExpanded ? '10px' : '30px',
                top: isExpanded ? '10px' : '20px',
                opacity: isExpanded ? 0.8 : 0,
                transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
              }}
            />
            <div 
              className="absolute bg-black rounded-full"
              style={{
                width: '100px',
                height: '25px',
                right: isExpanded ? '15px' : '30px',
                bottom: isExpanded ? '15px' : '25px',
                opacity: isExpanded ? 0.8 : 0,
                transition: 'all 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
              }}
            />
            <div 
              className="absolute bg-black rounded-full"
              style={{
                width: '15px',
                height: '15px',
                left: isExpanded ? '30px' : '40px',
                bottom: isExpanded ? '20px' : '30px',
                opacity: isExpanded ? 0.8 : 0,
                transition: 'all 0.7s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
              }}
            />
          </>
        )}
        
        {/* Chat window */}
        {isOpen && (
          <div 
            className="absolute bg-white rounded-none shadow-2xl border border-black flex flex-col h-[500px] overflow-hidden transition-all duration-300 ease-in-out"
            style={{
              top: `${20 + chatPosition.y}px`,
              left: `${chatPosition.x}px`,
              width: '500px',
              animation: 'popIn 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards',
            }}
          >
            {/* Header - Draggable */}
            <div 
              className="bg-black text-white p-4 flex justify-between items-center uppercase tracking-wide font-bold cursor-move"
              onMouseDown={handleChatHeaderMouseDown}
              style={{ cursor: isDraggingChat ? 'grabbing' : 'grab' }}
            >
            </div>
            
            {/* Messages - Only showing the current exchange */}
            <div className="flex-1 p-4 pb-8 overflow-y-auto space-y-4 flex flex-col ">
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
            </div>
          </div>
        )}
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes popIn {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}