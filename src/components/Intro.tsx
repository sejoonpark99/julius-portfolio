// src/components/Intro.tsx
import React from 'react';
import Chatbot from './Chatbot'; // Import the Chatbot component

const Intro: React.FC = () => {
  return (
    <section className="intro relative">
      <p>Hey, I'm Julius - a bit about myself - Currently a full time software engineer specializing in full stack development. Graduated from the University of Waterloo in Engineering.</p>
      <p>If you have specific questions, ask my chatbot "+CHAT+", its located top right. (Draggable)</p>
      
      {/* Add the OpenAI-powered Chatbot component
      <Chatbot /> */}
    </section>
  );
};

export default Intro;