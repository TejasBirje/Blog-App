import React from 'react'

function Logo({ width = '100px', src = '../../Untitled(1).png', alt = 'Logo' }) {
  return (
    <div>
      <img src={src} alt={alt} style={{ width }} />
    </div>
  );
}

export default Logo