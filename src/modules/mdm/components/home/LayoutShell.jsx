// /home/LayoutShell.jsx
import React from 'react';

export default function LayoutShell({ children, scrollerRef }) {
  return (
    <div
      ref={scrollerRef}
      style={{
        height: '100vh',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        background: '#0a0a0f',
      }}
    >
      {/* background glow */}
      <div className="parallax-bg-layer" />

      {/* particles */}
      {[...Array(200)].map((_, i) => (
        <div key={i} className="particle" />
      ))}

      {children}
    </div>
  );
}
