import React from 'react';
import Script from 'next/script';
import './globals.css';
import FloatingChatButton from '../components/FloatingChatButton';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Use suppressHydrationWarning on the html element
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Add any necessary meta tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Portfolio</title>
        
        {/* Move webfonts to Script component for client-side loading */}
        <Script
          id="webfontloader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              WebFontConfig = {
                custom: {
                  families: ['LoRes22Serif', 'NeueHaasGroteskDisplay', 'AugerMono'],
                  urls: ['/fonts.css']
                }
              };
              (function(d) {
                var wf = d.createElement('script'), s = d.scripts[0];
                wf.src = '/webfontloader.js';
                wf.async = true;
                s.parentNode.insertBefore(wf, s);
              })(document);
            `,
          }}
        />
      </head>
        <body>
            {children}
            <FloatingChatButton />
        </body>
    </html>
  );
}