import React, { useRef } from 'react';

const RippleAnchor = ({ href, children, className = '', onClick, ...props }) => {
  const anchorRef = useRef(null);

  const createRipple = (event) => {
    const anchor = anchorRef.current;
    const rect = anchor.getBoundingClientRect();
    
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    anchor.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  const handleClick = (event) => {
    createRipple(event);
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <a
      ref={anchorRef}
      href={href}
      className={`ripple-link ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
};

export default RippleAnchor;
