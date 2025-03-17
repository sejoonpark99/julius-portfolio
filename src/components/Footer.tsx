import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="page-footer">
      <p className="page-footer__text">
        <Link href="/resume.pdf" className="frame__prevdemo hover-line">Resume</Link>
      </p>
      <p className="page-footer__text">Just hoping that whoever is reading this knows me a little better without any fake faces. I do like to think that there is a difference between a good engineer and a normal one. Its important to keep learning and being better.</p>
      <p className="page-footer__text">I want to build. I don’t want to "simply" contribute — I want to be an essential piece. Entire processes, taking responsibility for shaping the future of the product and the organization itself. I enjoy environments where fast-paced creativity is the norm, where I can challenge the status quo, break through red tape, and build something from the ground up. I push my teams to think bigger and act faster. Strong teams are the foundations to success. If it's something I truly love doing, I'll lose sleep to work on it. I also think work hard play hard ain't a bad thing either.  </p>
      <p className="page-footer__credits">
        Julius Park
      </p>
    </footer>
  );
};

export default Footer;

