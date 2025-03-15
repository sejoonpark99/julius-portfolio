import './globals.css';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Julius | Portfolio',
  description: 'Portfolio website of Julius Park',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="js">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/gdf6msi.css" />
        <Script id="webfont-loader" strategy="beforeInteractive">
          {`
            WebFontConfig = {
              typekit: {
                id: 'gdf6msi'
              }
            };
            
            (function(d) {
              var wf = d.createElement('script'), s = d.scripts[0];
              wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
              wf.async = true;
              s.parentNode.insertBefore(wf, s);
            })(document);
          `}
        </Script>
      </head>
      <body className="loading">
        {children}
        <Script id="css-vars-check" strategy="afterInteractive">
          {`
            var supportsCssVars = function() {
              var e, t = document.createElement("style");
              return t.innerHTML = "root: { --tmp-var: bold; }", 
              document.head.appendChild(t), 
              e = !!(window.CSS && window.CSS.supports && window.CSS.supports("font-weight", "var(--tmp-var)")), 
              t.parentNode.removeChild(t), e
            };
            supportsCssVars() || alert("Please view this demo in a modern browser that supports CSS Variables.");
          `}
        </Script>
      </body>
    </html>
  );
}