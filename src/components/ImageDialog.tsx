import React, { useEffect, useState, useRef } from 'react';
import { ImageData } from '../types/types';
import { createPortal } from 'react-dom';

interface ImageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  image: ImageData | null;
}

const ImageDialog: React.FC<ImageDialogProps> = ({ isOpen, onClose, image }) => {
  const [isActive, setIsActive] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // When opening dialog
      document.body.classList.add('dialog-open');
      
      // Small delay to ensure DOM is ready before animation
      const timer = setTimeout(() => {
        setIsActive(true);
      }, 10);
      
      return () => clearTimeout(timer);
    } else {
      // When dialog is closed from props
      setIsActive(false);
      
      // Remove body class after animation completes
      const timer = setTimeout(() => {
        document.body.classList.remove('dialog-open');
      }, 400);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  // Separate cleanup effect to prevent conflicts
  useEffect(() => {
    return () => {
      document.body.classList.remove('dialog-open');
    };
  }, []);

  // Handle ESC key press to close dialog
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen || !image) return null;

  // Controlled close function with animation
  const handleClose = (e?: React.MouseEvent) => {
    // Prevent event bubbling to avoid reopening
    if (e) {
      e.stopPropagation();
    }
    
    // First, trigger the exit animation
    setIsActive(false);
    
    // Wait for animation to complete before removing from DOM
    setTimeout(() => {
      onClose();
    }, 400); // Match transition duration
  };

  // Stop propagation to prevent clicks inside the dialog from closing it
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Function to format technical details to display code blocks properly
  const formatTechnicalDetails = (content: string | undefined) => {
    if (!content) return null;

    // Parse sections with headers, code blocks, and text content
    const parsedContent: JSX.Element[] = [];
    let currentIndex = 0;

    // Split the content by section headings (###, ##, or #)
    const sections = content.split(/^(#{1,3}\s+.*?)$/m);
    
    sections.forEach((section, index) => {
      // Check if this is a heading
      if (/^#{1,3}\s+.*?$/.test(section)) {
        // Determine heading level
        const level = (section.match(/^(#+)/) || [''])[0].length;
        const headingText = section.replace(/^#+\s+/, '');
        
        // Format heading like "### 3. ORDER MANAGEMENT"
        parsedContent.push(
          <div key={`heading-${currentIndex}`} className="code-section-heading">
            <span className="heading-marker">{section.substring(0, level)}</span> {headingText}
          </div>
        );
        currentIndex++;
      } 
      // This is content following a heading
      else if (section.trim()) {
        // Split the section by code blocks
        const codeBlocks = section.split(/```(\w*)\n([\s\S]*?)```/g);
        
        for (let i = 0; i < codeBlocks.length; i++) {
          // If this is a language identifier
          if (i % 3 === 1) {
            const language = codeBlocks[i].toUpperCase();
            const codeContent = codeBlocks[i + 1] || '';
            
            parsedContent.push(
              <div key={`code-${currentIndex}`} className="code-block-container">
                <div className="code-language-label">{language}</div>
                <pre className="code-content">
                  {codeContent.split('\n').map((line, lineIndex) => (
                    <div key={lineIndex} className="code-line">
                      {line}
                    </div>
                  ))}
                </pre>
              </div>
            );
            currentIndex++;
            i++; // Skip the code content as we've already processed it
          } 
          // If this is regular text (not code or language identifier)
          else if (i % 3 === 0 && codeBlocks[i].trim()) {
            // Process simple markdown text (bold, italic, bullet points)
            const textContent = codeBlocks[i]
              .split('\n')
              .filter(line => line.trim())
              .map((line, lineIndex) => {
                // Check if this is a list item
                if (line.trim().startsWith('- ')) {
                  return (
                    <li key={lineIndex} className="markdown-list-item">
                      {line.replace(/^-\s+/, '')}
                    </li>
                  );
                }
                
                // Otherwise it's a paragraph
                return <p key={lineIndex} className="markdown-paragraph">{line}</p>;
              });
            
            parsedContent.push(
              <div key={`text-${currentIndex}`} className="markdown-text">
                {textContent}
              </div>
            );
            currentIndex++;
          }
        }
      }
    });

    return <div className="technical-details-formatted">{parsedContent}</div>;
  };

  // Use createPortal to render the dialog at the document body level
  return createPortal(
    <div 
      ref={backdropRef}
      className={`dialog-backdrop ${isActive ? 'active' : ''}`} 
      onClick={handleClose}
    >
      <div 
        ref={overlayRef}
        className={`image-dialog-overlay ${isActive ? 'active' : ''}`} 
      >
        <div className="image-dialog-content" onClick={handleContentClick}>
          <button className="image-dialog-close" onClick={handleClose}>×</button>
          
          <div className="image-dialog-layout">
            <div className="image-dialog-image">
              <img src={image.src} alt={image.details?.title || 'Image preview'} />
            </div>
            
            <div className="image-dialog-details">
              {image.details?.title && <h2>{image.details.title}</h2>}
              
              {image.details?.description && (
                <div className="image-dialog-description">
                  <p>{image.details.description}</p>
                </div>
              )}

              <div className="image-dialog-metadata-grid">
                {image.details?.date && (
                  <div className="image-dialog-metadata">
                    <strong>Date:</strong> {image.details.date}
                  </div>
                )}
                
                {image.details?.client && (
                  <div className="image-dialog-metadata">
                    <strong>Client:</strong> {image.details.client}
                  </div>
                )}
                
                {image.details?.role && (
                  <div className="image-dialog-metadata">
                    <strong>Role:</strong> {image.details.role}
                  </div>
                )}
                
                {image.details?.duration && (
                  <div className="image-dialog-metadata">
                    <strong>Duration:</strong> {image.details.duration}
                  </div>
                )}
              </div>
              
              {image.details?.technologies && image.details.technologies.length > 0 && (
                <div className="image-dialog-technologies">
                  <h3>Technologies</h3>
                  <div className="image-dialog-tags">
                    {image.details.technologies.map((tech, index) => (
                      <span key={index} className="image-dialog-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Project Overview Section - only show if overview exists */}
              {image.details?.overview && (
                <div className="image-dialog-section">
                  <h3>Project Overview</h3>
                  <p>{image.details.overview}</p>
                </div>
              )}
              
              {/* Technical Details Section - only show if technical details exist */}
              {image.details?.technicalDetails && (
                <div className="image-dialog-section">
                  <h3>Technical Details</h3>
                  <div className="technical-details-content">
                    {formatTechnicalDetails(image.details.technicalDetails)}
                  </div>
                </div>
              )}          
              
              {/* Challenges Section - only show if challenges data exists */}
              {image.details?.challenges && (
                <div className="image-dialog-section">
                  <h3>Challenges & Solutions</h3>
                  <div className="challenges-content">
                    {image.details.challenges.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="challenge-paragraph">{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Key Features Section - only show if there are actual features */}
              {image.details?.features && (
                <div className="image-dialog-section">
                  <h3>Key Features</h3>
                  <ul className="image-dialog-features">
                    {image.details.features.map((feature, index) => (
                      <li key={index}>
                        {feature.split('\n\n').map((paragraph, pIndex) => (
                          <p key={pIndex}>{paragraph}</p>
                        ))}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ImageDialog;