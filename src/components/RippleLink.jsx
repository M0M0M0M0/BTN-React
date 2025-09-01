import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const RippleLink = ({ to, children, className = '', onClick, ...props }) => {
  const linkRef = useRef(null);

  const createRipple = (event) => {
    const link = linkRef.current;
    const rect = link.getBoundingClientRect();
    
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    link.appendChild(ripple);
    
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
    <Link
      ref={linkRef}
      to={to}
      className={`ripple-link ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
};

export default RippleLink;
