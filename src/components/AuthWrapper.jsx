import { useState, useRef } from 'react';
import Login from './Login';
import Register from './Register';

function AuthWrapper() {
  const loginRef = useRef();
  const registerRef = useRef();

  const handleSwitchToRegister = () => {
    // Close login modal and open register modal
    if (loginRef.current) {
      loginRef.current.setShow(false);
    }
    if (registerRef.current) {
      registerRef.current.setShow(true);
    }
  };

  const handleSwitchToLogin = () => {
    // Close register modal and open login modal
    if (registerRef.current) {
      registerRef.current.setShow(false);
    }
    if (loginRef.current) {
      loginRef.current.setShow(true);
    }
  };

  return (
    <>
      <Login 
        ref={loginRef}
        onSwitchToRegister={handleSwitchToRegister} 
      />
      <span> / </span>
      <Register 
        ref={registerRef}
        onSwitchToLogin={handleSwitchToLogin} 
      />
    </>
  );
}

export default AuthWrapper;
