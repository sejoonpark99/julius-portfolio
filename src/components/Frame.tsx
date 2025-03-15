import React from 'react';
import Link from 'next/link';

const Frame: React.FC = () => {
  return (
    <div className="frame">
      <div className="frame__title">
        <h1 className="frame__title-main">Portfolio | Julius Park</h1>
      </div>
      <Link className="frame__prevdemo hover-line" href="http://www.linkedin.com/in/julius-park">
        LinkedIn
      </Link>
    </div>
  );
};

export default Frame;